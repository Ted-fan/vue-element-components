<!--代码逻辑和样式库-->
<script src="./primary-table-page.component.js"></script>
<style src="./primary-table-page.scss" scoped lang="scss"></style>

<template>
  <div>
    <div class="search-container">
      <h4 class="aq-margin-bottom-0 aq-margin-top-0">页面题目</h4>
      <el-form :model="searchForm" label-position="top" label-width="80px" class="aq-padding-top-16">
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
    <!-- 内容区域 -->
    <div class="content-container">
      <div>
        <el-button type="success" @click="openCreateOrEditDialog()">创建</el-button>
        <el-button type="danger" @click="deleteSelectedData()">批量删除</el-button>
      </div>
      <!--设备数据列表table-->
      <el-table v-loading="loading" :data="data" border fit highlight-current-row class="aq-margin-top-16" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" fixed />
        <el-table-column type="index" :index="setIndex" label="序号" width="55" />
        <el-table-column label="表格项1" width="150" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="info" @click="openDetailDialog(scope.row.objectId)">{{ scope.row.table1 }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="table2" label="表格项2" width="150" />
        <el-table-column prop="table3" label="表格项3" width="100" align="center" />
        <el-table-column prop="table4" label="表格项4" width="100" />
        <el-table-column prop="table5" label="表格项5" width="100" align="center" />
        <el-table-column prop="table6" label="表格项6" width="100" align="center" />
        <el-table-column prop="table7" label="表格项7" width="100" align="center" />
        <el-table-column label="备注信息" min-width="250">
          <template slot-scope="scope">
            {{ scope.row.remark | formatNull }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" plain @click="deleteSelectedData(scope.row.objectId,scope.row)">删除</el-button>
            <el-button type="success" size="mini" plain @click="openCreateOrEditDialog(scope.row.objectId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <pagination v-show="totalNum > 0" class="pagination" :total="totalNum" :page.sync="pageNum" :limit.sync="recordNum" @pagination="getDataList" />
    </div>
    <!-- 创建，编辑 -->
    <create-dialog v-if="editDialogVisible" :basic-id="selectBasicId" @reload="reload()" @close="closeCreateOrEditDialog" />
    <!-- 详情 -->
    <detail-dialog v-if="detailDialogVisible" :basic-id="selectBasicId" @reload="reload()" @close="closeDetailDialog" />
  </div>
</template>
