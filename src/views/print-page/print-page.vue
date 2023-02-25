<!--代码逻辑和样式库-->
<script src="./print-page.component.js"></script>
<style src="./print-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <!-- 内容区域 -->
    <el-row class="aq-padding-16" :gutter="50">
      <el-col :span="6">
        <div class="board-column">
          <div class="board-column-header">
            组件
          </div>
          <div class="board-column-content">
            <div v-for="element in componentsList" :key="element.id" class="board-item" @click="addBusiness(element)">
              {{ element.name }}
            </div>
          </div>
          <el-button type="primary" @click="exportWeb">打印预览</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="board-column">
          <div class="board-column-header">
            画布
          </div>
          <div ref="modal">
            <div style="position:relative;height: 400px;border: 1px solid #000000;background:#fff">
              <div v-for="(element,index) in businessList" :key="index">
                <!-- :x="380" :y="60" -->
                <vue-drag-resize v-if="element.type === 'rect'" :z="1" :minh="20" :w="element.width" :h="element.height" :prevent-active-behavior="true" :is-active="element.active" @resizing="resize(element,$event)" @clicked="onActivated(element,index)">
                  <div class="aq-border" :style="{ width: `${element.width}px`, height: `${element.height}px` }" />
                </vue-drag-resize>
                <vue-drag-resize v-if="element.type === 'text'" :z="2" :minh="20" :w="element.width" :h="element.height" :prevent-active-behavior="true" :is-active="element.active" @resizing="resize(element,$event)" @clicked="onActivated(element,index)">
                  <div :style="{...element.style, width: `${element.width}px`, height: `${element.height}px` }">{{ element.title }}<div style="display:contents;white-space:nowrap">{{ element.sign }}</div>
                  </div>
                </vue-drag-resize>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <print-dialog v-if="printDialogVisible" :print-html="printHtml" @close="closePrintDialog" />
  </div>
</template>
