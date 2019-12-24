<template>
  <el-card>
      <crumb slot="header">
          <template slot="title">文章列表</template>
      </crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态:">
              <!-- 单选组 -->
                <el-radio-group v-model="searchForm.status">
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <el-option v-for="item in channels" :key='item.id' :label="item.name" :value='item.id'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
              <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选中文章状态
        channel_id: null, // 频道列表默认显示
        dateRange: [] // 显示时间日期
      },
      channels: []
    }
  },
  //   获取所有频道
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
