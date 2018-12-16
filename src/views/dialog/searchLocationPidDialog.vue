<template>
    <el-dialog
    title="科室信息"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <el-table
        ref="multipleTable"
        :data="dislocationList"
        tooltip-effect="dark"
        @cell-dblclick="handleVersionSelectionChange"
        style="width: 100%">
        <el-table-column prop="dislocationName" label="发病部位">
          <template slot-scope="scope">
            {{scope.row.jsonStr.key.dislocationName}}
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="ID">
          <template slot-scope="scope">
            {{scope.row.jsonStr.key.id}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, prev, pager, next"
           background
           :page-size="10"
           @size-change="handleSizeChange"
           :total="total"
           @current-change="handleCurrentChange"
           style="text-align:center;">
      </el-pagination>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button  @click="cancelBtn">取 消</el-button>
    </span>
  </el-dialog>
</template>


<script>
  import {getDepartmentList, getDislocationList } from '../../api/task'
  export default {
    data() {
      return {
        restaurants: [],
        total: 0,
        page: 1,
        pageSize: 10,
        dislocationList:[],
      }
    },
    created() {
      this.init();
    },
    methods: {
      init(){
        const params={
          currentPage:1,
          pageSize:1000,
        }
        getDislocationList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          this.total = response.data.total
          this.dislocationList = pageList
        })
      },
      cancelBtn(){
        this.$emit("update:visible",false);
      },
      handleVersionSelectionChange(val){
        this.$emit("update:visible",false);
        this.$emit("listenLocationChild",val);
      },
      handleSizeChange(val) {
        this.page = val
        this.init()
      },
      handleCurrentChange(val) {
        this.page = val
        this.init()
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
      },
    },

  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

