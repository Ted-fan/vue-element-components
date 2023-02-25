<!--代码逻辑和样式库-->
<script src="./relate-data-dialog.component.js"></script>
<style src="./relate-data-dialog.scss" scoped lang="scss"></style>

<template>
  <el-dialog :visible.sync="showDialog" width="1300px" append-to-body @close="closeDialog()">
    <span slot="title">
      <span class="aq-text-weight-bolder">选择数据</span>
    </span>
    <el-form :model="searchForm" label-position="top" label-width="80px" class="search-container">
      <el-row :gutter="16" type="flex">
        <el-col :span="6">
          <el-form-item>
            <slot name="label">搜索项1<span class="aq-search-text">可模糊搜索</span></slot>
            <el-input v-model="searchForm.queryStr" prefix-icon="el-icon-search" placeholder="请输入搜索内容" @keyup.enter.native="search" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="info" class="aq-search-button" @click="search()">搜索</el-button>
          <el-button type="warning" class="aq-search-button" @click="onReset()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 内容区域 -->
    <div class="content-container">
      <!--用户列表table-->
      <el-table ref="multipleBaseTable" :data="data" border fit highlight-current-row :row-class-name="tableRowClassName" @select="handleBaseSelectionChange" @select-all="handleBaseSelectionAll">
        <el-table-column type="selection" width="55" align="center" fixed />
        <el-table-column type="index" :index="setIndex" label="序号" width="55" align="center" />
        <el-table-column prop="itemA" label="数据项A" align="center" />
        <el-table-column prop="itemB" label="数据项B" align="center" />
        <el-table-column prop="itemC" label="数据项C" align="center" />
      </el-table>
      <!-- 分页插件 -->
      <pagination v-show="totalNum > 0" class="pagination" :total="totalNum" :page.sync="pageNum" :limit.sync="recordNum" @pagination="getDataList" />
    </div>
    <span slot="footer">
      <el-button @click="closeDialog()">取消</el-button>
      <el-button type="info" @click="save()">提交数据</el-button>
    </span>
  </el-dialog>
</template>
