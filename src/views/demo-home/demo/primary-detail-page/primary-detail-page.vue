<!--代码逻辑和样式库-->
<script src="./primary-detail-page.component.js"></script>
<style src="./primary-detail-page.scss" scoped lang="scss"></style>

<template>
  <div>
    <h4 class="aq-padding-left-16">主题目</h4>
    <div class="band" />
    <div class="aq-padding-16">
      <p>
        <el-divider direction="vertical" />
        <span class="aq-text-size-normal"><strong>模块题目</strong></span>
      </p>
      <el-form :model="editForm" label-position="top" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项1</slot>
              <div class="form-info-text">editForm.item1</div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项2</slot>
              <div class="form-info-text">editForm.item2</div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项3</slot>
              <div class="form-info-text">editForm.item3</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="band" />
    <!-- 内容区域 -->
    <div class="aq-padding-horizontal-16">
      <p>
        <el-divider direction="vertical" />
        <span class="aq-text-size-normal"><strong>模块题目2</strong></span>
      </p>
      <div>
        <el-button type="success" icon="iconfont el-icon-third-saoma">自定义Icon按钮</el-button>
      </div>
      <!--数据列表table-->
      <el-table v-loading="loading" :data="data" border fit highlight-current-row class="aq-margin-top-16">
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="table1" label="表格1" />
        <el-table-column prop="table2" label="表格2" />
        <el-table-column prop="table3" label="表格3" />
        <el-table-column prop="table4" label="表格4" align="center" />
        <el-table-column prop="table5" label="表格5" align="center" />
        <el-table-column prop="table6" label="表格6" align="center" />
      </el-table>
      <!-- 分页插件 -->
      <pagination v-show="totalNum > 0" class="pagination" :total="totalNum" :page.sync="pageNum" :limit.sync="recordNum" @pagination="getDataList" />
    </div>
  </div>
</template>
