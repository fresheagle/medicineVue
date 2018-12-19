<template>
  <!-- 提交审核弹框 -->
  <el-dialog
    title="提交审核"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <el-form label-width="150px" :model="formData" ref="formData">
        <el-form-item label="请选择审核流程节点">
          <el-select v-model="formData.taskStatus" >
            <el-option
              v-for="item in enumerate.taskStatus"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submitNext">确 定</el-button>
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
        enumerate: enumerate,
        formData: {

        }
      }
    },
    methods: {
      cancelBtn() {
        this.$emit('update:visible', false)
      },
      submitNext() {
        // 提交下一步审核
        doCreateDisBasics(this.formData).then(response => {
          this.$emit('update:visible', false)
          this.$emit('refreshList')
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
