<!--代码逻辑和样式库-->
<script src="./print-dialog.component.js"></script>
<style src="./print-dialog.scss" scoped lang="scss"></style>

<template>
  <el-dialog :visible.sync="showDialog" width="600px" @close="closeDialog()">
    <span slot="title">
      <span class="aq-text-weight-bolder">打印预览</span>
    </span>
    <el-button type="success" @click="setValue">赋值</el-button>
    <div class="aq-padding-top-16" style="position:relative">
      <div style="height:400px" v-html="printHtml" />
    </div>
  </el-dialog>
</template>
