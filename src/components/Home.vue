<template>
  <el-container class="home-container">
      <el-header>
        <el-row type="flex" align='middle'>
          <el-col :span="20">
            <el-row :gutter="16" type="flex" align='middle'>
               <el-col :span="6"><img src="../assets/heima.png" alt=""></el-col>
               <el-col :span="8" :offset="6"> <div class="title">黑马商场后台管理</div></el-col>
            </el-row>
          </el-col>
          <el-col :span="4" >
            <el-button type="info" round @click='logout'>退出</el-button>
          </el-col>
        </el-row>
      </el-header>
    <el-container>
      <el-aside width="200px">
        <h5>自定义颜色</h5>
    <el-menu
      background-color="#545c64"
      @open="handleOpen(1)"
      @close="handleClose"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>

    </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout: function () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.message('您已成功退出')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  width: 100%;
  color: #666;
  background-color: #ccc;
  .title{
    font-size: 28px;
  }
}
.el-aside {
  height: 100%;
  color: #ddd;
  background-color: #666;
}

</style>
