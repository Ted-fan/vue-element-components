import request from '@/utils/request'

// 获取原材料标准列表
export function getBasicListApi(postBody) {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/getBusRawMaterialDataListByPage',
    method: 'post',
    data: postBody
  })
}

// 获取分类下拉列表
export function getClassifyListApi() {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialType/getDropDownList',
    method: 'get'
  })
}
