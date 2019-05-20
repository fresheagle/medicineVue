<template>
  <div class="app-container" id="institutionCreate">
    <div style="top:0px;position: relative;">
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
                <el-form-item label="医生类型">
                  <el-input v-model="formData.jsonStr.missDoctor.type"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missDoctor.picturepath" :src="formData.jsonStr.missDoctor.picturepath" class="avatar">
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
                    v-model="formData.jsonStr.missDoctor.intro">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">基本信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别">
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
                  <el-col :span="12">
                    <el-form-item label="籍贯">
                      <el-input v-model="formData.jsonStr.missDoctor.origin" placeholder="籍贯"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="民族">
                      <el-input v-model="formData.jsonStr.missDoctor.nation" placeholder="民族"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="专业">
                      <el-input v-model="formData.jsonStr.missDoctor.profession" placeholder="专业"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="出生日期">
                      <el-input v-model="formData.jsonStr.missDoctor.birthday" placeholder="出生日期"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="逝世日期">
                      <el-input v-model="formData.jsonStr.missDoctor.dieday" placeholder="逝世日期"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="荣誉称号">
                      <el-input v-model="formData.jsonStr.missDoctor.honorary" placeholder="荣誉称号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="临床职称">
                      <el-input v-model="formData.jsonStr.missDoctor.clinicProfessional" placeholder="临床职称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="教学职称">
                      <el-input v-model="formData.jsonStr.missDoctor.eduProfessional" placeholder="教学职称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="毕业院校">
                      <el-input v-model="formData.jsonStr.missDoctor.graduate" placeholder="毕业院校"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="毕业院校">
                      <el-input v-model="formData.jsonStr.missDoctor.graduate" placeholder="毕业院校"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="创建医生">
                      <el-input v-model="formData.jsonStr.missDoctor.editDoctor" placeholder="创建医生ID"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="审核医生">
                      <el-input v-model="formData.jsonStr.missDoctor.auditDoctor" placeholder="审核医生ID"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">执业机构</div>
            <div class="body">
              <div  style="padding-bottom: 10px;">
                <el-button @click="doAddInstitution" type="primary">新增执业机构</el-button>
              </div>

              <div v-for="(itemd, index) in formData.jsonStr.missDoctor.institutionList" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="7" style="padding-right:40px;">
                    <el-select  v-model="itemd.institutionId" @change="changeInstitutionId">
                      <el-option
                        v-for="item in institutionId"
                        :key="item.id"
                        :label="item.institutionName"
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
                    <el-button @click="doDeleteInstitution(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">教育经历</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.education" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">工作经历</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.workExperience" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">诊疗范围</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.treatArea" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">研究方向</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.researchArea" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术思想</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.academi" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">科研成果</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.production" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">获奖情况</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.awards" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术兼职</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.science" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">社会活动</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.socialization" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">主要论文</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.thesis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">出版著作</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.bookmaking" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">传承图谱</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missDoctor.heritageMap" :options="editorOption"></quill-editor>
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
                <!--<span style="color: red;" v-if="formData.jsonStr.missDoctor[item.key] === '' ||formData.jsonStr.missDoctor[item.key].length ===0">（空） </span>-->
                <!--<span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missDoctor[item.key])}}</span>-->
              <!--</div>-->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
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
  import { doDoctorCheck, doCreateDisBasics, getDepartmentList } from '../../api/task'
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
          'taskMenuType': 'missDoctor',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missDoctor': {
              id: '',
              name: '',
              sex: '0',
              origin: '',
              nation: '',
              birthday: '',
              dieday: '',
              intro: '',
              picturepath: '',
              thumbnail: '',
              honorary: '',
              clinicProfessional: '',
              eduProfessional: '',
              graduate: '',
              profession: '',
              inauguralInstitution: '',
              education: '',
              workExperience: '',
              expertsTime: '',
              treatArea: '',
              researchArea: '',
              academic: '',
              production: '',
              awards: '',
              science: '',
              socialization: '',
              thesis: '',
              bookmaking: '',
              heritageMap: '',
              referenceMaterial: '',
              birthplaceDistrictCode: '',
              editDoctor: '',
              auditDoctor: '',
              institutionList: []
            },
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: []// 各模块评审结果
          }
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
        keyArr: [{ key: 'intro', value: '简介' }, { key: 'institutionList', value: '执业机构' }, { key: 'education', value: '教育经历' },
          { key: 'workExperience', value: '工作经历' }, { key: 'treatArea', value: '诊疗范围' }, { key: 'researchArea', value: '研究方向' }, { key: 'academi', value: '学术思想' },
          { key: 'production', value: '科研成果' }, { key: 'awards', value: '获奖情况' }, { key: 'science', value: '学术兼职' }, { key: 'socialization', value: '社会活动' },
          { key: 'thesis', value: '主要论文' }, { key: 'bookmaking', value: '出版著作' }, { key: 'heritageMap', value: '传承图谱' }
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
      this.formData = JSON.parse(localStorage.getItem('curTrearment'))
      const params = {
        currentPage: 1,
        pageSize: 9999,
        parentDepartmentId: 0
      }
      this.getDepartmentList(params)
    },
    methods: {
      doCheck() {
        const params = {
          name: this.formData.jsonStr.missDoctor.name,
          sex: this.formData.jsonStr.missDoctor.sex,
          birthday: this.formData.jsonStr.missDoctor.birthday
        }
        doDoctorCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      clearPic() {
        this.formData.jsonStr.missDoctor.picturepath = ''
      },
      getDepartmentList(params) {
        getDepartmentList(params).then(response => {
          this.institutionList = response.data.params
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
        this.formData.jsonStr.missDoctor.picturepath = URL.createObjectURL(file.raw)
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
        this.formData.jsonStr.missDoctor.institutionList.push(param)
      },
      doDeleteInstitution(index) {
        this.formData.jsonStr.missDoctor.institutionList.splice(index, 1)
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
        this.formData.taskTitle = this.formData.jsonStr.missDoctor.name
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/modernDoctor/cooperation')
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
        if (this.formData.jsonStr.missDoctor.leadteamInfo.length > 0) {
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
