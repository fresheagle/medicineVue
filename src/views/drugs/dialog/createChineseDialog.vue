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
            <el-form-item :label="i18n.name" prop="comName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.comName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.medicalType" prop="medicalType">
              <el-select v-model="formData.jsonStr.missMedical.medicalType">
                <el-option
                  v-for="item in enumerate.medicalTypeList"
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
            <el-form-item :label="i18n.chinesePinyin" prop="chinesePinyin">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.chinesePinyin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.alisaName" prop="alisaName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.alisaName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.shopName" prop="shopName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.shopName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.englishName" prop="englishName">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.englishName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.drugType" prop="drugType">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.drugType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.ytime" prop="ytime">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.ytime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.enterprise" prop="enterprise">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.enterprise"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.approvalNum" prop="approvalNum">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.approvalNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.healthType" prop="healthType">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.healthType"
                        class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.storageMethod" prop="storageMethod">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.storageMethod"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('storageMethod')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.drugIdentifying" prop="drugIdentifying">
              <el-input placeholder="请输入内容" v-model="formData.jsonStr.missMedical.drugIdentifying"
                        class="input-with-select"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.address" prop="address">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.address"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('address')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.recipeType" prop="recipeType">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.recipeType"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('recipeType')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.price" prop="price">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.price"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('price')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.picturePath" prop="picturePath">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.picturePath"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('picturePath')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.constitute" prop="constitute">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.constitute"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('constitute')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.property" prop="property">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.property"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('property')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.func" prop="func">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.func"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('func')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.mainAttend" prop="mainAttend">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.mainAttend"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('mainAttend')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.production" prop="production">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.production"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('production')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.standard" prop="standard">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.standard"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('standard')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.pharmacology" prop="pharmacology">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.pharmacology"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('pharmacology')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.toxicologicalEffects" prop="toxicologicalEffects">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.toxicologicalEffects"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('toxicologicalEffects')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.clinicalApplication" prop="clinicalApplication">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.clinicalApplication"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalApplication')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.adverseReactions" prop="adverseReactions">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.adverseReactions"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('adverseReactions')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.taboo" prop="taboo">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.taboo"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('taboo')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.notice" prop="notice">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.notice"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('notice')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.identify" prop="identify">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.identify"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('identify')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.pharmacyCheck" prop="pharmacyCheck">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.pharmacyCheck"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('pharmacyCheck')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.contentPic" prop="contentPic">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.contentPic"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('contentPic')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.medicFormat" prop="medicFormat">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.medicFormat"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('medicFormat')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.notes" prop="notes">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.notes"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('notes')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.component" prop="component">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.component"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('component')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.mainMeffect" prop="mainMeffect">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.mainMeffect"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('mainMeffect')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.analyze" prop="analyze">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.analyze"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('analyze')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.interactions" prop="interactions">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.interactions"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('interactions')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.history" prop="history">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.history"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('history')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.drugIntroduce" prop="drugIntroduce">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.drugIntroduce"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('drugIntroduce')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.awards" prop="awards">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.awards"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('awards')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.research" prop="research">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.research"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('research')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.monograph" prop="monograph">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.monograph"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('monograph')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.messageFrom" prop="messageFrom">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.messageFrom"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('messageFrom')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.productInfo" prop="productInfo">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.productInfo"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('productInfo')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.indication" prop="indication">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.indication"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('indication')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="i18n.dosage" prop="dosage">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.dosage"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more"
                           @click="showClinicalTypesDialog('dosage')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="i18n.introduction" prop="introduction">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missMedical.introduction"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('introduction')"></el-button>
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
          "taskMenuType": "missMedical",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId": "",
          "jsonStr": {
            "medicalCompanyList": {
              "medicalCompanyId": "",
              "companyChineseName": "",
              "companyEnglishName": "",
            },
            "missMedical": {
              "id": "",
              "medicalType": 1,
              "comName": "",
              "chinesePinyin": "",
              "alisaName": "",
              "shopName": "",
              "englishName": "",
              "drugType": "",
              "ytime": "",
              "enterprise": "",
              "approvalNum": "",
              "healthType": "",
              "storageMethod": "",
              "drugIdentifying": "",
              "address": "",
              "recipeType": "",
              "price": "",
              "picturePath": "",
              "datastatus": "",
              "taskId": "",
              "taskStatus": "",
              "constitute": "",
              "property": "",
              "func": "",
              "mainAttend": "",
              "standard": "",
              "pharmacology": "",
              "toxicologicalEffects": "",
              "clinicalApplication": "",
              "adverseReactions": "",
              "taboo": "",
              "notice": "",
              "identify": "",
              "pharmacyCheck": "",
              "contentPic": "",
              "medicFormat": "",
              "notes": "",
              "component": "",
              "mainMeffect": "",
              "analyze": "",
              "interactions": "",
              "history": "",
              "drugIntroduce": "",
              "awards": "",
              "research": "",
              "monograph": "",
              "messageFrom": "",
              "productInfo": "",
              "indication": "",
              "dosage": "",
              "introduction": "",
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
        this.curInputContent = this.formData.jsonStr.missMedical[key];
        this.isShowquillEditorDialog = true;
      },
      cancelBtn() {
        this.$emit("update:visible", false)
      },
      doCreate() {
        this.isShowCreateVisible = true;
      },
      listenLocationChild(data) {
        this.formData.jsonStr.missMedical.locationPid = data.jsonStr.id;
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
        this.formData.jsonStr.missMedical[this.curInputKey] = data;
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
        this.formData.taskMenuType = "missMedical"
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
        this.formData.taskMenuType = "missMedical"
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
