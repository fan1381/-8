<template>
  <el-card v-loading="loading">
    <crumb slot="header">
      <template slot="title">素材管理</template>
    </crumb>
    <!-- 上传 -->

    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg">
        <el-button type="primary">上传图片</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTap">
      <el-tab-pane label="全部图片" name="all">
        <!-- 显示图片 -->
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <img @click="clickImg(index)" :src="item.url" alt />
            <el-row class="ico" type="flex" justify="space-around" align="middle">
              <i
                @click="color(item)"
                :style="{color: item.is_collected ? 'red':'#000'}"
                class="el-icon-star-on"
              ></i>
              <i @click="del(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="(item,i) in list" :key=" i ">
            <img :src="item.url" alt />

            <el-row class="ico" type="flex" justify="space-around" align="middle">
              <i
                @click="color(item)"
                :style="{color: item.is_collected ? 'red':'#000'}"
                class="el-icon-star-on"
              ></i>
              <i @click="del(item.id)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="pageSize"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <!-- 弹层 -->
    <el-dialog @opened='openEnd' :visible="dialog" @close="dialog=false">
      <el-carousel ref="myCarousel" :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in list" :key="index">
          <img style="width:100%;height:100%" :src="item.url" alt />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      activeName: 'all', // 默认选中全部或收藏
      list: [],
      page: {
        currentPage: 1, // 默认第一页
        pageSize: 8, // 一页显示多少
        total: 0 // 总页数
      },
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 点击图片
    clickImg (index) {
      this.dialog = true
      this.clickIndex = index
    },
    //   上传图片
    uploadImg (params) {
      let data = new FormData()
      this.loading = true
      data.append('image', params.file) // 文件加入到参数中
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.loading = false
        this.get()
      })
    },
    //   删除图片
    del (id) {
      this.$confirm('确定要删除吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.get()
        })
      })
    },
    //   点击收藏变颜色
    color (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.get()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.get()
    },
    changeTap () {
      this.page.currentPage = 1 // 点击收藏，重置为第一页
      this.get()
    },
    //   获取图片信息
    get () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 250px;
    margin: 20px 50px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .ico {
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 23px;
      background-color: #f4f5f6;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
