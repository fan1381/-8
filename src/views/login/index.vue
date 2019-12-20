<template>
  <div class="login">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">

        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input style="width:60%" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login_submit">登 录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
    <!-- 表单 -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否被勾选
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        check: [
          {
            validator: function (rule, value, callback) {
              if (value) {
                callback()
              } else {
                callback(new Error('您还没有勾选协议哦'))
              }
            }
          }
        ]
      }

    }
  },
  methods: {
    login_submit () {
      this.$refs.myForm.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            window.localStorage.setItem('user-token', res.data.data.token)
          }).catch(res => {})
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/logo.png");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 440px;
    height: 400px;
    .title {
      text-align: center;
      margin-bottom: 20px;
      img {
        height: 45px;
      }
    }
  }
}
</style>
