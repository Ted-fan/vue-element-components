// 消息类型,姓名优先|单号优先
export const MSG_TYPE = {
  '01': 'nameFirst',
  '02': 'orderFirst',
  '03': 'orderFirst',
  '04': 'orderFirst',
  '05': '',
  '06': 'nameFirst',
  '07': 'orderFirst',
  '08': 'orderFirst',
  '09': '',
  '10': '',
  '11': 'nameFirst',
  '12': 'orderFirst',
  '13': 'orderFirst',
  '14': '',
  '15': '',
  '16': '',
  '17': '',
  '18': '',
  '19': '',
  '20': '',
  '21': '',
  '22': 'nameFirst',
  '23': 'nameFirst',
  '24': 'nameFirst',
  '25': 'nameFirst',
  '26': 'nameFirst',
  '27': '',
  '28': 'nameFirst',
  '29': 'nameFirst',
  '30': 'nameFirst',
  '31': 'nameFirst',
  '32': '',
  '33': '',
  '34': '',
  '35': '',
  '36': '',
  '37': '',
  '38': '',
  '39': '',
  '40': '',
  '41': '',
  '42': '',
  '43': '',
  '44': '',
  '45': 'nameFirst',
  '46': 'orderFirst',
  '47': 'orderFirst',
  '48': 'orderFirst',
  '49': 'orderFirst',
  // '50': '',
  '51': 'orderFirst'
}
// 用户名前内容
export const MSG_START = {
  '01': '您有来自',
  '02': '已被',
  '03': '已被',
  '04': '',
  '05': '',
  '06': '您有来自',
  '07': '已被',
  '08': '已被',
  '09': '',
  '10': '',
  '11': '您有来自',
  '12': '已被',
  '13': '已被',
  '14': '',
  '15': '',
  '16': '',
  '17': '',
  '18': '',
  '19': '',
  '20': '',
  '21': '',
  '22': '采购员',
  '23': '采购员',
  '24': '采购员',
  '25': '采购员',
  '26': '采购员',
  '27': '',
  '28': '采购员',
  '29': '采购员',
  '30': '采购员',
  '31': '采购员',
  '32': '采购员',
  '33': '',
  '34': '',
  '35': '',
  '36': '',
  '37': '',
  '38': '',
  '39': '',
  '40': '',
  '41': '',
  '42': '',
  '43': '',
  '44': '',
  '45': '您有来自',
  '46': '创建完成，创建人:',
  '47': '有更新，更新人:',
  '48': '已完成审核，审核结果:',
  '49': '已被',
  // '50': '',
  '51': '已被更新，更新人:'
}
// 单号前内容
export const MSG_CONTENT = {
  '01': ['的机辅料申请单'],
  '02': ['机辅料申请'],
  '03': ['机辅料申请'],
  '04': ['机辅料申请'],
  '05': ['您的机辅料申请'],
  '06': ['的原材料采购计划'],
  '07': ['原材料采购计划'],
  '08': ['原材料采购计划'],
  '09': ['原材料采购计划'],
  '10': ['原材料采购计划'],
  '11': ['的机辅料计划'],
  '12': ['机辅料计划'],
  '13': ['机辅料计划'],
  '14': ['机辅料计划'],
  '15': ['机辅料计划'],
  '16': ['您有新的原材料采购单'],
  '17': ['原材料采购单'],
  '18': ['原材料采购单'],
  '19': ['您有新的机辅料采购单'],
  '20': ['机辅料采购单'],
  '21': ['机辅料采购单'],
  '22': ['已为机辅料计划', '生成采购单'],
  '23': ['已编辑机辅料计划', '的相关采购单'],
  '24': ['已撤回机辅料计划', '的相关采购单'],
  '25': ['已撤回机辅料采购单'],
  '26': ['已重新提交机辅料计划', '的相关采购单'],
  '27': ['机辅料采购单'],
  '28': ['已为原材料计划', '生成采购单'],
  '29': ['已编辑原材料计划', '的相关采购单'],
  '30': ['已撤回原材料计划', '的相关采购单'],
  '31': ['已撤回原材料采购单'],
  '32': ['已重新提交原材料计划', '的相关采购单'],
  '33': ['原材料采购单'],
  '34': ['采购计划', '相关的采购单'],
  '35': ['有新的退货单'],
  '36': [],
  '37': [],
  '38': ['退货申请'],
  '39': ['您有新的退货单'],
  '40': ['采购单', '相关的发货单'],
  '41': ['有新的采购单'],
  '42': ['采购单', '发货成功，发货单号为'],
  '43': ['发货单', '相关的退货单'],
  '44': ['发货单'],
  '45': ['的客户订单'],
  '46': ['经营计划'],
  '47': ['经营计划'],
  '48': ['客户订单'],
  '49': ['生产计划'],
  // '50': ['批次'],
  '51': ['产品']
}
// 消息结束语
export const MSG_END = {
  '01': '待处理',
  '02': '编辑',
  '03': '撤回',
  '04': '状态变为已完成',
  '05': '状态变为进行中',
  '06': '待处理',
  '07': '编辑',
  '08': '挂起',
  '09': '状态变为进行中',
  '10': '状态变为已完成',
  '11': '待处理',
  '12': '编辑',
  '13': '挂起',
  '14': '状态变为进行中',
  '15': '状态变为已完成',
  '16': '待处理',
  '17': '审批通过',
  '18': '审批驳回',
  '19': '待处理',
  '20': '审批通过',
  '21': '审批驳回',
  '22': '',
  '23': '',
  '24': '',
  '25': '',
  '26': '',
  '27': '已完成',
  '28': '',
  '29': '',
  '30': '',
  '31': '',
  '32': '',
  '33': '已完成',
  '34': '已到货',
  '35': '待出库',
  '36': '库存溢出',
  '37': '库存不足',
  '38': '已完成退货出库',
  '39': '待处理',
  '40': '已入库成功',
  '41': '待处理',
  '42': '',
  '43': '已确认到货',
  '44': '已发货',
  '45': '待审核',
  '46': '',
  '47': '',
  '48': '',
  '49': '确认成功',
  // '50': '状态变为批次异常',
  '51': ''
}
