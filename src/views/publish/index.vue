<template>
  <el-card>
    <crumb slot="header">
      <template slot="title">发布文章</template>
    </crumb>
    <!-- 表单 -->
    <el-form ref="myFormData" :model='formData' :rules='rules' style="margin-left:50px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input  v-model="formData.content" type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio label="1">单图</el-radio>
          <el-radio label="3">三图</el-radio>
          <el-radio label="0">无图</el-radio>
          <el-radio label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  prop="channel_id" label="频道">
        <el-select  v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接受频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1自动，0无图，1一张，3三张
          images: [] // 放在地址封面的数组
        },
        channel_id: null // 频道id
      },
      // 校验规则
      rules: {
        title: [{ required: true, message: '文章标题不能为空' }, { min: 5, max: 30, message: '标题的长度应该在5-30之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]

      }
    }
  },
  watch: {
    // 两个地址用一个组价跳转的时候，组件不销毁，但是数据不重置的问题
    $route: function (to, form) {
      if (to.params.articleId) {
      //  articleId存在 是修改
      } else {
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1自动，0无图，1一张，3三张
            images: [] // 放在地址封面的数组
          },
          channel_id: null // 频道id
        }
      }
    }
  },
  methods: {
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发布文章 存到草稿
    publishArticle (draft) {
      this.$refs.myFormData.validate(isOk => {
        if (isOk) {
          // 判断是修改文章还是发布文章
          let { articleId } = this.$route.params // 获取动态路由参数
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // 查询参数
            data: this.formData // 请求体参数
          }).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })

          // this.$axios({
          //   url: '/articles',
          //   method: 'post',
          //   params: { draft }, // 查询参数
          //   data: this.formData // 请求体参数
          // }).then(res => {
          //   this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   })
          //   this.$router.push('/home/articles')
          // })
        }
      })
    },
    // 通过id查询文章数据
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取动态路由参数
    articleId && this.getArticleById(articleId) // 如果id存在，直接查询文章数据
  }
}
</script>

<style lang='less' >
</style>
