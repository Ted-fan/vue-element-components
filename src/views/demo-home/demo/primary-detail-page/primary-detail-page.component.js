import { mapGetters } from 'vuex'
// components
import Pagination from '@/components/Pagination'
// service
import { getBasicListApi } from './primary-detail-page.service'

export default {
  name: 'primary-detail-page',
  components: { Pagination },
  data() {
    return {
      loading: false,
      basicId: '', // 主键
      editForm: {}, // 表单详情
      // 数据列表
      data: [], // 列表数据
      pageNum: 1, // 页码
      recordNum: 10, // 条数
      totalNum: 0 // 总数
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  created() {
    this.basicId = this.$route.query.basicId
    // this.getDataList();
  },
  methods: {
    // 获取列表
    getDataList() {
      this.loading = true
      const params = {
        pageNum: this.pageNum,
        recordNum: this.recordNum
      }
      getBasicListApi(params).then(res => {
        this.totalNum = Number(res.dataCount)
        this.data = res.data
        this.loading = false
      })
    }
  }
}
