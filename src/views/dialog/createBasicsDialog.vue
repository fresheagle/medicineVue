<template>
  <div>
    <el-dialog title="新增基础疾病"
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
            <el-form-item label="中文名称" prop="chineseName">
              <el-input v-model="formData.jsonStr.missDisease.chineseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="英文名称" prop="englishName">
              <el-input v-model="formData.jsonStr.missDisease.englishName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="拉丁名称" prop="latinName">
              <el-input v-model="formData.jsonStr.missDisease.latinName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他名称" prop="otherName">
              <el-input v-model="formData.jsonStr.missDisease.otherName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="相关疾病" prop="relatedDiseases">
              <el-input v-model="formData.jsonStr.missDisease.relatedDiseases"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="疾病分类">
              <el-select v-model="formData.jsonStr.missDisease.diseaseType" >
                <el-option
                  v-for="item in enumerate.diseaseTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主发病部位">
              <el-input placeholder="请输入内容" :disabled="true" v-model="locationPidtoChinese" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showLocationPidDialog"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="次发病部位" >
              <el-select v-model="formData.jsonStr.missDisease.locationDisease" >
                <el-option
                  v-for="item in dislocationList"
                  :key="item.jsonStr.id"
                  :label="item.jsonStr.dislocationName"
                  :value="item.jsonStr.id">
                </el-option>
              </el-select>
              <!--<el-input v-model="formData.jsonStr.location_disease"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主要病因" prop="mainCauses">
              <el-input v-model="formData.jsonStr.missDisease.mainCauses"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="常见症状" prop="commonSymptom">
              <el-input v-model="formData.jsonStr.missDisease.commonSymptom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="多发群体" prop="multiplePopulation">
              <el-input v-model="formData.jsonStr.missDisease.multiplePopulation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="传染性" >
              <el-select v-model="formData.jsonStr.missDisease.infectivity" >
                <el-option
                  v-for="item in enumerate.infectivityList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节特点" prop="seaCharacteristic">
              <el-input v-model="formData.jsonStr.missDisease.seaCharacteristic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="科室父级" prop="departmentPid">
              <el-input placeholder="请输入内容" :disabled="true" v-model="departmentPidtoChinese" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showDepartmentDialog"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="就诊科室" prop="departmentId">
              <el-select v-model="formData.jsonStr.missDisease.departmentId" >
                <el-option
                  v-for="item in departmentList"
                  :key="item.jsonStr.key.id"
                  :label="item.jsonStr.key.departmentName"
                  :value="item.jsonStr.key.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="临床类型" prop="clinicalTypesClass">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.clinicalTypesClass" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('clinicalTypesClass')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="临床表现" prop="clinicalManifestation">
              <el-input v-model="formData.jsonStr.missDisease.clinicalManifestation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="体征" prop="sign">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.sign" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('sign')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室检查" prop="laboratoryExamination">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.laboratoryExamination" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('laboratoryExamination')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="诊断要点" prop="diagnosticPoints">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.diagnosticPoints" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('diagnosticPoints')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="鉴别诊断" prop="differentialDiagnosis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.differentialDiagnosis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('differentialDiagnosis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="并发症及防治" prop="preventionTreatment">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.preventionTreatment" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventionTreatment')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="治疗与预防" prop="treatmentPrognosis">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.treatmentPrognosis" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('treatmentPrognosis')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预防调护" prop="preventiveNursing">
              <el-input v-model="formData.jsonStr.missDisease.preventiveNursing"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="护理" prop="nursing">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.nursing" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('nursing')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="防治措施" prop="preventionMeasures">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.preventionMeasures" class="input-with-select">
                <el-button slot="append" icon="el-icon-more" @click="showClinicalTypesDialog('preventionMeasures')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="膳食调理" prop="dietaryConditioning">
              <el-input v-model="formData.jsonStr.missDisease.dietaryConditioning"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="耐药性" prop="drugResistance">
              <el-input v-model="formData.jsonStr.missDisease.drugResistance"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注意事项" prop="attentionMatter">
              <el-input placeholder="请输入内容" :disabled="true" v-model="formData.jsonStr.missDisease.attentionMatter" class="input-with-select">
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
  import { getDepartmentList, doCreateDisBasics, getDislocationList } from '../../api/task'

  import searchDepartmentDialog from '../dialog/searchDepartmentDialog'
  import searchLocationPidDialog from '../dialog/searchLocationPidDialog'
  import quillEditorDialog from '../dialog/quillEditorDialog'

  import enumerate from '../../store/modules/enumerate'
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
        formData: {
          'taskStatus': '',
          'taskType': '',
          'taskMenuType': 'missDisease',
          'taskTitle': '',
          'taskChangeVote': '',
          'taskChangePoints': '',
          'taskChangeComments': '',
          'taskId': '',
          'jsonStr': {
            'symptomMapDTO': {
              'symptomId': '',
              'symptomChineseName': '',
              'symptomEnglishName': ''
            },
            'missDisease': {
              'taskId': '',
              'id': '',
              'chineseName': '',
              'englishName': '',
              'otherName': '',
              'latinName': '',
              'relatedDiseases': '',
              'diseaseType': '1',
              'locationPid': '',
              'locationDisease': '',
              'mainCauses': '',
              'commonSymptom': '',
              'multiplePopulation': '',
              'infectivity': 1,
              'seaCharacteristic': '',
              'departmentPid': '',
              'departmentId': '',
              'clinicalTypesClass': '',
              'clinicalManifestation': '',
              'sign': '',
              'laboratoryExamination': '',
              'diagnosticPoints': '',
              'differentialDiagnosis': '',
              'preventionTreatment': '',
              'treatmentPrognosis': '',
              'preventiveNursing': '',
              'nursing': '',
              'preventionMeasures': '',
              'dietaryConditioning': '',
              'drugResistance': '',
              'attentionMatter': '',
              'picturePath': '',
              'thumbnail': '',
              'dataStatus': ''
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
        this.curInputContent = this.formData.jsonStr.missDisease[key]
        this.isShowquillEditorDialog = true
      },
      cancelBtn() {
        this.$emit('update:visible', false)
      },
      doCreate() {
        this.isShowCreateVisible = true
      },
      listenLocationChild(data) {
        this.formData.jsonStr.missDisease.locationPid = data.jsonStr.key.id
        this.locationPidtoChinese = data.jsonStr.key.dislocationName
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
        this.formData.jsonStr.missDisease.departmentPid = data.jsonStr.key.id
        this.departmentPidtoChinese = data.jsonStr.key.departmentName
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
        // 判断之前典籍的是那个输入框后面得按钮，对应的将值付给那个输入框
        switch (this.curInputKey) {
          case 'clinicalTypesClass':
            this.formData.jsonStr.missDisease.clinicalTypesClass = data
            break
          case 'sign':
            this.formData.jsonStr.missDisease.sign = data
            break
          case 'laboratoryExamination':
            this.formData.jsonStr.missDisease.laboratoryExamination = data
            break
          case 'diagnosticPoints':
            this.formData.jsonStr.missDisease.diagnosticPoints = data
            break
          case 'differentialDiagnosis':
            this.formData.jsonStr.missDisease.differentialDiagnosis = data
            break
          case 'preventionTreatment':
            this.formData.jsonStr.missDisease.preventionTreatment = data
            break
          case 'treatmentPrognosis':
            this.formData.jsonStr.missDisease.treatmentPrognosis = data
            break
          case 'nursing':
            this.formData.jsonStr.missDisease.nursing = data
            break
          case 'preventionMeasures':
            this.formData.jsonStr.missDisease.treatmentPrognosis = data
            break
          case 'attentionMatter':
            this.formData.jsonStr.missDisease.treatmentPrognosis = data
            break
          default:
            break
        }
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
        this.formData.taskMenuType = 'missDisease'
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
        this.formData.taskMenuType = 'missDisease'
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
      locationPidtoChinese1() {
        const params = {
          currentPage: 1,
          pageSize: 1000
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })
        if (this.formData.jsonStr.missDisease.locationPid) {
          const newarr = this.dislocationList
          newarr.filter(item => item.jsonStr.id === this.formData.jsonStr.missDisease.locationPid)
          console.log('newarr[0].departmentName===', newarr[0].departmentName)
          return newarr[0].departmentName
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

