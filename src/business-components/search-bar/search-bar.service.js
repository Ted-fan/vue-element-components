import request from '@/utils/request';

// 获取原材料/机辅料下拉列表
export function getClassifyListApi(type) {
  let url;
  if (type === '10') {
    url = process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialType/getDropDownList';
  } else {
    url = process.env.VUE_APP_DMS_SERVICE + 'api/busMachineAccessoriesType/getMachineTypeDropDown';
  }
  return request({
    url: url,
    method: 'get'
  });
}

// 获取原材料/机辅料库存单位
export function getUnitListApi(type) {
  let url;
  if (type === '10') {
    url = process.env.VUE_APP_DMS_SERVICE + 'api/busRawMaterialData/getStockUnit';
  } else {
    url = process.env.VUE_APP_DMS_SERVICE + 'api/busMachineAccessoriesData/getStockUnit';
  }
  return request({
    url: url,
    method: 'get'
  });
}

