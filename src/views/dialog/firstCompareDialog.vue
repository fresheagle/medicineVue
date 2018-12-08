<template>
  <!-- 对比弹框 -->
  <el-dialog
    title="版本比对"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <div>
      <el-table
        ref="multipleTable"
        :data="rowData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleVersionSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column  prop="taskTitle" label="标题" ></el-table-column>
        <el-table-column  prop="taskVersion" label="版本"> </el-table-column>
        <el-table-column  prop="taskMenuType" label="数据源"  show-overflow-tooltip> </el-table-column>
      </el-table>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button  @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="compareOk">确 定</el-button>
      </span>
  </el-dialog>
</template>
<script>
  export default {
    props:{
      // rowData:{
      //   type:Array,
      // },

    },
    data(){
      return {
        rowData:{},
        formData:{
          "taskStatus":"",
          "taskType":"",
          "taskMenuType":"missDisease",
          "taskTitle":"",
          "taskChangeVote":"",
          "taskChangePoints":"",
          "taskChangeComments":"",
          "jsonStr":{
            "symptomMapDTO":{
              "symptomId":"",
              "symptomChineseName":"",
              "symptomEnglishName":"",
            },
            "missDisease":{
              "taskId":"",
              "id":"",
              "chineseName":"",
              "englishName":"",
              "otherName":"",
              "latinName":"",
              "relatedDiseases":"",
              "diseaseType":"chinese",
              "locationPid":"",
              "locationDisease":"",
              "mainCauses":"",
              "commonSymptom":"",
              "multiplePopulation":"",
              "infectivity":1,
              "seaCharacteristic":"",
              "departmentPid":"",
              "departmentId":"",
              "clinicalTypesClass":"",
              "clinicalManifestation":"",
              "sign":"",
              "laboratoryExamination":"",
              "diagnosticPoints":"",
              "differentialDiagnosis":"",
              "preventionTreatment":"",
              "treatmentPrognosis":"",
              "preventiveNursing":"",
              "nursing":"",
              "preventionMeasures":"",
              "dietaryConditioning":"",
              "drugResistance":"",
              "attentionMatter":"",
              "picturePath":"",
              "thumbnail":"",
              "dataStatus":"",
            }
          },
        },
        versionData:[]
      }
    },
    created(){

    },
    methods:{
      cancelDelete(){
        this.$emit("update:visible",false)
      },
      compareOk(){
        for (let key in this.leftVersionData) {
          this.leftVersionKeyArr.push(key); //属性
        }
        this.isShowComResoultDialog=true;
      },
      handleVersionSelectionChange(val){
        this.multipleSelection = val;
      },
    },
    watch:{
      rowData(newVal,oldVal)
      {
        debugger
        this.versionData=Object.assign({}, newVal)
      },
    }
  }
</script>
