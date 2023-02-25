import Pagination from '@/components/Pagination'
export default {
  name: 'search-bar',
  components: { Pagination },
  props: {
    condition: { // 自定义条件
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      types: [], // 分类下拉
      searchForm: {}, // 搜索内容
      confirmSearchForm: {} // 确认提交搜索内容
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    // 获取分类列表
    getTypeList() {
      this.types = [
        { id: 1, text: '下拉项1' },
        { id: 2, text: '下拉项2' },
        { id: 3, text: '下拉项3' },
        { id: 4, text: '下拉项4' },
        { id: 5, text: '下拉项5' }
      ]
    },

    // 搜索列表
    search() {
      this.pageNum = 1
      this.confirmSearchForm = JSON.parse(JSON.stringify(this.searchForm))
      this.$emit('search', this.confirmSearchForm)
    },

    // 刷新列表
    onReset() {
      this.pageNum = 1
      this.confirmSearchForm = {
        queryStr: '',
        queryTypes: []
      }
      this.searchForm = JSON.parse(JSON.stringify(this.confirmSearchForm))
      this.$emit('search', this.confirmSearchForm)
    }
  }
}
