<!--代码逻辑和样式库-->
<script src="./index-page.component.js"></script>
<style src="./index-page.scss" scoped lang="scss"></style>

<template>
  <div class="m-home">
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col v-for="item in showTitleList" :key="item.id" :xs="24" :sm="16" :lg="4">
        <div :id="item.id" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="20" :lg="8">
        <el-card class="m-box-card" shadow="hover">
          <!-- <ve-line :data="chartData1" :settings="chartSettings1" /> -->
          <div id="container" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="10">
        <el-card class="m-box-card" shadow="hover">
          <div id="chartCfg" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="6">
        <el-row :gutter="20" align>
          <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover" style="height: 225px;background-color: rgb(143, 201, 251);color:#ffffff;">
              <div slot="header">
                <p style="text-align: center">
                  <i class="el-icon-user-solid" style="color: #F56C6C;font-size: 35px;" />
                </p>
                <div style="padding-top: 10px;">
                  <p>账号：{{ user.name }}</p>
                  <p>时间：{{ user.loginTime }}</p>
                  <p>地址：{{ user.loginIp }}</p>
                </div>
              </div>
              <div style="font-size: 12px;">
                <p>上次登录时间：{{ user.lastTime }}</p>
                <p>上次登录地址：{{ user.lastIp }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover">
              <div style="height: 305px; margin: -20px;background-color: rgb(247, 151, 214);color:#ffffff;overflow: auto">
                <div style="padding: 20px;">
                  <p style="font-weight: bold;text-align: center">重要通知</p>
                  <p v-for="index in 20" :key="index">{{ index }}. 路过的假面骑士</p>
                  <p>~(˘▾˘~)~(˘▾˘~)</p>
                  <p>Decade</p>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 任务进度 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover">
          <p style="text-align: center;font-size: 25px;">任务进度</p>
          <div id="registerAnimation" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover">
          <p style="text-align: center;font-size: 25px;">评审</p>
          <div id="bullet" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
