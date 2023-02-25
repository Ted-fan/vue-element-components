<!--代码逻辑和样式库-->
<script src="./relate-data.component.js"></script>
<style src="./relate-data.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-table :data="data" border fit highlight-current-row>
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="数据项1" prop="item1" align="center" />
      <el-table-column label="数据项2" prop="item2" align="center" />
      <el-table-column label="数据项3" prop="item3" align="center" />
      <el-table-column label="数据项4" prop="item4" align="center" />
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="primary" size="small" @click="openRelateDataDialog()">关联数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>{{ selectedData }}</div>
    <!--关联数据弹窗 -->
    <relate-data-dialog v-if="relateDataDialogVisible" :multiple-base-selection="selectedData" @select="getRelateData" @close="closeRelateDataDialog" />
  </div>
</template>
