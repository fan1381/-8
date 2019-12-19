<template>
  <div class="login">
      <!-- 卡片 -->
<el-card class="box-card">
    <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
    </div>
    <el-form>
    <el-form-item>
        <el-input v-model="input" placeholder="请输入手机号"></el-input>
    </el-form-item>
     <el-form-item>
        <el-input style="width:60%" v-model="input" placeholder="请输入验证码"></el-input>
     <el-button style="float:right">发送验证码</el-button>
    </el-form-item>

    <el-form-item>
 <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>

<el-form-item>
 <el-button style="width:100%" type="primary">登 录</el-button>

</el-form-item>
</el-form>
</el-card>
<!-- 表单 -->

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login{
    background-image: url('../../assets/img/logo.png');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
.box-card{
    width: 440px;
    height: 400px;
    .title{
      text-align: center;
      margin-bottom: 20px;
      img{
        height: 45px;
      }
    }
}
}
</style>
