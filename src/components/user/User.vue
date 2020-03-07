<template>
  <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="input-with-select">
         <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table>
          <el-table-column
          label="#"
          width="50px">
          </el-table-column>
          <el-table-column
          label="姓名"
          width="150px">
          </el-table-column><el-table-column
          label="邮箱"
          width="250px">
          </el-table-column><el-table-column
          label="电话"
          width="150px">
          </el-table-column><el-table-column
          label="角色"
          width="100px">
          </el-table-column><el-table-column
          label="状态"
          width="100px">
          </el-table-column><el-table-column
          label="操作"
          width="250px">
          </el-table-column>
      </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      list: ''
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      console.log(11)
    }
  }
}
</script>

<style lang="less" scoped>
.outbox{
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #E9EDF1;
}
.el-table{
  height: 500px;
  width: 100%;
  background-color: #ddd;
}
</style>
