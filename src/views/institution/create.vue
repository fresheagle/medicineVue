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
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missInstitution.picturepath" :src="formData.jsonStr.missInstitution.picturepath" class="avatar">
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
                      <el-select v-model="formData.jsonStr.missInstitution.provinceCode" placeholder="省" @change="changeProvinceCode">
                        <el-option
                          v-for="item in provinceList"
                          :key="item.districtCode"
                          :label="item.districtName"
                          :value="item.districtCode">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.jsonStr.missInstitution.cityCode"  placeholder="市"  @change="changeCityCode">
                        <el-option
                          v-for="item in cityList"
                          :key="item.districtCode"
                          :label="item.districtName"
                          :value="item.districtCode">
                        </el-option>
                      </el-select>
                      <el-select v-model="formData.jsonStr.missInstitution.districtCode" placeholder="区" >
                        <el-option
                          v-for="item in districtList"
                          :key="item.districtCode"
                          :label="item.districtName"
                          :value="item.districtCode">
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
              <el-button type="primary" @click="showLeaderDialog">添加领导信息</el-button>
              <div style="padding-top: 10px;" v-if="leadteamInfoLength"
                   v-for="(item,index) in formData.jsonStr.missInstitution.leadteamInfo">
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
                    <el-button @click="deleteLeadteamInfo(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医院环境</div>
            <div class="body">
              <el-button type="primary" @click="showEnvironmentDialog">添加医院信息</el-button>
              <div style="padding-top: 10px;" v-if="formData.jsonStr.missInstitution.environment.length"
                   v-for="(item,index) in formData.jsonStr.missInstitution.environment">
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
            <div class="title">科室设置</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAdddepartment" type="primary">新增科室</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missInstitution.departmentMapDTO" style="margin-bottom: 5px;">
                <el-row >
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
                          <el-button @click="deleteEnvironment(index)">删除</el-button>
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
                <span style="color: red;" v-if="formData.jsonStr.missInstitution[item.key] === '' ||formData.jsonStr.missInstitution[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missInstitution[item.key])}}</span>
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
    <!--添加领导信息弹框-->
    <el-dialog
      title="添加领导信息"
      :append-to-body="true"
      :visible.sync="isShowLeaderDiaolg"
      width="30%">
      <div>
        <el-form label-width="80px" :model="leadteamInfoObj">
          <el-form-item label="姓名">
            <el-input v-model="leadteamInfoObj.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="4" v-model="leadteamInfoObj.desc"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="/api/file/upload"
              :on-success="upLeaderPicSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAddLeaderMsg">确 定</el-button>
         <el-button @click="cancelLeaderMsg">取 消</el-button>
      </span>
    </el-dialog>
    <!--医院环境信息弹框-->
    <el-dialog
      title="添加医院环境"
      :append-to-body="true"
      :visible.sync="isShowEnvironmentDialog"
      width="30%">
      <div>
        <el-form label-width="80px" :model="environmentObj">
          <el-form-item label="姓名">
            <el-input v-model="environmentObj.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" :rows="4" v-model="environmentObj.desc"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              action="/api/file/upload"
              :on-success="upEnvironmentPicSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAddEnvironmentMsg">确 定</el-button>
         <el-button @click="cancelEnvironmentMsg">取 消</el-button>
      </span>
    </el-dialog>
     <!--参考资料弹框-->
    <el-dialog
      title="添加医院环境"
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
  import { doCheck, doCreateDisBasics, getDistrict, getDepartmentList } from '../../api/task'
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
              leadteamInfo: [],
              environment: [],
              departmentMapDTO: [],
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
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: []// 各模块评审结果
          }
        },
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
          sequenc: '', // 序号
          referColumnschinese: '', // 模块：领导团队
          referenceType: 'image', // text iamge
          url: [], // 网站路径
          comment: '', // 描述
          imageName: '' // 图片名称
        },
        leaderPicList: [],
        environmentPicList: [],
        refrencesPicList: [],
        keyArr: [{ key: 'intro', value: '简介' }, { key: 'leadteamInfo', value: '领导团队' }, { key: 'environment', value: '医院环境' },
          { key: 'departmentMapDTO', value: '科室设置' }, { key: 'special', value: '特色专科' }, { key: 'advantage', value: '医疗优势' }, { key: 'equipment', value: '医疗设施' },
          { key: 'history', value: '历史发展' }, { key: 'busLines', value: '乘车路线' }, { key: 'clinicalTeaching', value: '临床教学与研究机构' }, { key: 'researchResult', value: '研究成果' },
          { key: 'academicMonograph', value: '学术专著' }, { key: 'academicActivity', value: '学术活动' }, { key: 'honor', value: '获奖情况' }, { key: 'affgroup', value: '分支机构' }
        ],
        provinceList: [],
        departmentList: [],
        pdepartmentList: [],
        cityList: [],
        districtList: [],
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
      this.getDistrict(100000, 1)
      this.getDepartmentList(params)
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
      getDistrict(pid, level) {
        const params = {
          parentDistrictCode: pid,
          level: level
        }
        getDistrict(params).then(response => {
          if (response && response.data) {
            if (level === 1) {
              this.provinceList = response.data
            } else if (level === 2) {
              this.cityList = response.data
            } else if (level === 3) {
              this.districtList = response.data
            }
          }
        })
      },
      getDepartmentList(params) {
        getDepartmentList(params).then(response => {
          this.pdepartmentList = response.data.params
        })
      },
      changePdepartment(val) {
        const params = {
          currentPage: 1,
          pageSize: 9999,
          parentDepartmentId: val
        }
        getDepartmentList(params).then(response => {
          this.departmentList = response.data.params
        })
      },
      changeProvinceCode(val) {
        this.getDistrict(val, 2)
      },
      changeCityCode(val) {
        this.getDistrict(val, 3)
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3)
      },
      /*
      * 概述图
      * */
      upSummarySuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.jsonStr.missInstitution.picturepath = URL.createObjectURL(file.raw)
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
      /*
       *领导信息
       * */
      showLeaderDialog() {
        this.isShowLeaderDiaolg = true
        this.leaderPicList = []
      },
      upLeaderPicSuccess(response, file, fileList) {
        if (response.meta.success) {
          this.leaderPicList.push(response.data[0].thumbnailUrl)
        }
      },
      doAddLeaderMsg() {
        this.leadteamInfoObj.picture = this.leaderPicList
        const param = {
          name: this.leadteamInfoObj.name,
          desc: this.leadteamInfoObj.desc,
          picture: this.leadteamInfoObj.picture
        }
        this.formData.jsonStr.missInstitution.leadteamInfo.push(param)
        this.isShowLeaderDiaolg = false
      },
      cancelLeaderMsg() {
        this.isShowLeaderDiaolg = false
      },
      deleteLeadteamInfo(index) {
        this.formData.jsonStr.missInstitution.leadteamInfo.splice(index, 1)
      },
      /*
       *医院环境信息
       * */
      showEnvironmentDialog() {
        this.isShowEnvironmentDialog = true
        this.environmentPicList = []
      },
      upEnvironmentPicSuccess(response, file, fileList) {
        if (response.meta.success) {
          this.environmentPicList.push(response.data[0].thumbnailUrl)
        }
      },
      doAddEnvironmentMsg() {
        this.environmentObj.picture = this.environmentPicList
        const param = {
          name: this.environmentObj.name,
          desc: this.environmentObj.desc,
          picture: this.environmentObj.picture
        }
        this.formData.jsonStr.missInstitution.environment.push(param)
        this.isShowEnvironmentDialog = false
      },
      cancelEnvironmentMsg() {
        this.isShowEnvironmentDialog = false
      },
      deleteEnvironment(index) {
        this.formData.jsonStr.missInstitution.environment.splice(index, 1)
      },
      /**
       * 科室设置
       * */
      doAdddepartment() {
        const param = {
          departmentPid: '',
          departmentCode: '',
          departmentName: '',
          departmentLevel: ''
        }
        this.formData.jsonStr.missInstitution.departmentMapDTO.push(param)
      },
      doDeleteDepartment(index) {
        this.formData.jsonStr.missInstitution.departmentMapDTO.splice(index, 1)
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
      // 创建操作
      doSubmit(key) {
        this.formData.operateCode = key
        doCreateDisBasics(this.formData).then(response => {
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
        if (this.formData.jsonStr.missInstitution.leadteamInfo.length > 0) {
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
