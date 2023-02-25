import request from '@/utils/request'

// 获取列表
export function getBasicListApi(postBody) {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'xxx',
    method: 'post',
    data: postBody
  })
}
