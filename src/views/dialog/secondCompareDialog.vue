<template>
  <!-- 版本比对结果弹框 -->
  <el-dialog
    title="版本比对结果"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="80%">
    <div>
      <el-row>
        <el-col :span="12">
          <div >
            <el-row>
              <el-col :span="8" v-for="key in leftVersionKeyArr">
                <span> {{i18n[key]}}:</span>
                <span v-if="leftVersionData[key]===rightVersionData[key]">{{leftVersionData[key]}}</span>
                <span v-else style="color: #ff0000">{{leftVersionData[key]}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            <el-row>
              <el-col :span="8" v-for="key in leftVersionKeyArr">
                <span> {{i18n[key]}}:</span>
                <span>{{rightVersionData[key]}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">关闭</el-button>
      </span>
  </el-dialog>

</template>
<script>
  import { getMissionDetailsList} from '../../api/task'

  export default {
    props:{
      rowData:{},
    },
    data(){
      return {
        multipleVersionData:[],
        leftVersionKeyArr:[],
        leftVersionData:{},
        rightVersionData:{}
      }
    },
    created(){
    },
    methods:{
      init(){

      },
      cancelDelete(){
        this.$emit("update:visible",false)
      },
    },
    watch:{
      rowData(newVal,oldVal)
      {
        debugger
        for (let key in this.leftVersionData) {
          this.leftVersionKeyArr.push(key); //属性
        }
      },
    }
  }
</script>
