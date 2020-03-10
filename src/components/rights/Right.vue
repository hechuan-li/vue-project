<template>
 <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item >用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-table
      :data="rightList"
      style="width: 100%">
      <el-table-column
      label="#"
        type="index">
      </el-table-column>

      <el-table-column
        label="权限名称"
        prop="authName">
      </el-table-column>

      <el-table-column
      label="路径"
      prop="path">
      </el-table-column>

      <el-table-column
      label="权限等级"
       prop="level">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.level == 0">等级一</el-tag>
          <el-tag type="war" v-if="scope.row.level ==1">等级二</el-tag>
          <el-tag type="warning" v-if="scope.row.level ==2">等级三</el-tag>
        </template>
      </el-table-column>
      </el-table>
    </el-card>
 </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 注意这个地方一点要是一个空数组，不然会报错
      rightList: []
    }
  },
  created: function () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const { data: res } = await this.$axios.get('rights/list')
      console.log(res)
      this.rightList = res.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>
