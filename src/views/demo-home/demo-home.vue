<!--代码逻辑和样式库-->
<script src="./demo-home.component.js"></script>
<style src="./demo-home.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <div>
      <el-button type="primary" @click="moveToTablePage()">模板列表页</el-button>
      <el-button type="success" @click="moveToDetailPage()">模板详情页</el-button>
      <el-button type="warning" @click="openCreateOrEditDialog()">创建/编辑弹窗</el-button>
      <el-button type="danger" @click="openDetailDialog()">详情弹窗</el-button>
    </div>
    <!-- 创建，编辑 -->
    <create-dialog v-if="editDialogVisible" :basic-id="selectBasicId" @reload="reload()" @close="closeCreateOrEditDialog" />
    <!-- 详情 -->
    <detail-dialog v-if="detailDialogVisible" :basic-id="selectBasicId" @close="closeDetailDialog" />
  </div>
</template>
