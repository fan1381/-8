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
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker type="daterange" v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主题内容 -->
    <el-row class="total" type="flex" align="middle">
      <span>共找到1000条内容</span>
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
        <span>
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
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
      defaultImg: require('../../assets/img/404.png') // 没有图片数据，显示的默认图片
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
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章列表
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
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
    };
    .info{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-around;
        .tag{
            width: 60px;
            height: 35px;
            text-align: center;
            line-height: 35px
        };
        .title{
            font-size: 19px
        }
        .text{
            font-size: 10px;
            color: #ccc
        }
    }
  }

  .right {
    cursor: pointer;
    i{
        margin: 0 5px
    }
  }
}
</style>
