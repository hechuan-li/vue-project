<template>
  <div class="outbox">
     <div class="outbox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item >用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-button type="success" @click="addCategories">添加分类</el-button>
      <tree-table
        :columns="columns"
        :data="categoryList"
        :selection-type='false'
        :expand-type='false'
        :show-index='true'
        :border='true'>
          <template slot="valid" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_delete === false" style="color:blue;"></i>
            <i class="el-icon-error" v-else ></i>
          </template>

          <template slot="order" slot-scope="scope">
            <el-tag type="success" v-if="scope.row.cat_level === 0">等级一</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 1">等级二</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 2">等级三</el-tag>
          </template>

          <template slot="conduct" >
            <el-button type="success" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </tree-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="queryInfo.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card>

 </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      categoryList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'valid'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'conduct'
        }
      ]
    }
  },
  created: function () {
    this.getCateList()
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$axios.get('categories', { params: this.queryInfo })
      console.log(res)
      this.categoryList = res.data.result
      this.total = res.data.total
    },
    addCategories () {
      console.log('add')
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
