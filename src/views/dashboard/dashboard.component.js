import PanelGroup from './components/panel-group/panel-group'
import LineChart from './components/line-chart/line-chart'
import RaddarChart from './components/raddar-chart/raddar-chart'
import PieChart from './components/pie-chart/pie-chart'
import BarChart from './components/bar-chart/bar-chart'
import TodoList from './components/TodoList'
import BoxCard from './components/box-card/box-card'
import LiquidChart from './components/liquid-chart/liquid-chart'
import BulletChart from './components/bullet-chart/bullet-chart'
import HorizontalBarChart from './components/horizontal-bar-chart/horizontal-bar-chart'

import 'echarts-liquidfill'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 161, 134, 100, 121, 105],
    actualData: [120, 82, 91, 154, 162, 140, 145, 161, 134, 105, 100, 121]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 161, 134, 105],
    actualData: [180, 160, 151, 106, 145, 150, 130, 161, 134, 105]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100, 161, 134, 105, 100, 121],
    actualData: [120, 90, 100, 138, 142, 130, 130, 161, 134, 105, 100, 121]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 161, 134, 105, 150, 160, 100, 121],
    actualData: [120, 82, 91, 154, 161, 134, 105, 162, 140, 130, 100, 121]
  }
}
export default {
  name: 'dashboard',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard,
    LiquidChart,
    BulletChart,
    HorizontalBarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  mounted() {
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }

}
