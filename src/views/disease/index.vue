<template>
  <div class="app-container">

    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column prop="taskTitle" label="名称" >
      </el-table-column>
      <el-table-column prop="taskMenuType" label="类型">
      </el-table-column>
      <el-table-column prop="taskStatus" label="状态">
      </el-table-column>
      <el-table-column prop="taskChangeVote" label="通过情况"  >
      </el-table-column>
      <el-table-column prop="taskChangePoints" label="评分">
      </el-table-column>
      <el-table-column prop="taskChangeComments" label="备注">
      </el-table-column>
      <!--<el-table-column  label="状态" width="120" >-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag size="small" :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 1">启用</el-tag>-->
          <!--<el-tag size="small"  :type="scope.row.status | statusFilter" @click="isStatus(scope.$index, scope.row)" v-if="scope.row.status == 2">禁用</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="operation" label="操作 " width="300">
        <!--比对、编辑、提交、驳回、删除-->
        <template slot-scope="scope" >
         <el-button size="small" type="primary"  @click="handleUpdate(scope.row)">编辑</el-button>
         <el-button v-if="scope.row.status!='2'" size="mini" type="success" @click="handleModifyStatus(scope.row,'2')">启用
          </el-button>
          <el-button v-if="scope.row.status!='1'" size="mini" @click="handleModifyStatus(scope.row,'1')">禁用
          </el-button>
          <el-button size="small" type="danger" @click="deleteUpdate(scope.row)">删除</el-button>
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
  </div>
</template>



<script>
import { getList, updateArticle } from '@/api/task'
export default {
  data() {
    return {
      tableList: [],
      listLoading: true,
      isShowEditVisible: false,
      isShowCreateVisible:false,
      deleteVisible: false,
      temp: {
        uid: '',
        cname: '',
        date: '',
        status: ''
      },
      formData:{
        taskStatus:"creating",
        taskType:"",
        taskMenuType:"",
        taskTitle:"",
        taskChangeVote:"",
        taskChangePoints:"",
        taskChangeComments:"",
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
      this.tableList = [{taskId:1,taskTitle: "liming"}]
      this.listLoading = false
      // getList(this.listQuery).then(response => {
      //   const limit = 10
      //   const pageList = response.data.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
      //   console.log(pageList)
      //   this.total = response.data.length
      //   this.tableList = pageList
      //   this.listLoading = false
      // })
    },
    doFilter() {
      if (this.searchName === '') {
        this.fetchData()
        // this.$message.warning('查询条件不能为空！')
        return
      }
      console.log(this.searchName)
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableList.forEach((value, index) => {
        if (value.cname) {
          if (value.cname.indexOf(this.searchName) >= 0) {
            this.filterTableDataEnd.push(value)
            console.log(this.filterTableDataEnd)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.page = 1
      this.total = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
    },
    clickfun(e) {
      console.log(e.target.innerText)
    },
    handleUpdate(row) {
      this.isShowEditVisible = true
      this.temp = Object.assign({}, row)
      console.log(row)
    },
    doCreate(){
      this.isShowCreateVisible=true;
    },
    deleteUpdate(row) {
      console.log(row)
      this.deleteVisible = true
      this.temp = Object.assign({}, row)
      // console.log(row)
    },
    submitDelete() {
      const tempData = Object.assign({}, this.temp)
      console.log(tempData)
      console.log(this.tableList)
      for (const v of this.tableList) {
        if (v.uid === this.temp.uid) {
          const index = this.tableList.indexOf(v)
          this.tableList.splice(index, 1)
          this.fetchData()
          console.log(this.tableList)
          break
        }
      }
      this.deleteVisible = false
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      console.log(row)
      row.status = status
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      console.log(tempData)
      updateArticle(tempData).then(() => {
        for (const v of this.tableList) {
          if (v.uid === this.temp.uid) {
            const index = this.tableList.indexOf(v)
            this.tableList.splice(index, 1, this.temp)
            break
          }
        }
        this.isShowEditVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
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
