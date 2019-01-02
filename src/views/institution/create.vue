<template>
  <div class="app-container" id="institutionCreate">
    <div>
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">概述</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.name"></el-input>
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
                    v-model="formData.intro">
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
                      <el-radio-group v-model="formData.insurance">
                        <el-radio-button label="1">是</el-radio-button>
                        <el-radio-button label="0">否</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医院类别">
                      <el-input v-model="formData.category" placeholder="按照医疗机构职业证填写"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院等级">
                      <el-select v-model="formData.level" >
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
                      <el-radio v-model="formData.nature" label="1">盈利</el-radio>
                      <el-radio v-model="formData.nature" label="0">非盈利</el-radio>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主管部门">
                      <el-input v-model="formData.manageDepartment" placeholder="按照医疗机构职业证填写"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="成立时间">
                      <el-date-picker
                        v-model="formData.foundDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院电话">
                      <el-input v-model="formData.telephone" placeholder="010-64801818"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医院官网">
                      <el-input v-model="formData.website" placeholder="http://www.dayi.org.cn"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="医院分类">
                      <el-select v-model="formData.type" >
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
                      <el-input v-model="formData.dean" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="医院地址">
                      <el-select v-model="formData.provinceCode" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.cityCode" >
                        <el-option
                          v-for="item in enumerate.hospitalType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.districtCode" >
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
                      <el-input v-model="formData.address"  placeholder="街道与门牌号"></el-input>
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
              <div v-for="(item, index) in formData.departmentMapDTO" style="margin-bottom: 5px;">
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
                <span>

                </span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">特色专科</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.special" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医疗优势</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.advantage" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医疗设施</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.equipment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">历史发展</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.history" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">乘车路线</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.busLines" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床教学与科研机构</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.clinicalTeaching" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">研究成果</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.researchResult" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术专著</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.academicMonograph" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">学术活动</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.academicActivity" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">获奖情况</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.honor" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">分支机构</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.affgroup" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊须知</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.affgroup" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="card">
            <div class="title">参考资料</div>
            <div class="body">
              <el-tabs>
                <el-tab-pane label="用户管理">文本或网站</el-tab-pane>
                <el-tab-pane label="配置管理">图片</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="card">
            <div class="body">
              <div>概述</div>
              <div>基本信息</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import { getInstitutionList, doCreateDisBasics } from '../../api/task'
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
        formData: {
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
          affgroup: ''
        }
        // 作为参数，区分是创建还是更新操作
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.picturepath = URL.createObjectURL(file.raw)
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
    max-height: 800px;
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
