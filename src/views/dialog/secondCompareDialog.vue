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
            <div style="margin-bottom: 10px;font-size: 18px;font-weight: 600;">变更前：</div>
            <el-row>
              <el-col :span="8" v-for="key in versionKeyArr">
                <span> {{i18n[key]  || key}} :</span>
                <span v-if="beforejson[key]===afterjson[key]">{{beforejson[key]}}</span>
                <span v-else style="color: #ff0000">{{beforejson[key]}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div >
            <div style="margin-bottom: 10px;font-size: 18px;font-weight: 600;">变更后：</div>
            <el-row>
              <el-col :span="8" v-for="key in versionKeyArr">
                <span> {{i18n[key] || key}} :</span>
                <span>{{afterjson[key]}}</span>
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
  import i18n from '../../i18n/local'
  const viewName = 'i18nView'

  export default {
    props:{
      rowData:{},
    },
    data(){
      return {
        i18n:i18n.zh.i18nView,
        multipleVersionData:[],
        beforejson:{},
        afterjson:{},
        versionKeyArr:[],
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
        const missionDetails = newVal;
        this.beforejson=missionDetails.jsonStr.taskchangebeforejson.missDisease;
        this.afterjson=missionDetails.jsonStr.taskchangeafterjson.missDisease;
        for (let key in this.beforejson) {
          this.versionKeyArr.push(key); //属性
        }
      },
    }
  }
</script>
