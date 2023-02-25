import { Notification } from 'element-ui'
import mpStore from '@/utils/message-push'
// import mpStore from '@/utils/message-push';
import { MSG_TYPE, MSG_START, MSG_CONTENT, MSG_END } from '@/utils/message-push/constants'
export function alertNotify(vm, msgData) {
  const vnode = vm.$createElement
  // 单号span
  const spanObj = mapMsg(msgData.detailsList, vnode, MSG_CONTENT, msgData, vm)
  // 判断姓名优先还是单号优先
  let contentObj = []
  if (MSG_TYPE[msgData.enumConditionType] === 'nameFirst') {
    contentObj = [
      vnode('span', { class: 'aq-text-color-primary' }, MSG_START[msgData.enumConditionType] + msgData.detailsList[0].name), // 用户名
      ...spanObj // 明细内容
    ]
  } else if (MSG_TYPE[msgData.enumConditionType] === 'orderFirst') {
    contentObj = [
      ...spanObj, // 明细内容
      vnode('span', { class: 'aq-text-color-primary' }, MSG_START[msgData.enumConditionType] + msgData.detailsList[0].name) // 用户名
    ]
  } else {
    contentObj = [
      ...spanObj // 明细内容
    ]
  }
  // 弹出通知
  const notify = Notification.info({
    title: '新消息提醒',
    position: 'bottom-right',
    dangerouslyUseHTMLString: true,
    duration: 0,
    onClose: function() {
      closeNotification(notify, vm)
    },
    message: vnode('div', {}, [
      vnode('div', { class: 'aq-text-color-primary' }, `【${msgData.title}】`),
      vnode('div', {}, [
        ...contentObj,
        vnode('span', { class: 'aq-text-color-primary' }, MSG_END[msgData.enumConditionType])
      ]),
      vnode('div', { class: 'aq-text-color-prevent' }, msgData.createTime)
    ])
  })
  notify.objectId = msgData.objectId
  return notify
}

/**
 * @param {Array} list 明细
 * @param {VNode} vnode 节点
 * @param {Object} msgContent 消息内容
 * @param {Object} msgData 消息数据
 */
function mapMsg(list, vnode, msgContent, msgData, vm) {
  const notifications = []
  list.forEach((element, index) => {
    notifications.push(
      vnode('span', {}, [
        vnode('span', { class: 'aq-text-color-primary' }, msgContent[msgData.enumConditionType][index]),
        vnode('span', {
          class: 'aq-text-color-primary aq-padding-horizontal-4 aq-pointer',
          attrs: {
            enumConditionType: msgData.enumConditionType,
            enumBusType: element.enumBusType,
            businessId: element.businessId,
            objectId: msgData.objectId
          },
          on: {
            click: (event) => {
              console.log(event)
              const enumConditionType = event.path[0].attributes['enumConditionType'].value
              const enumBusType = event.path[0].attributes['enumBusType'].value
              const businessId = event.path[0].attributes['businessId'].value
              const objectId = event.path[0].attributes['objectId'].value
              moveToPage(objectId, enumConditionType, enumBusType, businessId, vm)
            }
          }
        }, element.serialNumber)
      ])
    )
  })
  return notifications
}

// 关闭单个通知
function closeNotification(notify, vm) {
  vm.notifications.forEach((element, index) => {
    if (notify.objectId === element.objectId) {
      vm.notifications.splice(index, 1)
      return
    }
  })
  mpStore.commit('messagePush/SET_NOTIFICATIONS', vm.notifications)
}

// 跳转页面
function moveToPage(objectId, enumConditionType, enumBusType, businessId, vm) {
  switch (enumConditionType) {
    case '23':
      switch (enumBusType) {
        case '16':
          vm.$router.push({ path: '/demo-home/demo-home' })
          break
        case '18':
          vm.$router.push({ path: '/common-page/common-page' })
          break
      }
      break
  }
  vm.notifications.forEach((element, index) => {
    console.log(element, objectId)
    if (element.objectId === Number(objectId)) { // 确保objectId相同
      vm.notifications[index].close()
    }
  })
}
