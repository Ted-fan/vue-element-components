/* eslint-disable eqeqeq */
/* eslint-disable no-prototype-builtins */
/* eslint-disable indent */
import wsStore from './websocket-message'
let wsUri = ''
let ws = null
let lockReconnect = false // 是否真正建立连接
const timeout = 25 * 1000 // 30秒一次心跳
let timeoutObj = null // 心跳心跳倒计时
let serverTimeoutObj = null // 心跳倒计时
let timeoutNum = null // 断开 重连倒计时
let canReconnect = true // 是否允许重连

// 初始话websocket
export function initWebsocket(uri) {
    wsUri = uri
    ws = new WebSocket(process.env.VUE_APP_SOCKET + wsUri)
    ws.onopen = onopen
    ws.onmessage = onmessage
    ws.onclose = onclose
    ws.onerror = onerror
    window.onfocus = () => {
        if (ws.readyState !== 1) {
            canReconnect = true
            reconnect()
        }
    }
    window.onblur = () => {
        canReconnect = false
    }
}

function onopen(e) {
    console.log('websocket 已连接', e)
    ws.send('{"ping":"ping"}')
    // 开启心跳
    startHeartbeat()
}

function onmessage(e) {
    console.log('收到消息', e)
    ws.send('{"feedback":"success"}')
    const msg = JSON.parse(e.data)
    // 收到服务器信息，心跳重置,去除返回值为pong的信息
    if (!msg.hasOwnProperty('pong')) {
        wsStore.commit('socketMsg/SET_RECEIVE_MSG', msg)
    }
    resetHeartbeat()
}

function onclose(e) {
    console.log('连接关闭')
    // 重连
    if (canReconnect) {
        reconnect()
    }
}

function onerror(e) {
    // 重连
    reconnect()
}

// 重新连接
function reconnect() {
    console.log('重新连接')
    if (lockReconnect || !canReconnect) {
        return
    }
    lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    timeoutNum && clearTimeout(timeoutNum)
    timeoutNum = setTimeout(() => {
        // 新连接
        initWebsocket(wsUri)
        lockReconnect = false
    }, 5000)
}

// 开启心跳
function startHeartbeat() {
    console.log('开启心跳')
    timeoutObj && clearTimeout(timeoutObj)
    serverTimeoutObj && clearTimeout(serverTimeoutObj)
    timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (ws.readyState == 1) { // 如果连接正常
            ws.send('{"ping":"ping"}')
        } else { // 否则重连
            reconnect()
        }
        serverTimeoutObj = setTimeout(() => {
            // 超时关闭
            ws.close()
        }, timeout)
    }, timeout)
}

// 重置心跳
function resetHeartbeat() {
    console.log('重置心跳')
    // 清除时间
    clearTimeout(timeoutObj)
    clearTimeout(serverTimeoutObj)
    // 重启心跳
    startHeartbeat()
}

// 发送消息
export function sendMessage(message) {
    ws.send(JSON.stringify(message))
}

// 关闭连接
export function closeWebsocket() {
    if (ws) {
        canReconnect = false
        timeoutObj && clearTimeout(timeoutObj)
        serverTimeoutObj && clearTimeout(serverTimeoutObj)
        ws.close()
    }
}

