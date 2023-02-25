/* eslint-disable space-before-function-paren */
import BpmnModeler from 'bpmn-js/lib/Modeler'
import DefaultEmptyXML from './components/bpmn-xml'
import convert from 'xml-js'
import customPalette from './components/palette'
import customTranslate from './components/translate/customTranslate'
// 翻译方法
import translationsCN from './components/translate/zh'
export default {
  name: 'bnpm-page',
  components: {},
  data() {
    return {
      bpmnModeler: null,
      defaultZoom: 1,
      previewModelVisible: false,
      previewResult: '',
      recoverable: false,
      revocable: false,
      events: ['element.click'],

      // 预览表格
      previewTableVisible: false,
      headers: [],
      data: []
    }
  },
  created() {
    this.getTableHeader()
  },
  mounted() {
    this.getInitBpmnModeler()
    this.$once('hook:beforeDestroy', () => {
      if (this.bpmnModeler) this.bpmnModeler.destroy()
      this.$emit('destroy', this.bpmnModeler)
      this.bpmnModeler = null
    })
  },
  methods: {
    // 获取初始化Bpmn
    getInitBpmnModeler() {
      const initXML = ``
      this.initBpmnModeler()
      this.createNewDiagram(initXML)
    },

    additionalModules() {
      const Modules = [customPalette]
      // 翻译模块
      const TranslateModule = {
        translate: ['value', customTranslate(translationsCN)]
      }
      Modules.push(TranslateModule)
      return Modules
    },

    // 初始化Bpmn模板
    initBpmnModeler() {
      if (this.bpmnModeler) return
      this.bpmnModeler = new BpmnModeler({
        container: this.$refs['bpmn-canvas'],
        additionalModules: this.additionalModules()
      })
      this.$emit('init-finished', this.bpmnModeler)
      this.initModelListeners()
    },

    // 创建图表
    createNewDiagram(xml) {
      // 将字符串转换成图显示出来
      const xmlString = xml || DefaultEmptyXML(new Date().getTime(), '审批流程', 'camunda')
      this.bpmnModeler.importXML(xmlString).then(result => { }).catch(e => {
        console.error(e)
      })
    },

    // 初始化模板监听
    initModelListeners() {
      const EventBus = this.bpmnModeler.get('eventBus')
      const that = this
      // 注册需要的监听事件, 将. 替换为 - , 避免解析异常
      this.events.forEach(event => {
        EventBus.on(event, function(eventObj) {
          const eventName = event.replace(/\./g, '-')
          const element = eventObj ? eventObj.element : null
          that.$emit(eventName, element, eventObj)
        })
      })
      // 监听图形改变返回xml
      EventBus.on('commandStack.changed', async () => {
        try {
          this.recoverable = this.bpmnModeler.get('commandStack').canRedo()
          this.revocable = this.bpmnModeler.get('commandStack').canUndo()
          const { xml } = await this.bpmnModeler.saveXML({ format: true })
          this.$emit('input', xml)
          this.$emit('change', xml)
        } catch (e) {
          console.error(e)
        }
      })
      // 监听视图缩放变化
      this.bpmnModeler.on('canvas.viewbox.changed', e => {
        this.defaultZoom = Math.floor(e.viewbox.scale * 100) / 100
        this.currentScale = Math.floor(this.defaultZoom * 100) + '%'
      })
    },

    // 预览JSON
    previewProcessJson() {
      this.bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
        this.previewResult = convert.xml2json(xml, { spaces: 2 })
        this.previewType = 'json'
        this.previewModelVisible = true
      })
    },

    // 预览XML
    previewProcessXML() {
      this.bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
        this.previewResult = xml
        this.previewType = 'xml'
        this.previewModelVisible = true
      })
    },

    // 预览配置表格
    previewTable() {
      this.previewTableVisible = true
    },

    // 获取表格表头
    getTableHeader() {
      this.headers = [
        { 'key': 'title', 'value': '' },
        { 'key': 'Event_0w6e0v7', 'value': '开始' },
        { 'key': 'Activity_0fpfwe6', 'value': '部门经理' },
        { 'key': 'Activity_0ky60t8', 'value': '仓管员发料' },
        { 'key': 'Activity_0tq6p6x', 'value': '维修经理审批' },
        { 'key': 'Event_0l9s92c', 'value': '完成' }
      ]
      this.getTableData()
    },

    getTableData() {
      this.data = [
        {
          'title': '开始',
          'Event_0w6e0v7': '',
          'Activity_0fpfwe6': 'activityId(主键)',
          'Activity_0ky60t8': '',
          'Activity_0tq6p6x': '',
          'Event_0l9s92c': ''
        },
        {
          'title': '部门经理',
          'Event_0w6e0v7': '',
          'Activity_0fpfwe6': '',
          'Activity_0ky60t8': '',
          'Activity_0tq6p6x': 'activityId(主键)',
          'Event_0l9s92c': ''
        }
      ]
    }
  }
}
