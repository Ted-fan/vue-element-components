import { mapGetters } from 'vuex'
export default {
  name: 'form-table-page',
  components: {},
  data() {
    return {
      editForm: {
        data: []
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
      this.editForm.data = []
    },

    // 添加项
    addItem() {
      const item = { item1: '', item2: '', item3: '' }
      this.editForm.data.push(item)
    },

    // 移除项
    removeItem(index) {
      this.editForm.data.splice(index, 1)
    },

    // 保存
    save() {
      this.$refs.dataForm.validate((valid) => {
        console.log(valid)
      })
    }
  }
}
