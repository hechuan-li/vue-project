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
        <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px;"
        text-color='#eee'
        fill='#333'
        size='large'>
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
      <el-menu
      default-active="125"
      router
      :collapse-transition='false'
      :collapse="isCollapse"
      unique-opened
      background-color="#ddd"
      @open="handleOpen"
      @close="handleClose"
      text-color="#666"
      active-text-color="#000">
      <el-submenu :index="item.id+''" v-for='item in list' :key='item.id'>
        <template slot="title">
          <i :class="icons[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+subItem.path" v-for='subItem in item.children' :key='subItem.id'>
            <i class="el-icon-star-on"></i>
            <span>{{subItem.authName}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      list: '',
      icons: {
        125: 'el-icon-s-custom',
        103: 'el-icon-lock',
        101: 'el-icon-loading',
        102: 'el-icon-files',
        145: 'el-icon-view'
      },
      isCollapse: false
    }
  },
  created: function () {
    this.getItem()
  },
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
    },
    getItem: async function () {
      const { data: res } = await this.$axios.get('menus')
      this.list = res.data
      console.log(res)
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
  border-radius: 10px;
}
.title{
    font-size: 20px;
  }
.el-aside {
  height: 100%;
  color: #ddd;
  background-color: #666;
  border-radius: 10px;
}
.el-menu {
  border-right: 0px;
  border-radius: 10px;
}
.el-radio-group{
  width: 100%;
  margin: 10px auto;
  text-align: center;
}
.el-main{
  padding:10px;
}
</style>
