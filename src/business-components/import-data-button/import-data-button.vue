<!--代码逻辑和样式库-->
<script src="./import-data-button.component.js"></script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-button type="warning">
      {{ buttonText }}
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="download">{{ downloadText }}</el-dropdown-item>
      <el-dropdown-item command="import">
        <el-upload ref="upload" :action="import_file_url + uploadAction" :headers="headerObj" :data="paramObj" :before-upload="beforeFileUpload" :on-success="handleFileSuccess">
          <div>{{ importText }}</div>
        </el-upload>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
