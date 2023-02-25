import { mapGetters } from 'vuex'
import { getClassifyListApi, getBasicDetailApi, createOrEditBasicApi } from './create-dialog.service'
import { alertHtmlWithCallback, alertMessage, showAlertMessage } from '@/utils/utils'
export default {
  name: 'create-dialog',
  components: {},
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
      title: '数据',
      // 选择项
      typeList: [],
      brandList: [],
      // 创建/编辑弹窗
      editForm: {}, // 编辑用户表单
      editRules: {
        form1: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
          { pattern: /^[^\u4E00-\u9FFF]+$/, message: '此项限数字、字母、小数或符号', trigger: 'blur' },
          { min: 1, max: 10, message: '此项长度不可超过10位', trigger: 'blur' }
        ],
        typeObj: [
          { required: true, message: '此项为必填项', trigger: 'change' }
        ],
        form3: [
          { required: true, message: '此项为必填项', trigger: 'blur' }
        ]
      }, // 编辑表单验证规则
      defaultProps: { // 级联选择器
        label: 'name',
        value: 'id',
        children: 'children',
        emitPath: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  created() {
    // this.getClassifyList();
    if (this.basicId) {
      this.getBasicDetail()
    }
  },
  methods: {
    // 获取详情
    getBasicDetail() {
      getBasicDetailApi(this.basicId).then(res => {
        // 回显赋值
        res.data.typeObj = {
          id: res.data.typeId,
          code: res.data.typeCode
        }
        this.editForm = res.data
      })
    },

    // 获取分类列表
    getClassifyList() {
      getClassifyListApi().then(res => {
        this.typeList = res.data.typeList
        this.brandList = res.data.brandList
      })
    },

    // 选中项
    chooseBrand() {
      this.$set(this.editForm, 'form3Name', this.$refs.cascades.getCheckedNodes()[0].data.name)
    },

    // 保存
    save() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          const message = {
            form1: this.editForm.form1,
            form2: this.editForm.typeObj.code,
            form3: this.editForm.form3Name
          }
          const alertMsg = showAlertMessage(`请确认${!this.basicId ? '创建' : '编辑'}内容`, message, 18)
          alertHtmlWithCallback(alertMsg, `确认要${!this.basicId ? '创建' : '编辑'}这条信息吗?`).then(yes => {
            if (yes) {
              this.loading = true
              this.editForm.form2 = this.editForm.typeObj.id
              createOrEditBasicApi(this.editForm).then(res => {
                alertMessage(res.message)
                this.closeDialog()
                this.loading = false
                this.$emit('reload', true)
              }).catch(() => {
                this.loading = false
              })
            }
          })
        } else {
          return false
        }
      })
    },

    // 关闭dialog时需要告诉父组件隐藏弹窗
    closeDialog() {
      this.showDialog = false
      this.$emit('close', true)
    }
  }
}
