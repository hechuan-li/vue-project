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
          title="注意：只允许为第三级分类设置相关参数"
          type="warning"
          show-icon
          :closable="false"
        >
        </el-alert>
        <el-row class="cat-select">
          <el-col>
            <span>选择商品分类</span>
            <el-cascader
              v-model="selectedItem"
              :options="cateList"
              :props="cateProps"
              height="300px"
              @change="handleChange"
            ></el-cascader>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tabs
              type="border-card"
              v-model="activeName"
              @click="handleClick"
            >
              <el-tab-pane label="动态参数" name="many">
                <el-button type="success" :disabled="isBtnDisabled"
                  >添加参数</el-button
                >
                <el-table :data="itemData" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-tag >{{scope.row.attr_name}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column type="index"> </el-table-column>
                  <el-table-column prop="attr_name" label="参数名称">
                  </el-table-column>
                  <el-table-column label="操作"> </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="静态属性" name="only" v-model="activeName">
                <el-button type="success" :disabled="isBtnDisabled"
                  >添加属性</el-button
                >
                <el-table :data="itemData" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-tag >{{scope.row.attr_vals}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column type="index"> </el-table-column>
                  <el-table-column prop="attr_vals" label="属性名称">
                  </el-table-column>
                  <el-table-column label="操作"> </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedItem: [],
      activeName: 'many',
      itemData: [],
      attrValues: []
    }
  },
  created: function () {
    this.getParamsList()
  },
  computed: {
    isBtnDisabled () {
      if (this.selectedItem.length === 3) {
        return false
      }
      return true
    },
    cateId () {
      if (this.selectedItem.length === 3) {
        return this.selectedItem[this.selectedItem.length - 1]
      } else {
        return null
      }
    }
  },
  methods: {
    async getParamsList () {
      const { data: res } = await this.$axios.get('categories')
      this.cateList = res.data
      console.log(this.cateList)
    },
    async handleChange () {
      console.log(this.selectedItem)
      const {
        data: res
      } = await this.$axios.get(`categories/${this.cateId}/attributes`, {
        params: { sel: this.activeName }
      })
      console.log(res)
      this.itemData = res.data
      // this.attrValues = this.itemData.attr_vals.split(',')
      if (this.selectedItem === 3) {
        console.log('333')
      } else {
        return this.message('请选择三级属性')
      }
    },
    handleClick () {
      console.log('11')
    }
  }
}
</script>

<style lang="less" scoped>
.el-tabs {
  margin-top: 20px;
}
</style>
