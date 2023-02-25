import { mapGetters } from 'vuex'
import CommonTitle from '@/business-components/common-title/common-title'
import ImportDataButton from '@/business-components/import-data-button/import-data-button'
import SearchBar from '@/business-components/search-bar/search-bar'
import UploadFile from '@/business-components/upload-file/upload-file'
import { dateFormat } from '@/utils/date-helper'
export default {
  name: 'common-page',
  components: { CommonTitle, ImportDataButton, SearchBar, UploadFile },
  data() {
    return {
      // search-bar
      pageNum: 1, // 页码
      confirmSearchForm: {}, // 搜索内容
      data: [],
      // file-upload
      originFileList: [], // 文件列表
      // calendar
      calendarMonth: new Date(), // 日历当月
      scheduleData: [] // 日历日程
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  created() {
    this.getScheduleData()
  },
  mounted() {
  },
  methods: {
    // import-data-button 导入导出 重置
    onReset() {
      this.getDataList()
    },

    // search-bar 搜索列表
    search(event) {
      this.pageNum = 1
      this.confirmSearchForm = JSON.parse(JSON.stringify(event))
      this.getDataList()
    },

    // upload-file 上传文件
    getFiles(files) {
      this.originFileList = files
    },

    // 获取数据列表
    getDataList() {
      this.data = []
    },

    getScheduleData() {
      this.scheduleData = [
        {
          workingDay: dateFormat(new Date(), 'yyyy-MM-dd'),
          content: { notice: '这是紧急事项', type: 'important' }
        }
      ]
    },

    clickDate(date) {
      console.log(date)
    }
  }
}
