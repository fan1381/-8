<template>
  <el-card>
    <crumb slot="header">
      <template slot="title">文章列表</template>
    </crumb>
    <!-- 表单容器 -->
    <el-form style="padding-left:50px">
      <el-form-item label="文章状态:">
        <!-- 单选组 -->
        <el-radio-group v-model="searchForm.status" @change="changeConditon">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select @change="changeConditon" placeholder="请选择频道" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          @change="changeConditon"
          value-format="yyyy-MM-dd"
          type="daterange"
          v-model="searchForm.dateRange"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主题内容 -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到{{ page.total }}条内容</span>
    </el-row>
    <!-- 列表内容 -->
    <div class="article" v-for="item in list" :key="item.id.toString()">
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] :defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
          <span class="text">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span>
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="del(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="height:60px" align="middle">
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
      ></el-pagination>
    </el-row>
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
      channels: [], // 接受频道数据
      list: [], // 接受列表数据
      defaultImg: require('../../assets/img/404.png'), // 没有图片数据，显示的默认图片
      page: {
        currentPage: 1, // 默认第一页
        pageSize: 10, // 一页显示多少
        total: 0 // 总页数
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  //   获取所有频道
  methods: {
    // 点击切换分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    // 删除
    del (id) {
      this.$confirm('确定要删除吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getArticles()
        })
      })
    },
    // 筛选文章，筛选条件，都可以调用这个方法
    changeConditon () {
      this.page.currentPage = 1// 强制将页码重置成第一页
      this.getConditionArticle()
    },
    // 封装
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, //  文章状态
        channel_id: this.searchForm.channel_id, //  频道选项
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null //  结束时间
      }
      // 发请求
      this.getArticles(params)
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表 和 筛选文章状态 分页
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 总页数
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang='less' scoped>
.total {
  height: 60px;
  border-bottom: 1px dashed #ccc;
}
.article {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px dashed #ccc;

  .left {
    display: flex;
    img {
      width: 150px;
      height: 100px;
      border-radius: 5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .tag {
        width: 60px;
        height: 35px;
        text-align: center;
        line-height: 35px;
      }
      .title {
        font-size: 19px;
      }
      .text {
        font-size: 10px;
        color: #ccc;
      }
    }
  }

  .right {
    cursor: pointer;
    i {
      margin: 0 5px;
    }
  }
}
</style>
