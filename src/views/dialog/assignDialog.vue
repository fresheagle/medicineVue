<template>
  <!-- 删除弹框 -->
  <el-dialog
    id="examineId"
    title="指派新作者"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <el-form :model="formData" ref="formData" label-width="100px">
        <el-form-item label="账号搜索" >
          <el-autocomplete
            v-model="formData.assignUser"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div>
        <span>确定要将选中的数据指派给:</span>
        <span style="color: red;">{{formData.assignUser}}</span>
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
          assignUser: ''
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
      },
      querySearchAsync() {},
      handleSelect() {}

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
