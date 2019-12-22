<template>
  <el-card>
    <crumb slot="header">
      <template slot="title">评论管理</template>
    </crumb>
    <el-table :data="list">
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
