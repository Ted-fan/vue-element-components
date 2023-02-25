<!--代码逻辑和样式库-->
<script src="./dynamic-table-page.component.js"></script>
<style src="./dynamic-table-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-form ref="dataForm" :model="editForm" label-position="top" label-width="120px">
      <el-table :data="editForm.data" border fit highlight-current-row :span-method="objectSpanMethod">
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <i class="el-icon-circle-plus aq-text-color-info aq-text-size-large aq-padding-left-4" @click="addItem(scope.$index)" />
              <i v-if="spanArr.length !== 1" class="el-icon-remove aq-text-color-info aq-text-size-large aq-padding-left-4" @click="removeItem(scope.row)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="180">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <el-form-item :prop="`data[${scope.$index}].title`">
                <el-input v-model="scope.row.title" class="aq-width-full" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="item1" label="项目1" min-width="180">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <el-form-item :prop="`data[${scope.$index}].item1`">
                <el-input v-model="scope.row.item1" class="aq-width-full" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="item2" label="项目2" min-width="180">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <el-form-item :prop="`data[${scope.$index}].item2`">
                <el-input v-model="scope.row.item2" class="aq-width-full" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="内容明细1" width="240" align="center">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <i class="el-icon-circle-plus aq-text-color-info aq-text-size-large aq-padding-horizontal-4" @click="add(scope.row,scope.$index)" />
              <i v-if="spanArr.length !== 1" class="el-icon-remove aq-text-color-info aq-text-size-large aq-padding-horizontal-4" @click="remove(scope.$index)" />
              <el-form-item :prop="`data[${scope.$index}].content1`">
                <el-input v-model="scope.row.content1" class="aq-width-full" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="内容明细2" width="240" align="center">
          <template slot-scope="scope">
            <div class="aq-vertical-middle">
              <el-form-item :prop="`data[${scope.$index}].content2`">
                <el-input v-model="scope.row.content2" class="aq-width-full" size="mini" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
