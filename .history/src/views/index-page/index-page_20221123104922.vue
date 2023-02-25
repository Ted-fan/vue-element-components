<!--代码逻辑和样式库-->
<script src="./index-page.component.js"></script>
<style src="./index-page.scss" scoped lang="scss"></style>

<template>
  <div class="m-home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-set-up" style="color: #F56C6C;" />
          </div>
          <div class="m-content">
            <p>待办事项</p>
            <p class="m-count">{{ info.tasks }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-message" style="color: #E6A23C;" />
          </div>
          <div class="m-content">
            <p>系统消息</p>
            <p class="m-count">{{ info.message }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-document" style="color: #67C23A;" />
          </div>
          <div class="m-content">
            <p>代码量</p>
            <p class="m-count">{{ info.code }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="el-icon-sunrise-1" style="color: #409EFF;" />
          </div>
          <div class="m-content">
            <p>天气</p>
            <p>{{ info.weather }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="18">
        <el-card class="m-box-card" shadow="hover">
          <ve-line :data="chartData1" :settings="chartSettings1" />
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="6">
        <el-row :gutter="20" align>
          <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover" style="height: 215px;background-color: rgb(143, 201, 251);color:#ffffff;">
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
              <div style="height: 215px; margin: -20px;background-color: rgb(247, 151, 214);color:#ffffff;overflow: auto">
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
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover" style="height: 300px;">
          <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="日期" width="130" />
            <el-table-column prop="name" label="姓名" width="80" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card class="m-box-card" shadow="hover" style="height: 300px">
          <!-- padding: 20px; -->
          <p style="text-align: center;font-size: 25px;">任务进度</p>
          <div class="m-task-box">
            <div class="m-task-text">需求1：</div>
            <div class="m-task-pro">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="0" />
            </div>
          </div>
          <div class="m-task-box">
            <div class="m-task-text">需求2：</div>
            <div class="m-task-pro">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="70" />
            </div>
          </div>
          <div class="m-task-box">
            <div class="m-task-text">需求3：</div>
            <div class="m-task-pro">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="80" color="rgba(142, 113, 199, 0.7)" />
            </div>
          </div>
          <div class="m-task-box">
            <div class="m-task-text">需求4：</div>
            <div class="m-task-pro">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success" />
            </div>
          </div>
          <div class="m-task-box">
            <div class="m-task-text">需求5：</div>
            <div class="m-task-pro">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="m-box-card" shadow="hover">
          <ve-scatter :data="chartData2" :settings="chartSettings2" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
