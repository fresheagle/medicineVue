<template>
  <!-- 删除弹框 -->
  <el-dialog
    id="examineId"
    title="上线"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <div style="text-align: center;margin-bottom: 10px;">是否对选中数据执行下线操作</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { doApproval } from '../../api/task'
  export default {
    props: {
      curSelectData: {},
      rowData: {},
      curTaskType: ''
    },
    data() {
      return {
        formData: {
          settlementResult: '1',
          curData: [],
          formData: {
            examineResult: 'firAuditedSuccess',
            approveMessage: ''
          }
        }
      }
    },
    methods: {
      cancel() {
        this.$emit('update:visible', false)
      },
      submit() {
        this.formData.taskType = this.curTaskType
        this.formData.taskStatus = 'online'
        const param = {
          tasks: this.curData,
          trailStatus: this.formData.examineResult,
          approveMessage: this.formData.approveMessage
        }
        doApproval(param).then(response => {
          this.$emit('refreshList')
          this.$emit('update:visible', false)
        })
      }
    },
    watch: {
      rowData(newVal, oldVal) {
        this.formData = Object.assign({}, newVal)
      },
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
