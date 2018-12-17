<template>
  <div>
    <el-dialog title="新增中西医疾病"
               v-bind="$attrs"
               v-on="$listeners"
               :append-to-body="true" width="80%" top="10vh">
      <el-form label-width="120px" :model="formData" ref="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务标题" prop="taskTitle">
              <el-input v-model="formData.taskTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.epidemiology" prop="epidemiology">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.epidemiology" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('epidemiology')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.tRelatedDiseases" prop="tRelatedDiseases">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.tRelatedDiseases" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('tRelatedDiseases')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.etiologyPathogenesis" prop="etiologyPathogenesis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.etiologyPathogenesis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('etiologyPathogenesis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.pathology" prop="pathology">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.pathology" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('pathology')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.clinicalTypesClass"  prop="clinicalTypesClass">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.clinicalTypesClass" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalTypesClass')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.clinicalManifestation"  prop="clinicalManifestation">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.clinicalManifestation" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalManifestation')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.symptom" prop="symptom">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.symptom" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('symptom')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.sign" prop="sign">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.sign" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('sign')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.laboratoryExamination"  prop="laboratoryExamination">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.laboratoryExamination" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('laboratoryExamination')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.textOtherCheck" prop="textOtherCheck">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.textOtherCheck" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('textOtherCheck')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.diagnosticPoints"  prop="diagnosticPoints">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.diagnosticPoints" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('diagnosticPoints')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.differentialDiagnosis" prop="differentialDiagnosis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.differentialDiagnosis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('differentialDiagnosis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.preventionTreatment" prop="preventionTreatment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.preventionTreatment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventionTreatment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.treatmentPrognosis" prop="treatmentPrognosis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.treatmentPrognosis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatmentPrognosis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.management" prop="management">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.management" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('management')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.preventiveNursing" prop="preventiveNursing">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.preventiveNursing" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventiveNursing')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="i18n.nursing" prop="nursing">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.nursing" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('nursing')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.preventionMeasures" prop="preventionMeasures">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.preventionMeasures" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventionMeasures')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.modernResearch" prop="modernResearch">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.modernResearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('modernResearch')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.dataReference" prop="dataReference">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.dataReference" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dataReference')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.drugResistance" prop="drugResistance">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.drugResistance" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('drugResistance')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.dietaryConditioning" prop="dietaryConditioning">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.dietaryConditioning" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dietaryConditioning')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.attentionMatter" prop="attentionMatter">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missCombineDisease.attentionMatter" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('attentionMatter')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取消</el-button>
        <el-button type="primary" @click="createOK" class="title1">保存</el-button>
        <el-button type="primary" @click="submitOK" class="title1">提交</el-button>
      </div>
    </el-dialog>
    <search-department-dialog :visible.sync="isShowDepartmentDialog" v-on:listenToChild="listenToChild"></search-department-dialog>
    <search-location-pid-dialog  :visible.sync="isShowLocationPidDialog" v-on:listenLocationChild="listenLocationChild"></search-location-pid-dialog>
    <quill-editor-dialog :visible.sync="isShowquillEditorDialog" v-on:listenToChildquillEditor="listenToChildquillEditor"
                         :cur-input-content="curInputContent"></quill-editor-dialog>
  </div>
</template>


