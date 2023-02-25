<!--代码逻辑和样式库-->
<script src="./websocket-page.component.js"></script>
<style src="./websocket-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-row :gutter="80">
      <el-col :span="12">
        <div class="window">
          <div v-for="(msg,index) of messageList" :key="index" :class="{'text-right':msg.current}">
            <span :class="{'aq-text-color-primary':msg.current,'aq-text-color-warning':!msg.current}">{{ msg.from }}</span>:{{ msg.msg }}
          </div>
        </div>
        <div class="aq-margin-top-16 aq-vertical-middle">
          <el-input v-model="sendMsg" placeholder="请输入内容" @keyup.enter.native="sendNewMessage" />
          <el-button class="aq-margin-left-24" type="primary" @click="sendNewMessage">发送</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div>需要分别在两个浏览器上登录 admin 与 editor 账号进行通讯</div>
        <div class="aq-text-color-primary aq-padding-top-16 aq-text-size-big">当前登录账号: {{ currentUser }}</div>
      </el-col>
    </el-row>
  </div>
</template>
