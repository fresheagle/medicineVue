<template>
  <!-- 删除弹框 -->
  <el-dialog
    id="examineId"
    title="结算"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <div style="text-align: center;margin-bottom: 10px;">结算选中的数据</div>
      <div>
        <el-form label-width="100px" :model="formData" ref="formData" label-position="top">
          <el-form-item prop="taskTitle">
            <el-form-item >
              <el-radio v-model="formData.settlementResult" label="accounts">结算</el-radio>
              <el-radio v-model="formData.settlementResult" label="unaccounts">不结算</el-radio>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitDelete">确 定</el-button>
      <el-button @click="cancelDelete">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getAccounts } from '../../api/task'
  export default {
    props: {
      curSelectData: {},
      rowData: {},
      curTaskType: ''
    },
    data() {
      return {
        formData: {
          settlementResult: 'accounts'
        },
        curData: []
      }
    },
    methods: {
      cancelDelete() {
        this.$emit('update:visible', false)
      },
      submitDelete() {
        const param = {
          tasks: this.curData,
          accounts: this.formData.settlementResult
        }
        getAccounts(param).then(response => {
          this.$emit('refreshList')
          this.$emit('update:visible', false)
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    watch: {
      curSelectData(newVal, oldVal) {
        const data = newVal
        const result = []
        data.forEach(function(item) {
          result.push(item.taskId)
        })
        this.curData = result
      }
    }
  }
</script>
<style>
  .el-dialog__header{
    background-color: #D4CFCF;
  }
</style>
