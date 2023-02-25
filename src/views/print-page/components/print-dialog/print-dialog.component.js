export default {
  name: 'print-dialog',
  components: {},
  props: {
    printHtml: { // 待打印的html
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDialog: true // 是否显示弹窗
    }
  },
  methods: {
    // 模拟赋值
    setValue() {
      this.printHtml = this.printHtml.replace('QuantityValue', '123321')
    },

    // 关闭dialog时需要告诉父组件隐藏弹窗
    closeDialog() {
      this.showDialog = false
      this.$emit('close', true)
    }
  }
}
