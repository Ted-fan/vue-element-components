import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import request from '@/utils/request'
import requestExport from '@/utils/export'
/**
 * 上传附件
 * @param {json} params 文件参数
 */
export function uploadFile(filePath) {
  return request({
    url: process.env.VUE_APP_FILE_URL + '/file/upload',
    method: 'post',
    filePath: filePath,
    formData: {
      file: filePath
    },
    name: 'file'
  })
}

export function alertMessage(text, type = 'success') {
  Message({
    message: text,
    type: type,
    duration: 2000
  })
}

// confirm提示框
export function alertWithCallback(text, title, type = 'warning') {
  return MessageBox.confirm(text, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}

// title:题目  params:需确认的字段  total共多少条
export function showAlertMessage(title, params, total = 0, showMoreText = false) {
  const message = []
  for (const key in params) {
    if (params[key] && String(params[key]).replace(/\s+/g, '')) {
      message.push(`"${params[key]}"`)
    }
  }
  const alertMsg = '<div>' + title + '<div>' +
    '<div style="color:#0F327D" class="aq-row-wrap">' +
    message.join('&nbsp;&nbsp;&nbsp;') +
    (total ? `等${total}个数据信息` : showMoreText ? ' 等信息' : '') +
    '</div>'
  return alertMsg
}

// confirm HTML提示框
export function alertHtmlWithCallback(html, title, confirmButtonText = '确认提交', type = 'warning') {
  return MessageBox.confirm(html, title, {
    confirmButtonText: confirmButtonText,
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
    type: type,
    center: true
  })
}

// 非空校验
export function isValidateNull(rule, value, callback) {
  if (value || value === 0) {
    if (value !== '') {
      callback()
    } else {
      callback(new Error('此项为必填项'))
    }
  } else {
    callback(new Error('此项为必填项'))
  }
}

// 获取第一条路由
export function getFirstRoute(routes, routePath) {
  routes[0].children.forEach((ele, index) => {
    if (ele.children.length !== 0) {
      this.getFirstRoute(ele[0].children, routePath)
    }
    if (index === 0) {
      routePath = routePath + '/' + ele.path
    }
  })
  return routePath
}

// 补齐前缀
export function prefixInteger(num, length) {
  return ('0000000000000000' + num).substr(-length)
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
export function randomPassword(randomFlag, min, max) {
  let result = ''
  let range = min
  const charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    const random = Math.round(Math.random() * (charset.length - 1))
    result += charset[random]
  }
  return result
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

// 组织架构树，最后一项children:[]的处理
export function getTreeData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children)
    }
  }
  return data
}

// 手机号加密
export function securityPhone(phone) {
  const ValidatePhone = /^1[1,2,3,4,5,6,7,8,9,0]\d{9}$/
  if (ValidatePhone.test(phone)) {
    const nameString = phone.substring(0, 3) + '****' + phone.substr(phone.length - 4)
    return nameString
  } else {
    return false
  }
}

// 下载文件
export function downloadFile(params, name, url) {
  return requestExport({
    url: url,
    method: 'post',
    data: params,
    fileName: name,
    fileType: 'application/zip',
    responseType: `arraybuffer` // 一定要写
  })
}

// 导出文件
export function exportDataToFile(name, url) {
  return requestExport({
    url: url,
    method: 'get',
    fileName: name,
    // fileType: 'application/vnd.ms-excel',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    responseType: `arraybuffer` // 一定要写
  })
}

// 打开预览文件
export function openFile(filePath) {
  window.open(process.env.VUE_APP_VIEW_FILE_URL + process.env.VUE_APP_FILE_URL + filePath)
}
