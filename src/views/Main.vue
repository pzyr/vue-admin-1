<template>
    <div>
      <el-container>
        <el-aside width="auto">
          <Menu/>
        </el-aside>
        <el-container>
          <el-header>
            <Header/>
          </el-header>
            <Tag/>
          <el-main>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Header from '../components/Header.vue'
import Tag from '../components/Tag.vue'
  export default{
    data(){
      return{}
    },
    components: {
      Menu,
      Header,
      Tag
  }
  }
</script>
<style lang="less" scoped>
  .el-header{
    padding: 0;
  }
</style>
