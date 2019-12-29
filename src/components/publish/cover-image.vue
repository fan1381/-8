<template>
  <div class="cover-img">
    <div @click="open(index)" v-for="(item,index) in list" :key="index" class="cover-item">
      <img :src="item ? item : defaultImg" alt />
    </div>
    <!-- 上传组件 -->
    <el-dialog :visible="off" @close="no">
      <!-- 素材库组件 -->
      <select-image @selectOneImg='receiveImg'></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      off: false, // 控制弹层的开关
      selectIndex: -1 // 用来存储点击哪个图片的下标
    }
  },
  methods: {
    // 接受图片
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.no() // 关闭弹层
    },
    // 打开弹层
    open (index) {
      this.off = true
      this.selectIndex = index // 记录当前点击的是那个图片
    },
    // 关闭弹层
    no () {
      this.off = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-img {
  margin: 20px 0;
  display: flex;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
