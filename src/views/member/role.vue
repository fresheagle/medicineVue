<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item >
          <el-input placeholder="姓名" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="doCreate()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中"
              size="tiny" style="width: 100%;">
      <el-table-column prop="rolecode" label="编号" ></el-table-column>
      <el-table-column prop="rolename" label="名称">
      </el-table-column>
      <el-table-column prop="operation" label="操作 " width="300">
        <template slot-scope="scope" >
         <el-button size="small" type="text"  @click="handleUpdate(scope.row)">编辑</el-button>
          <!--<el-button size="small" type="text" @click="deleteUpdate(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
        background
        :page-size="10"
        @size-change="handleSizeChange"
        :total="total"
        @current-change="handleCurrentChange"
        style="text-align:center;">
    </el-pagination>

    <!-- 新增数据 -->
    <el-dialog title="新增" :visible.sync="isShowCreateVisible" :append-to-body="true">
      <el-form label-width="80px" :model="formData" ref="formData">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="formData.rolename"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowCreateVisible = false">取消</el-button>
        <el-button type="primary" :loading="listLoading" class="title1" @click="doAddSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog title="编辑" :visible.sync="isShowEditVisible" :append-to-body="true">
      <el-form label-width="80px" :model="formData" ref="formData">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="formData.rolename"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取消</el-button>
        <el-button type="primary" :loading="listLoading" class="title1" @click="doEditSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteVisible" :append-to-body="true"
      width="30%">
      <span>确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import { getRoleList, toAddRole, toDeleteRole, toEditRole } from '@/api/member'
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      isShowCreateVisible: false,
      deleteVisible: false,
      temp: { },
      curRow: {},
      formData: {
        rolename: ''
      },
      total: 0,
      page: 1,
      pageSize: 10,
      status: [
        {
          statusId: 1,
          label: '启用'
        }, {
          statusId: 0,
          label: '禁用'
        }
      ],
      value: '',
      searchName: '',
      filterTableDataEnd: []
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const params = {
        currentPage: 1,
        pageSize: 1000
      }
      getRoleList(params).then(response => {
        const limit = 10
        const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
        this.total = response.data.total
        this.tableList = pageList
        this.listLoading = false
      })
    },
    doCreate() {
      this.isShowCreateVisible = true
    },
    doAddSubmit() {
      toAddRole(this.formData).then(response => {
        this.isShowCreateVisible = false
        this.fetchData()
      })
    },
    doFilter() {
      if (this.searchName === '') {
        this.fetchData()
        return
      }
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableList.forEach((value, index) => {
        if (value.rolename) {
          if (value.rolename.indexOf(this.searchName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.page = 1
      this.total = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
    },
    handleUpdate(row) {
      this.isShowEditVisible = true
      this.formData = Object.assign({}, row)
    },
    deleteUpdate(row) {
      this.deleteVisible = true
      this.curRow = Object.assign({}, row)
    },
    deleteSubmit() {
      toDeleteRole(this.curRow).then(response => {
        this.deleteVisible = false
        this.fetchData()
      })
    },
    doEditSubmit() {
      toEditRole(this.formData).then(response => {
        this.isShowEditVisible = false
        this.fetchData()
      })
    },
    handleSizeChange(val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page = val
      console.log(this.page)
      this.fetchData()
    },
    currentChangePage(list) {
      let from = (this.page - 1) * this.pageSize
      const to = this.page * this.pageSize
      this.tableList = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableList.push(list[from])
        }
      }
    }
  }
}
</script>
