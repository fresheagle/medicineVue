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
              <el-input placeholder="请输入内容"  v-model="formData.jsonStr.missInstitution.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.level">
              <el-select v-model="formData.jsonStr.missInstitution.level" >
                <el-option
                  v-for="item in enumerate.institutionLevel"
                  :key="item.id"
                  :label="item.level"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.districtCode" prop="districtCode">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.districtCode" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.address" prop="address">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.address"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.nature"  prop="nature">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.nature" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('nature')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.category"  prop="category">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.category" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('category')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.insurance" prop="insurance">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.insurance" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('insurance')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.foundDate" prop="foundDate">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.foundDate" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('foundDate')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.manageDepartment"  prop="manageDepartment">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.manageDepartment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.telephone" prop="telephone">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.telephone" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.website"  prop="website">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.website" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.publishService" prop="publishService">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.publishService" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.dean" prop="dean">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missInstitution.dean" class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.parentId" prop="parentId">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.parentId" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('parentId')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.emergencyTime" prop="emergencyTime">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.emergencyTime" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('emergencyTime')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.outpatientTime" prop="outpatientTime">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.outpatientTime" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('outpatientTime')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="i18n.registrationTime" prop="registrationTime">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.registrationTime" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('registrationTime')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.advantage" prop="advantage">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.advantage" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventionMeasures')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.punishment" prop="punishment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.punishment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('punishment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.history" prop="history">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.history" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('history')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.environment" prop="environment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.environment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('environment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.treatGuide" prop="treatGuide">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.treatGuide" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatGuide')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.intro" prop="intro">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.intro" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('intro')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.researchResult" prop="researchResult">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.researchResult" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('researchResult')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.academicMonograph" prop="academicMonograph">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.academicMonograph" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('academicMonograph')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.academicActivity" prop="academicActivity">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.academicActivity" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('academicActivity')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.honor" prop="honor">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.honor" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('honor')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.reference" prop="reference">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.reference" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('reference')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.license" prop="license">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.license" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('license')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.advertiseReviewCertify" prop="advertiseReviewCertify">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missInstitution.advertiseReviewCertify" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('advertiseReviewCertify')"></el-button>
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
  import { getDepartmentList, doCreateDisBasics, getDislocationList } from '../../../api/task'

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
      quillEditorDialog
    },
    props: {
      rowData: {},
      curTaskType: ''
    },
    data() {
      return {
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        formData: {
          'taskStatus': '',
          'taskType': '',
          'taskMenuType': 'missInstitution',
          'taskTitle': '',
          'taskChangeVote': '',
          'taskChangePoints': '',
          'taskChangeComments': '',
          'taskId': '',
          'jsonStr': {
            'missInstitution': {
              'taskId': '',
              'id': '',
              'epidemiology': '',
              'tRelatedDiseases': '',
              'etiologyPathogenesis': '',
              'pathology': '',
              'clinicalTypesClass': '',
              'clinicalManifestation': '',
              'symptom': '',
              'sign': '',
              'laboratoryExamination': '',
              'textOtherCheck': '',
              'diagnosticPoints': '',
              'differentialDiagnosis': '',
              'preventionTreatment': '',
              'treatmentPrognosis': '',
              'management': '',
              'preventiveNursing': '',
              'nursing': '',
              'preventionMeasures': '',
              'modernResearch': '',
              'drugResistance': '',
              'dietaryConditioning': '',
              'attentionMatter': '',
              'dataReference': '',
              'datastatus': ''
            }
          }
        },
        isShowDepartmentDialog: false,
        isShowquillEditorDialog: false,
        isShowLocationPidDialog: false,
        total: 0,
        page: 1,
        pageSize: 10,
        multipleSelection: [],
        departmentList: [],
        dislocationList: [],
        curInputKey: '',
        curInputContent: '',
        locationPidtoChinese: '',
        departmentPidtoChinese: ''
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.init()
  },
    methods: {
      init() {
        const params = {
          currentPage: 1,
          pageSize: 1000
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })
      },
      showDepartmentDialog() {
        this.isShowDepartmentDialog = true
      },
      showLocationPidDialog() {
        this.isShowLocationPidDialog = true
      },
      showClinicalTypesDialog(key) {
        this.curInputKey = key
        this.curInputContent = this.formData.jsonStr.missInstitution[key]
        this.isShowquillEditorDialog = true
      },
      cancelBtn() {
        this.$emit('update:visible', false)
      },
      doCreate() {
        this.isShowCreateVisible = true
      },
      listenLocationChild(data) {
        this.formData.jsonStr.missInstitution.locationPid = data.jsonStr.id
        this.locationPidtoChinese = data.jsonStr.dislocationName
        const params = {
          currentPage: 1,
          pageSize: 1000,
          parentDislocationId: data.jsonStr.id
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })
      },
      listenToChild(data) { // 选中父级科室兼听事件
        this.formData.jsonStr.missChineseDisease.missDisease.departmentPid = data.jsonStr.id
        this.departmentPidtoChinese = data.jsonStr.departmentName
        const params = {
          currentPage: 1,
          pageSize: 1000,
          parentDepartmentId: data.jsonStr.id
        }
        getDepartmentList(params).then(response => {
          this.departmentList = response.data.params
        })
      },
      listenToChildquillEditor(data) {
        this.formData.jsonStr.missInstitution[this.curInputKey] = data
      },
      createOK() {
        if (this.rowData.taskStatus === 'drafts') {
          this.formData.taskStatus = 'drafts'
        } else if (this.rowData.taskStatus === 'toFirAudited') {
          this.formData.taskStatus = 'toFirAudited'
        } else if (this.rowData.taskStatus === 'toSecAudited') {
          this.formData.taskStatus = 'toSecAudited'
        } else if (this.rowData.taskStatus === 'toFinalAudited') {
          this.formData.taskStatus = 'toFinalAudited'
        } else {
          this.formData.taskStatus = 'drafts'
        }
        if (this.curTaskType) {
          this.formData.taskType = this.curTaskType
        }
        this.formData.taskMenuType = 'missInstitution'
        doCreateDisBasics(this.formData).then(response => {
          this.$emit('refreshList')
          this.$emit('update:visible', false)
        })
      },
      submitOK() {
        if (this.rowData.taskStatus === 'drafts') {
          this.formData.taskStatus = 'toFirAudited'
        } else if (this.rowData.taskStatus === 'toFirAudited') {
          this.formData.taskStatus = 'toSecAudited'
        } else if (this.rowData.taskStatus === 'toSecAudited') {
          this.formData.taskStatus = 'toFinalAudited'
        } else if (this.rowData.taskStatus === 'toFinalAudited') {
          this.formData.taskStatus = 'finished'
        } else {
          this.formData.taskStatus = 'drafts'
        }
        // this.formData.taskStatus="toFirAudited";//此处需要判断当前的状态，然后将下一步的值付给taskStatus
        if (this.curTaskType) {
          this.formData.taskType = this.curTaskType
        }
        this.formData.taskMenuType = 'missInstitution'
        doCreateDisBasics(this.formData).then(response => {
          this.$emit('refreshList')
          this.$emit('update:visible', false)
        })
      }
    },
    watch: {
      rowData(newVal, oldVal) {
        this.formData = Object.assign({}, newVal)
      },
      'formData.jsonStr.missDisease.locationPid'(newVal, oldVal) {
        var newarr = this.dislocationList.filter(item => item.jsonStr.id == newVal)
        if (newarr.length > 0) {
          this.locationPidtoChinese = newarr[0].jsonStr.dislocationName
        }
      },
      'formData.jsonStr.missDisease.departmentPid'(newVal, oldVal) {
        var newarr = this.departmentList.filter(item => item.jsonStr.id == newVal)
        if (newarr.length > 0) {
          this.departmentPidtoChinese = newarr[0].jsonStr.departmentName
        }
      }
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
