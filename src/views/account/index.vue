<template>
  <el-card>
    <crumb slot="header">
      <template slot="title">账户信息</template>
    </crumb>
    <!-- 表单 -->
    <el-form style="margin-left:100px" label-width="100px">
      <el-form-item label="用户名">
        <el-input style="width:40%" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input style="width:40%" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width:40%" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input disabled style="width:40%" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <!-- 上传组件 -->
    <el-upload class="head-upload" action :show-file-list="false">
      <img :src="formData.photo  ? formData.photo :  defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    get () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style lang='less' scoped>
.head-upload {
  width: 300px;
  height: 300px;

  position: absolute;
  top: 150px;
  right: 80px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
