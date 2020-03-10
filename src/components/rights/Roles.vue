<template>
 <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item >用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-button type="success" @click="addRole">添加角色</el-button>
      <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">

          <el-row v-for="(item1) in scope.row.children" :key="item1.id">
            <el-col :span="6" class="tag">
              <el-tag closable>{{item1.authName}}</el-tag>
            </el-col>

            <el-col :span="18">
              <el-row v-for="(item2) in item1.children" :key="item2.id">
                <el-col :span="6" class="tag">
                  <el-tag closable>{{item2.authName}}</el-tag>
                </el-col>

                <el-col :span="18" >
                  <el-row v-for="(item3) in item2.children" :key="item3.id">
                    <el-tag closable>{{item3.authName}}</el-tag>
                  </el-row>
                </el-col>

              </el-row>
            </el-col>
          </el-row>

        </template>
      </el-table-column>

      <el-table-column
      label="#"
        type="index">
      </el-table-column>

      <el-table-column
      prop="roleName"
        label="角色名称">
      </el-table-column>

      <el-table-column
      prop="roleDesc"
      label="角色描述">
      </el-table-column>

      <el-table-column
      width="300px"
      label="操作">
        <el-button type="success" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        <template slot-scope="scope">
        <el-button type="warning" icon="el-icon-s-tools" size="mini" @click="assignRight(scope.row.id)">分配权限</el-button>
        </template>
      </el-table-column>

      </el-table>
    </el-card>
  <!-- dialog -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-tree
      default-expand-all
        :data="currentRole"
        show-checkbox
        node-key="id"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </el-dialog>

 </div>
</template>

<script>
export default {
  data: function () {
    return {
      respondsData: '',
      roleList: [],
      tagName: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      treeData: '',
      currentRole: []
    }
  },
  created: function () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data: res } = await this.$axios.get('roles')
      this.respondsData = res
      console.log(res)
      this.roleList = res.data
      console.log(this.roleList)
    },
    addRole () {
      console.log('addrole')
    },
    async assignRight (id) {
      this.dialogVisible = true
      const { data: res } = await this.$axios.get('rights/tree')
      console.log(res)
      this.currentRole = res.data

      var checkedRole
      for (let i = 0; i < this.roleList.length; i++) {
        if (this.roleList[i].id === id) {
          checkedRole = this.roleList[i]
        }
      }

      console.log(checkedRole)
    },
    handleClose () {
      this.currentRole = []
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
.el-col{
  margin: 10px 0;
}
.tag {
  border-bottom: 1px solid black;
}
</style>
