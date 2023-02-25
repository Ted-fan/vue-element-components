// import { deleteFile } from '@/utils/uploadBigFile/uploadFile'
import UploadBigFile from '@/business-components/upload-big-file/upload-big-file'

export default {
  name: 'Basetable',
  components: {
    UploadBigFile
  },
  data() {
    return {
      originFileList: [], // 文件列表
      idShow: false
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    // 获取文件列表
    getFiles(files) {
      this.originFileList = files
      console.log(this.originFileList)
    },
    // 删除操作
    handleDelete(index, row) {
      console.log(index, row)
      /* const params = {
        id: row.objectId // 参数id为该条数据的objectId
      } */
      // deleteFile(params).then(res => {
      // if (res.data > 0) {
      this.$message.success('删除成功')
      this.originFileList.splice(index, 1)
      // }
      // })
    },
    // 下载文件
    async handleDownload(index, row) {
      console.log(row)
      this.loadingOverLay = this.$loading({
        lock: true,
        text: '文件生成中',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      })
      var elemIF = document.createElement('iframe')
      elemIF.src = process.env.VUE_APP_FILE_API + '/uploader/download?id=' + row.id + '&filename=' + row.filename + '&location=' + row.location
      console.log(elemIF.src)
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
      this.loadingOverLay.close()
    }
  }
}
