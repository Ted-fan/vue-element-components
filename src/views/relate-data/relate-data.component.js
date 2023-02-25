import { mapGetters } from 'vuex'
import RelateDataDialog from '@/business-components/relate-data-dialog/relate-data-dialog'
export default {
  name: 'relate-data',
  components: { RelateDataDialog },
  data() {
    return {
      data: [], // 列表数据
      // 弹窗
      relateDataDialogVisible: false, // 详情模态窗
      selectedData: [] // 已关联数据
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
  mounted() {
  },
  methods: {
    getDataList() {
      this.data = [
        { objectId: 1, item1: 'item1', item2: 'item2', item3: 'item3' },
        { objectId: 2, item1: 'item1', item2: 'item2', item3: 'item3' },
        { objectId: 3, item1: 'item1', item2: 'item2', item3: 'item3' }
      ]
    },

    getSelectedData() {
      this.selectedData = [
        { objectId: 1, itemA: 'itemA1', itemB: 'itemB1', itemC: 'itemC1' },
        { objectId: 2, itemA: 'itemA2', itemB: 'itemB2', itemC: 'itemC2' }
      ]
    },

    // 打开创建/编辑弹窗
    openRelateDataDialog() {
      this.getSelectedData()
      this.relateDataDialogVisible = true
    },

    // 获取关联的数据
    getRelateData(event) {
      this.selectedData = event
    },

    // 关闭新建/编辑弹窗
    closeRelateDataDialog() {
      this.relateDataDialogVisible = false
    }
  }
}
