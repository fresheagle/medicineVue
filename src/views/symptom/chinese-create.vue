<template>
  <div class="app-container" id="institutionCreate">
    <div v-if="!isCheck">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">数据校验</div>
            <div class="body">
              <el-form :model="formData" label-width="80px">
                <el-form-item label="中文名称">
                  <el-input v-model="formData.jsonStr.missChineseSymptom.chineseName" placeholder="其他名称"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button @click="doCheck">校验</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isCheck" style="top:0px;position: relative;">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">任务信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="任务标题">
                  <el-input v-model="formData.taskTitle"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">概述</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.jsonStr.missChineseSymptom.name"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missChineseSymptom.picturepath" :src="formData.jsonStr.missChineseSymptom.picturepath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="el-upload__text">图片要求：1080*810，不超过10M</div>
                  <el-button @click="clearPic">清除</el-button>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="formData.jsonStr.missChineseSymptom.introduction">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">基本信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="中文名称">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.chineseName" placeholder="其他名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="英文名称">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.englishName" placeholder="请输入任务标题"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="其他名称">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.otherName" placeholder="其他名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="传染性" >
                      <el-select v-model="formData.jsonStr.missChineseSymptom.infectivity" >
                        <el-option
                          v-for="item in infectivityList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主要病因">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.mainCauses" placeholder="主要病因"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="常见症状">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.commonSymptom" placeholder="常见症状"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="检查项目">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.inspectionItems" placeholder="检查项目"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="多发群体">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.multiplePopulation" placeholder="多发群体"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="相关疾病(old)">
                      <span>{{formData.jsonStr.missChineseSymptom.commonDiseasesOld}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相关疾病">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.commonDiseases" placeholder="相关疾病"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="编辑医生">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.editDoctor" placeholder="编辑医生"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核医生">
                      <el-input v-model="formData.jsonStr.missChineseSymptom.auditDoctor" placeholder="审核医生"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">发病部位</div>
            <div class="body">
              <div  style="padding-bottom: 10px;">
                <el-button @click="doAddDislocation" type="primary">新增发病部位</el-button>
              </div>
              <div v-for="(itemd, index) in formData.jsonStr.missChineseSymptom.dislocationList" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="7" style="padding-right:40px;">
                    <el-select  v-model="itemd.parentDislocationId" @change="changeDisLocation">
                      <el-option
                        v-for="item in dislocationPList"
                        :key="item.jsonStr.key.id"
                        :label="item.jsonStr.key.dislocationName"
                        :value="item.jsonStr.key.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select  v-model="itemd.dislocationId">
                      <el-option
                        v-for="item in dislocationList"
                        :key="item.jsonStr.key.id"
                        :label="item.jsonStr.key.dislocationName"
                        :value="item.jsonStr.key.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-button @click="doDeleteDislocation(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="title">相关中医疾病</div>
            <div class="body">
              <el-button type="primary" @click="showEnvironmentDialog">添加医院信息</el-button>
              <div style="padding-top: 10px;" v-if="formData.jsonStr.missChineseSymptom.environment.length"
                   v-for="(item,index) in formData.jsonStr.missChineseSymptom.environment">
                <el-row>
                  <el-col :span="6">
                    <div>
                      <picture-slider :picture-list="item.picture"></picture-slider>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="padding-bottom: 10px;">
                      <el-input  v-model="item.name"></el-input>
                    </div>
                    <div >
                      <el-input type="textarea" :rows="4" v-model="item.desc"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="deleteEnvironment(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">相关西医疾病</div>
            <div class="body">
              <div  style="padding-bottom: 10px;">
                <el-button @click="doAdddepartment" type="primary">新增科室</el-button>
              </div>

              <div v-for="(itemd, index) in formData.jsonStr.missChineseSymptom.departmentMapDTO" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="7" style="padding-right:40px;">
                    <el-input  v-model="itemd.office"></el-input>
                  </el-col>
                  <el-col :span="7" style="padding-right:40px;">
                    <el-select  v-model="itemd.departmentPid" @change="changePdepartment">
                      <el-option
                        v-for="item in pdepartmentList"
                        :key="item.id"
                        :label="item.departmentName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select  v-model="itemd.departmentCode">
                      <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.departmentName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select v-model="itemd.departmentLevel">
                      <el-option
                        v-for="item in enumerate.departmentLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-button @click="doDeleteDepartment(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">流行病学</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.epidemiology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">症状起因</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.symptomOrigin" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床表现</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.clinicalManifestation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.inspect" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">诊断</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.diagnosi" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">鉴别诊断</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.differentialDiagnosis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床意义</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.clinicalSignificance" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.treatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预防措施</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.preventiveMeasure" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">日常护理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.dailyNursing" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">注意事项</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.attentionMatter" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">影响因素</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.influenceFactor" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">急诊（120）指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.consultation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">门诊指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseSymptom.section" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="card">
            <div class="title">参考资料</div>
            <div class="body">
              <el-tabs>
                <el-tab-pane label="文本或网站">
                  <div class="body">
                    <div  style="padding-bottom: 10px;">
                      <el-button @click="doAddRefrences" type="primary">新增</el-button>
                    </div>
                    <div v-for="(item, index) in formData.jsonStr.refrences.textcontent" style="margin-bottom: 5px;">
                      <el-row >
                        <el-col :span="8" style="padding-right:10px;">
                          <el-select placeholder="选择字段"
                                     multiple
                                     filterable
                                     allow-create
                                     collapse-tags
                                     default-first-option
                                     v-model="item.referColumnschinese">
                            <el-option
                              v-for="item in enumerate.institutionMenu"
                              :key="item.title"
                              :label="item.title"
                              :value="item.title">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="6" style="padding-right:10px;">
                          <el-input  placeholder="描述" v-model="item.comment"></el-input>
                        </el-col>
                        <el-col :span="6" style="padding-right:10px;">
                          <el-input  placeholder="网址" v-model="item.url"></el-input>
                        </el-col>
                        <el-col :span="4">
                          <div>
                            <el-button type="text" @click="doDeleteRefrences(index)">删除</el-button>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="图片">
                  <div class="body">
                    <el-button type="primary" @click="showRefrencesImageDialog">添加图片资料</el-button>
                    <div style="padding-top: 10px;" v-if="formData.jsonStr.refrences.image.length"
                         v-for="(item,index) in formData.jsonStr.refrences.image">
                      <el-row>
                        <el-col :span="6">
                          <div>
                            <picture-slider :picture-list="item.url"></picture-slider>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div style="padding-bottom: 10px;">
                            <el-select placeholder="选择字段"
                                       multiple
                                       filterable
                                       allow-create
                                       collapse-tags
                                       default-first-option
                                       v-model="item.referColumnschinese">
                              <el-option
                                v-for="item in enumerate.institutionMenu"
                                :key="item.title"
                                :label="item.title"
                                :value="item.title">
                              </el-option>
                            </el-select>
                          </div>
                          <div >
                            <el-input type="textarea" :rows="4" v-model="item.comment"></el-input>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <el-button @click="doDeleteRefrencesPic(index)">删除</el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="card">
            <div class="title">信息统计</div>
            <div class="body" style="height: 800px;overflow-y: auto;">
              <!--<div v-for="item in keyArr" style="margin-bottom: 15px;">-->
              <!--<span style="margin-right: 20px;">{{item.value}} </span>-->
              <!--<span style="color: red;" v-if="formData.jsonStr.missChineseSymptom[item.key] === '' ||formData.jsonStr.missChineseSymptom[item.key].length ===0">（空） </span>-->
              <!--<span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missChineseSymptom[item.key])}}</span>-->
              <!--</div>-->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="isCheck" class="footer">
      <el-row>
        <el-col :span="12" style="padding: 10px;">
          <div>
            <!--<span>字数统计</span>-->
            <!--<span>( 总计:16   填写情况:13)</span>-->
            <!--<span>全文共1999字</span>-->
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin-right: 20%;">
            <!--<el-button>预览</el-button>-->
            <el-button @click="doSubmit('approveSuccess')">提交进入审核</el-button>
            <!--<el-button>重置所有字段</el-button>-->
            <el-button  @click="doSubmit('save')">保存并关闭</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--参考资料弹框-->
    <el-dialog
      title="添加参考资料"
      :append-to-body="true"
      :visible.sync="isShowRefrencesImageDialog"
      width="30%">
      <div>
        <el-form label-width="80px" :model="refrencesObj">
          <el-form-item label="字段">
            <el-select placeholder="选择字段"
                       multiple
                       filterable
                       allow-create
                       collapse-tags
                       default-first-option
                       v-model="refrencesObj.referColumnschinese">
              <el-option
                v-for="item in enumerate.institutionMenu"
                :key="item.title"
                :label="item.title"
                :value="item.title">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="4" v-model="refrencesObj.comment"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="/api/file/upload"
              :file-list="refrencesObj.fileList"
              :on-success="upRefrencesPicSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="doAddRefrencesImage">确 定</el-button>
					<el-button @click="cancelRefrencesImage">取 消</el-button>
				</span>
    </el-dialog>
  </div>
