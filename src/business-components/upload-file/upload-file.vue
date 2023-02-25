<!--代码逻辑和样式库-->
<script src="./upload-file.component.js"></script>
<style src="./upload-file.scss" scoped lang="scss"></style>

<template>
  <div>
    <div class="aq-padding-bottom-16">{{ title }}<span class="aq-search-text">{{ description }}</span></div>
    <el-upload class="avatar-uploader" drag :action="actionUrl" :headers="headers" :before-upload="beforeFileUpload" :on-success="handleFileSuccess" :on-remove="handleFileRemove" :show-file-list="true" multiple :file-list="fileList">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
