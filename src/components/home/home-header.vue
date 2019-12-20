<template>
  <el-row class="box" type="flex" align="middle">
    <el-col :span="12" class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="12">
      <el-row class="right" type="flex" justify="end" align="middle">
        <img src="../../assets/img/home.jpeg" alt />

        <el-dropdown class="name">
          <span>光头强</span>
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
export default {}
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
