<template>
  <div>
    <el-dialog title="新增医疗机构"
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
            <el-form-item :label="i18n.name" prop="name">
              <el-input placeholder="请输入内容"  v-model="formData.jsonStr.missDoctor.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.sex" prop="sex">
              <el-select v-model="formData.jsonStr.missDoctor.sex" >
                <el-option
                  v-for="item in enumerate.sexList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.origin" prop="origin">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.origin" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.nation" prop="nation">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.nation"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.birthday"  prop="birthday">
              <el-date-picker
                v-model="formData.jsonStr.missDoctor.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.dieday"  prop="dieday">
              <el-date-picker
                v-model="formData.jsonStr.missDoctor.dieday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.graduate" prop="graduate">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.graduate" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.profession" prop="profession">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.profession"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.inauguralInstitution"  prop="inauguralInstitution">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.inauguralInstitution"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.expertsTime" prop="expertsTime">
              <el-date-picker
                v-model="formData.jsonStr.missDoctor.expertsTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.birthplaceDistrictCode"  prop="birthplaceDistrictCode">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.birthplaceDistrictCode" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.intro" prop="intro">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.intro" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('intro')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.picturepath" prop="picturepath">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missDoctor.picturepath"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.honorary" prop="honorary">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.honorary" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('honorary')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.clinicProfessional" prop="clinicProfessional">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.clinicProfessional" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicProfessional')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.eduProfessional" prop="eduProfessional">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.eduProfessional" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('eduProfessional')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="i18n.education" prop="education">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.education" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('education')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.workExperience" prop="workExperience">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.workExperience" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('workExperience')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.treatArea" prop="treatArea">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.treatArea" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatArea')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.researchArea" prop="researchArea">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.researchArea" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('researchArea')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.academic" prop="academic">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.academic" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('academic')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.production" prop="production">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.production" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('production')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.awards" prop="awards">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.awards" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('awards')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.science" prop="science">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.science" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('science')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.socialization" prop="socialization">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.socialization" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('socialization')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.thesis" prop="thesis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.thesis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('thesis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.bookmaking" prop="bookmaking">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.bookmaking" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('bookmaking')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.heritageMap" prop="heritageMap">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.heritageMap" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('heritageMap')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.referenceMaterial" prop="referenceMaterial">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDoctor.referenceMaterial" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('referenceMaterial')"></el-button>
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
          "taskMenuType": "missDoctor",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId":"",
          "jsonStr": {
            "missDoctor":{
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
        this.curInputContent=this.formData.jsonStr.missDoctor[key];
        this.isShowquillEditorDialog=true;
      },
      cancelBtn(){
        this.$emit("update:visible",false)
      },
      doCreate(){
        this.isShowCreateVisible=true;
      },
      listenLocationChild(data){
        this.formData.jsonStr.missDoctor.locationPid=data.jsonStr.id;
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
        this.formData.jsonStr.missDoctor[this.curInputKey]=data;
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
        this.formData.taskMenuType="missDoctor"
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
        this.formData.taskMenuType="missDoctor"
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
