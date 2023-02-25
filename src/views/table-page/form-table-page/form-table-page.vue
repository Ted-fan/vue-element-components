<!--代码逻辑和样式库-->
<script src="./form-table-page.component.js"></script>
<style src="./form-table-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-form id="dataForm" ref="dataForm" :model="editForm" :rules="editRules">
      <el-table class="aq-margin-top-12" :data="editForm.data" border fit highlight-current-row max-height="600">
        <el-table-column width="60" align="center">
          <template slot-scope="scope">
            <i class="el-icon-remove aq-text-color-info aq-text-size-large aq-padding-left-4" @click="removeItem(scope.$index)" />
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span class="aq-text-color-danger">*</span>表单项1
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="`data.${scope.$index}.item1`" :rules="editRules.isValidateNull">
              <el-input v-model="scope.row.item1" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span class="aq-text-color-danger">*</span>表单项2
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="`data.${scope.$index}.item2`" :rules="editRules.isValidateNull">
              <el-input v-model="scope.row.item2" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span class="aq-text-color-danger">*</span>表单项3
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="`data.${scope.$index}.item3`" :rules="editRules.isValidateNull">
              <el-input v-model="scope.row.item3" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center aq-margin-bottom-16"><i class="el-icon-circle-plus aq-text-color-info aq-text-size-large aq-padding-left-4" @click="addItem()" /></div>
    </el-form>
    <div class="text-right">
      <el-button type="primary" @click="save()">提交</el-button>
    </div>
  </div>
</template>
