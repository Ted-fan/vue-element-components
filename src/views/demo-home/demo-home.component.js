import { mapGetters } from 'vuex'
import CreateDialog from './demo/create-dialog/create-dialog'
import DetailDialog from './demo/detail-dialog/detail-dialog'

export default {
  name: 'demo-home',
  components: { CreateDialog, DetailDialog },
  data() {
    return {
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

  },
  mounted() {
  },
  methods: {
    // 跳转到模板列表页
    moveToTablePage() {
      this.$router.push({ path: '/demo-home/table-page', query: { basicId: '111' } })
    },

    // 跳转到模板详情页
    moveToDetailPage() {
      this.$router.push({ path: '/demo-home/detail-page', query: { basicId: '111' } })
    },
    // 跳转到模板详情页
    cadDialog() {
      this.$router.push({ path: '/cad-page/cad-page', query: { basicId: '111' } })
    },

    // 打开创建/编辑弹窗
    openCreateOrEditDialog(id) {
      this.selectBasicId = id
      this.editDialogVisible = true
    },

    // 关闭新建/编辑弹窗
    closeCreateOrEditDialog() {
      this.editDialogVisible = false
    },

    // 打开详情弹窗
    openDetailDialog(id) {
      this.selectBasicId = id
      this.detailDialogVisible = true
    },

    // 关闭详情弹窗
    closeDetailDialog() {
      this.detailDialogVisible = false
    }
  }
}
