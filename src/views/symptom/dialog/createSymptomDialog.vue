<template>
  <div>
    <el-dialog title="新增症状"
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
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.chineseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.englishName" prop="englishName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.englishName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.otherName" prop="otherName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.otherName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.symptom" prop="symptom">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.symptom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.treatment" prop="treatment">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.treatment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.clinicalManifestation" prop="clinicalManifestation">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.clinicalManifestation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.departmentId" prop="departmentId">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.departmentId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.mainCauses" prop="mainCauses">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.mainCauses"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.commonSymptom" prop="commonSymptom">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.commonSymptom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.multiplePopulation" prop="multiplePopulation">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.multiplePopulation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.infectivity" prop="infectivity">
              <el-select v-model="formData.jsonStr.missSymptom.infectivity" >
                <el-option
                  v-for="item in enumerate.infectivityList"
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
            <el-form-item :label="i18n.inspectionItems" prop="inspectionItems">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.inspectionItems"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('inspectionItems')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.tOtherTherapies" prop="tOtherTherapies">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missSymptom.tOtherTherapies"
                        class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.commonDiseases" prop="commonDiseases">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.commonDiseases"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('commonDiseases')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.tPreventiveNursing" prop="tPreventiveNursing">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.tPreventiveNursing"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('tPreventiveNursing')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.syndrome" prop="syndrome">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.syndrome"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('syndrome')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.dataReference" prop="dataReference">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.dataReference"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dataReference')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.chineseMedicine" prop="chineseMedicine">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.chineseMedicine"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('chineseMedicine')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.pathogeny" prop="pathogeny">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.pathogeny"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('pathogeny')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.pathogenesis" prop="pathogenesis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.pathogenesis"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('pathogenesis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.dialecticalPoints" prop="dialecticalPoints">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.dialecticalPoints"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('dialecticalPoints')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.production" prop="production">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.production"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('production')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.symptomAnalysis" prop="symptomAnalysis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.symptomAnalysis"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('symptomAnalysis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.commonChineseMedicine" prop="commonChineseMedicine">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.commonChineseMedicine"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('commonChineseMedicine')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.tCommonSyndromeTypes" prop="tCommonSyndromeTypes">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.tCommonSyndromeTypes"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('tCommonSyndromeTypes')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.symptomOrigin" prop="symptomOrigin">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missSymptom.symptomOrigin"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('symptomOrigin')"></el-button>
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
          "taskMenuType": "missSymptom",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId": "",
          "jsonStr": {
            "dislocationList": {
              "id": "",
              "level": "",
              "dislocation_name": "",
              "parent_dislocation_id": "",
            },
            "medicalList": {
              "id": "",
              "medicalName": "",
              "medicalType": "",
            },
            "missSymptom": {
              "id": "",
              "chineseName": "",
              "englishName": "",
              "otherName": "",
              "symptom": "",
              "treatment": "",
              "clinicalManifestation": "",
              "departmentId": "",
              "mainCauses": "",
              "commonSymptom": "",
              "multiplePopulation": "",
              "infectivity": "1",
              "inspectionItems": "",
              "reserve1": "",
              "reserve2": "",
              "reserve3": "",
              "datastatus": "",
              "taskId": "",
              "taskStatus": "",
              "tOtherTherapies": "",
              "commonDiseases": "",
              "tPreventiveNursing": "",
              "syndrome": "",
              "dataReference": "",
              "chineseMedicine": "",
              "pathogeny": "",
              "pathogenesis": "",
              "dialecticalPoints": "",
              "symptomAnalysis": "",
              "commonChineseMedicine": "",
              "tCommonSyndromeTypes": "",
              "symptomOrigin": "",
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
        this.curInputContent = this.formData.jsonStr.missSymptom[key];
        this.isShowquillEditorDialog = true;
      },
      cancelBtn() {
        this.$emit("update:visible", false)
      },
      doCreate() {
        this.isShowCreateVisible = true;
      },
      listenLocationChild(data) {
        this.formData.jsonStr.missSymptom.locationPid = data.jsonStr.id;
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
        this.formData.jsonStr.missSymptom[this.curInputKey] = data;
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
        this.formData.taskMenuType = "missSymptom"
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
        this.formData.taskMenuType = "missSymptom"
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
