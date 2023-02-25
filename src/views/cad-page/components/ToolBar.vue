<template>
  <div class="input-card">
    <div class="input-item">
      <button class="btn" :disabled="isAddMarkers" @click="addMarkers()">添加随机点标记</button>
      <button class="btn" :disabled="isAddRoute" @click="addRoutes()">添加随机路径动画</button>
    </div>
    <div class="input-item">
      <button class="btn" :disabled="isFillExtrusion" @click="vectorStyleFillExtrusion()">矢量数据图层拉伸</button>
      <button class="btn" :disabled="isAddMesh" @click="vectorStyleQueryAddMesh()">查询数据并绘制物件</button>
    </div>
  </div>
</template>

<script>
import vjmap from 'vjmap'
import TextMarker from './TextMarker'
import Vue from 'vue'
export default {
  name: 'ToolBar',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TextMarker
  },
  data() {
    return {
      isAddMarkers: false,
      isAddRoute: false,
      isFillExtrusion: false,
      isAddMesh: false
    }
  },
  inject: ['getMap'],
  methods: {
    addMarkers() {
      if (this.isAddMarkers) return
      this.isAddMarkers = true
      const map = this.getMap()
      const mapBounds = map.getGeoBounds() // 得到地图地理范围
      // create the popup

      for (let i = 0; i < 15; i++) {
        const point = mapBounds.randomPoint() // 在地理范围里随机生成一个点
        if (i < 5) {
          // marker
          const marker = new vjmap.Marker({
            draggable: true,
            color: vjmap.randomColor()
          })
          marker.setLngLat(map.toLngLat(point))
          marker.addTo(map)
          // 前面5个弹出视频
          const popup = new vjmap.Popup({ closeOnClick: true, offset: 25 })
            .setHTML(`
                <video width="100%" height="100%"  controls="controls" autoplay="autoplay" muted loop>
                  <source src="https://vjmap.com/static/assets/video/butterfly.mp4" type="video/mp4" />
                </video>
            `)
          marker.setPopup(popup)
        } else if (i < 10) {
          // 后面的弹出信息框
          // 通过设置className可更新默认样式
          const marker = new vjmap.Marker({
            draggable: true,
            color: vjmap.randomColor()
          })
          marker.setLngLat(map.toLngLat(point))
          marker.addTo(map)
          const popup = new vjmap.Popup({ className: 'custom-popup', closeOnClick: true, offset: 25 })
          popup.setHTML('Marker Index' + i)
          marker.setPopup(popup)
        } else {
          // 用vue创建marker
          // 创建提示节点
          const prop = {
            title: 'Marker' + i
          }
          const textMarker = new Vue({
            ...TextMarker,
            propsData: {
              prop
            }
          }).$mount()
          const marker = new vjmap.Marker({
            element: textMarker.$el
          })
          marker.setLngLat(map.toLngLat(point))
          marker.addTo(map)
          if (i === 10) {
            // 把这个marker做个闪烁动画
            marker.setAnimation('MAP_ANIMATION_BOUNCE')
          }
        }
      }
    },
    async addRoutes() {
      if (this.isAddRoute) return
      this.isAddRoute = true
      const map = this.getMap()
      const mapBounds = map.getGeoBounds(0.3)
      const routePath = []
      // 随机加几个地图范围内的点
      routePath.push(mapBounds.min)
      routePath.push(mapBounds.center())
      routePath.push(vjmap.geoPoint([mapBounds.max.x, mapBounds.min.y]))
      routePath.push(mapBounds.max)
      routePath.push(vjmap.geoPoint([mapBounds.min.x, mapBounds.max.y]))
      routePath.push(mapBounds.min)

      // 路径线
      const routeLine = new vjmap.PolylineArrow({
        path: map.toLngLat(routePath),
        lineWidth: 10,
        showDir: true,
        lineColor: '#009EFF'
      })
      routeLine.addTo(map)

      // 实时动画轨迹线
      const realRoute = new vjmap.PolylineArrow({
        path: map.toLngLat(routePath),
        lineWidth: 10,
        showDir: true,
        showBorder: true,
        borderColor: '#f00',
        lineColor: '#FF9900'
      })
      realRoute.addTo(map)

      // 车图标
      await map.loadImageEx('carIcon', './assets/car.png')
      // 车的数据源和图层
      map.addGeoJSONSource('carSource')
      map.addSymbolLayer('carAnimate', 'carSource', {
        iconImage: 'carIcon',
        iconSize: 0.5,
        iconRotate: ['get', 'bearing'],
        iconRotationAlignment: 'map',
        iconAllowOverlap: true,
        iconIgnorePlacement: true
      })

      // 线动画
      const anim = realRoute.animate(100, 10, true, status => console.log(status), (status, context) => {
        // 动画每帧回调，在这里可以实时改变车的位置
        // 获取角度
        const angle = vjmap.geoPoint(context.endPnt).angleTo(vjmap.geoPoint(context.startPnt))
        // 生成新的数据
        const carGeoJson = vjmap.createPointGeoJson({
          point: context.endPnt,
          properties: { bearing: vjmap.radToDeg(-angle)}
        })
        // 更新车的数据
        map.setData('carSource', carGeoJson) // 更新位置
      })
      setTimeout(() => anim.stop(), 120 * 1000)// 两分钟后停止
    },
    vectorStyleFillExtrusion() {
      if (this.isFillExtrusion) return
      this.isFillExtrusion = true
      const map = this.getMap()
      const mapBounds = map.getGeoBounds()
      const len = mapBounds.width() / 40
      const darkMode = true
      // 反色设置
      const darkColor = [
        'case',
        ['==', ['get', 'color'], '#000000'],
        '#FFFFFF',
        ['get', 'color']
      ]

      const color = [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        'rgba(0,0,255,255)',
        darkMode ? darkColor : ['get', 'color']
      ]

      // 拉伸图层
      map.addFillExtrusionLayer('vector-layer-polygons', 'vector-source', {
        source: 'vector-source',
        sourceLayer: 'polygons',
        fillExtrusionColor: color,
        fillExtrusionBase: 0,
        fillExtrusionHeight: map.getProjection().toMeter(len)
      })

      map.flyTo({
        pitch: 60
      })
    },
    async vectorStyleQueryAddMesh() {
      if (this.isAddMesh) return
      this.isAddMesh = true
      const map = this.getMap()
      // 限制地图范围为全图范围，防止多屏地图显示
      map.setMaxBounds(map.toLngLat(map.getProjection().getMapExtent()))

      // 下面增加deck的图层
      if (typeof deck !== 'object') {
        // 如果没有deck环境
        await vjmap.addScript([{
          src: 'https://vjmap.com/demo/js/deck.gl.min.js'
        }, {
          src: 'https://vjmap.com/demo/js/loaders.gl/core/dist/dist.min.js'
        }, {
          src: 'https://vjmap.com/demo/js/loaders.gl/obj/dist/dist.min.js'
        }])
        // 注册加载
        // eslint-disable-next-line no-undef
        loaders.registerLoaders([loaders.OBJLoader])
      }
      const sourceId = 'vector-source'
      // 等待数据源加载完成
      const waitSourceLoaded = () => {
        return new Promise((resolve) => {
          const lister = () => {
            if (map.getSource(sourceId) && map.isSourceLoaded(sourceId)) {
              map.off('sourcedata', lister)
              resolve({})
            }
          }
          map.on('sourcedata', lister)
        })
      }

      await waitSourceLoaded()

      // 实体类型ID和名称映射
      const { entTypeIdMap } = await map.getService().getConstData()
      // 查询0图层实体类型为圆的所有实体
      const featureType = 'AcDbCircle'
      const featureTypeIndex = Object.keys(entTypeIdMap).find(e => entTypeIdMap[e] === featureType) // 结果为7
      const features = map.querySourceFeatures(sourceId, {sourceLayer: 'lines', filter: ['all', ['==', 'layer', 0], ['==', 'type', +featureTypeIndex]]})
      // 得到查询到的实体的中心点
      const points = features.map(f => {
        const geom = f.geometry.coordinates
        const pt = vjmap.GeoBounds.fromDataExtent(geom).center() // 得到中心点
        return [pt.x, pt.y]
      })

      const data = []
      for (let i = 0; i < points.length; i++) {
        data.push({
          id: i + 1,
          position: points[i],
          color: [vjmap.randInt(0, 255), vjmap.randInt(0, 255), vjmap.randInt(0, 255)],
          angle: vjmap.randInt(0, 360)
        })
      }

      const deckLayer = new vjmap.DeckLayer({
        id: 'scatterplot',
        // eslint-disable-next-line no-undef
        type: deck.SimpleMeshLayer,
        data: data,
        getPosition: d => d.position,
        mesh: './assets/Bulbasaur.obj',
        getColor: d => d.color,
        getOrientation: d => [0, d.angle, 90],
        sizeScale: 40000,
        autoHighlight: true,
        pickable: true,
        onClick: ({object}) => {
          console.log(`您点击了 Deck图层中的 第 ${object.id} 个对象`)
        }
      })
      map.addLayer(deckLayer)

      map.flyTo({center: [-61.59, 13.28], zoom: 4, pitch: 58, bearing: 112})
    }
  }
}
</script>

