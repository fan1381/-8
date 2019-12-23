<template>
  <el-card>
    <crumb slot="header">
      <template slot="title">评论管理</template>
    </crumb>
    <el-table :data="list">
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <el-table-column :formatter="fromatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">

          <el-button type='text'>修改</el-button>
          <el-button  @click="off(obj.row)" type='text'>{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
          </template>

        </el-table-column>
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
    // 显示评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    fromatterBoolean (row, column, cellValue, index) {
      // row  当前行数据
      // column  当前列信息
      // cellValue  当前单元格的值
      // index  索引
      if (cellValue) {
        return '正常'
      } else {
        return '关闭'
      }
      // return cellValue ? '正常' : '关闭'
    },
    off (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: 'comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status } // 取反状态，若果是打开就得是关闭
        }).then(res => {
          this.getComment()
        })
      }).catch(() => { })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
