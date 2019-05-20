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
                  <el-button @click="clearPic">清除</el-button>
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
          <div class="title">审核信息</div>
          <div class="body">
            <div v-if="formData.taskStatus === 'firAuditeding'">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="初审">
                  <el-radio-group v-model="approvsls.summary.fisrtTrailApprovalResult">
                    <el-radio-button label="通过">通过</el-radio-button>
                    <el-radio-button label="不通过">不通过</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="意见">
                  <el-input  type="textarea"
                             :rows="2" v-model="approvsls.summary.firstSuggestion"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="formData.taskStatus === 'secAuditeding'">
              <el-collapse accordion>
                <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                  <el-form ref="formData" :model="formData" label-width="80px">
                    <el-form-item label="初审">
                      <el-radio-group v-model="approvsls.summary.fisrtTrailApprovalResult">
                        <el-radio-button label="通过">通过</el-radio-button>
                        <el-radio-button label="不通过">不通过</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="得分">
                      <el-input  v-model="approvsls.summary.firstApprovalPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                      <span>{{approvsls.summary.firstTrailSuggestTime}}</span>
                    </el-form-item>
                    <el-form-item label="意见">
                      <el-input  type="textarea"
                                 :rows="2" v-model="approvsls.summary.firstSuggestion"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="二审">
                  <el-radio-group v-model="approvsls.summary.secondTrailApprovalResult">
                    <el-radio-button label="通过">通过</el-radio-button>
                    <el-radio-button label="不通过">不通过</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="意见">
                  <el-input  type="textarea"
                             :rows="2" v-model="approvsls.summary.secondSuggestion"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="formData.taskStatus === 'finalAuditeding'">
              <el-collapse accordion>
                <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                  <el-form ref="formData" :model="formData" label-width="80px">
                    <el-form-item label="初审">
                      <el-radio-group v-model="approvsls.summary.fisrtTrailApprovalResult">
                        <el-radio-button label="通过">通过</el-radio-button>
                        <el-radio-button label="不通过">不通过</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="得分">
                      <span>{{approvsls.summary.firstApprovalPoint}}</span>
                    </el-form-item>
                    <el-form-item label="时间">
                      <span>{{approvsls.summary.firstTrailSuggestTime}}</span>
                    </el-form-item>
                    <el-form-item label="意见">
                      <el-input  type="textarea"
                                 :rows="2" v-model="approvsls.summary.firstSuggestion"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="二审信息" name="secondTrailApproval">
                  <el-form ref="formData" :model="formData" label-width="80px">
                    <el-form-item label="初审">
                      <el-radio-group v-model="approvsls.summary.secondTrailApprovalResult">
                        <el-radio-button label="通过">通过</el-radio-button>
                        <el-radio-button label="不通过">不通过</el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="得分">
                      <el-input v-model="approvsls.summary.secondApprovalPoint"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                      <span>{{approvsls.summary.secondTrailSuggestTime}}</span>
                    </el-form-item>
                    <el-form-item label="意见">
                      <el-input  type="textarea"
                                 :rows="2" v-model="approvsls.summary.secondSuggestion"></el-input>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="终审">
                  <el-radio-group v-model="approvsls.summary.finalTrailApprovalResult">
                    <el-radio-button label="通过">通过</el-radio-button>
                    <el-radio-button label="不通过">不通过</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="意见">
                  <el-input  type="textarea"
                             :rows="2" v-model="approvsls.summary.finalSuggestion"></el-input>
                </el-form-item>
              </el-form>
            </div>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.information.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.information.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.information.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.information.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.information.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.information.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.information.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.information.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.information.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.information.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.information.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.information.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.information.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.information.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.information.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.information.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.information.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.information.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
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
                      <img width="100%" :src="item.picture[0]" alt="">
                      <!--<picture-slider :picture-list="item.picture"></picture-slider>-->
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.leadership.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.leadership.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.leadership.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.leadership.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.leadership.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.leadership.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.leadership.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.leadership.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.summary.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.summary.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.summary.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.summary.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.leadership.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.leadership.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.leadership.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.leadership.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.leadership.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.leadership.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                      <img width="100%" :src="item.picture[0]" alt="">
                      <!--<picture-slider :picture-list="item.picture"></picture-slider>-->
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.environment.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.environment.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.environment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.environment.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.environment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.environment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.environment.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.environment.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.environment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.environment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.environment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.environment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.environment.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.environment.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.environment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.environment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.environment.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.environment.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医生专家</div>
            <div class="body">
              <el-button type="primary" @click="showDoctorsDialog">添加医生信息</el-button>
              <div style="padding-top: 10px;" v-if="doctorInfoLength"
                   v-for="(item,index) in formData.jsonStr.missInstitution.doctors">
                <el-row>
                  <el-col :span="6">
                    <div  @click="handlePictureCardPreview(item.url)">
                      <img width="100%" :src="item.url" alt="">
                      <!--<picture-slider :picture-list="item.picture"></picture-slider>-->
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="padding-bottom: 10px;">
                      <el-input  v-model="item.name"></el-input>
                    </div>
                    <div >
                      <el-input type="textarea" :rows="4" v-model="item.job"></el-input>
                    </div>
                    <div >
                      <el-input type="textarea" :rows="4" v-model="item.zl"></el-input>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="deleteDoctorsInfo(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.doctors.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctors.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctors.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.doctors.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctors.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctors.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.doctors.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctors.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctors.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.doctors.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctors.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctors.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctors.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.doctors.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctors.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctors.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.doctors.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctors.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                    <el-input  v-model="itemd.office"  placeholder="科室名称"></el-input>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.departments.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.departments.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.departments.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.departments.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.departments.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.departments.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.departments.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.departments.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.departments.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.departments.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.departments.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.departments.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.departments.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.departments.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.departments.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.departments.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.departments.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.departments.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医生信息</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.doctorInfo" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.doctorInfo.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorInfo.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorInfo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.doctorInfo.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorInfo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorInfo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.doctorInfo.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorInfo.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorInfo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.doctorInfo.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorInfo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorInfo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorInfo.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.doctorInfo.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorInfo.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorInfo.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.doctorInfo.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorInfo.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.characteristic.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.characteristic.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.characteristic.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.characteristic.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.characteristic.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.characteristic.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.characteristic.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.characteristic.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.characteristic.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.characteristic.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.characteristic.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.characteristic.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.characteristic.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.characteristic.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.characteristic.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.characteristic.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.characteristic.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.characteristic.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.advantage.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.advantage.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.advantage.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.advantage.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.advantage.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.advantage.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.advantage.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.advantage.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.advantage.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.advantage.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.advantage.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.advantage.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.advantage.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.advantage.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.advantage.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.advantage.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.advantage.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.advantage.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.installations.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.installations.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.installations.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.installations.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.installations.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.installations.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.installations.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.installations.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.installations.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.installations.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.installations.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.installations.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.installations.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.installations.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.installations.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.installations.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.installations.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.installations.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.historical.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.historical.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.historical.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.historical.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.historical.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.historical.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.historical.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.historical.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.historical.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.historical.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.historical.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.historical.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.historical.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.historical.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.historical.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.historical.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.historical.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.historical.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.busLine.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.busLine.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.busLine.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.busLine.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.busLine.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.busLine.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.busLine.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.busLine.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.busLine.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.busLine.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.busLine.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.busLine.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.busLine.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.busLine.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.busLine.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.busLine.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.busLine.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.busLine.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.clinicalTeaching.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalTeaching.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTeaching.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.clinicalTeaching.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTeaching.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTeaching.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.clinicalTeaching.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalTeaching.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTeaching.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalTeaching.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTeaching.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTeaching.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTeaching.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.clinicalTeaching.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTeaching.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTeaching.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.clinicalTeaching.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalTeaching.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.achievements.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.achievements.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.achievements.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.achievements.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.achievements.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.achievements.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.achievements.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.achievements.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.achievements.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.achievements.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.achievements.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.achievements.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.achievements.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.achievements.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.achievements.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.achievements.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.achievements.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.achievements.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.monograph.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.monograph.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.monograph.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.monograph.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.monograph.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.monograph.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.monograph.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.monograph.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.monograph.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.monograph.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.monograph.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.monograph.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.monograph.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.monograph.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.monograph.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.monograph.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.monograph.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.monograph.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.activity.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.activity.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.activity.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.activity.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.activity.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.activity.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.activity.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.activity.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.activity.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.activity.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.activity.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.activity.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.activity.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.activity.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.activity.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.activity.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.activity.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.activity.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.prize.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.prize.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.prize.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.prize.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.prize.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.prize.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.prize.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.prize.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.prize.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.prize.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.prize.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.prize.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.prize.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.prize.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.prize.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.prize.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.prize.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.prize.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.branch.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.branch.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.branch.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.branch.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.branch.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.branch.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.branch.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.branch.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.branch.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.branch.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.branch.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.branch.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.branch.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.branch.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.branch.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.branch.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.branch.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.branch.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">急救中心</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.emergencyCenter" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.emergencyCenter.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.emergencyCenter.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.emergencyCenter.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.emergencyCenter.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.emergencyCenter.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.emergencyCenter.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.emergencyCenter.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.emergencyCenter.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.emergencyCenter.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.emergencyCenter.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.emergencyCenter.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.emergencyCenter.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.emergencyCenter.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.emergencyCenter.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.emergencyCenter.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.emergencyCenter.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.emergencyCenter.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.emergencyCenter.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预约咨询</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.orderRefer" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.orderRefer.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.orderRefer.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.orderRefer.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.orderRefer.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.orderRefer.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.orderRefer.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.orderRefer.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.orderRefer.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.orderRefer.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.orderRefer.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.orderRefer.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.orderRefer.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.orderRefer.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.orderRefer.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.orderRefer.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.orderRefer.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.orderRefer.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.orderRefer.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊需知</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="挂号时间">
                  <el-input v-model="formData.jsonStr.missInstitution.registrationTime" placeholder="挂号时间"></el-input>
                </el-form-item>
                <el-form-item label="就诊时间">
                  <el-input v-model="formData.jsonStr.missInstitution.outpatientTime" placeholder="就诊时间"></el-input>
                </el-form-item>
                <el-form-item label="急诊时间">
                  <el-input v-model="formData.jsonStr.missInstitution.emergencyTime" placeholder="急诊时间"></el-input>
                </el-form-item>
                <el-form-item label="就诊指南">
                  <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.treatGuide" :options="editorOption"></quill-editor>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.notice.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notice.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notice.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.notice.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notice.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notice.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.notice.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notice.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notice.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.notice.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notice.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notice.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notice.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.notice.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notice.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notice.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.notice.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notice.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                <span style="color: red;" v-if="formData.jsonStr.missInstitution[item.key] === '' ||formData.jsonStr.missInstitution[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missInstitution[item.key])}}</span>
              </div>
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
            <el-button @click="doSubmit('approveFail')">审核不通过</el-button>
            <el-button @click="doSubmit('approveSuccess')">审核通过</el-button>
            <!--<el-button @click="resetForm('formData')">重置所有字段</el-button>-->
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
    <!--医生专家信息弹框-->
    <el-dialog
      title="添加医生信息"
      :append-to-body="true"
      :visible.sync="isShowdoctorsDiaolg"
      width="30%">
      <div>
        <el-form label-width="80px" :model="doctorsObj">
          <el-form-item label="姓名">
            <el-input v-model="doctorsObj.name"></el-input>
          </el-form-item>
          <el-form-item label="职务与职称">
            <el-input type="textarea" :rows="4" v-model="doctorsObj.job"></el-input>
          </el-form-item>
          <el-form-item label="职务与职称">
            <el-input type="textarea" :rows="4" v-model="doctorsObj.zl"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              multiple="false"
              action="/api/file/upload"
              :file-list="doctorsObj.fileList"
              :on-success="upDoctorsPicSuccess"
              type="url">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doAddDoctorsMsg">确 定</el-button>
         <el-button @click="cancelDoctorsMsg">取 消</el-button>
      </span>
    </el-dialog>
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
        isShowdoctorsDiaolg: false,
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
              doctors: [],
              departmentMapDTO: [],
              doctorInfo: '',
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
              emergencyCenter: '',
              emergencyTime: '',
              orderRefer: '',
              treatGuide: ''
            },
            refrences: {
              textcontent: [],
              image: []
            }, // 参考资料
            approvsls: {}// 各模块评审结果
          }
        },
        approvsls: {
          summary: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          information: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          leadership: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          environment: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          doctors: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          departments: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          doctorInfo: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          characteristic: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          advantage: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          installations: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          historical: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          busLine: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          clinicalTeaching: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          achievements: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          monograph: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          activity: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          prize: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          branch: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          emergencyCenter: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          orderRefer: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          },
          notice: {
            fisrtTrailApprovalResult: '通过',
            secondTrailApprovalResult: '通过',
            finalTrailApprovalResult: '通过',
            firstApprovalPoint: 0,
            secondApprovalPoint: 0,
            finalApprovalPoint: 0,
            firstTrailSuggestTime: '',
            secondTrailSuggestTime: '',
            finalTrailSuggestTime: '',
            firstSuggestion: '',
            secondSuggestion: '',
            finalSuggestion: ''
          }
        },
        leadteamInfoObj: {
          name: '',
          desc: '',
          picture: [],
          fileList: []
        },
        environmentObj: {
          name: '',
          desc: '',
          picture: [],
          fileList: []
        },
        doctorsObj: {
          url: '', // 图片路径
          name: '', // 姓名
          job: '', // 职务与职称
          zl: '', // 治疗范围
          fileList: []
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
        leaderPicList: [],
        environmentPicList: [],
        refrencesPicList: [],
        keyArr: [{ key: 'intro', value: '简介' }, { key: 'leadteamInfo', value: '领导团队' }, { key: 'environment', value: '医院环境' },{ key: 'doctors', value: '医生专家' },
          { key: 'departmentMapDTO', value: '科室设置' }, { key: 'special', value: '特色专科' }, { key: 'advantage', value: '医疗优势' }, { key: 'equipment', value: '医疗设施' },
          { key: 'history', value: '历史发展' }, { key: 'busLines', value: '乘车路线' }, { key: 'clinicalTeaching', value: '临床教学与研究机构' }, { key: 'researchResult', value: '研究成果' },
          { key: 'academicMonograph', value: '学术专著' }, { key: 'academicActivity', value: '学术活动' }, { key: 'honor', value: '获奖情况' }, { key: 'affgroup', value: '分支机构' },
          { key: 'emergencyCenter', value: '急救中心' }, { key: 'orderRefer', value: '预约咨询' }
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
      this.formData = JSON.parse(localStorage.getItem('curTrearment'))
      const params = {
        currentPage: 1,
        pageSize: 9999,
        parentDepartmentId: 0
      }
      this.getDistrict(100000, 1)
      this.getDistrict(this.formData.jsonStr.missInstitution.provinceCode, 2)
      this.getDistrict(this.formData.jsonStr.missInstitution.cityCode, 3)
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
      clearPic() {
        this.formData.jsonStr.missInstitution.picturepath = ''
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
        this.leadteamInfoObj.name = ''
        this.leadteamInfoObj.desc = ''
        this.leadteamInfoObj.picture = []
        this.leadteamInfoObj.fileList = []
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
       *医生信息
       * */
      showDoctorsDialog() {
        this.isShowdoctorsDiaolg = true
        this.doctorsObj.url = ''
        this.doctorsObj.name = ''
        this.doctorsObj.job = ''
        this.doctorsObj.zl = ''
        this.doctorsList = []
      },
      upDoctorsPicSuccess(response, file, fileList) {
        if (response.meta.success) {
          this.doctorsList.push(response.data[0].thumbnailUrl)
        }
      },
      doAddDoctorsMsg() {
        this.doctorsObj.url = this.doctorsList[0]
        const param = {
          name: this.doctorsObj.name,
          job: this.doctorsObj.job,
          zl: this.doctorsObj.zl,
          url: this.doctorsObj.url
        }
        this.formData.jsonStr.missInstitution.doctors.push(param)
        this.isShowdoctorsDiaolg = false
      },
      cancelDoctorsMsg() {
        this.isShowdoctorsDiaolg = false
      },
      deleteDoctorsInfo(index) {
        this.formData.jsonStr.missInstitution.doctors.splice(index, 1)
      },
      /*
       *医院环境信息
       * */
      showEnvironmentDialog() {
        this.isShowEnvironmentDialog = true
        this.environmentObj.name = ''
        this.environmentObj.desc = ''
        this.environmentObj.picture = []
        this.environmentObj.fileList = []
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
          office: '',
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
        this.formData.jsonStr.approvsls = this.approvsls
        this.formData.taskTitle = this.formData.jsonStr.missInstitution.name
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/institution/treatment')
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
      },
      doctorInfoLength() {
        if (this.formData.jsonStr.missInstitution.leadteamInfo.lenth > 0) {
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
