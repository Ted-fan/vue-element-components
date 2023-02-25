export default {
  name: 'upload-file',
  components: {},
  props: {
    title: { // 题目
      type: String,
      default: ''
    },
    description: { // 描述
      type: String,
      default: ''
    },
    actionUrl: { // 上传接口路径
      type: String,
      default: process.env.VUE_APP_FILE_URL + '/file/upload'
    },
    headers: { // 自定义请求头
      type: Object,
      default: () => { }
    },
    limitType: { // 限制文件类型
      type: Array,
      default: () => ['image/jpeg', 'image/png', 'application/pdf']
    },
    limitMsg: { // 限制文件类型提示语
      type: String,
      default: '上传文件仅支持 JPG/PNG/PDF 格式!'
    },
    originFileList: { // 原始文件列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  created() {
    console.log(this.actionUrl)
  },
  watch: {
    originFileList(newValue) {
      this.fileList = JSON.parse(JSON.stringify(newValue))
    }
  },
  methods: {
    // 限制上传文件格式
    beforeFileUpload(file) {
      const isPassValidate = this.limitType.indexOf(file.type) > -1
      if (!isPassValidate) {
        this.$message.error(this.limitMsg)
      }
      return isPassValidate
    },

    // 上传文件
    handleFileSuccess(res, file, fileList) {
      const files = []
      for (let i = 0; i < fileList.length; i++) {
        fileList[i].name = this.checkRepeatFile(files, fileList[i].name, fileList[i].name)
      }
      this.fileList = fileList
      this.$emit('files', fileList)
    },

    // 校验重复文件
    checkRepeatFile(arr, name, originName) {
      if (arr.indexOf(name) === -1) {
        arr.push(name)
      } else {
        let idx = 1
        name = `${originName.split('.')[0]}(${idx}).${originName.split('.')[1]}`
        while (arr.indexOf(name) !== -1) {
          name = `${originName.split('.')[0]}(${idx++}).${originName.split('.')[1]}`
        }
        arr.push(name)
      }
      return name
    },

    // 移除文件
    handleFileRemove(file, fileList) {
      this.$emit('files', fileList)
    }
  }
}
