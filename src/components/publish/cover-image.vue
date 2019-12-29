<template>
  <div class="cover-img">
   <div @click='open' v-for="(item,index) in list" :key="index" class="cover-item">
     <!-- {{ item }} -->
     <img :src="item ? item : defaultImg" alt="">
   </div>
   <el-dialog :visible="off" @close='no' title="请选择封面图片"></el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      off: false // 控制弹层的开关
    }
  },
  methods: {
    // 打开弹层
    open () {
      this.off = true
    },
    // 关闭弹层
    no () {
      this.off = false
    }
  }
}

</script>

<style lang='less' scoped>
.cover-img{
    margin: 20px 0;
    display: flex;
    .cover-item{
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        img{
          width: 100%;
          height: 100%;
        }
    }
}
</style>
