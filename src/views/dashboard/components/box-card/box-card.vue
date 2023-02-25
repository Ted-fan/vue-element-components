<!--代码逻辑和样式库-->
<script src="./box-card.component.js"></script>
<style src="./box-card.scss" scoped lang="scss"></style>

<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb" />
      <mallki class-name="mallki-text" text="工程工单进度" />
      <div style="padding-top:35px;" class="progress-item">
        <span>待处理</span>
        <el-progress :percentage="70" status="warning" />
      </div>
      <div class="progress-item">
        <span>进行中</span>
        <el-progress :percentage="18" />
      </div>
      <div class="progress-item">
        <span>已逾期</span>
        <el-progress :percentage="12" status="exception" />
      </div>
      <div class="progress-item">
        <span>已完成</span>
        <el-progress :percentage="80" status="success" />
      </div>
    </div>
  </el-card>
</template>
