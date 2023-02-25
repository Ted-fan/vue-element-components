import { requestApi } from '@/utils/request'
import { option } from '@/utils/uploadBigFile/optionParam'

export const mergeFile = data => {
  option.isJson = true
  option.data = JSON.stringify(data)
  option.method = 'post'
  option.url = process.env.VUE_APP_FILE_API + 'uploader/mergeFile'
  return requestApi(option)
}

export const selectFileList = data => {
  option.isJson = true
  option.data = JSON.stringify(data)
  option.method = 'post'
  option.url = process.env.VUE_APP_FILE_API + 'uploader/selectFileList'
  console.log(option)
  return requestApi(option)
}

export const deleteFile = data => {
  option.isJson = true
  option.data = JSON.stringify(data)
  option.method = 'post'
  option.url = process.env.VUE_APP_FILE_API + '/uploader/deleteFile'
  return requestApi(option)
}

export const downloadFile = query => {
  option.isJson = true
  option.data = query
  option.method = 'get'
  option.url = process.env.VUE_APP_FILE_API + '/uploader/download'
  return requestApi(option)
}
