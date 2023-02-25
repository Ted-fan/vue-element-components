<!--代码逻辑和样式库-->
<script src="./detail-dialog.component.js"></script>
<style src="./detail-dialog.scss" scoped lang="scss"></style>

<template>
  <div>
    <el-dialog :visible.sync="showDialog" width="1300px" @close="closeDialog()">
      <span slot="title">
        <span class="aq-text-weight-bolder">父页Title</span>
        <i class="aq-margin-left-12 aq-margin-right-12 el-icon-arrow-right" />
        {{ title }}
        <i class="aq-margin-left-12 aq-margin-right-12 el-icon-arrow-right" />
        详情
      </span>
      <el-form class="aq-padding-16" :model="editForm" label-position="top" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项1</slot>
              <div class="form-info-text">{{ editForm.form1 }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项2</slot>
              <div class="form-info-text">{{ editForm.form2 }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <slot name="label">表单项3</slot>
              <div class="form-info-text">{{ editForm.form2 }}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="band" />
      <div class="aq-padding-horizontal-16">
        <el-form :model="searchForm" label-position="top" label-width="80px" class="aq-padding-top-12">
          <el-row :gutter="16" type="flex">
            <el-col :span="6">
              <el-form-item>
                <slot name="label">搜索项1<span class="aq-search-text">可模糊搜索</span></slot>
                <el-input v-model="searchForm.queryStr" prefix-icon="el-icon-search" placeholder="请输入描述/编码" @keyup.enter.native="search" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="info" class="aq-search-button" @click="search()">搜索</el-button>
              <el-button type="warning" class="aq-search-button" @click="onReset()">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="aq-padding-16">
        <el-table v-loading="loading" :data="data" border fit highlight-current-row>
          <el-table-column type="index" label="序号" width="55" />
          <el-table-column prop="table1" label="表格1" width="180" />
          <el-table-column prop="table2" label="表格2" width="120" />
          <el-table-column prop="table3" label="表格3" width="100" />
          <el-table-column prop="table4" label="表格4" width="100" />
          <el-table-column prop="table5" label="表格5" />
          <el-table-column prop="table6" label="表格6" />
          <el-table-column prop="table7" label="表格7" />
          <el-table-column prop="table8" label="表格8" width="80" />
          <el-table-column prop="table9" label="表格9" width="150" />
        </el-table>
      </div>
      <!-- 分页插件 -->
      <pagination v-show="totalNum > 0" class="pagination" :total="totalNum" :page.sync="pageNum" :limit.sync="recordNum" @pagination="getDataList" />
    </el-dialog>
  </div>
</template>
