<template>

<el-container>
    <el-aside>
        <home-left style='height:100vh;background-color:#353b4e'></home-left>
    </el-aside>
<el-container>
    <el-header>header</el-header>
    <el-main>zhuyao</el-main>
</el-container>
</el-container>
</template>

<script>
import homeLeft from '../../components/home/home-left'
export default {
  components: {
    'home-left': homeLeft
  }
}
</script>

<style>

</style>
