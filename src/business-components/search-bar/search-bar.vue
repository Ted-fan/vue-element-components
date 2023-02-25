<!--代码逻辑和样式库-->
<script src="./search-bar.component.js"></script>
<style src="./search-bar.scss" scoped lang="scss"></style>

<template>
  <div>
    <h4 class="aq-margin-bottom-0 aq-margin-top-0">搜索栏</h4>
    <el-form :model="searchForm" label-position="top" class="aq-padding-top-16">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item>
            <slot name="label">搜索项1<span class="aq-search-text">可模糊搜索</span></slot>
            <el-input v-model="searchForm.queryStr" prefix-icon="el-icon-search" placeholder="请输入搜索内容" @keyup.enter.native="search" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="maTypeId">
            <slot name="label">搜索项2<span class="aq-search-text">支持多选</span></slot>
            <el-select v-model="searchForm.queryTypes" class="aq-width-full" prefix-icon="el-icon-search" placeholder="请选择搜索内容" multiple>
              <el-option v-for="item in types" :key="item.id" :label="item.text" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="info" class="aq-search-button" @click="search()">搜索</el-button>
          <el-button type="warning" class="aq-search-button" @click="onReset()">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
