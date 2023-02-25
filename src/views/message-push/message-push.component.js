/* eslint-disable indent */
import { Notification } from 'element-ui'
import { alertNotify } from '@/utils/message-push/notification'
// import wsStore from '@/utils/websocket/websocket-message'
import mpStore from '@/utils/message-push'
export default {
    name: 'App',
    data() {
        return {
            n: 1
        }
    },
    computed: {
        /* receiveMsg: {
            get: function() {
                return wsStore.state.socketMsg.receiveMsg
            },
            set: function() { }
        }, */
        notifications: {
            get: function() {
                return mpStore.state.messagePush.notifications
            },
            set: function() { }
        }
    },
    watch: {
        /* receiveMsg(newValue) {
            this.getInfoDetail(newValue.msg)
        }, */
        notifications(newValue) {
            this.notifications = newValue
        }
    },
    created() {
    },
    beforeDestroy() {
        Notification.closeAll()
    },
    methods: {
        getInfo() {
            const msgData = {
                createTime: '2022-01-11 14:21',
                detailsList: [
                    {
                        businessId: '1479376874789408769',
                        enumBusType: '16',
                        isLink: 1,
                        name: '于飞',
                        objectId: '1480787039560404993',
                        serialNumber: 'CD220003'
                    },
                    {
                        businessId: '1479391378164158466',
                        enumBusType: '18',
                        isLink: 1,
                        name: '于飞',
                        objectId: '1480787039560404994',
                        serialNumber: 'CYD220002'
                    }],
                enumConditionType: '23',
                isRead: 0,
                objectId: this.n,
                title: '机辅料采购单已编辑'
            }
            this.n++
            msgData.title = this.n
            msgData.objectId = this.n // 假数据，确保每条数据的objectId为唯一
            this.getInfoDetail(msgData)
        },
        // 获取消息提醒
        getInfoDetail(msgData) {
            if (this.notifications.length === 3) {
                this.notifications[0].close()
            }
            const notification = alertNotify(this, msgData)
            this.notifications.push(notification)
            mpStore.commit('messagePush/SET_NOTIFICATIONS', this.notifications)
        }
    }
}
