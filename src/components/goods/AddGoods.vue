<template>
  <div class="outbox">
    <div class="outbox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card class="box-card">
        <el-alert
          title="添加商品信息"
          type="info"
          show-icon
          :closable="false"
          center
        >
        </el-alert>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-steps :active="2" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <el-row>
            <el-col >
              <el-tabs tab-position="left" stretch>
                <el-tab-pane label="基本信息">
                  <el-form-item  label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item  label="商品价格" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item  label="商品重量" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item  label="商品数量" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数">基本信息</el-tab-pane>
                <el-tab-pane label="商品属性">商品属性</el-tab-pane>
                <el-tab-pane label="商品照片">商品照片</el-tab-pane>
                <el-tab-pane label="商品内容">商品内容</el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      rules: {
        goods_name: [
          { required: true }
        ],
        goods_price: [
          { required: true }
        ],
        goods_number: [
          { required: true }
        ],
        goods_weight: [
          { required: true }
        ]
      },
      ruleForm: {
        goods_name: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 20px 0;
}
.el-card {
  // height: 500px;
}
</style>
