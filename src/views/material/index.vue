<template>
<el-card>
    <crumb slot="header">
        <template slot="title">
            素材管理
        </template>
    </crumb>
    <el-tabs v-model="activeName"  @tab-click="changeTap">
        <el-tab-pane label="全部图片" name="all">
            <!-- 显示图片 -->
            <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <el-row class="ico" type="flex" justify="space-around" align="middle">
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>

            </el-tab-pane>
        <el-tab-pane label="收藏图片" name="collect">   <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                    <img :src="item.url" alt="">
                    <el-row class="ico" type="flex" justify="space-around" align="middle">
                        <i class="el-icon-star-on"></i>
                        <i class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div></el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部或收藏
      list: []
    }
  },
  methods: {
    changeTap () {
      this.get()
    },
    //   获取图片信息
    get () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
        width: 200px;
        height: 250px;
        margin: 20px 50px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
         .ico{
             width: 100%;
             height: 40px;
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 23px;
                background-color: #f4f5f6
            }
    }
}
</style>
