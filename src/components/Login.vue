<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form ref="form" :model="loginForm" :rules='loginFormRules'  label-width="0px" class="login_form">
                <el-form-item prop="userName">
                   <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入用户名（长度4-8位）"></el-input>
                 </el-form-item>
                <el-form-item prop="password">
                   <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码（长度6-12位）" type="password"></el-input>
                 </el-form-item>
                 <el-button type="primary" @click="login" round>登陆</el-button>
                 <el-button type="info" @click='reset' round>重置</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 4, max: 8, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 5, max: 8, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    reset: function () {
      this.$refs.form.resetFields()
    },
    login: function () {
      console.log(this)
      this.$refs.form.validate(async (result) => {
        if (result === true) {
          const { data: res } = await this.$axios.post('login', this.loginForm
          )
          console.log(res)
          if (res.meta.status === 200) {
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        } else {
          this.message.error('用户名/密码 错误')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b5b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
        box-shadow: 0 0 150px rgb(4, 247, 247) ;

}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    box-shadow: 0 0 50px rgb(255, 255, 0) ;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: relative;
    top: 40%;
    padding:0 80px;
    text-align: center;
}
</style>
