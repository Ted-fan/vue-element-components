
// import { alertHtmlWithCallback, alertMessage, showAlertMessage } from '@/utils/utils'
import SparkMD5 from 'spark-md5'
import { mergeFile } from '@/utils/uploadBigFile/uploadFile'
import { ACCEPT_CONFIG } from '@/utils/uploadBigFile/config'
export default {
  name: 'upload-big-file',
  components: {},
  directives: {},
  props: {
    title: { // 题目
      type: String,
      default: ''
    },
    description: { // 描述
      type: String,
      default: ''
    }
  },
  data() {
    return {
      originFileList: [],
      options: {
        // 目标上传 URL，默认POST  http://dell.dlanqi.com:10030//uploader http://dell.dlanqi.com:10030/uploader/mergeFile
        target: process.env.VUE_APP_FILE_API + '/uploader/chunk',
        // 分块大小(单位：字节)
        chunkSize: 2048000,
        // 上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
        fileParameterName: 'upfile',
        // 失败后最多自动重试上传次数
        maxChunkRetries: 3,
        // 是否开启服务器分片校验，对应GET类型同名的target URL
        testChunks: true,
        // 单文件上传。覆盖式，如果选择了多个会把之前的取消掉
        // singleFile: true,
        /*
            服务器分片校验函数，判断秒传及断点续传,传入的参数是Uploader.Chunk实例以及请求响应信息
            reponse码是successStatuses码时，才会进入该方法
            reponse码如果返回的是permanentErrors 中的状态码，不会进入该方法，直接进入onFileError函数 ，并显示上传失败
            reponse码是其他状态码，不会进入该方法，正常走标准上传
            checkChunkUploadedByResponse函数直接return true的话，不再调用上传接口
            */
        checkChunkUploadedByResponse: function(chunk, response_msg) { // todo 后端接口
          console.log(response_msg)
          const objMessage = JSON.parse(response_msg)
          if (objMessage.skipUpload) {
            return true
          }
          return (objMessage.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0
        },
        // 额外的自定义查询参数
        query: (file, chunk) => {
          return {
            ...file.params
          }
        }
      },
      attrs: {
        // 接受的文件类型，形如['.png', '.jpg', '.jpeg', '.gif', '.bmp'...] 这里我封装了一下
        accept: ACCEPT_CONFIG.getAll()
      },
      panelShow: false, // 选择文件后，展示上传panel
      fileStatusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '上传中',
        paused: '暂停',
        waiting: '等待上传'
      }
    }
  },
  created() {
    // this.getDataList()
  },
  methods: {

    onFileAdded(file) {
      this.panelShow = true
      this.computeMD5(file)
      // 2022/1/10更新
      // 将额外的参数赋值到每个文件上，解决了不同文件使用不同params的需求
      file.params = this.params
    },
    // 文件进度的回调
    onFileProgress(rootFile, file, chunk) {
      console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
    },
    /*
        第一个参数 rootFile 就是成功上传的文件所属的根 Uploader.File 对象，它应该包含或者等于成功上传文件；
        第二个参数 file 就是当前成功的 Uploader.File 对象本身；
        第三个参数就是 message 就是服务端响应内容，永远都是字符串；
        第四个参数 chunk 就是 Uploader.Chunk 实例，它就是该文件的最后一个块实例，如果你想得到请求响应码的话，chunk.xhr.status就是
        */
    onFileSuccess(rootFile, file, response, chunk) {
      // refProjectId为预留字段，可关联附件所属目标，例如所属档案，所属工程等
      // file.refProjectId = '123456789'
      // file.uploadBy = '123456'
      // file.type = 'pdf'
      // file.approvalId = this.approveId
      // file.structId = '123'
      // file.isLeaderCreate = 0
      mergeFile(file).then(responseData => {
        console.log(responseData.data)
        if (responseData.data.code === 415) {
          console.log('合并操作未成功，结果码：' + responseData.data.code)
        } else {
          console.log('合并成功', responseData.data)
          this.originFileList.push(file)
          console.log(this.originFileList)
          this.$emit('files', this.originFileList)
        }
      }).catch(function(error) {
        // debugger
        console.log(file)
        console.log('合并后捕获的未知异常：' + error)
      })
    },

    onFileError(rootFile, file, response, chunk) {
      console.log('上传完成后异常信息：' + response)
    },

    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file) {
      file.pause() // 文件进入等待中 pause()会令目前的进程暂停(进入睡眠状态), 直到被信号(signal)所中断.
      // 单个文件的大小限制2G
      // let fileSizeLimit = 2 * 1024 * 1024 * 1024
      console.log(file.size)
      if (file.size <= 0) {
        this.$message({
          showClose: true,
          message: '文件大小不能为空'
        })
        file.cancel()
      }

      const fileReader = new FileReader() // 使用FileReader对象（和他的方法）来操作目标文件/图片
      const time = new Date().getTime()
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // 兼容方式获取slice方法,slice方法可以实现文件分块
      let currentChunk = 0
      const chunkSize = this.options.chunkSize
      const chunks = Math.ceil(file.size / chunkSize) // 总分片数量
      const spark = new SparkMD5.ArrayBuffer() // 用于计算md5
      // 由于计算整个文件的Md5太慢，因此采用只计算第1块文件的md5的方式
      const chunkNumberMD5 = 1

      loadNext()

      fileReader.onload = (e) => {
        spark.append(e.target.result) // Append array buffer

        if (currentChunk < chunkNumberMD5) {
          loadNext()
        } else {
          const md5 = spark.end() // spark.end()就是文件的md5值
          file.uniqueIdentifier = md5
          file.resume() // 继续上传
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time
            } ms`
          )
        }
      }

      fileReader.onerror = function() {
        this.error(`文件${file.name}读取出错，请检查该文件`)
        file.cancel()
      }

      function loadNext() {
        const start = currentChunk * chunkSize
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
        currentChunk++
      }
    },
    close() {
      this.uploader.cancel()
    },
    error(msg) {
      this.$notify({
        title: '错误',
        message: msg,
        type: 'error',
        duration: 2000
      })
    }
  }
}
