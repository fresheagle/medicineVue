<template>
  <!-- 删除弹框 -->
  <el-dialog
    id="examineId"
    title="重置状态"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <div>
        <el-form :model="formData" ref="formData" label-position="top">
          <el-form-item>
            <div style="float: left;">
              修改状态:
            </div>
            <div style="margin-left: 80px;">
              <el-radio-group v-model="formData.resetStatusResult" v-for="item in taskStatus" style="width: 100px;">
                <el-radio :label="item.key">{{item.value}}</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="float: left;">
              解绑审核者:
            </div>
            <div style="margin-left: 80px;">
              <el-checkbox-group v-model="formData.trialUser" v-for="item in trialUserList">
                <el-checkbox :label="item.key">{{item.value}}</el-checkbox>
              </el-checkbox-group>
            </div>
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
  import enumerate from '../../store/modules/enumerate'
  export default {
    props: {
      rowData: {},
      curTaskType: ''
    },
    data() {
      return {
        taskStatus: enumerate.taskStatus,
        trialUserList: enumerate.trialUserList,
        formData: {
          resetStatusResult: 'drafts',
          trialUser: []
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
