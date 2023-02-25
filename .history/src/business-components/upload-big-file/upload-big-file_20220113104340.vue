<!--代码逻辑和样式库-->
<script src="./upload-big-file.component.js"></script>
<style src="./upload-big-file.scss" scoped lang="scss"></style>

<template>
  <div>
    <div class="aq-padding-bottom-16">{{ title }}<span class="aq-search-text">{{ description }}</span></div>
    <uploader ref="uploader" class="avatar-uploader" :options="options" :auto-start="false" :file-status-text="fileStatusText" @file-added="onFileAdded" @file-success="onFileSuccess" @file-error="onFileError">
      <uploader-unsupport />
      <uploader-drop>
        <div>
          <uploader-btn :single="true"><i class="el-icon-upload el-icon--right" />选择文件</uploader-btn>
        </div>
      </uploader-drop>
      <uploader-list />
    </uploader>
  </div>
</template>
