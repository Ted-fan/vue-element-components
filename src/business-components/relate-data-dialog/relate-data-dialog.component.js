// component
import Pagination from '@/components/Pagination'
// service
import { alertMessage, alertHtmlWithCallback, showAlertMessage } from '@/utils/utils'
// import { getBasicListApi } from './relate-data-dialog.service'

export default {
  name: 'relate-data-dialog',
  components: { Pagination },
  props: {
    multipleBaseSelection: { // 已关联工序的设备列表数组
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showDialog: true, // 是否显示弹窗
      // 筛选
      searchForm: {}, // 搜索内容
      confirmSearchForm: {}, // 确认提交搜索内容
      // table列表分页
      data: [], // 列表数据
      pageNum: 1, // 页码
      recordNum: 10, // 条数
      totalNum: 0, // 总数
      selectData: [] // 已关联数据
    }
  },
  created() {
    this.selectData = JSON.parse(JSON.stringify(this.multipleBaseSelection))
    console.log(this.selectData)
    this.getDataList()
  },
  methods: {
    // 渲染选中后 行效果
    tableRowClassName({ row }) {
      const selection = this.$refs.multipleBaseTable.selection.map(v => v.objectId)
      if (selection.includes(row.objectId)) {
        return 'selected-row'
      }
    },

    // 设置排序
    setIndex(index) {
      return (this.pageNum - 1) * this.recordNum + index + 1
    },

    // 获取所有设备数据列表（未关联工序）
    getDataList() {
      setTimeout(() => {
        this.totalNum = 6
        this.data = [
          { objectId: 1, itemA: 'itemA1', itemB: 'itemB1', itemC: 'itemC1' },
          { objectId: 2, itemA: 'itemA2', itemB: 'itemB2', itemC: 'itemC2' },
          { objectId: 3, itemA: 'itemA3', itemB: 'itemB3', itemC: 'itemC3' },
          { objectId: 4, itemA: 'itemA4', itemB: 'itemB4', itemC: 'itemC4' },
          { objectId: 5, itemA: 'itemA5', itemB: 'itemB5', itemC: 'itemC5' },
          { objectId: 6, itemA: 'itemA6', itemB: 'itemB6', itemC: 'itemC6' }
        ]
        this.$nextTick(() => {
          this.setBackData()
        })
      }, 1000)

      // 调用接口时解开下方注释
      /* const params = {
        queryStr: this.confirmSearchForm.queryStr,
        pageNum: this.pageNum,
        recordNum: this.recordNum
      }
      getBasicListApi(params).then(res => {
        this.totalNum = Number(res.dataCount)
        this.data = res.data
        this.$nextTick(() => {
          this.setBackData()
        })
      }) */
    },

    // 回显table(关联数据和所有数据进行比对，重复的就设置选中状态)
    setBackData() {
      this.data.forEach(element => {
        this.selectData.forEach(item => {
          if (element.objectId === item.objectId) {
            this.$refs.multipleBaseTable.toggleRowSelection(element, true)
          }
        })
      })
    },

    // 处理checkbox选中行数据
    handleBaseSelectionChange(rows, row) {
      const selected = rows.length && rows.indexOf(row) !== -1
      if (selected) {
        this.selectData.push(row)
      } else {
        this.selectData = this.selectData.filter(x => x.objectId !== row.objectId)
      }
    },

    // 全选
    handleBaseSelectionAll(val) {
      if (val.length === 0) { // 反选
        this.selectData = this.selectData.filter(item => !this.data.some(ele => ele.objectId === item.objectId))
      } else { // 正选
        if (this.selectData.length === 0) { // 未有任何选中项
          this.selectData = val
        } else { // 有选中项id
          const obj = {}
          this.selectData = [...this.selectData, ...val].reduce((cur, next) => {
            obj[next.objectId] ? '' : obj[next.objectId] = true && cur.push(next)
            return cur
          }, [])
        }
      }
    },

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

    // 保存
    save() {
      if (this.selectData.length <= 0) {
        alertMessage('您尚未选中任何数据', 'warning')
      }
      const message = {
        name: this.selectData.map(v => v.itemA).join('&nbsp;&nbsp;')
      }
      const alertMsg = showAlertMessage(`请确认要添加的数据`, message)
      alertHtmlWithCallback(alertMsg, `确认要添加所选数据吗？`).then(() => {
        this.$emit('select', this.selectData)
        this.showDialog = false
      })
    },

    // 关闭dialog时需要告诉父组件隐藏弹窗
    closeDialog() {
      this.showDialog = false
      this.$emit('close', true)
    }
  }
}
