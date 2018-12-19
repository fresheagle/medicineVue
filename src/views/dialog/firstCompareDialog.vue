<template>
  <!-- 对比弹框 -->
  <div>
    <el-dialog
      title="版本比对"
      v-bind="$attrs"
      v-on="$listeners"
      :append-to-body="true"
      width="60%">
      <div>
        <el-table
          ref="multipleTable"
          :data="multipleVersionData"
          tooltip-effect="dark"
          style="width: 100%"
          @cell-dblclick="handleVersionSelectionChange">
          <el-table-column prop="taskmenutype" label="类型">
            <template slot-scope="scope">
              {{scope.row.jsonStr.taskmenutype}}
            </template>
          </el-table-column>
          <el-table-column prop="taskstatuschangebefore" label="变更前">
            <template slot-scope="scope">
              {{scope.row.jsonStr.taskstatuschangebefore}}
            </template>
          </el-table-column>
          <el-table-column prop="taskstatuschangeafter" label="变更后">
            <template slot-scope="scope">
              {{scope.row.jsonStr.taskstatuschangeafter}}
            </template>
          </el-table-column>
          <el-table-column prop="taskchangeday" label="变更时间">
            <template slot-scope="scope">
              {{scope.row.jsonStr.taskchangeday}}
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
        <el-button  @click="cancelDelete">取 消</el-button>
        <!--<el-button type="primary" @click="compareOk">确 定</el-button>-->
      </span>
    </el-dialog>

    <second-compare-dialog :visible.sync="isShowComResoultDialog" :row-data="curRowData"></second-compare-dialog>

  </div>

</template>
<script>
  import { getMissionDetailsList } from '../../api/task'
  import secondCompareDialog from './secondCompareDialog'

  export default {
    components: {
      secondCompareDialog
    },
    props: {
      rowData: {}
    },
    data() {
      return {
        multipleVersionData: [],
        isShowComResoultDialog: false,
        total: 0,
        page: 1,
        pageSize: 10,
        curRowData: {}
      }
    },
    created() {
    },
    methods: {
      init(taskId) {
        const params = {
          currentPage: 1,
          pageSize: 1000,
          taskId: taskId
        }
        getMissionDetailsList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          this.total = response.data.total
          this.multipleVersionData = pageList
        })
      },
      cancelDelete() {
        this.$emit('update:visible', false)
      },
      compareOk() {
        for (const key in this.leftVersionData) {
          this.leftVersionKeyArr.push(key) // 属性
        }
        this.isShowComResoultDialog = true
      },
      handleVersionSelectionChange(val) {
        this.$emit('update:visible', false)
        this.isShowComResoultDialog = true
        this.curRowData = val
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
      }
    },
    watch: {
      rowData(newVal, oldVal) {
        if (newVal.taskId) {
          this.init(newVal.taskId)
        }
      }
    }
  }
</script>
