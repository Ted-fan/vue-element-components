import { mapGetters } from 'vuex'
// components
import Pagination from '@/components/Pagination'
import CreateDialog from '../create-dialog/create-dialog'
import DetailDialog from '../detail-dialog/detail-dialog'
// service
import { getBasicListApi } from './primary-table-page.service'
import { deleteData } from '@/business-service/delete-service'

export default {
  name: 'primary-table-page',
  components: { Pagination, CreateDialog, DetailDialog },
  data() {
    return {
      loading: false,
      // 筛选
      searchForm: {}, // 搜索内容
      confirmSearchForm: {}, // 确认提交搜索内容
      // table列表分页
      checkedRows: [], // 批量选中的数据
      data: [], // 列表数据
      pageNum: 1, // 页码
      recordNum: 10, // 条数
      totalNum: 0, // 总数
      // 弹窗
      selectBasicId: '', // 选中的标准Id
      editDialogVisible: false, // 编辑模态窗
      detailDialogVisible: false // 详情模态窗
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  created() {
    // this.getDataList();
  },
  methods: {
    // 设置排序
    setIndex(index) {
      return (this.pageNum - 1) * this.recordNum + index + 1
    },

    // 获取列表
    getDataList() {
      this.loading = true
      const params = {
        queryStr: this.confirmSearchForm.queryStr,
        pageNum: this.pageNum,
        recordNum: this.recordNum
      }
      getBasicListApi(params).then(res => {
        this.totalNum = Number(res.dataCount)
        this.data = res.data
        this.loading = false
      })
    },

    // 刷新
    reload() {
      this.pageNum = 1
      this.onReset()
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

    // 打开新建、编辑窗体
    openCreateOrEditDialog(id) {
      this.selectBasicId = id
      this.editDialogVisible = true
    },

    // 关闭新建、编辑窗体
    closeCreateOrEditDialog() {
      this.editDialogVisible = false
    },

    // 打开详情弹窗
    openDetailDialog(id) {
      this.selectBasicId = id
      this.detailDialogVisible = true
    },

    closeDetailDialog() {
      this.detailDialogVisible = false
    },

    // 处理checkbox选中行数据
    handleSelectionChange(val) {
      this.checkedRows = val
    },

    // 删除单/多条选中数据
    deleteSelectedData(id, row) {
      const title = '请确认删除内容'
      const url = process.env.VUE_APP_DMS_SERVICE + 'xxx'
      let message, count, singleId, multiIds
      if (id) {
        message = { name: row.name }
        count = 1
        singleId = [id]
      } else {
        message = { name: this.checkedRows.map(v => v.materialDescription).join('&nbsp;&nbsp;') }
        count = this.checkedRows.length
        multiIds = this.checkedRows.map(v => v.objectId)
      }
      deleteData(title, message, count, singleId, multiIds, url).then(() => this.onReset())
    }
  }
}
