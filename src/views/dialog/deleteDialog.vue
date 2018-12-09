<template>
  <!-- 删除弹框 -->
  <el-dialog
    title="删除"
    v-bind="$attrs"
    v-on="$listeners"
    :append-to-body="true"
    width="30%">
    <span>确认删除吗</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="submitDelete">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import {doCreateDisBasics } from '../../api/task'
  export default {
    props:{
      rowData:{},
      curTaskType:"",
    },
    data(){
      return {
        formData:{
          "taskStatus":"",
          "taskType":"",
          "taskMenuType":"missDisease",
          "taskTitle":"",
          "taskChangeVote":"",
          "taskChangePoints":"",
          "taskChangeComments":"",
          "taskId":"",
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
      }
    },
    methods:{
      cancelDelete(){
        this.$emit("update:visible",false)
      },
      submitDelete() {
        this.formData.taskType=this.curTaskType;
        doCreateDisBasics(this.formData).then(response => {
          this.$emit("update:visible",false);
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
    },
    watch:{
      rowData(newVal,oldVal)
      {
        this.formData=Object.assign({}, newVal)
      },
    }
  };
</script>
