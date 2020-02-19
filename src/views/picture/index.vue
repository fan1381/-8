<template>
  <div class>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">图文数据</template>

      </bread-crumb>
      <div ref="echarts" class="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {

  mounted () {
    let myEcharts = echarts.init(this.$refs.echarts) // 实例化图表
    myEcharts.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    })
  },
  methods: {}
}
</script>

<style  scoped lang='less'>
.echarts {
  width: 600px;
  height: 400px;
}
</style>
