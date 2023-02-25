import request from '@/utils/request'

// 获取分类下拉列表
export function getClassifyListApi() {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialType/getDropDownList',
    method: 'get'
  })
}

// 获取原材料标准下拉列表
export function getStandardListApi() {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialStandard/getDropDownList',
    method: 'get'
  })
}

// 获取采购员下拉列表
export function getBuyerListApi() {
  return request({
    url: process.env.VUE_APP_SYS_SERVICE + 'api/sysRole/getUserListByRoleCode/Purchaser',
    method: 'get'
  })
}

// 创建获取规格编码
export function getSpecsCodeApi() {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/getSpecsCode',
    method: 'get'
  })
}

// 创建或者编辑
export function createOrEditBasicApi(postBody) {
  let url = process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/create'
  if (postBody.objectId || postBody.objectId === 0) {
    url = process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/update'
  }
  return request({
    url: url,
    method: 'post',
    data: postBody
  })
}

// 获取原材料基础数据单条(修改时)
export function getBasicDetailApi(id) {
  return request({
    url: process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/getModelById',
    method: 'get',
    params: {
      objectId: id
    }
  })
}
