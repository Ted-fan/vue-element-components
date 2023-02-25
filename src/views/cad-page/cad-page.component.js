import { mapGetters } from 'vuex'
import vjmap from 'vjmap'
import 'vjmap/dist/vjmap.min.css'
// import ToolBar from './components/ToolBar.vue'
import ToolTip from './components/ToolTip.vue'
import UILayer from './components/UILayer.vue'

export default {
  name: 'cad-page',
  components: { ToolTip, UILayer },
  data() {
    return {
      map: null,
      // 弹窗
      complete: false
    }
  },
  computed: {
    ...mapGetters([
      'codesCheck'
    ])
  },
  mounted() {
    this.initMap()
  },
  provide() {
    return {
      getMap: () => this.map
    }
  },
  destroyed() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    async initMap() {
      const env = {
        serviceUrl: 'https://vjmap.com/server/api/v1',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVXNlcm5hbWUiOiJyb290MSIsIk5pY2tOYW1lIjoicm9vdDEiLCJBdXRob3JpdHlJZCI6InJvb3QiLCJCdWZmZXJUaW1lIjo4NjQwMCwiZXhwIjoxOTQyMzA1MjQxLCJpc3MiOiJ2am1hcCIsIm5iZiI6MTYyNjk0NDI0MX0.29OAA4Cnjtw780VxIxWqduLtszp1EtpSNHAmWjiL_OM',
        exampleMapId: 'sys_zp'
      }
      // 地图服务对象
      const svc = new vjmap.Service(env.serviceUrl, env.accessToken)
      // 打开地图
      const res = await svc.openMap({
        mapid: env.exampleMapId, // 地图ID
        mapopenway: vjmap.MapOpenWay.GeomRender, // 以几何数据渲染方式打开
        style: vjmap.openMapDarkStyle() // div为深色背景颜色时，这里也传深色背景样式
      })
      if (res.error) {
        // 如果打开出错
        console.error(res.error)
        return
      }
      // 获取地图范围
      const mapExtent = vjmap.GeoBounds.fromString(res.bounds)
      // 根据地图范围建立几何投影坐标系
      const prj = new vjmap.GeoProjection(mapExtent)

      // 地图对象
      const map = new vjmap.Map({
        container: 'map-container', // DIV容器ID
        style: svc.vectorStyle(), // 矢量瓦片样式
        center: prj.toLngLat(mapExtent.center()), // 设置地图中心点
        zoom: 1, // 设置地图缩放级别,
        // pitch: 0, // 倾斜角度
        renderWorldCopies: false // 不显示多屏地图
      })
      this.map = map
      // 关联服务对象和投影对象
      map.attach(svc, prj)
      // 根据地图本身范围缩放地图至全图显示
      // 使地图全部可见
      map.fitMapBounds()
      // map.fitMapBounds();
      await map.onLoad() // 等待地图加载完成
      // 获取所有图层
      const layers = svc.getMapLayers()
      // 实体类型ID和名称映射
      const { entTypeIdMap } = await svc.getConstData()
      // 创建一个popup
      this.popup = new vjmap.Popup({ offset: 15 })
      // 有高亮状态（鼠标在地图元素上时，会高亮)
      map.enableVectorLayerHoverHighlight((eventName, feature, layer) => {
        if (eventName === 'mouseleave') {
          this.popup.remove()
          return
        }
        // 点击高亮实体回调事件
        const prop = feature.properties
        if (!feature || !prop) return
        prop.layerName = layers[prop.layer].name
        prop.typeName = entTypeIdMap[prop.type]
        prop.id = feature.id
      })
    }
  }
}
