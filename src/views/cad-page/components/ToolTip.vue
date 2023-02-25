<template>
  <div :id="'tooltip-'+prop.id">
    <strong>实体ID:</strong> {{ prop.id }}
    <br>
    <strong>图层名称:</strong> {{ prop.layerName }}
    <br>
    <strong>实体类型:</strong> {{ prop.typeName }}
    <br>
    <strong>实体颜色:</strong>
    <font :color="prop.color">{{ prop.color }}</font>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    prop: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
