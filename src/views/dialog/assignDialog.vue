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
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { createuser } from '../../api/task'
  export default {
    props: {
      curSelectData: {},
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
      cancel() {
        this.$emit('update:visible', false)
      },
      submit() {
        const params = {
          tasks: this.curData,
          userCode: this.formData.assignUser
        }
        createuser(params).then(response => {
          this.$emit('refreshList')
          this.$emit('update:visible', false)
        })
      },
      querySearchAsync() {},
      handleSelect() {}

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
