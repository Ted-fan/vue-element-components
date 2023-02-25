<!--代码逻辑和样式库-->
<script src="./create-dialog.component.js"></script>
<style src="./create-dialog.scss" scoped lang="scss"></style>

<template>
  <div>
    <el-dialog :visible.sync="showDialog" width="1300px" @close="closeDialog()">
      <span slot="title">
        <span class="aq-text-weight-bolder">弹窗题目</span>
        <i class="aq-margin-left-12 aq-margin-right-12 el-icon-arrow-right" />
        {{ basicId ? '编辑':'创建' }}{{ title }}
      </span>
      <el-form ref="dataForm" :rules="editRules" :model="editForm" label-position="top" label-width="120px" class="aq-padding-16">
        <el-row :gutter="20" type="flex">
          <el-col :span="6">
            <el-form-item prop="form1">
              <div><span class="aq-text-color-danger">*</span>表单项1</div>
              <el-input v-model="editForm.form1" placeholder="请填写表单项1" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="typeObj">
              <div><span class="aq-text-color-danger">*</span>表单项2</div>
              <el-select v-model="editForm.typeObj" class="aq-width-full" value-key="id" placeholder="请选择表单项2">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="form3">
              <div><span class="aq-text-color-danger">*</span>表单项3<span class="aq-search-text">可以多选</span></div>
              <el-cascader ref="cascades" v-model="editForm.form3" class="aq-width-full" :show-all-levels="false" :options="brandList" :props="defaultProps" placeholder="请选择" @change="chooseBrand" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="info" :loading="loading" @click="save()">提交数据</el-button>
      </span>
    </el-dialog>
  </div>
</template>
