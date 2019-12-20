<template>
  <el-row class="box" type="flex" align="middle">
    <el-col :span="12" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="12">
      <el-row class="right" type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ? userInfo.photo:img" alt />

        <el-dropdown class="name">
          <span>{{ userInfo.name }}</span>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>Git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      img: require('../../assets/img/404.png')// 默认头像
    }
  },
  created () {
    let token = localStorage.getItem('user-token')// 获取用户令牌
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      this.userInfo = res.data.data
    })
  }

}
</script>

<style lang='less' scoped>
.box {
  height: 60px;
  .left {
    font-size: 20px;
    span {
      font-size: 18px;
    }
  }
  .right {
      line-height: 60px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 6px
    }
  }
}
</style>
