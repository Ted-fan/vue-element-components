import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      config.headers['token'] = getToken()
    } else {
      config.headers['token'] = -1
    }
    if (config.url.indexOf('http') !== -1) {
      config.baseURL = ''
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const blob = new Blob([response.data], {
      type: response.config.fileType
      // word(.doc):'application/msword'
      // word(.docx):'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      // excel(.xls):'application/vnd.ms-excel'
      // excel(.xlsx):'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      // pdf(.pdf):'application/pdf'
      // zip(.zip):'application/zip'
    })
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const fileName = response.config.fileName // 下载文件的名字
    link.href = objectUrl
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  },
  error => {
    Message({
      message: '导出失败 - ' + error.message,
      type: 'error',
      duration: 2000
    })
  }
)

export default service
