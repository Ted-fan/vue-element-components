import 'echarts-liquidfill'
import VeLine from 'v-charts/lib/line.common'
import VeScatter from 'v-charts/lib/scatter.common'
import { Liquid } from '@antv/g2plot'
import { Bar, G2 } from '@antv/g2plot'
import { Bullet } from '@antv/g2plot'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'

export default {
  name: 'dashboard',
  components: {
    VeLine,
    VeScatter
  },
  data() {
    return {
      showTitleList: [
        {
          id: 'schedule',
          title: '待办事项',
          color: '#d62728'
        },
        {
          id: 'systemMessages',
          title: '系统消息',
          color: '#FAAD14'
        },
        {
          id: 'codeCount',
          title: '代码量',
          color: '#2ca02c'
        },
        {
          id: 'tasksCount',
          title: '任务量',
          color: '#5B8FF9'
        }
      ],
      info: {
        tasks: parseFloat(12).toLocaleString(),
        message: parseFloat(6).toLocaleString(),
        code: parseFloat(5234).toLocaleString(),
        weather: '深圳，26℃，多云'
      },
      user: {
        name: '林锦泽',
        loginTime: '2022-11-20 12:00:00',
        loginIp: '172.28.12.34',
        lastTime: '2018-01-01 12:00:00',
        lastIp: '172.28.12.34'
      },
      chartData1: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      chartSettings1: {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      },
      chartData2: {
        columns: ['日期', '访问用户', '下单用户', '年龄'],
        rows: {
          '上海': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
            { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
            { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
          ],
          '北京': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1273, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
            { '日期': '1/4', '访问用户': 2123, '年龄': 9, '下单用户': 3245 },
            { '日期': '1/5', '访问用户': 4103, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/6', '访问用户': 7123, '年龄': 10, '下单用户': 3567 }
          ],
          '广州': [
            { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
            { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
            { '日期': '1/3', '访问用户': 2123, '年龄': 30, '下单用户': 3245 },
            { '日期': '1/5', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
            { '日期': '1/4', '访问用户': 5123, '年龄': 18, '下单用户': 4564 },
            { '日期': '1/6', '访问用户': 3843, '年龄': 30, '下单用户': 4850 }
          ]
        }
      },
      chartSettings2: {
        dimension: '日期',
        metrics: ['年龄', '下单用户']
      },
      tableData2: [{
        date: '2013-07-21',
        name: '张三',
        address: '你是我的小苹果'
      }, {
        date: '2014-12-24',
        name: '李四',
        address: '怎么爱你都不嫌多'
      }, {
        date: '2017-07-01',
        name: '王五',
        address: '有了滑板鞋'
      }, {
        date: '2018-09-03',
        name: '666',
        address: '天黑都不怕'
      }]
    }
  },
  mounted() {
    this.initComponent()
    this.registerAnimation()
    this.bulletPlot()
    this.pie()
    this.chartCfg()
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },

    // 水波图
    initComponent() {
      this.showTitleList.forEach(ele => {
        const liquidPlot = new Liquid(document.getElementById(ele.id), {
          percent: 0.25,
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
    },

    // 动态条形图
    registerAnimation() {
      // 背景动效的时间 ms
      const BLINK_TIME = 1600
      // 动效间隔时间 ms
      const BLIANK_INTERVAL_TIME = 400
      // 动效贝塞尔曲线 缓动缓动缓动缓动缓动缓动
      const BLINK_BEZIER = 'cubic-bezier(0.65,0,1,1)'
      // 动效宽度 px
      const BLINK_WIDTH = 64
      // 颜色
      const blinkFill = `l(0) 0:rgba(255,255,255,0) .5:rgba(255,255,255,0.24) 1:rgba(255,255,255,0)`

      // 初始 动画时间 ms
      const APPEAR_TIME = 200

      // 动效缓动规则
      const BLIANK_EASING = 'easeLinear'

      // 更新 每次动画时间 ms
      const UPDATE_TIME = 800

      // 数据更新间隔时间 ms
      const DATA_UPDATE = 3000

      function threeBezier(t, cp1, cp2) {
        const [x1, y1] = [0, 0]
        const [x2, y2] = [1, 1]
        const [cx1, cy1] = cp1
        const [cx2, cy2] = cp2
        const x =
          x1 * (1 - t) * (1 - t) * (1 - t) + 3 * cx1 * t * (1 - t) * (1 - t) + 3 * cx2 * t * t * (1 - t) + x2 * t * t * t
        const y =
          y1 * (1 - t) * (1 - t) * (1 - t) + 3 * cy1 * t * (1 - t) * (1 - t) + 3 * cy2 * t * t * (1 - t) + y2 * t * t * t
        return [x, y]
      }

      function getBezier(BezierString) {
        const p1 = []
        const p2 = []
        BezierString.replace(/(\d|\.)+/g, (v) => {
          p1.length === 2 ? p2.push(Number(v)) : p1.push(Number(v))
        })
        return [p1, p2]
      }

      G2.registerAnimation('label-appear', (element, animateCfg, cfg) => {
        const label = element.getChildren()[0]
        const coordinate = cfg.coordinate
        const startX = coordinate.start.x
        const finalX = label.attr('x')
        const labelContent = label.attr('text')

        label.attr('x', startX)
        label.attr('text', 0)

        const distance = finalX - startX
        label.animate((ratio) => {
          const position = startX + distance * ratio
          const text = (labelContent * ratio).toFixed(0)

          return {
            x: position,
            text
          }
        }, animateCfg)
      })

      G2.registerAnimation('label-update', (element, animateCfg, cfg) => {
        const startX = element.attr('x')
        // @ts-ignore
        const finalX = cfg.toAttrs.x
        const labelContent = element.attr('text')
        // @ts-ignore
        const finalContent = cfg.toAttrs.text

        const distanceX = finalX - startX
        const numberDiff = +finalContent - +labelContent

        element.animate(
          (ratio) => {
            const positionX = startX + distanceX * ratio
            const text = (+labelContent + numberDiff * ratio).toFixed(0)
            return {
              x: positionX,
              text
            }
          },
          {
            ...animateCfg,
            duration: UPDATE_TIME
          }
        )
      })

      G2.registerAnimation('element-update', (element, animateCfg, cfg) => {
        if (element.cfg.name !== 'interval') return
        const nowPath = element.attr('path')
        const toPath = cfg.toAttrs.path
        const toWidth = toPath[1][1] - nowPath[1][1]

        const path = toPath
        // 宽度更新
        element.animate((ratio) => {
          // 当前变化的宽度
          const changeWidth = ratio * toWidth
          path[1][1] = nowPath[1][1] + changeWidth
          path[2][1] = nowPath[2][1] + changeWidth

          return {
            path
          }
        }, animateCfg)
      })

      function getRectPath(points, isClosed = true) {
        const path = []
        const firstPoint = points[0]
        path.push(['M', firstPoint.x, firstPoint.y])
        for (let i = 1, len = points.length; i < len; i++) {
          path.push(['L', points[i].x, points[i].y])
        }
        // 对于 shape="line" path 不应该闭合，否则会造成 lineCap 绘图属性失效
        if (isClosed) {
          path.push(['L', firstPoint.x, firstPoint.y]) // 需要闭合
          path.push(['z'])
        }
        return path
      }

      const [p1, p2] = getBezier(BLINK_BEZIER)

      function blinkShapeAnimate(shape, delay) {
        shape.animate(
          (radio) => {
            const blinkRadio = threeBezier(radio, p1, p2)[1]

            const path = shape.getParent().findAllByName('interval')[0].attr('path')
            const toWidth = path[1][1] - path[0][1] + BLINK_WIDTH

            const width = toWidth * blinkRadio
            const x = path[0][1]

            return {
              width: blinkRadio === 1 ? 0 : Math.min(width, BLINK_WIDTH),
              x: width <= BLINK_WIDTH ? x : x + width - BLINK_WIDTH
            }
          },
          {
            delay,
            duration: BLINK_TIME,
            callback: () => {
              blinkShapeAnimate(shape, BLIANK_INTERVAL_TIME)
            }
          }
        )
      }

      G2.registerShape('interval', 'blink-interval', {
        draw(cfg, container) {
          const group = container.addGroup()

          const path = this.parsePath(getRectPath(cfg.points))
          const { color, style = {}, defaultStyle } = cfg
          const height = path[2][2] - path[1][2]
          const x = path[0][1]
          const y = path[0][2]
          const fillColor = color || style.fill || defaultStyle.fill
          group.addShape('path', {
            attrs: {
              ...style,
              path,
              fill: fillColor,
              x,
              y
            },
            name: 'interval'
          })

          const blinkShape = group.addShape('rect', {
            attrs: {
              x,
              y,
              width: 0,
              height,
              // ✅ 主色到 30% 透明的白色渐变
              fill: blinkFill
            },
            name: `blink-interval-${cfg.data.animateKey}`
          })

          blinkShapeAnimate(blinkShape, 0)

          return group
        }
      })

      let year = 1981

      let data = [
        { year: `${year}年`, value: 266, type: '任务1' },
        { year: `${year}年`, value: 252, type: '任务2' },
        { year: `${year}年`, value: 161, type: '任务3' },
        { year: `${year}年`, value: 100, type: '任务4' },
        { year: `${year}年`, value: 90, type: '任务5' },
        { year: `${year}年`, value: 88, type: '任务6' },
        { year: `${year}年`, value: 10, type: '任务7' },
        { year: `${year}年`, value: 5, type: '任务8' },
        { year: `${year}年`, value: 0, type: '任务9' },
        { year: `${year}年`, value: 0, type: '任务10' }
      ]

      function processData(data, yField) {
        return data.map((item) => ({
          animateKey: item[yField],
          ...item
        }))
      }

      const newData = processData(data, 'type')

      const bar = new Bar('registerAnimation', {
        data: newData,
        xField: 'value',
        yField: 'type',
        padding: [10, 40, 30, 50],
        legend: false,
        label: {
          position: 'right',
          animate: {
            appear: {
              animation: 'label-appear',
              delay: 0,
              duration: APPEAR_TIME,
              easing: BLIANK_EASING
            },
            update: {
              animation: 'label-update',
              duration: UPDATE_TIME,
              easing: BLIANK_EASING
            }
          }
        },
        shape: 'blink-interval',
        yAxis: {
          nice: false
        },
        barStyle: {
          fillOpacity: 0.9
        },
        animation: {
          appear: {
            duration: APPEAR_TIME,
            easing: BLIANK_EASING
          },
          update: {
            animation: 'element-update',
            duration: UPDATE_TIME,
            easing: BLIANK_EASING
          }
        }
      })

      bar.render()

      function updateData() {
        year++
        data = data.map(({ type, value }) => ({
          type,
          year: `${year}年`,
          value: value + Math.floor(Math.random() * 50)
        }))

        setTimeout(() => {
          bar.changeData(processData(data, 'type'))

          if (year !== 2003) {
            updateData()
          }
        }, DATA_UPDATE)
      }

      updateData()
    },

    // 分组子弹图
    bulletPlot() {
      const data = [
        {
          title: '重庆',
          ranges: [30, 90, 120],
          measures: [65],
          target: 80
        },
        {
          title: '杭州',
          ranges: [30, 90, 120],
          measures: [50],
          target: 100
        },
        {
          title: '广州',
          ranges: [30, 90, 120],
          measures: [40],
          target: 85
        },
        {
          title: '深圳',
          ranges: [30, 90, 120],
          measures: [50],
          target: 100
        }
      ]

      const bulletPlot = new Bullet('bullet', {
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
          range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
          measure: '#5B8FF9',
          target: '#39a3f4'
        },
        label: {
          measure: {
            position: 'middle',
            style: {
              fill: '#fff'
            }
          }
        },
        xAxis: {
          line: null
        },
        yAxis: false,
        // 自定义 legend
        legend: {
          custom: true,
          position: 'bottom',
          items: [
            {
              value: '差',
              name: '差',
              marker: { symbol: 'square', style: { fill: '#FFbcb8', r: 5 } }
            },
            {
              value: '良',
              name: '良',
              marker: { symbol: 'square', style: { fill: '#FFe0b0', r: 5 } }
            },
            {
              value: '优',
              name: '优',
              marker: { symbol: 'square', style: { fill: '#bfeec8', r: 5 } }
            },
            {
              value: '实际值',
              name: '实际值',
              marker: { symbol: 'square', style: { fill: '#5B8FF9', r: 5 } }
            },
            {
              value: '目标值',
              name: '目标值',
              marker: { symbol: 'line', style: { stroke: '#39a3f4', r: 5 } }
            }
          ]
        }
      })

      bulletPlot.render()
    },

    // 饼图
    pie() {
      const data = [
        { item: '任务一', count: 40, percent: 0.4 },
        { item: '任务二', count: 21, percent: 0.21 },
        { item: '任务三', count: 17, percent: 0.17 },
        { item: '任务四', count: 13, percent: 0.13 },
        { item: '任务五', count: 9, percent: 0.09 }
      ]

      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500
      })

      chart.data(data)

      chart.coordinate('theta', {
        radius: 0.85
      })

      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%'
          return val
        }
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.axis(false) // 关闭坐标轴
      const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff'
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%'
          return {
            name: item,
            value: percent
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.interaction('element-single-selected')
      chart.render()

      // 默认选择
      interval.elements[0].setState('selected', true)
    },

    // 径向堆叠条形图
    chartCfg() {
      const data = [
        { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
        { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
        { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
        { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
        { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 }
      ]

      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'], // 展开字段集
        key: '年龄段', // key字段
        value: '人口数量', // value字段
        retains: ['State'] // 保留字段集，默认为除fields以外的所有字段
      })
      // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}

      const chart = new Chart({
        container: 'chartCfg',
        autoFit: true,
        height: 500
      })

      chart.coordinate('polar').transpose()

      chart.data(dv.rows)
      chart.scale('人口数量', {
        max: 200000,
        tickCount: 10
      })

      chart.axis('State', {
        label: {
          offset: 12
        },
        tickLine: {
          alignTick: false
        },
        grid: null,
        line: {
          style: {
            stroke: '#595959'
          }
        }
      })
      chart.axis('人口数量', {
        grid: {
          line: {
            style: {
              lineDash: [4, 4]
            }
          }
        }
      })

      chart.tooltip({
        shared: true,
        showMarkers: false
      })

      chart.legend({
        marker: {
          symbol: 'square',
          style: {
            r: 5
          }
        }
      })

      chart
        .interval()
        .adjust('stack')
        .position('State*人口数量')
        .color('年龄段')

      chart.interaction('element-highlight-by-x')

      chart.render()
    }
  }
}
