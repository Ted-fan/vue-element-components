<template>
  <div class="info" style="min-width: 120px;">
    <div class="input-item" @click="showHideScaleControl()"><label class="chbox"><input type="checkbox">比例尺</label></div>
    <div class="input-item" @click="showHideNavigationControl()"><label class="chbox"><input type="checkbox">导航条</label></div>
    <div class="input-item" @click="showHideFullScreenControl()"><label class="chbox"><input type="checkbox">全屏</label></div>
    <div class="input-item" @click="showHideMousePositionControl()"><label class="chbox"><input type="checkbox">鼠标位置</label></div>
    <div class="input-item" @click="showHideDrawControl()"><label class="chbox"><input type="checkbox">绘图控件</label></div>
  </div>
</template>

<script>
import vjmap from 'vjmap'
export default {
  name: 'ControlBar',
  inject: ['getMap'],
  methods: {
    showHideScaleControl() {
      const map = this.getMap()
      if (!map) return
      if (!this.scaleControl) {
        this.scaleControl = new vjmap.ScaleControl()
        map.addControl(this.scaleControl, 'bottom-left')
      } else {
        map.removeControl(this.scaleControl)
        this.scaleControl = null
      }
    },
    showHideNavigationControl() {
      const map = this.getMap()
      if (!this.navigationControl) {
        this.navigationControl = new vjmap.NavigationControl()
        map.addControl(this.navigationControl, 'top-right')
      } else {
        map.removeControl(this.navigationControl)
        this.navigationControl = null
      }
    },
    showHideFullScreenControl() {
      const map = this.getMap()
      if (!this.fullScreenControl) {
        this.fullScreenControl = new vjmap.FullscreenControl()
        map.addControl(this.fullScreenControl, 'bottom-right')
      } else {
        map.removeControl(this.fullScreenControl)
        this.fullScreenControl = null
      }
    },
    showHideMousePositionControl() {
      const map = this.getMap()
      if (!this.mousePositionControl) {
        this.mousePositionControl = new vjmap.MousePositionControl()
        map.addControl(this.mousePositionControl, 'top-left')
      } else {
        map.removeControl(this.mousePositionControl)
        this.mousePositionControl = null
      }
    },
    async showHideDrawControl() {
      const map = this.getMap()
      if (!this.drawControl) {
        if (typeof vjdraw !== 'object') {
          // 增加vjdraw环境
          await vjmap.addScript([{
            src: 'https://vjmap.com/demo/js/plugins/vjdraw.min.js'
          }, {
            src: 'https://vjmap.com/demo/js/plugins/vjdraw.min.css'
          }])
        }

        // eslint-disable-next-line no-undef
        const draw = new vjdraw.Draw({
          // eslint-disable-next-line no-undef
          modes: vjdraw.modes,
          // eslint-disable-next-line no-undef
          styles: vjdraw.SnapModeDrawStyles,
          userProperties: true,
          // Config snapping features
          snap: true,
          snapOptions: {
            snapPx: 15, // defaults to 15
            snapToMidPoints: true, // defaults to false
            snapVertexPriorityDistance: 0.0025 // defaults to 1.25
          },
          guides: true
        })
        // eslint-disable-next-line no-undef
        this.drawControl = new vjdraw.DrawBar({
          draw: draw
        })
        map.addControl(this.drawControl, 'top-right')
      } else {
        map.removeControl(this.drawControl)
        this.drawControl = null
      }
    }
  }
}
</script>

<style scoped>
  .info {
    padding: 12px;
    margin-bottom: 1rem;
    border-radius: 2px;
    position: fixed;
    top: 8px;
    background-color: #fff;
    width: auto;
    min-width: 150px;
    border-width: 0;
    right: 60px;
    box-shadow: 0px 2px 6px 0px rgba(97, 113, 166, 0.2);
  }
  .input-item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;

  }
  .chbox {
    position: relative;
    cursor: pointer;
    margin-bottom: 14px;
    font-size: 14px;
  }
  input[type=checkbox],
  input[type=radio] {
    box-sizing: border-box;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0 .5rem 0 0
  }

</style>
