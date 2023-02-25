import request from '@/utils/request'

// 获取详情
export function getBasicDetailApi(id) {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'xxx',
    method: 'get',
    params: {
      objectId: id
    }
  })
}

// 根据详情获取列表
export function getBasicListApi(postBody) {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'xxx',
    method: 'post',
    data: postBody
  })
}
