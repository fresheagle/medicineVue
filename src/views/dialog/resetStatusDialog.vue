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
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { resetBatch } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  export default {
    props: {
      curSelectData: {},
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
        },
        curData: []
      }
    },
    methods: {
      cancel() {
        this.$emit('update:visible', false)
      },
      submit() {
        const params = {
          tasks: this.curData,
          resetStatus: this.formData.resetStatusResult,
          trialUser: this.formData.trialUser
        }
        resetBatch(params).then(response => {
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
      }
    }
  }
</script>
<style>
  .el-dialog__header{
    background-color: #D4CFCF;
  }
</style>
