<!--代码逻辑和样式库-->
<script src="./nest-table-page.component.js"></script>
<style src="./nest-table-page.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-form id="dataForm" ref="dataForm" :model="editForm" :rules="editRules">
      <div v-for="(item,index) in editForm.items" :key="index" class="aq-padding-16 aq-bg-color-bg-success">
        <p class="aq-vertical-middle">
          <i v-if="editForm.items.length !== 1" class="el-icon-remove aq-text-color-primary aq-text-size-large aq-padding-right-8" @click="removeItem(index)" />项目描述:
        </p>
        <el-table :data="item.itemDetails" border fit highlight-current-row>
          <el-table-column label="题目" min-width="240" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`items[${index}].itemDetails[${scope.$index}].title`" :rules="editRules.isValidateNull">
                <el-input v-model="scope.row.title" class="aq-width-full" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="项目1" min-width="240" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`items[${index}].itemDetails[${scope.$index}].item1`" :rules="editRules.isValidateNull">
                <el-input v-model="scope.row.item1" class="aq-width-full" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="项目2" min-width="240" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`items[${index}].itemDetails[${scope.$index}].item2`" :rules="editRules.isValidateNull">
                <el-input v-model="scope.row.item2" class="aq-width-full" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <div class="aq-padding-top-16 aq-padding-bottom-16">详细内容</div>
        <el-table :data="item.contentDetails" border fit highlight-current-row>
          <el-table-column width="100" align="center">
            <template slot-scope="scope">
              <i class="el-icon-circle-plus aq-text-color-info aq-text-size-large aq-padding-left-4" @click="add(item.contentDetails)" />
              <i v-if="item.contentDetails.length !==1" class="el-icon-remove aq-text-color-info aq-text-size-large aq-padding-left-4" @click="remove(item.contentDetails,scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column label="内容明细1" min-width="100" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`items[${index}].contentDetail[${scope.$index}].content1`" :rules="editRules.isValidateNull">
                <el-input v-model="scope.row.content1" class="aq-width-full" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="内容明细2" min-width="100" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`items[${index}].contentDetail[${scope.$index}].content2`" :rules="editRules.isValidateNull">
                <el-input v-model="scope.row.content2" class="aq-width-full" size="mini" />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <div class="text-center aq-padding-top-16">
      <i class="el-icon-circle-plus aq-text-color-primary aq-text-size-large" @click="addItem" />
    </div>
  </div>
</template>