<style>
  .custom-popup .vjmapgis-popup-content {
    background-color: #A0FFA0;
  }

	.custom-popup .vjmapgis-popup-tip {
    border-top-color: #A0FFA0;
	}

  .input-card {
    display: flex;
    flex-direction: column;
    min-width: 276px;
    overflow-wrap: break-word;
    background-color: rgb(255, 255, 255);
    background-clip: border-box;
    min-height: 64px;
    border-width: 0px;
    border-radius: 2px;
    box-shadow: rgba(97, 113, 166, 0.2) 0px 2px 6px 0px;
    position: fixed;
    bottom: 10px;
    right: 50px;
    flex: 1 1 auto;
    padding: 12px;
  }

  .input-card > li {
    list-style: none;
  }
  .input-item {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid rgb(0, 55, 228);
    transition: color 0.15s ease-in-out 0s, background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    background-color: transparent;
    background-image: none;
    color: rgb(0, 55, 228);
    line-height: 1.5;
    border-radius: 4px;
    appearance: button;
    cursor: pointer;
    min-width: 120px;
    min-height: 36px;
    box-sizing: border-box;
    font-size: 14px;
    margin-right: 8px;
    margin-top: 8px;
    margin-left: 18px;
  }

  .btn:nth-child(2n) {
    margin-right: 0px;
  }

  .btn-active {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 55, 228);
    border-color: rgb(0, 55, 228);
  }

  .mr0 {
    margin-right: 0px;
  }

  .btn-full {
    width: 100%;
  }

  .btn:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 55, 228);
    border-color: rgb(0, 55, 228);
  }

  .btn:hover {
    text-decoration: none;
  }

</style>
