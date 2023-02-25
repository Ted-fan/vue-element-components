// components
import Pagination from '@/components/Pagination'
// service
import { getBasicDetailApi, getBasicListApi } from './detail-dialog.service'

export default {
  name: 'detail-dialog',
  components: { Pagination },
  directives: {},
  props: {
    basicId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false, // table loading
      showDialog: true, // 是否显示弹窗
      title: '子页Title',
      // 筛选
      searchForm: {}, // 搜索内容
      confirmSearchForm: {}, // 确认提交搜索内容
      // 创建/编辑弹窗
      editForm: {}, // 编辑用户表单
      data: [], // 列表数据
      pageNum: 1, // 页码
      recordNum: 10, // 条数
      totalNum: 0 // 总数
    }
  },
  created() {
  },
  methods: {
    // 获取详情
    getBasicDetail() {
      getBasicDetailApi(this.basicId).then(res => {
        res.data.typeObj = {
          id: res.data.warehouseCategoryId,
          name: res.data.warehouseCategoryName
        }
        this.editForm = res.data
      })
    },

    // 获取列表
    getDataList() {
      this.loading = true
      const params = {
        objectId: this.basicId,
        pageNum: this.pageNum,
        recordNum: this.recordNum
      }
      getBasicListApi(params).then(res => {
        this.totalNum = Number(res.dataCount)
        this.data = res.data
        this.loading = false
      })
    },

    // 搜索列表
    search() {
      this.pageNum = 1
      this.confirmSearchForm = JSON.parse(JSON.stringify(this.searchForm))
      this.getDataList()
    },

    // 刷新列表
    onReset() {
      this.pageNum = 1
      this.confirmSearchForm = {
        queryStr: ''
      }
      this.searchForm = JSON.parse(JSON.stringify(this.confirmSearchForm))
      this.getDataList()
    },

    // 关闭dialog时需要告诉父组件隐藏弹窗
    closeDialog() {
      this.showDialog = false
      this.$emit('close', true)
    }
  }
}
