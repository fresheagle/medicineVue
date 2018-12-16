<template>
  <div>
    <el-dialog title="新增药品企业"
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
            <el-form-item :label="i18n.chineseName" prop="chineseName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.chineseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.englishName" prop="englishName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.englishName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.foundedTime" prop="foundedTime">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.foundedTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.location" prop="location">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.location"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.sile" prop="sile">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.sile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.range" prop="range">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.range"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.marketValue" prop="marketValue">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.marketValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.timeMarket" prop="timeMarket">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.timeMarket"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.registerMoney" prop="registerMoney">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.registerMoney"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.registrationNumber" prop="registrationNumber">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.registrationNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.domicile" prop="domicile">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.domicile"
                        class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.staffNumber" prop="staffNumber">
              <el-input placeholder="请输入内容"v-model="formData.jsonStr.missMedicalCompany.staffNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.legalPerson" prop="legalPerson">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.legalPerson"
                        class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.chairman" prop="chairman">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.chairman"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.companyIdea" prop="companyIdea">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.companyIdea"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('companyIdea')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.creditCode" prop="creditCode">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.website" prop="website">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.website" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.leader" prop="leader">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedicalCompany.leader"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.businessScope" prop="businessScope">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.businessScope"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('businessScope')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.history" prop="history">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.history"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('history')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.companyIntroduction" prop="companyIntroduction">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.companyIntroduction"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('companyIntroduction')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.brandProduct" prop="brandProduct">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.brandProduct"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('brandProduct')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.honor" prop="honor">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.honor"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('honor')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.achievements" prop="achievements">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.achievements"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('achievements')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.news" prop="news">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedicalCompany.news"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('news')"></el-button>
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
    <search-department-dialog :visible.sync="isShowDepartmentDialog"
                              v-on:listenToChild="listenToChild"></search-department-dialog>
    <search-location-pid-dialog :visible.sync="isShowLocationPidDialog"
                                v-on:listenLocationChild="listenLocationChild"></search-location-pid-dialog>
    <quill-editor-dialog :visible.sync="isShowquillEditorDialog"
                         v-on:listenToChildquillEditor="listenToChildquillEditor"
                         :cur-input-content="curInputContent"></quill-editor-dialog>
  </div>
</template>


<script>
  import {getDepartmentList, doCreateDisBasics, getDislocationList} from '../../../api/task'

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
    props: {
      rowData: {},
      curTaskType: "",
    },
    data() {
      return {
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        formData: {
          "taskStatus": "",
          "taskType": "",
          "taskMenuType": "missMedicalCompany",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId": "",
          "jsonStr": {
            "missMedicalCompany": {
              "id": "",
              "chineseName": "",
              "englishName": "",
              "foundedTime": "",
              "location": "",
              "sile": "",
              "range": "",
              "marketValue": "",
              "timeMarket": "",
              "registerMoney": "",
              "registrationNumber": "",
              "domicile": "",
              "staffNumber": "",
              "legalPerson": "",
              "chairman": "",
              "companyIdea": "",
              "creditCode": "",
              "website": "",
              "leader": "",
              "businessScope": "",
              "history": "",
              "companyIntroduction": "",
              "brandProduct": "",
              "honor": "",
              "achievements": "",
              "news": "",
              "datastatus": "",
              "taskId": "",
              "taskStatus": "",
              "taskJson": "",
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
        curInputKey: "",
        curInputContent: "",
        locationPidtoChinese: "",
        departmentPidtoChinese: "",
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
      init() {
        const params = {
          currentPage: 1,
          pageSize: 1000,
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params;
        })
      },
      showDepartmentDialog() {
        this.isShowDepartmentDialog = true;
      },
      showLocationPidDialog() {
        this.isShowLocationPidDialog = true;
      },
      showClinicalTypesDialog(key) {
        this.curInputKey = key;
        this.curInputContent = this.formData.jsonStr.missMedicalCompany[key];
        this.isShowquillEditorDialog = true;
      },
      cancelBtn() {
        this.$emit("update:visible", false)
      },
      doCreate() {
        this.isShowCreateVisible = true;
      },
      listenLocationChild(data) {
        this.formData.jsonStr.missMedicalCompany.locationPid = data.jsonStr.id;
        this.locationPidtoChinese = data.jsonStr.dislocationName;
        const params = {
          currentPage: 1,
          pageSize: 1000,
          parentDislocationId: data.jsonStr.id
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })

      },
      listenToChild(data) { //选中父级科室兼听事件
        this.formData.jsonStr.missChineseDisease.missDisease.departmentPid = data.jsonStr.id;
        this.departmentPidtoChinese = data.jsonStr.departmentName;
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
        this.formData.jsonStr.missMedicalCompany[this.curInputKey] = data;
      },
      createOK() {
        if (this.rowData.taskStatus === "drafts") {
          this.formData.taskStatus = "drafts";
        } else if (this.rowData.taskStatus === "toFirAudited") {
          this.formData.taskStatus = "toFirAudited";
        } else if (this.rowData.taskStatus === "toSecAudited") {
          this.formData.taskStatus = "toSecAudited";
        } else if (this.rowData.taskStatus === "toFinalAudited") {
          this.formData.taskStatus = "toFinalAudited";
        } else {
          this.formData.taskStatus = "drafts";
        }
        if (this.curTaskType) {
          this.formData.taskType = this.curTaskType;
        }
        this.formData.taskMenuType = "missMedicalCompany"
        doCreateDisBasics(this.formData).then(response => {
          this.$emit("update:visible", false)
        })

      },
      submitOK() {
        if (this.rowData.taskStatus === "drafts") {
          this.formData.taskStatus = "toFirAudited";
        } else if (this.rowData.taskStatus === "toFirAudited") {
          this.formData.taskStatus = "toSecAudited";
        } else if (this.rowData.taskStatus === "toSecAudited") {
          this.formData.taskStatus = "toFinalAudited";
        } else if (this.rowData.taskStatus === "toFinalAudited") {
          this.formData.taskStatus = "finished";
        } else {
          this.formData.taskStatus = "drafts";
        }
        //this.formData.taskStatus="toFirAudited";//此处需要判断当前的状态，然后将下一步的值付给taskStatus
        if (this.curTaskType) {
          this.formData.taskType = this.curTaskType;
        }
        this.formData.taskMenuType = "missMedicalCompany"
        doCreateDisBasics(this.formData).then(response => {
          // this.isShowCreateVisible=false;
          this.$emit("update:visible", false)
        })
      },
    },
    watch: {
      rowData(newVal, oldVal) {
        this.formData = Object.assign({}, newVal)
      },
      'formData.jsonStr.missDisease.locationPid'(newVal, oldVal) {
        var newarr = this.dislocationList.filter(item => item.jsonStr.id == newVal);
        if (newarr.length > 0) {
          this.locationPidtoChinese = newarr[0].jsonStr.dislocationName;
        }
      },
      'formData.jsonStr.missDisease.departmentPid'(newVal, oldVal) {
        var newarr = this.departmentList.filter(item => item.jsonStr.id == newVal);
        if (newarr.length > 0) {
          this.departmentPidtoChinese = newarr[0].jsonStr.departmentName;
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
