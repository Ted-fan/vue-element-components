<!--代码逻辑和样式库-->
<script src="./common-page.component.js"></script>
<style src="./common-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <div>
      <common-title :title="'导入导出'" />
      <import-data-button :button-text="'导入数据'" :download-text="'下载导入模板'" :import-text="'导入数据'" :file-name="'模板'" :download-action="'xxx'" :upload-action="'xxx'" :upload-file-type="['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']" @reload="onReset" />
    </div>
    <div class="band" />
    <div>
      <common-title :title="'搜索功能'" />
      <search-bar :condition="{}" @search="search" />
      <div>搜索内容:{{ confirmSearchForm }}</div>
    </div>
    <div class="band" />
    <div>
      <common-title :title="'文件上传'" />
      <upload-file :title="'上传文件'" :description="'可上传格式.jpg/.png/.pdf'" :origin-file-list="originFileList" @files="getFiles($event)" />
    </div>
    <div class="band" />
    <div>
      <common-title :title="'日历'" />
      <el-calendar v-model="calendarMonth">
        <template slot="dateCell" slot-scope="{date, data}">
          <div @click="clickDate({date})">{{ data.day }}</div>
          <div v-for="(item, index) in scheduleData" :key="index">
            <div v-if="item.workingDay.indexOf(data.day) != -1" class="aq-text-color-danger">
              {{ item.content.notice }}
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
