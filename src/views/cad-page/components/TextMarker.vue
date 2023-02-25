<template>
  <div>
    <div class="marker marker-anchor-bottom">
      <div class="marker-tip" />
      <div class="marker-content">{{ prop.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconMarker',
  props: {
    prop: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
  .marker {
    position:absolute;
    top:0;
    left:0;
    display:flex;
    will-change:transform;
    pointer-events:none
  }

  .marker-tip {
    width:0;
    height:0;
    border:10px solid transparent;
  }

  .marker-anchor-bottom {
    flex-direction:column-reverse
  }

  .marker-anchor-bottom .marker-tip {
    align-self:center;
    border-bottom:none;
    border-top-color:#A0FFFF
  }

  .marker-content {
    position:relative;
    background:#A0FFFF;
    border-radius:3px;
    box-shadow:0 1px 2px rgba(0,0,0,.1);
    padding:1px 1px 2px;
    pointer-events:auto
  }
</style>
