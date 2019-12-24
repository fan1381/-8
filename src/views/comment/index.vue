<template>
  <el-card v-loading='loading'>
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
          <el-button type="text">修改</el-button>
          <el-button @click="off(obj.row)" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- total  总页数 -->
    <!-- page-size  每页显示的条数 -->
    <!-- current-page  默认页码 -->
     <!-- @current-change  监听事件，点击切换页数 -->
    <el-row type="flex" style="height:80px" justify="center" align="middle">
      <el-pagination background layout="prev, pager, next" :page-size="this.pageSize" :total="this.page.total" :current-page="currentPage" @current-change='changePage'></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false, // 加载动画默认关闭9
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    // 显示评论列表
    // newPage当前最新页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true // 加载动画
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
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
      this.$confirm(`您是否确定要${mess}评论吗`, '提示')
        .then(() => {
          this.$axios({
            method: 'put',
            url: 'comments/status',
            params: { article_id: row.id.toString() },
            data: { allow_comment: !row.comment_status } // 取反状态，若果是打开就得是关闭
          }).then(res => {
            this.getComment()
          })
        })
        .catch(() => {})
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
