<template>
  <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="search">
      <el-col :span="10">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-button type="primary" round @click="addGoods">添加商品</el-button>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="goodsList" fit border>
          <el-table-column type="index" label="#">
          </el-table-column>

          <el-table-column prop="goods_name" label="商品名称"> </el-table-column>

          <el-table-column prop="goods_price" label="商品价格" width="100px"> </el-table-column>

          <el-table-column prop="goods_weight" label="商品重量" width="100px"> </el-table-column>

          <el-table-column prop="add_time" label="创建时间" width="100px"> </el-table-column>

          <el-table-column label="操作" width="180px">
            <template>
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 10, 50, 100]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
      </el-col>
    </el-row>

    <!-- <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="30%">
      <el-form ref="formRules" :model="addForm" :rules="formRules">
        <el-form-item prop="username">
          <el-input placeholder="请输入昵称" v-model="addForm.username">
            <template slot="prepend">昵称</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input placeholder="请输入密码" v-model="addForm.password">
            <template slot="prepend">密码 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input placeholder="请输入邮箱" v-model="addForm.email">
            <template slot="prepend">邮箱 </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-input placeholder="请输入电话" v-model="addForm.mobile">
            <template slot="prepend">电话 </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="formItem">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 926,
      goodsList: []
    }
  },
  created: function () {
    this.getGoodsList()
  },
  methods: {
    addGoods () {
      this.$router.push('/addGoods')
    },
    async getGoodsList () {
      const { data: res } = await this.$axios.get('goods', { params: this.queryInfo })
      console.log(res)
      this.goodsList = res.data.goods
      this.total = this.goodsList.total
    },
    handleSizeChange (newsize) {
      console.log(newsize)
      this.pagenum = newsize
      this.getGoodsList()
    },
    handleCurrentChange (newsize) {
      this.pagesize = newsize
      this.getGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
