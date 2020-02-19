<template>
 <div class="box">
     <div class="img">
            <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <el-menu router="true" background-color='#353b4e' text-color='#adafb5' active-text-color="#ffd04b">
         <el-menu-item>首页</el-menu-item>
         <!-- 内容管理 -->
         <el-submenu index='1'>
             <template slot="title">内容管理</template>
             <el-menu-item index="/home/publish">发布文章</el-menu-item>
             <el-menu-item index="/home/articles">文章列表</el-menu-item>
             <el-menu-item index="/home/comment">评论管理</el-menu-item>
             <el-menu-item index="/home/material">素材管理</el-menu-item>
         </el-submenu>
        <!-- 粉丝管理 -->
         <el-submenu index='2'>
             <template slot="title">粉丝管理</template>
             <el-menu-item index="/home/picture" >图文数据</el-menu-item>
             <el-menu-item>粉丝概况</el-menu-item>
             <el-menu-item>粉丝画像</el-menu-item>
             <el-menu-item>粉丝列表</el-menu-item>
         </el-submenu>
         <el-menu-item index="/home/account">账户信息</el-menu-item>

      </el-menu>
 </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.box{
    width: 230px;
    .el-menu{
 border: none
    }
    .img{
        text-align: center;
        background-color: #2e2f32;
        padding: 10px 0;
        img{
            height: 35px;
        }
    }
}
</style>
