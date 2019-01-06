<template>
  <div class="app-container" id="institutionCreate">
    <div v-if="!isCheck">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">数据校验</div>
            <div class="body">
              <el-form :model="formData" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.jsonStr.missInstitution.name" placeholder="请输入任务标题"></el-input>
                </el-form-item>
                <el-form-item label="官方网站">
                  <el-input v-model="formData.jsonStr.missInstitution.website" placeholder="请输入官方网站"></el-input>
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
                  <el-input v-model="formData.jsonStr.missInstitution.name"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="el-upload__text">图片要求：1080*810，不超过10M</div>
                </el-form-item>
                <el-form-item label="简介">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="formData.jsonStr.missInstitution.intro">
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
                    <el-form-item label="医保定点">
                      <el-radio-group v-model="formData.jsonStr.missInstitution.insurance">
                        <el-radio-button label="1">是</el-radio-button>
                        <el-radio-button label="0">否</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医院类别">
                      <el-input v-model="formData.jsonStr.missInstitution.category" placeholder="按照医疗机构职业证填写"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院等级">
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
                  <el-col :span="12">
                    <el-form-item label="医院性质">
                      <el-radio v-model="formData.jsonStr.missInstitution.nature" label="1">盈利</el-radio>
                      <el-radio v-model="formData.jsonStr.missInstitution.nature" label="0">非盈利</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主管部门">
                      <el-input v-model="formData.jsonStr.missInstitution.manageDepartment" placeholder="按照医疗机构职业证填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="成立时间">
                      <el-date-picker
                        v-model="formData.jsonStr.missInstitution.foundDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院电话">
                      <el-input v-model="formData.jsonStr.missInstitution.telephone" placeholder="010-64801818"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医院官网">
                      <el-input v-model="formData.jsonStr.missInstitution.website" placeholder="http://www.dayi.org.cn"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院分类">
                      <el-select v-model="formData.jsonStr.missInstitution.type" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医院院长">
                      <el-input v-model="formData.jsonStr.missInstitution.dean" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="医院地址">
                      <el-select v-model="formData.jsonStr.missInstitution.provinceCode" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.jsonStr.missInstitution.cityCode" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.jsonStr.missInstitution.districtCode" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item>
                      <el-input v-model="formData.jsonStr.missInstitution.address"  placeholder="街道与门牌号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">领导团队</div>
            <div class="body">
              <el-button>添加领导信息</el-button>
            </div>
          </div>
          <div class="card">
            <div class="title">医院环境</div>
            <div class="body">
              <el-button>添加医院信息</el-button>
            </div>
          </div>
          <div class="card">
            <div class="title">科室设置</div>
            <div class="body">
              <div v-for="(item, index) in formData.jsonStr.missInstitution.departmentMapDTO" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="7" style="padding-right:40px;">
                    <el-input  placeholder="实际科室名（必填）"></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-select >
                      <el-option
                        v-for="item in enumerate.institutionLevel"
                        :key="item.id"
                        :label="item.level"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-select >
                      <el-option
                        v-for="item in enumerate.institutionLevel"
                        :key="item.id"
                        :label="item.level"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-button v-if="index===0">新增</el-button>
                    <el-button v-if="index!==0">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">特色专科</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.special" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医疗优势</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.advantage" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医疗设施</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.equipment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">历史发展</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.history" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">乘车路线</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.busLines" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床教学与科研机构</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.clinicalTeaching" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">研究成果</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.researchResult" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术专著</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.academicMonograph" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术活动</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.academicActivity" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">获奖情况</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.honor" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">分支机构</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.affgroup" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊需知</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="挂号时间">
                      <el-date-picker
                        v-model="formData.jsonStr.missInstitution.registrationTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="就诊时间">
                      <el-date-picker
                        v-model="formData.jsonStr.missInstitution.outpatientTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="急诊时间">
                      <el-date-picker
                        v-model="formData.jsonStr.missInstitution.emergencyTime"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.treatGuide" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="card">
            <div class="title">参考资料</div>
            <div class="body">
              <el-tabs>
                <el-tab-pane label="文本或网站">文本或网站</el-tab-pane>
                <el-tab-pane label="图片">图片</el-tab-pane>
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
                <span style="color: red;" v-if="formData.jsonStr.missInstitution[item.key] === '' ||formData.jsonStr.missInstitution[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missInstitution[item.key])}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <div style="min-height: 300px;width: 100%;">123</div>
      </el-row>

    </div>
    <div v-if="isCheck" class="footer">
      <el-row>
        <el-col :span="12" style="padding: 10px;">
          <div>
            <span>字数统计</span>
            <span>( 总计:16   填写情况:13)</span>
            <span>全文共1999字</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin-right: 20%;">
            <el-button>预览</el-button>
            <el-button @click="doSubmit('approveSuccess')">提交进入审核</el-button>
            <el-button>重置所有字段</el-button>
            <el-button  @click="doSubmit('save')">保存并关闭</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import { doCheck, doCreateDisBasics } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  import i18n from '../../i18n/local'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  const viewName = 'i18nView'
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        imageUrl: '',
        isCheck: false,
        formData: {
          'taskStatus': 'drafts',
          'taskType': 'create',
          'taskMenuType': 'missInstitution',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missInstitution': {
              name: '',
              picturepath: '',
              intro: '',
              insurance: '0',
              category: '',
              level: '0',
              nature: '0',
              manageDepartment: '',
              foundDate: '',
              telephone: '',
              website: '',
              type: '1',
              dean: '',
              provinceCode: '',
              cityCode: '',
              districtCode: '',
              address: '',
              leadteamInfo: [
                {
                  name: '名称1',
                  desc: '描述',
                  picture: ['url1', 'url2']
                }
              ],
              environment: [
                {
                  name: '名称1',
                  desc: '描述',
                  picture: ['url1', 'url2']
                }
              ],
              departmentMapDTO: [{ name: '', id: '', id2: '' }, { name: '', id: '', id2: '' }],
              special: '',
              advantage: '',
              equipment: '',
              history: '',
              busLines: '',
              clinicalTeaching: '',
              researchResult: '',
              academicMonograph: '',
              academicActivity: '',
              honor: '',
              affgroup: '',
              registrationTime: '',
              outpatientTime: '',
              emergencyTime: '',
              treatGuide: ''
            },
            'refrences': [], // 参考资料
            'approvsls': []// 各模块评审结果
          }

        },
        keyArr: [{ key: 'intro', value: '简介' }, { key: 'leadteamInfo', value: '领导团队' }, { key: 'environment', value: '医院环境' },
          { key: 'departmentMapDTO', value: '科室设置' }, { key: 'special', value: '特色专科' }, { key: 'advantage', value: '医疗优势' }, { key: 'equipment', value: '医疗设施' },
          { key: 'history', value: '历史发展' }, { key: 'busLines', value: '乘车路线' }, { key: 'clinicalTeaching', value: '临床教学与研究机构' }, { key: 'researchResult', value: '研究成果' },
          { key: 'academicMonograph', value: '学术专著' }, { key: 'academicActivity', value: '学术活动' }, { key: 'honor', value: '获奖情况' }, { key: 'affgroup', value: '分支机构' }
        ],
        editorOption: {
          placeholder: '请输入内容'
        }
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
          name: this.formData.jsonStr.missInstitution.name,
          website: this.formData.jsonStr.missInstitution.website
        }
        doCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.jsonStr.missInstitution.picturepath = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
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
      doSubmit(key) {
        this.formData.operateCode = key
        doCreateDisBasics(this.formData).then(response => {
          debugger
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
