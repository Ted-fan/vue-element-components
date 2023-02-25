<template>
  <div style="z-index: 2;">
    <ControlBar />
    <ToolBar />
  </div>
</template>

<script>
import ControlBar from './ControlBar'
import ToolBar from './ToolBar'
export default {
  name: 'UILayer',
  components: {
    ControlBar,
    ToolBar
  }
}
</script>

<style scoped>

</style>
