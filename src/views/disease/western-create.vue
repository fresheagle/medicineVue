<template>
  <div class="app-container" id="institutionCreate">
    <div v-if="!isCheck">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">数据校验</div>
            <div class="body">
              <el-form :model="formData" label-width="80px">
                <!--<el-form-item label="中文名称">-->
                  <!--<el-input v-model="formData.jsonStr.missWsetDisease.chineseName" placeholder="中文名称"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="英文名称">
                  <el-input v-model="formData.jsonStr.missWsetDisease.englishName" placeholder="英文名称"></el-input>
                </el-form-item>
                <!--<el-form-item label="别名">-->
                  <!--<el-input v-model="formData.jsonStr.missWsetDisease.otherName" placeholder="别名"></el-input>-->
                <!--</el-form-item>-->
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
          <!--<div class="card">-->
            <!--<div class="title">任务信息</div>-->
            <!--<div class="body">-->
              <!--<el-form ref="formData" :model="formData" label-width="80px">-->
                <!--<el-form-item label="任务标题">-->
                  <!--<el-input v-model="formData.taskTitle"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</div>-->
          <!--</div>-->
          <div class="card">
            <div class="title">概述</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.jsonStr.missWsetDisease.name"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missWsetDisease.picturepath" :src="formData.jsonStr.missWsetDisease.picturepath" class="avatar">
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
                    v-model="formData.jsonStr.missWsetDisease.introduction">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">基本信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="120px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="中文名称">
                      <el-input v-model="formData.jsonStr.missWsetDisease.chineseName" placeholder="中文名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="英文名称">
                      <el-input v-model="formData.jsonStr.missWsetDisease.englishName" placeholder="英文名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="别名">
                      <el-input v-model="formData.jsonStr.missWsetDisease.otherName" placeholder="别名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相关西医疾病">
                      <el-input v-model="formData.jsonStr.missWsetDisease.relatedDiseases" placeholder="英文名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主要病因">
                      <el-input v-model="formData.jsonStr.missWsetDisease.mainCauses" placeholder="主要病因"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="常见症状">
                      <el-input v-model="formData.jsonStr.missWsetDisease.commonSymptom" placeholder="常见症状"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="多发群体">
                      <el-input v-model="formData.jsonStr.missWsetDisease.multiplePopulation" placeholder="多发群体"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="传染性" >
                      <el-select v-model="formData.jsonStr.missWsetDisease.infectivity" >
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
                  <el-col :span="12">
                    <el-form-item label="疾病分类">
                      <!--<el-select v-model="formData.jsonStr.missWsetDisease.diseaseType" disabled >-->
                        <!--<el-option-->
                          <!--v-for="item in enumerate.diseaseTypeList"-->
                          <!--:key="item.id"-->
                          <!--:label="item.value"-->
                          <!--:value="item.id">-->
                        <!--</el-option>-->
                      <!--</el-select>-->
                      <el-input v-model="formData.jsonStr.missWsetDisease.type" placeholder="疾病分类"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="12">-->
                  <!--<el-form-item label="发病部位">-->
                  <!--<el-select v-model="formData.jsonStr.missWsetDisease.locationDisease" >-->
                  <!--<el-option-->
                  <!--v-for="item in dislocationList"-->
                  <!--:key="item.jsonStr.key.id"-->
                  <!--:label="item.jsonStr.key.dislocationName"-->
                  <!--:value="item.jsonStr.key.id">-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <!--</el-form-item>-->
                  <!--</el-col>-->
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">发病部位</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAddDislocation" type="primary">新增发病部位</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missWsetDisease.dislocationList" style="margin-bottom: 5px;">
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
            <div class="title">就诊科室</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAdddepartment" type="primary">新增科室</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missWsetDisease.departmentMapDTO" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="7" style="padding-right:40px;">
                    <el-select  v-model="itemd.parentDepartmentId" @change="changePdepartment">
                      <el-option
                        v-for="item in pdepartmentList"
                        :key="item.id"
                        :label="item.departmentName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select  v-model="itemd.departmentId">
                      <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.departmentName"
                        :value="item.id">
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
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.epidemiology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">相关疾病</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.tRelatedDisease" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">病因与发病机制</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.etiologyPathogenesis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">病理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.pathology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床分型与分类</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.clinicalTypesClass" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">症状体征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.symptom" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">实验室检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.laboratoryExamination" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">其他辅助检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.text_otherCheck" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">并发症</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.preventionTreatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">诊断要点</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.diagnosticPoints" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">鉴别诊断</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.differentialDiagnosis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="title">治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.treatmentPrognosis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">护理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.nursing" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预防措施</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.preventionMeasures" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">膳食调理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.dietaryConditioning" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">注意事项</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.attentionMatter" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">急诊（120）指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.consultation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">门诊指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.section" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">现代研究</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.modernResearch" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">治疗费用参考</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.treatmentCost" :options="editorOption"></quill-editor>
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
                    <div  style="padding-bottom: 10px;"><el-button @click="doAddRefrences" type="primary">新增</el-button></div>
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
              <div v-for="item in keyArr" style="margin-bottom: 15px;">
                <span style="margin-right: 20px;">{{item.value}} </span>
                <span style="color: red;" v-if="formData.jsonStr.missWsetDisease[item.key] === '' ||formData.jsonStr.missWsetDisease[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missWsetDisease[item.key])}}</span>
              </div>
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
  import { doWestDiseaseCheck, doCreateDisBasics, getDepartmentList, getDislocationList } from '../../api/task'
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
          'taskMenuType': 'missWsetDisease',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missWsetDisease': { // missWsetDisease
              name: '',
              picturepath: '',
              introduction: '',
              chineseName: '',
              englishName: '',
              otherName: '',
              relatedDiseases: '',
              diseaseType: '2',
              type: '',
              locationPid: '',
              locationDisease: '',
              mainCauses: '',
              commonSymptom: '',
              multiplePopulation: '',
              infectivity: 1,
              epidemiology: '',
              tRelatedDisease: '',
              etiologyPathogenesis: '',
              pathology: '',
              clinicalTypesClass: '',
              symptom: '',
              laboratoryExamination: '',
              text_otherCheck: '',
              preventionTreatment: '',
              diagnosticPoints: '',
              differentialDiagnosis: '',
              treatmentPrognosis: '',
              nursing: '',
              preventionMeasures: '',
              dietaryConditioning: '',
              attentionMatter: '',
              consultation: '',
              section: '',
              modernResearch: '',
              treatmentCost: '',
              departmentMapDTO: [],
              dislocationList: []
            },
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: []// 各模块评审结果
          }
        },
        dislocationPList: [], // 发病部位
        dislocationList: [], // 发病部位
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
        keyArr: [{ key: 'introduction', value: '简介' }, { key: 'chineseName', value: '中文名称' }, { key: 'englishName', value: '英文名称' },
          { key: 'otherName', value: '别名' }, { key: 'relatedDiseases', value: '相关西医疾病' }
        ],
        provinceList: [],
        departmentList: [],
        pdepartmentList: [],
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
      const params = {
        currentPage: 1,
        pageSize: 9999,
        parentDepartmentId: 0
      }
      this.initDislocationList()
      this.getDepartmentList(params)
    },
    filters: {
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
        this.formData.jsonStr.missWsetDisease.picturepath = ''
      },
      doCheck() {
        const params = {
          // chineseName: this.formData.jsonStr.missWsetDisease.chineseName,
          englishName: this.formData.jsonStr.missWsetDisease.englishName
          // otherName: this.formData.jsonStr.missWsetDisease.otherName
        }
        doWestDiseaseCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      getDepartmentList(params) {
        getDepartmentList(params).then(response => {
          this.pdepartmentList = response.data.params
        })
      },
      changePdepartment(val) {
        debugger
        const params = {
          currentPage: 1,
          pageSize: 9999,
          parentDepartmentId: val
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
        this.formData.jsonStr.missWsetDisease.picturepath = URL.createObjectURL(file.raw)
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
       * 科室设置
       * */
      doAdddepartment() {
        const param = {
          parentDepartmentId: '',
          departmentId: '',
          departmentName: '',
          departmentLevel: ''
        }
        this.formData.jsonStr.missWsetDisease.departmentMapDTO.push(param)
      },
      doDeleteDepartment(index) {
        this.formData.jsonStr.missWsetDisease.departmentMapDTO.splice(index, 1)
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
        this.formData.jsonStr.missWsetDisease.dislocationList.push(param)
      },
      doDeleteDislocation(index) {
        this.formData.jsonStr.missWsetDisease.dislocationList.splice(index, 1)
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
        this.refrencesObj.fileList = []
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
        this.formData.taskTitle = this.formData.jsonStr.missWsetDisease.chineseName
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/disease/western')
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
        if (this.formData.jsonStr.missWsetDisease.leadteamInfo.length > 0) {
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
