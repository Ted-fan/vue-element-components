<!--代码逻辑和样式库-->
<script src="./bpmn-page.component.js"></script>
<style src="./bpmn-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-button type="primary" size="small" @click="previewProcessXML">导出XML</el-button>
    <el-button type="primary" size="small" @click="previewProcessJson">导出JSON</el-button>
    <el-button type="primary" size="small" @click="previewTable">预览配置表格</el-button>
    <div class="aq-margin-top-16 process-designer">
      <div class="process-designer-container">
        <div ref="bpmn-canvas" class="process-designer-canvas" />
      </div>
      <el-dialog title="预览" width="60%" :visible.sync="previewModelVisible" append-to-body destroy-on-close>
        {{ previewResult }}
      </el-dialog>
      <el-dialog title="预览表格" width="90%" :visible.sync="previewTableVisible" append-to-body destroy-on-close>
        <el-table :data="data" border>
          <el-table-column v-for="(header,index) in headers" :key="index" :prop="header.key" :label="header.value" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row[header.key] && index !== 0">
                <el-checkbox v-model="scope.row.checked" /><i class="el-icon-edit aq-padding-left-16" />
              </div>
              <div v-else>{{ scope.row[header.key] }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
