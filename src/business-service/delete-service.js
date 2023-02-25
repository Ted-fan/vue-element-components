/* eslint-disable indent */
import request from '@/utils/request'
import { alertHtmlWithCallback, alertMessage, showAlertMessage } from '@/utils/utils'
// 删除单/多条选中数据
/**
 * @param singleId 单条Id
 * @param multiIds 多条Ids
 * @param title 提示message
 * @param message 提示message
 * @param count 提示message
 * @param url 接口请求路径
 */
export function deleteData(title, message, count, singleId, multiIds, url, total) {
    return new Promise((resolve, reject) => {
        let alertMsg = ''
        if (count === 0) {
            alertMessage('请至少选择一条数据', 'warning')
        } else {
            alertMsg = showAlertMessage(title, message, total)
            alertHtmlWithCallback(count <= 5 ? alertMsg : '', `是否确认删除已选中的${count}条数据`).then(() => {
                const ids = singleId || multiIds
                request({
                    url: url,
                    method: 'post',
                    data: { keyValues: ids }
                }).then((res) => {
                    alertMessage(res.message)
                    resolve(true)
                }).catch(() => { })
            }).catch(() => { }) // 关闭confirm框的回调，不处理的话会报一个js error
        }
    })
}

export function deleteDataByCustom(title, message, count, url, params, total) {
    return new Promise((resolve, reject) => {
        let alertMsg = ''
        if (count === 0) {
            alertMessage('请至少选择一条数据', 'warning')
        } else {
            alertMsg = showAlertMessage(title, message, total)
            alertHtmlWithCallback(count <= 5 ? alertMsg : '', `是否确认删除已选中的${count}条数据`).then(() => {
                request({
                    url: url,
                    method: 'post',
                    data: params
                }).then((res) => {
                    alertMessage(res.message)
                    resolve(true)
                }).catch(() => { })
            }).catch(() => { }) // 关闭confirm框的回调，不处理的话会报一个js error
        }
    })
}
