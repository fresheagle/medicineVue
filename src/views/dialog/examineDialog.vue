<template>
  <!-- 删除弹框 -->
  <el-dialog
    id="examineId"
    title="审核"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <div style="text-align: center;margin-bottom: 10px;">审核选中的数据</div>
      <div>
        <el-form label-width="100px" :model="formData" ref="formData" label-position="top">
          <el-form-item prop="taskTitle">
            <el-row>
              <el-col :span="8">
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="firAuditedSuccess">初审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="firAuditedFailed">初审未通过</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="secAuditedSuccess">二审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="secAuditedFailed">二审未通过</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="finished">终审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="finalAuditedFailed">终审未通过</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="批量审核留言" >
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="formData.approveMessage">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitOk">确 定</el-button>
      <el-button @click="cancelDelete">取 消</el-button>
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
          examineResult: 'firAuditedSuccess',
          approveMessage: ''
        },
        curData: []
      }
    },
    methods: {
      cancelDelete() {
        this.$emit('update:visible', false)
      },
      submitOk() {
        this.formData.taskType = this.curTaskType
        this.formData.taskStatus = 'drafts'
        const param = {
          tasks: this.curData, // ['89c839e3314844aebd28b44b20b23e02', '90efde928a224716b604bb5271f5a250'],
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
      curSelectData(newVal, oldVal) {
        const data = newVal
        const result = []
        data.forEach(function(item) {
          result.push(item.taskId)
        })
        this.curData = result
        debugger
      }
    }
  }
</script>
<style>
  .el-dialog__header{
    background-color: #D4CFCF;
  }
</style>
