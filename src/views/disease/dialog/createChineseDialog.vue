<template>
  <div>
    <el-dialog title="新增中医疾病"
               v-bind="$attrs"
               v-on="$listeners"
               :append-to-body="true" width="80%" top="10vh">
      <el-form label-width="100px" :model="formData" ref="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务标题" prop="taskTitle">
              <el-input v-model="formData.taskTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名词解释" prop="nounInterpretation">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.nounInterpretation" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('nounInterpretation')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="病史" prop="history">
                <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.history" class="input-with-select">
                  <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('history')"></el-button>
                </el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="西方关系" prop="relationshipWestern">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.relationshipWestern" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('relationshipWestern')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病因" prop="pathogeny">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.pathogeny" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('pathogeny')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病机" prop="pathogenesis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.pathogenesis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('pathogenesis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="考核点" prop="examination_points">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.examinationPoints" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('examinationPoints')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="临床表现" prop="clinicalManifestation">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.clinicalManifestation" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalManifestation')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="诊断依据" prop="diagnosisBasis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.diagnosisBasis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('diagnosisBasis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="疾病鉴别" prop="diseaseIdentification">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.diseaseIdentification" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('diseaseIdentification')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联考核" prop="relatedExaminations">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.relatedExaminations" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('relatedExaminations')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="辩证治疗" prop="dialecticalTreatment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.dialecticalTreatment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dialecticalTreatment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="辩证要点" prop="dialecticalPoints">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.dialecticalPoints" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dialecticalPoints')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节特点" prop="seaCharacteristic">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.seaCharacteristic" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('seaCharacteristic')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="脏腑辩证" prop="syndromeDifferentiation">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.syndromeDifferentiation" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('syndromeDifferentiation')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="治法" prop="treatment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.treatment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="治疗原则" prop="treatmentPrinciples">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.treatmentPrinciples" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatmentPrinciples')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="常见症型" prop="syndromeType">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.syndromeType" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('syndromeType')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="外治法" prop="externalTherapy">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.externalTherapy" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('externalTherapy')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他疗法" prop="otherTherapies">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.otherTherapies" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('otherTherapies')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预防调护" prop="preventiveNursing">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.preventiveNursing" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventiveNursing')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="临床病程" prop="clinicalPreparation">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.clinicalPreparation" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalPreparation')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文献文摘" prop="literatureAbstract">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.literatureAbstract" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('literatureAbstract')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现代研究" prop="modernResearch">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.modernResearch" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('modernResearch')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="膳食调理" prop="dietaryConditioning">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.dietaryConditioning" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dietaryConditioning')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注意事项" prop="attentionMatter">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.attentionMatter" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('attentionMatter')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资料引用" prop="dataReference">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missChineseDisease.dataReference" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dataReference')"></el-button>
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
        formData: {
          "taskStatus": "",
          "taskType": "",
          "taskMenuType": "missChineseDisease",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId":"",
          "jsonStr": {
            "missChineseDisease": {
              "taskId":"",
              "id": "",
              "dataReference":"",
              "treatment":"",
              "seaCharacteristic":"",
              "attentionMatter":"",
              "externalTherapy":"",
              "pathogeny":"",
              "relatedExaminations":"",
              "syndromeType":"",
              "nounInterpretation": "",
              "relationshipWestern":"",
              "treatmentPrinciples":"",
              "diagnosisBasis":"",
              "syndromeDifferentiation":"",
              "diseaseId":"",
              "examinationPoints":"",
              "clinicalPreparation":"",
              "dialecticalTreatment":"",
              "textDietaryConditioning":"",
              "history":"",
              "otherTherapies":"",
              "dialecticalPoints":"",
              "modernResearch":"",
              "pathogenesis":"",
              "literatureAbstract":"",
              "clinicalManifestation":"",
              "diseaseIdentification":"",
              "preventiveNursing":""
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
        this.curInputContent=this.formData.jsonStr.missChineseDisease[key];
        this.isShowquillEditorDialog=true;
      },
      cancelBtn(){
        this.$emit("update:visible",false)
      },
      doCreate(){
        this.isShowCreateVisible=true;
      },
      listenLocationChild(data){
        this.formData.jsonStr.missChineseDisease.locationPid=data.jsonStr.id;
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
        //判断之前典籍的是那个输入框后面得按钮，对应的将值付给那个输入框
        switch (this.curInputKey) {
          case 'dataReference':
            this.formData.jsonStr.missChineseDisease.dataReference=data;
            break;
          case 'treatment':
            this.formData.jsonStr.missChineseDisease.treatment=data;
            break;
          case 'seaCharacteristic':
            this.formData.jsonStr.missChineseDisease.seaCharacteristic=data;
            break;
          case 'attentionMatter':
            this.formData.jsonStr.missChineseDisease.attentionMatter=data;
            break;
          case 'externalTherapy':
            this.formData.jsonStr.missChineseDisease.externalTherapy=data;
            break;
          case 'pathogeny':
            this.formData.jsonStr.missChineseDisease.pathogeny=data;
            break;
          case 'relatedExaminations':
            this.formData.jsonStr.missChineseDisease.relatedExaminations=data;
            break;
          case 'syndromeType':
            this.formData.jsonStr.missChineseDisease.syndromeType=data;
            break;
          case 'nounInterpretation':
            this.formData.jsonStr.missChineseDisease.nounInterpretation=data;
            break;
          case 'relationshipWestern':
            this.formData.jsonStr.missChineseDisease.relationshipWestern=data;
            break;
          case 'treatmentPrinciples':
            this.formData.jsonStr.missChineseDisease.treatmentPrinciples=data;
            break;
          case 'diagnosisBasis':
            this.formData.jsonStr.missChineseDisease.diagnosisBasis=data;
            break;
          case 'syndromeDifferentiation':
            this.formData.jsonStr.missChineseDisease.syndromeDifferentiation=data;
            break;
          case 'diseaseId':
            this.formData.jsonStr.missChineseDisease.diseaseId=data;
            break;
          case 'examinationPoints':
            this.formData.jsonStr.missChineseDisease.examinationPoints=data;
            break;
          case 'clinicalPreparation':
            this.formData.jsonStr.missChineseDisease.clinicalPreparation=data;
            break;
          case 'dialecticalTreatment':
            this.formData.jsonStr.missChineseDisease.dialecticalTreatment=data;
            break;
          case 'textDietaryConditioning':
            this.formData.jsonStr.missChineseDisease.textDietaryConditioning=data;
            break;
          case 'history':
            this.formData.jsonStr.missChineseDisease.history=data;
            break;
          case 'otherTherapies':
            this.formData.jsonStr.missChineseDisease.otherTherapies=data;
            break;
          case 'dialecticalPoints':
            this.formData.jsonStr.missChineseDisease.dialecticalPoints=data;
            break;
          case 'modernResearch':
            this.formData.jsonStr.missChineseDisease.modernResearch=data;
            break;
          case 'pathogenesis':
            this.formData.jsonStr.missChineseDisease.pathogenesis=data;
            break;
          case 'literatureAbstract':
            this.formData.jsonStr.missChineseDisease.literatureAbstract=data;
            break;
          case 'clinicalManifestation':
            this.formData.jsonStr.missChineseDisease.clinicalManifestation=data;
            break;
          case 'diseaseIdentification':
            this.formData.jsonStr.missChineseDisease.diseaseIdentification=data;
            break;
          case 'preventiveNursing':
            this.formData.jsonStr.missChineseDisease.preventiveNursing=data;
            break;
          default:
            break;
        }

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
        this.formData.taskMenuType="missChineseDisease"
        doCreateDisBasics(this.formData).then(response => {
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
        this.formData.taskMenuType="missChineseDisease"
        doCreateDisBasics(this.formData).then(response => {
          // this.isShowCreateVisible=false;
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
    computed:{
      locationPidtoChinese1(){
        const params={
          currentPage:1,
          pageSize:1000,
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params;
        })
        if(this.formData.jsonStr.missDisease.locationPid ){
          const newarr  = this.dislocationList;
          newarr.filter(item => item.jsonStr.id===this.formData.jsonStr.missDisease.locationPid );
          console.log("newarr[0].departmentName===",newarr[0].departmentName);
          return newarr[0].departmentName;
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