</template>
<script>
  import { doSymptomCheck, doCreateDisBasics, getDepartmentList, getDislocationList } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  import i18n from '../../i18n/local'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  import pictureSlider from '../dialog/pictureSlider'

  const viewName = 'i18nView'
  export default {
    components: {
      quillEditor,
      pictureSlider
    },
    data() {
      return {
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        imageUrl: '',
        isCheck: false,
        isShowLeaderDiaolg: false,
        isShowEnvironmentDialog: false,
        isShowRefrencesImageDialog: false,
        formData: {
          'taskStatus': 'drafts',
          'taskType': 'create',
          'taskMenuType': 'missWesternSymptom',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missChineseSymptom': {
              id: '',
              introduction: '',
              picturepath: '',
              chineseName: '',
              englishName: '',
              otherName: '',
              infectivity: '',
              mainCauses: '',
              commonSymptom: '',
              inspectionItems: '',
              commonDiseases: '',
              commonDiseasesOld: '',
              multiplePopulation: '',
              epidemiology: '',
              symptomOrigin: '',
              clinicalManifestation: '',
              inspect: '',
              diagnosi: '',
              differentialDiagnosis: '',
              clinicalSignificance: '',
              treatment: '',
              preventiveMeasure: '',
              dailyNursing: '',
              attentionMatter: '',
              influenceFactor: '',
              consultation: '',
              editDoctor: '',
              auditDoctor: '',
              departmentId: '',
              dislocationList: [],
              chineseDiseaseList: [],
              westernDiseaseList: []
            },
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: []// 各模块评审结果
          }
        },
        infectivityList: enumerate.infectivityList,
        dislocationPList: [], // 发病部位
        dislocationList: [], // 发病部位
        leadteamInfoObj: {
          name: '',
          desc: '',
          picture: []
        },
        environmentObj: {
          name: '',
          desc: '',
          picture: []
        },
        refrencesObj: {
          fileList: [],
          sequenc: '', // 序号
          referColumnschinese: '', // 模块：领导团队
          referenceType: 'image', // text iamge
          url: [], // 网站路径
          comment: '', // 描述
          imageName: '' // 图片名称
        },
        refrencesPicList: [],
        keyArr: [{ key: 'introduction', value: '简介' }, { key: 'dislocationList', value: '发病部位' }, { key: 'environment', value: '医院环境' },
          { key: 'dislocationList', value: '科室设置' }, { key: 'epidemiology', value: '流行病学' }, { key: 'symptomOrigin', value: '症状起因' }, { key: 'clinicalManifestation', value: '临床表现' },
          { key: 'inspect', value: '检查' }, { key: 'diagnosi', value: '诊断' }, { key: 'differentialDiagnosis', value: '鉴别诊断' }, { key: 'clinicalSignificance', value: '临床意义' },
          { key: 'treatment', value: '治疗' }, { key: 'preventiveMeasure', value: '预防措施' }, { key: 'dailyNursing', value: '日常护理' }, { key: 'attentionMatter', value: '注意事项' },
          { key: 'influenceFactor', value: '影响因素' }, { key: 'consultation', value: '急诊（120）指征' }, { key: 'section', value: '门诊指征' }
        ],
        departmentList: [],
        parentDislocationId: [],
        editorOption: {
          placeholder: '请输入内容'
        },
        fileList3: []
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.initDislocationList()
      const params = {
        currentPage: 1,
        pageSize: 9999,
        parentDepartmentId: 0
      }
      this.getDepartmentList(params)
    },
    methods: {
      initDislocationList() {
        const params = {
          currentPage: 1,
          pageSize: 1000,
          parentDislocationId: 0
        }
        getDislocationList(params).then(response => {
          this.dislocationPList = response.data.params
        })
      },
      clearPic() {
        this.formData.jsonStr.missChineseSymptom.picturepath = ''
      },
      doCheck() {
        const params = {
          chineseName: this.formData.jsonStr.missChineseSymptom.chineseName
          // englishName: this.formData.jsonStr.missChineseSymptom.englishName,
          // otherName: this.formData.jsonStr.missChineseSymptom.otherName
        }
        doSymptomCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      changeParentDislocationId(val) {
        const params = {
          currentPage: 1,
          pageSize: 9999,
          parentDislocationId: val
        }
        getDepartmentList(params).then(response => {
          this.departmentList = response.data.params
        })
      },

      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3)
      },
      /*
      * 概述图
      * */
      upSummarySuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.jsonStr.missChineseSymptom.picturepath = URL.createObjectURL(file.raw)
      },
      beSummaryUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      /**
       * 发病部位设置
       * */
      doAddDislocation() {
        const param = {
          dislocationId: '',
          dislocationName: '',
          parentDislocationId: ''
        }
        this.formData.jsonStr.missChineseSymptom.dislocationList.push(param)
      },
      doDeleteDislocation(index) {
        this.formData.jsonStr.missChineseSymptom.dislocationList.splice(index, 1)
      },
      changeDisLocation(val) {
        const params = {
          currentPage: 1,
          pageSize: 1000,
          parentDislocationId: val
        }
        getDislocationList(params).then(response => {
          this.dislocationList = response.data.params
        })
      },
      /**
       * 参考资料
       * */
      doAddRefrences() {
        const param = {
          sequenc: '', // 序号
          referColumnschinese: '', // 模块：领导团队
          referenceType: 'text', // text iamge
          url: '', // 网站路径
          comment: '', // 描述
          imageName: '' // 图片名称
        }
        this.formData.jsonStr.refrences.textcontent.push(param)
      },
      doDeleteRefrences(index) {
        this.formData.jsonStr.refrences.textcontent.splice(index, 1)
      },
      showRefrencesImageDialog() {
        this.isShowRefrencesImageDialog = true
      },
      doAddRefrencesImage() {
        const param = {
          sequenc: '', // 序号
          referColumnschinese: this.refrencesObj.referColumnschinese, // 模块：领导团队
          referenceType: 'image', // text iamge
          url: this.refrencesPicList, // 网站路径
          comment: this.refrencesObj.comment, // 描述
          imageName: '' // 图片名称
        }
        this.formData.jsonStr.refrences.image.push(param)
        this.isShowRefrencesImageDialog = false
      },
      cancelRefrencesImage() {
        this.isShowRefrencesImageDialog = false
      },
      upRefrencesPicSuccess(response, file, fileList) {
        if (response.meta.success) {
          this.refrencesPicList.push(response.data[0].thumbnailUrl)
        }
      },
      doDeleteRefrencesPic(index) {
        this.formData.jsonStr.refrences.image.splice(index, 1)
      },
      // 创建操作
      doSubmit(key) {
        this.formData.operateCode = key
        this.formData.taskTitle = this.formData.jsonStr.missChineseSymptom.name
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/symptom/western')
          }
        })
      },
      fnGetCpmisWords(str) {
        var sLen = 0
        try {
          // 先将回车换行符做特殊处理
          str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
          // 处理英文字符数字，连续字母、数字、英文符号视为一个单词
          str = str.replace(/[\x00-\xff]/g, 'm')
          // 合并字符m，连续字母、数字、英文符号视为一个单词
          str = str.replace(/m+/g, '*')
          // 去掉回车换行符
          str = str.replace(/龘+/g, '')
          // 返回字数
          sLen = str.length
        } catch (e) {

        }
        return sLen
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
      },
      leadteamInfoLength() {
        if (this.formData.jsonStr.missChineseSymptom.leadteamInfo.length > 0) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style >
  .card{
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
  }
  .title{
    border-bottom: 1px solid;
    font-size: 20px;
    padding-bottom: 5px;
  }
  .body{
    padding-top: 20px;
  }
  #institutionCreate{
    background-color: #E6E6E6;
  }
  .rowClass{
    overflow:auto;
    max-height: 720px;
  }
  .footer{
    height: 50px;
    padding: 5px;
    background-color: #BBB9B9;
    width: 100%;
    position: fixed;
    bottom: 0px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
