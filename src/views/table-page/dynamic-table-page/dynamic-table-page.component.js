import { getSpanArr } from '@/business-service/merge-cell-service'
import { createUniqueString } from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'dynamic-table-page',
  components: {},
  data() {
    return {
      mergeColumn: ['操作', '标题', '项目1', '项目2'],
      spanArr: [], // 合并单元格
      editForm: {
        data: [
          { id: createUniqueString(), title: '', item1: '', item2: '', content1: '', content2: '' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.mergeColumn.indexOf(column.label) !== -1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
    },

    // 获取数据列表
    getDataList() {
      this.spanArr = getSpanArr(this.editForm.data, 'id')
    },

    // 添加项
    addItem() {
      this.editForm.data.push(this.getNewRow())
      this.spanArr = getSpanArr(this.editForm.data, 'id')
    },

    // 移除项
    removeItem(row) {
      this.editForm.data = this.editForm.data.filter(v => v.id !== row.id)
    },

    // 添加内容
    add(row, index) {
      const newData = JSON.parse(JSON.stringify(row))
      newData.content1 = ''
      newData.content2 = ''
      this.editForm.data.splice(index + 1, 0, newData)
      this.spanArr = getSpanArr(this.editForm.data, 'id')
    },

    // 移除内容
    remove(index) {
      this.editForm.data.splice(index, 1)
      this.spanArr = getSpanArr(this.editForm.data, 'id')
    },

    // 获取新行
    getNewRow() {
      return { id: createUniqueString(), title: '', item1: '', item2: '', content1: '', content2: '' }
    }
  }
}
