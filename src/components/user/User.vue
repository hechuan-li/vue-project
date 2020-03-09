<template>
  <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="search">
      <el-col :span="10">
        <el-input placeholder="请输入内容" class="input-with-select">
         <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      </el-col>
      <el-button type="primary" round @click="addUser">添加用户</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="userList" fit>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="#">
            </el-table-column>

          <el-table-column
          prop="username"
          label="姓名">
          </el-table-column>

          <el-table-column
          prop="email"
          label="邮箱">
          </el-table-column>

          <el-table-column
          prop="mobile"
          label="电话">
          </el-table-column>

          <el-table-column
          prop="role_name"
          label="角色">
          </el-table-column>

          <el-table-column label="状态">
          <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state">
            </el-switch></template>

          </el-table-column>

          <el-table-column
          label="操作"
          width="180px">
          <template>
             <el-button type="primary" icon="el-icon-edit" circle></el-button>
             <el-button type="warning" icon="el-icon-setting" circle></el-button>
             <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
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

    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="30%">
    <el-form ref="formRules" :model="addForm" :rules="formRules" >
    <el-form-item prop="username">
      <el-input placeholder="请输入昵称" v-model="addForm.username">
        <template slot="prepend">昵称</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" v-model="addForm.password">
        <template slot="prepend">密码 </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input placeholder="请输入邮箱" v-model="addForm.email">
        <template slot="prepend">邮箱 </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input placeholder="请输入电话" v-model="addForm.mobile">
        <template slot="prepend">电话 </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="formItem" >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-form-item>
  </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data: function () {
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      // 返回一个错误提示
      cb(new Error('请输入合法的手机号码'))
    }

    return {
      userList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      dialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formRules: {
        username: [
          { required: true, message: 'type', trigger: 'blur' },
          { min: 4, max: 12, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, message: '邮箱格式不正确，请重新输入', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, message: '手机号码不正确，请重新输入', trigger: 'blur' }
        ]
      }

    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getList: async function () {
      const { data: res } = await this.$axios.get('/users', { params: this.queryInfo })
      console.log(res)
      this.userList = res.data.users
      this.value = this.userList[0].mg_state
      console.log(this.userList)
      console.log(this.value)
    },
    indexMethod (index) {
      return index + 1
    },
    addUser () {
      this.dialogVisible = false
      console.log(this.$refs)

      // this.$refs.addFormRef.validate(async result => {
      //   if (!result) return this.message.error('请填写完整用户信息')
      //   const { data: res } = await this.$axios.post('users', this.addForm)
      //   console.log(res)
      // })
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
  padding: 20px ;
  box-sizing: border-box;
}
.search{
  margin-top: 20px;
  > .el-button{
  margin-left: 20px;
  text-align: center;
  }
}
.el-table{
  height: 500px;
  width: 100%;
  background-color: #ddd;
  margin-top: 20px;
}
.el-dialog {
  .el-input{
    margin-top: 25px;
  }
  .formItem{
    text-align: center;
    .el-button{
      margin-top: 40px;
    }
  }
}

</style>
