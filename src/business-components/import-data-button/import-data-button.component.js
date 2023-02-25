import { getToken } from '@/utils/auth'
import { exportDataToFile, alertMessage } from '@/utils/utils'
export default {
  name: 'import-data-button',
  components: {},
  props: {
    buttonText: { // 按钮文本
      type: String,
      default: ''
    },
    downloadText: { // 下载按钮文本
      type: String,
      default: ''
    },
    importText: { // 导入按钮文本
      type: String,
      default: ''
    },
    fileName: { // 下载模板文件名
      type: String,
      default: ''
    },
    downloadAction: { // 下载接口路径
      type: String,
      default: ''
    },
    uploadAction: { // 上传接口路径
      type: String,
      default: ''
    },
    uploadFileType: { // 上传文件类型
      type: Array,
      default: []
    },
    paramObj: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      headerObj: {
        token: getToken()
      },
      import_file_url: process.env.VUE_APP_BASE_API + process.env.VUE_APP_DMS_SERVICE // 导入文件路径
    }
  },
  created() {
  },

  methods: {
    // 导入按钮下拉框事件
    handleCommand(command) {
      if (command === 'download') {
        const url = process.env.VUE_APP_DMS_SERVICE + this.downloadAction
        exportDataToFile(this.fileName, url).then(res => { })
      }
    },

    // 限制上传文件格式
    beforeFileUpload(file) {
      const isPassValidate = this.uploadFileType.indexOf(file.type) !== -1
      if (!isPassValidate) {
        this.$message.error('上传文件仅支持 Excel !')
      }
      return isPassValidate
    },

    // 导入数据
    handleFileSuccess(res) {
      if (res.code === '500') {
        this.$refs.upload.clearFiles()
        alertMessage(res.message, 'error')
        return
      }
      this.$emit('reload', true)
    }
  }
}