<script>
  import {getDepartmentList, doCreateDisBasics, getDislocationList } from '../../../api/task'

  import searchDepartmentDialog from '../../dialog/searchDepartmentDialog'
  import searchLocationPidDialog from '../../dialog/searchLocationPidDialog'
  import quillEditorDialog from '../../dialog/quillEditorDialog'

  import enumerate from '../../../store/modules/enumerate'
  import i18n from '../../../i18n/local'
  const viewName = 'i18nView'

  export default {
    components: {
      searchDepartmentDialog,
      searchLocationPidDialog,
      quillEditorDialog,
    },
    props:{
      rowData:{},
      curTaskType:"",
    },
    data() {
      return {
        enumerate:enumerate,
        i18n:i18n.zh.i18nView,
        formData: {
          "taskStatus": "",
          "taskType": "",
          "taskMenuType": "missCombineDisease",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId":"",
          "jsonStr": {
            "missCombineDisease":{
              "taskId":"",
              "id": "",
              "epidemiology":"",
              "tRelatedDiseases":"",
              "etiologyPathogenesis":"",
              "pathology":"",
              "clinicalTypesClass":"",
              "clinicalManifestation":"",
              "symptom":"",
              "sign":"",
              "laboratoryExamination": "",
              "textOtherCheck":"",
              "diagnosticPoints":"",
              "differentialDiagnosis":"",
              "preventionTreatment":"",
              "treatmentPrognosis":"",
              "management":"",
              "preventiveNursing":"",
              "nursing":"",
              "preventionMeasures":"",
              "modernResearch":"",
              "drugResistance":"",
              "dietaryConditioning":"",
              "attentionMatter":"",
              "dataReference":"",
              "datastatus":"",
            }
          },
        },
        isShowDepartmentDialog:false,
        isShowquillEditorDialog:false,
        isShowLocationPidDialog:false,
        total: 0,
        page: 1,
        pageSize: 10,
        multipleSelection:[],
        departmentList:[],
        dislocationList:[],
        curInputKey:"",
        curInputContent:"",
        locationPidtoChinese:"",
        departmentPidtoChinese:"",
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.init();
    },
    methods: {
      init(){
        const params={
          currentPage:1,
          pageSize:1000,
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params;
        })
      },
      showDepartmentDialog(){
        this.isShowDepartmentDialog=true;
      },
      showLocationPidDialog(){
        this.isShowLocationPidDialog=true;
      },
      showClinicalTypesDialog(key){
        this.curInputKey=key;
        this.curInputContent=this.formData.jsonStr.missCombineDisease[key];
        this.isShowquillEditorDialog=true;
      },
      cancelBtn(){
        this.$emit("update:visible",false)
      },
      doCreate(){
        this.isShowCreateVisible=true;
      },
      listenLocationChild(data){
        this.formData.jsonStr.missCombineDisease.locationPid=data.jsonStr.id;
        this.locationPidtoChinese=data.jsonStr.dislocationName;
        const params={
          currentPage:1,
          pageSize:1000,
          parentDislocationId:data.jsonStr.id
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })

      },
      listenToChild(data){ //选中父级科室兼听事件
        this.formData.jsonStr.missChineseDisease.missDisease.departmentPid=data.jsonStr.id;
        this.departmentPidtoChinese=data.jsonStr.departmentName;
        const params={
          currentPage:1,
          pageSize:1000,
          parentDepartmentId:data.jsonStr.id
        }
        getDepartmentList(params).then(response => {
          this.departmentList = response.data.params
        })
      },
      listenToChildquillEditor(data){
        this.formData.jsonStr.missCombineDisease[this.curInputKey]=data;
      },
      createOK(){
        if(this.rowData.taskStatus==="drafts"){
          this.formData.taskStatus="drafts";
        } else if(this.rowData.taskStatus==="toFirAudited"){
          this.formData.taskStatus="toFirAudited";
        } else if(this.rowData.taskStatus==="toSecAudited"){
          this.formData.taskStatus="toSecAudited";
        } else if(this.rowData.taskStatus==="toFinalAudited"){
          this.formData.taskStatus="toFinalAudited";
        } else {
          this.formData.taskStatus="drafts";
        }
        if(this.curTaskType){
          this.formData.taskType=this.curTaskType;
        }
        this.formData.taskMenuType="missCombineDisease"
        doCreateDisBasics(this.formData).then(response => {
          this.$emit("refreshList");
          this.$emit("update:visible",false)
        })

      },
      submitOK(){
        if(this.rowData.taskStatus==="drafts"){
          this.formData.taskStatus="toFirAudited";
        } else if(this.rowData.taskStatus==="toFirAudited"){
          this.formData.taskStatus="toSecAudited";
        } else if(this.rowData.taskStatus==="toSecAudited"){
          this.formData.taskStatus="toFinalAudited";
        } else if(this.rowData.taskStatus==="toFinalAudited"){
          this.formData.taskStatus="finished";
        } else {
          this.formData.taskStatus="drafts";
        }
        //this.formData.taskStatus="toFirAudited";//此处需要判断当前的状态，然后将下一步的值付给taskStatus
        if(this.curTaskType){
          this.formData.taskType=this.curTaskType;
        }
        this.formData.taskMenuType="missCombineDisease"
        doCreateDisBasics(this.formData).then(response => {
          this.$emit("refreshList");
          this.$emit("update:visible",false)
        })
      },
    },
    watch:{
      rowData(newVal,oldVal)
      {
        this.formData=Object.assign({}, newVal)
      },
      'formData.jsonStr.missDisease.locationPid'(newVal,oldVal)
      {
        var newarr = this.dislocationList.filter(item => item.jsonStr.id==newVal );
        if(newarr.length > 0){
          this.locationPidtoChinese = newarr[0].jsonStr.dislocationName ;
        }
      },
      'formData.jsonStr.missDisease.departmentPid'(newVal,oldVal)
      {
        var newarr = this.departmentList.filter(item => item.jsonStr.id==newVal );
        if(newarr.length > 0){
          this.departmentPidtoChinese = newarr[0].jsonStr.departmentName ;
        }
      },
    },
    computed: {
      lang: {
        get() {
          return this.$store.state.app.language
        },
        set(lang) {
          this.$i18n.locale = lang
          this.$store.dispatch('setLanguage', lang)
        }
      }
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
