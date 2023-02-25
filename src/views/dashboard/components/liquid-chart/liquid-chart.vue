<!--代码逻辑和样式库-->
<script src="./liquid-chart.component.js"></script>
<style src="./liquid-chart.scss" scoped lang="scss"></style>

<template>
  <el-row :gutter="20" type="flex" justify="space-around">
    <el-col v-for="item in liquidList" :key="item.id" :xs="24" :sm="16" :lg="4">
      <div :id="item.id" style="height:200px" />
    </el-col>
  </el-row>
</template>
