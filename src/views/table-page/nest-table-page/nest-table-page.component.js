import { mapGetters } from 'vuex'
export default {
  name: 'nest-table-page',
  components: {},
  data() {
    return {
      editForm: {
        items: [
          { itemDetails: [{ title: '', item1: '', item2: '' }], contentDetails: [{ content1: '', content2: '' }] }
        ]
      },
      editRules: {
        isValidateNull: [
          { required: true, message: '此项为必填项', trigger: 'change' }
        ]
      } // 入库单规则
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

    // 获取数据列表
    getDataList() {
    },

    // 添加项
    addItem() {
      this.editForm.items.push(this.getNewItem())
      this.$set(this.editForm, 'items', this.editForm.items)
    },

    // 移除项
    removeItem(index) {
      this.editForm.items.splice(index, 1)
    },

    // 添加内容
    add(details) {
      details.push(this.getNewRow()[0])
    },

    // 移除内容
    remove(details, index) {
      details.splice(index, 1)
    },

    //
    getNewItem() {
      return {
        itemDetails: [{ title: '', item1: '', item2: '' }],
        contentDetails: this.getNewRow()
      }
    },

    getNewRow() {
      return [{ content1: '', content2: '' }]
    }
  }
}
