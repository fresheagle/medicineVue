<template>
  <!-- 删除弹框 -->
  <el-dialog
    title="删除"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <el-form label-width="100px" :model="formData" ref="formData">
          <el-form-item label="任务标题" prop="taskTitle">
            <el-input v-model="formData.taskTitle"></el-input>
          </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
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
          'taskStatus': 'drafts',
          'taskType': '',
          'taskMenuType': '',
          'taskTitle': '',
          'taskChangeVote': '',
          'taskChangePoints': '',
          'taskChangeComments': '',
          'taskId': '',
          'jsonStr': {}
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
