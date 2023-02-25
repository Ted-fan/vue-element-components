import draggable from 'vuedraggable'
import VueDragResize from 'vue-drag-resize'
import PrintDialog from './components/print-dialog/print-dialog'
export default {
  name: 'print-page',
  components: { draggable, VueDragResize, PrintDialog },
  data() {
    return {
      // 拖拽
      componentsList: [], // 组件列表
      businessList: [], // 业务模板
      currentIndex: '', // 获取当前选中的业务组件下标
      printDialogVisible: false, // 预览弹窗
      printHtml: '' // 打印html
    }
  },
  mounted() {
    // 初始化组件库
    this.componentsList = [
      { name: '矩形', title: '', type: 'rect', width: 80, height: 50, active: false },
      { name: 'Quantity', title: 'Quantity:', type: 'text', height: 20, sign: 'QuantityValue', style: { 'font-weight': 900 }, active: false }
    ]
    // 添加删除按键的监听事件,用于删掉画布已添加的组件
    document.addEventListener('keydown', (el) => {
      if (el.key === 'Delete' && this.businessList[this.currentIndex].active) {
        this.businessList.splice(this.currentIndex, 1)
      }
    })
  },
  methods: {
    // 添加画布业务组件
    addBusiness(event) {
      this.businessList.push(JSON.parse(JSON.stringify(event)))
    },

    // 缩放元素
    resize(item, event) {
      this.$set(item, 'height', event.height)
      this.$set(item, 'width', event.width)
    },

    // 激活/关闭元素
    onActivated(item, index) {
      this.currentIndex = index
      this.$set(item, 'active', !item.active)
    },

    // 预览
    exportWeb() {
      this.businessList.forEach(element => {
        this.$set(element, 'active', false)
      })
      setTimeout(() => {
        this.printDialogVisible = true
        this.printHtml = this.$refs.modal.innerHTML
      }, 1000)
    },

    closePrintDialog() {
      this.printDialogVisible = false
    }
  }
}
