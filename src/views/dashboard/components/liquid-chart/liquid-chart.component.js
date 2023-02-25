import { Liquid } from '@antv/g2plot'

export default {
  components: {},
  data() {
    return {
      liquidList: [
        {
          id: 'delay',
          title: '已逾期',
          color: '#d62728'
        },
        {
          id: 'pending',
          title: '待处理',
          color: '#FAAD14'
        },
        {
          id: 'processing',
          title: '进行中',
          color: '#5B8FF9'
        },
        {
          id: 'done',
          title: '已完成',
          color: '#2ca02c'
        }
      ]
    }
  },
  mounted() {
    this.initLiquidComponent()
  },
  methods: {
    // 水波图
    initLiquidComponent() {
      this.liquidList.forEach((ele, index) => {
        const liquidPlot = new Liquid(document.getElementById(ele.id), {
          percent: 0.18 * (index + 1),
          outline: {
            border: 4,
            distance: 8
          },
          radius: 0.8,
          wave: {
            length: 128
          },
          statistic: {
            title: {
              formatter: () => ele.title,
              style: ({ percent }) => ({
                fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)'
              })
            }
          },
          color: ele.color
        })
        liquidPlot.render()
      })
    }
  }
}
