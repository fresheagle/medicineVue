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
                  <el-radio v-model="formData.examineResult" label="1">初审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="2">初审未通过</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="3">二审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="4">二审未通过</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="5">终审通过</el-radio>
                </el-form-item>
                <el-form-item >
                  <el-radio v-model="formData.examineResult" label="6">终审未通过</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="批量审核留言" >
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="formData.examineOpinion">
            </el-input>
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
  import { doCreateDisBasics } from '../../api/task'
  export default {
    props: {
      rowData: {},
      curTaskType: ''
    },
    data() {
      return {
        formData: {
          examineResult: '1',
          examineOpinion: ''
        }
      }
    },
    methods: {
      cancelDelete() {
        this.$emit('update:visible', false)
      },
      submitDelete() {
        this.formData.taskType = this.curTaskType
        this.formData.taskStatus = 'drafts'
        doCreateDisBasics(this.formData).then(response => {
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
      rowData(newVal, oldVal) {
        this.formData = Object.assign({}, newVal)
      }
    }
  }
</script>
<style>
  .el-dialog__header{
    background-color: #D4CFCF;
  }
</style>
