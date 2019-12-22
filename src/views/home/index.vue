<template>
  <el-container>
    <el-aside style="width:230px">
      <home-left style="height:100%;background-color:#353b4e"></home-left>
    </el-aside>
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <home-header></home-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main>
<router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import homeLeft from '../../components/home/home-left'
// import homeHeader from '../../components/home/home-header'
export default {
  // components: {
  //   'home-left': homeLeft,
  //   'home-header': homeHeader
  // }
}
</script>

<style>
</style>
