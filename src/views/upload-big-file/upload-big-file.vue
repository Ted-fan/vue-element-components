<!--代码逻辑和样式库-->
<script src="./upload-big-file.component.js"></script>
<style src="./upload-big-file.scss" scoped lang="scss"></style>
<template>
  <div>
    <div class="content-container">
      <upload-big-file :title="'上传文件'" :description="''" :origin-file-list="originFileList" @files="getFiles($event)" />
    </div>
    <div class="content-container">
      <el-table ref="multipleTable" :data="originFileList" stripe border class="table" header-cell-class-name="table-header">
        <!-- <el-table-column v-if="idShow" prop="id" label="ID" align="center" /> -->
        <el-table-column prop="name" width="650" label="文件名" show-overflow-tooltip />
        <el-table-column prop="size" width="150" label="文件大小" />
        <!-- <el-table-column v-if="idShow" prop="location" label="location" align="center" /> -->
        <!-- <el-table-column v-if="idShow" prop="identifier" label="identifier" align="center" /> -->
        <el-table-column prop="fileType" width="250" label="文件类型" />
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-download" class="blue" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

