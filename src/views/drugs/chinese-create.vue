<template>
  <div class="app-container" id="institutionCreate">
    <div v-if="!isCheck">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">数据校验</div>
            <div class="body">
              <el-form :model="formData" label-width="80px">
                <el-form-item label="通用名称">
                  <el-input v-model="formData.jsonStr.missMedical.comName" placeholder="请输入医生姓名"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input v-model="formData.jsonStr.missMedical.shopName" placeholder="请输入医生出生日期"></el-input>
                </el-form-item>
                <el-form-item label="汉语拼音">
                  <el-input v-model="formData.jsonStr.missMedical.chinesePinyin" placeholder="请输入医生出生日期"></el-input>
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
                <el-form-item label="药品类型">
                  <el-input v-model="formData.jsonStr.missMedical.medicalType"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missMedical.picturePath" :src="formData.jsonStr.missMedical.picturePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="el-upload__text">图片要求：1080*810，不超过10M</div>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="formData.jsonStr.missMedical.introduction">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">基本信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="90px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="药品类型">
                      <el-input v-model="formData.jsonStr.missMedical.drugType" placeholder="药品类型"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医保类型">
                      <el-input v-model="formData.jsonStr.missMedical.healthType" placeholder="医保类型"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="处方类型">
                      <el-radio v-model="formData.jsonStr.missMedical.recipeType" label="1">处方</el-radio>
                      <el-radio v-model="formData.jsonStr.missMedical.recipeType" label="2">非处方</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参考价格">
                      <el-input v-model="formData.jsonStr.missMedical.price" placeholder="参考价格"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="中成药类型">
                      <el-select
                        v-model="formData.jsonStr.missMedical.chineseMedicalType"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择">
                        <el-option
                          v-for="item in enumerate.chineseDrugsType"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中成药科室">
                      <el-select
                        v-model="formData.jsonStr.missMedical.chineseMedicalDepartment"
                        multiple
                        collapse-tags
                        style="margin-left: 20px;"
                        placeholder="请选择">
                        <el-option
                          v-for="item in enumerate.chineseDrugsDepartment"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="编辑医生">
                      <el-input v-model="formData.jsonStr.missMedical.editDoctor" placeholder="编辑医生"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核医生">
                      <el-input v-model="formData.jsonStr.missMedical.auditDoctor" placeholder="审核医生"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">主要成分</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.component" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">性状</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.property" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">组成</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.constitute" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">主要功效</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.mainMeffect" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">适应病症</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.indication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">规格</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.medicFormat" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">用法用量</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.dosage" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床应用及指南</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.clinicalApplication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">不良反应</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.adverseReaction" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">禁忌</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.taboo" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">注意事项</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.notice" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药物相互作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.interactions" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药性分析</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.analyze" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药理作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.pharmacology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">毒理作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.toxicologicalEffects" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">贮藏</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.storageMethod" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">有效期</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.ytime" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">执行标准</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.standard" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">执行文号</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.approvaNum" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">联合用药</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.combinedMedication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医师建议</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.physicianAdvice" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">鉴别</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.identify" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.pharmacyCheck" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">含量测定</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.contentPic" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">附注</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.notes" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <!--药品标识需要配图 -->
          <div class="card">
            <div class="title">药品标识</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.drugIdentifying" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药品介绍</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.drugIntroduc" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">历史发展</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.history" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">获奖情况</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.awards" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">生产地址</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.address" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">生产企业</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.enterprise" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <!--产品信息需要配图 -->
          <div class="card">
            <div class="title">产品信息</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.productInfo" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">信息来源</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missMedical.messageFrom" :options="editorOption"></quill-editor>
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
                <!--<span style="color: red;" v-if="formData.jsonStr.missMedical[item.key] === '' ||formData.jsonStr.missMedical[item.key].length ===0">（空） </span>-->
                <!--<span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missMedical[item.key])}}</span>-->
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
  import { doMedicalCheck, doCreateDisBasics, getDepartmentList } from '../../api/task'
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
        isCheck: true,
        isShowLeaderDiaolg: false,
        isShowEnvironmentDialog: false,
        isShowRefrencesImageDialog: false,
        formData: {
          'taskStatus': 'drafts',
          'taskType': 'create',
          'taskMenuType': 'missMedical',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missMedical': {
              id: '',
              introduction: '',
              picturePath: '',
              medicalType: '',
              comName: '',
              chinesePinyin: '',
              drugType: '',
              recipeType: '',
              healthType: '',
              price: '',
              component: '',
              property: '',
              constitute: '',
              mainMeffect: '',
              indication: '',
              clinicalApplication: '',
              adverseReaction: '',
              analyze: '',
              medicFormat: '',
              dosage: '',
              adverseReactions: '',
              taboo: '',
              notice: '',
              interactions: '',
              pharmacology: '',
              toxicologicalEffects: '',
              storageMethod: '',
              ytime: '',
              standard: '',
              approvalNum: '',
              identify: '',
              pharmacyCheck: '',
              contentPic: '',
              notes: '',
              combinedMedication: '',
              physicianAdvice: '',
              drugIdentifying: '',
              drugIntroduc: '',
              history: '',
              awards: '',
              address: '',
              enterprise: '',
              productInfo: '',
              messageFrom: '',
              chineseMedicalType: [],
              chineseMedicalDepartment: '',
              editDoctor: '',
              auditDoctor: ''
            },
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: []// 各模块评审结果
          }
        },

        refrencesObj: {
          sequenc: '', // 序号
          referColumnschinese: '', // 模块：领导团队
          referenceType: 'image', // text iamge
          url: [], // 网站路径
          comment: '', // 描述
          imageName: '' // 图片名称
        },
        refrencesPicList: [],
        keyArr: [{ key: 'introduction', value: '简介' }, { key: 'component', value: '成分' }, { key: 'property', value: '教育经历' },
          { key: 'indication', value: '适应症' }, { key: 'medicFormat', value: '规格' }, { key: 'dosage', value: '用法用量' },
          { key: 'clinicalApplication', value: '临床应用及指南' },
          { key: 'adverseReaction', value: '不良反应' }, { key: 'taboo', value: '禁忌' }, { key: 'notice', value: '注意事项' },
          { key: 'gravidaDurg', value: '孕妇及哺乳期妇女用药' },
          { key: 'childrenDurg', value: '儿童用药' }, { key: 'elderlyDurg', value: '老人用药' }, { key: 'interactions', value: '药物相互作用' },
          { key: 'analyze', value: '药性分析' }, { key: 'pharmacology', value: '药理作用' }, { key: 'toxicologicalEffects', value: '毒理作用' },
          { key: 'storageMethod', value: '贮藏' }, { key: 'ytime', value: '有效期' },
          { key: 'standard', value: '执行标准' }, { key: 'approvaNum', value: '执行文号' }, { key: 'combinedMedication', value: '联合用药' },
          { key: 'physicianAdvice', value: '医师建议' }, { key: 'identify', value: '鉴别' }, { key: 'pharmacyCheck', value: '检查' },
          { key: 'contentPic', value: '含量测定' }, { key: 'notes', value: '附注' }, { key: 'drugIdentifying', value: '药品标识' },
          { key: 'drugIntroduc', value: '药品介绍' }, { key: 'history', value: '历史发展' }, { key: 'awards', value: '获奖情况' },
          { key: 'address', value: '生产地址' }, { key: 'enterprise', value: '生产企业' }, { key: 'productInfo', value: '产品信息' },
          { key: 'messageFrom', value: '信息来源' }
        ],
        institutionList: [],
        departmentList: [],
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
    },
    filters: {
    },
    methods: {
      doCheck() {
        const params = {
          comName: this.formData.jsonStr.missMedical.comName,
          shopName: this.formData.jsonStr.missMedical.shopName,
          chinesePinyin: this.formData.jsonStr.missMedical.chinesePinyin
        }
        doMedicalCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      changeInstitutionId(val) {
        const params = {
          currentPage: 1,
          pageSize: 9999,
          InstitutionId: val
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
        this.formData.jsonStr.missMedical.picturepath = URL.createObjectURL(file.raw)
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
       * 执业机构及部门设置
       * */
      doAddInstitution() {
        const param = {
          institutionId: '',
          institutionName: '',
          departmentId: '',
          departmentName: '',
          expertsTime: ''
        }
        this.formData.jsonStr.missMedical.institutionList.push(param)
      },
      doDeleteInstitution(index) {
        this.formData.jsonStr.missMedical.institutionList.splice(index, 1)
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
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/drugs/chinese')
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
        if (this.formData.jsonStr.missMedical.leadteamInfo.length > 0) {
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
