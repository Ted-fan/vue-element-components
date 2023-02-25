<!--代码逻辑和样式库-->
<script src="./dashboard.component.js"></script>
<style src="./dashboard.scss" scoped lang="scss"></style>

<template>
  <div class="content-container">
    <el-row>
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </el-row>
    <el-row style="background:#fff;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="8">
      <liquid-chart />
    </el-row>
    <el-row :gutter="8">
      <horizontal-bar-chart />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <bullet-chart />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

  </div>
  <!-- <div class="dash_title">人员统计</div>
  <div class="dash_personList">
    <div class="dash_personTotal">
      <div v-for="(item,i) of personList" :key="i" class="dash_personTotal_list shadows">
        <img class="person_img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.gpbctv.com%2Fuploads%2F20210424%2Fzip_1619246266UkP6CL.jpg&refer=http%3A%2F%2Fwww.gpbctv.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670724058&t=9cd2c7cff6d7b8983ce1cdb70b2eb860">
        <div class="perseon_center">
          <span>数据汇总</span>
          <h6>999 件</h6>
        </div>
        <div class="person_right">
          <div>
            <label>一级数据:</label>
            <span class="person_gradient" />
          </div>
          <div>
            <label>二级数据:</label>
            <span class="person_gradient" />
          </div>
        </div>
      </div>
    </div>
    <div class="dash_dataStatistics">
      <div class="dash_dataStatistics_list shadows">
        <div class="dash_title">数据案件趋势统计</div>
        <div class="case_list">
          <div v-for="(item,i) of caseList" :key="i" class="case_list_item" :class="`case_list_item${i + 1}`">
            <img src="">
            <p>2134566</p>
            <div>
              <span>数据汇总统计</span>
              <span>同比<span class="red">+2.1% ⬆️</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="dash_dataStatistics_water">
        <div class="waterList shadows">
          <div class="dash_title">人员统计</div>
          <div class="water_con">
            <div class="water_progress">
              <el-progress type="dashboard" :percentage="50" />
              <svg width="100%" height="100%">
                <defs>
                  <linearGradient id="blue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(66,255,101)" stop-opacity="1" />
                    <stop offset="70%" style="stop-color:rgb(255,189,25)" stop-opacity="1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div id="myChart" />
            <div class="water_list">
              <div class="water_list_item">
                <p>一级数据</p>
                <h5>23213<span>件</span></h5>
              </div>
              <div class="water_list_item">
                <p>二级数据</p>
                <h5>23213<span>件</span></h5>
              </div>
            </div>
          </div>
        </div>
        <span class="line" />
        <div class="waterList shadows">
          <div class="dash_title">人员统计</div>
          <div class="water_con">
            <div class="water_progress">
              <el-progress type="dashboard" :percentage="50" />
            </div>
            <div id="myChart2" />
            <div class="water_list">
              <div class="water_list_item">
                <p>一级数据</p>
                <h5>23213<span>件</span></h5>
              </div>
              <div class="water_list_item">
                <p>二级数据</p>
                <h5>23213<span>件</span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dash_histogram">
    <div class="dash_title dash_histogram_ob">数据案件趋势统计</div>
    <div id="dash_histogram" />
  </div> -->
</template>
