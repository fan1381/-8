<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <!-- 外侧容器 -->
      <div class="select-image-list">
        <!-- 生成图片 -->
        <el-card v-for="item in list" :key="item.id" class="img-card">
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <!-- 上传图片 -->
    <el-tab-pane label="上传图片" name="upload">
      <!-- 给action不报错 -->
      <el-upload action :http-request="uploadImg" class="upload-img" :show-file-list="false">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中
      list: [], // 接受素材管理数据
      page: {
        currentPage: 1, // 默认第一页
        pageSize: 8, // 一页8个
        total: 0 // 总页码
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file) // 加入参数
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectOneImg', res.data.url)
      })
    },
    clickImg (url) {
      this.$emit('selectOneImg', url)
      // alert(url)
    },
    // 点击切换页码
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getImg()
    },
    //   获取图片素材
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count // 获取总页数
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.upload-img{
  display: flex;
  justify-content: center;
  i{
    font-size: 50px;
    padding: 50px;
    border: 1px dashed #ccc
  }
}
</style>
