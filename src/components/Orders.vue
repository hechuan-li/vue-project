<template>
  <div class="outbox">
    <div class="outbox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card class="box-card">
        <el-row class="search">
          <el-col :span="10">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table :data="orderList.goods" fit border>
              <el-table-column type="index"> </el-table-column>

              <el-table-column prop="order_number" label="订单编号">
              </el-table-column>

              <el-table-column prop="order_price" label="订单价格">
              </el-table-column>

              <el-table-column prop="order_pay" label="是否付款">
              </el-table-column>

              <el-table-column prop="create_time" label="创建时间">
              </el-table-column>

              <el-table-column label="操作">
                <template>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="editOrder"
                  ></el-button>
                  <el-button
                    type="warning"
                    icon="el-icon-setting"
                    circle
                    @click="checkLogistic"
                  ></el-button>
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
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog title="editOrder" :visible.sync="dialogVisible">
      <span class="demonstration">省/市/区/县</span>
      <el-cascader
        v-model="addressValues"
        :options="cityData"
        @change="handleChange"
      ></el-cascader>
    </el-dialog>
  </div>
</template>

<script>
import citydata from './citydata'
export default {
  data: function () {
    return {
      orderList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      dialogVisible: false,
      addressValues: [],
      options: {
        label: 'consignee_addr',
        children: 'children'
      },
      cityData: citydata

    }
  },
  created: function () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$axios.get('orders', {
        params: this.queryInfo
      })
      console.log(res)
      this.total = res.data.total
      this.orderList = res.data
    },
    handleCurrentChange (currentPage) {
      this.queryInfo.pagenum = currentPage
      this.getOrderList()
    },
    handleSizeChange (currentSize) {
      this.queryInfo.pagesize = currentSize
      this.getOrderList()
    },
    editOrder () {
      console.log('11')
      this.dialogVisible = true
    },
    handleChange (value) {
      console.log(value)
    },
    async checkLogistic () {
      const { data: res } = await this.$axios.get('/kuaidi/75334863483157')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  margin: 20px 0;
}
.el-dialog__body {
  height: 300px;
}
</style>
