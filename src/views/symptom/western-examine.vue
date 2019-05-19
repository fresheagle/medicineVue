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
                  <el-input v-model="formData.jsonStr.missWesternSymptom.name"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missWesternSymptom.picturepath" :src="formData.jsonStr.missWesternSymptom.picturepath" class="avatar">
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
                    v-model="formData.jsonStr.missWesternSymptom.introduction">
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
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
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
              <el-form ref="formData" :model="formData" label-width="100px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主管部门">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.otherName" placeholder="其他名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="传染性" >
                      <el-select v-model="formData.jsonStr.missWesternSymptom.infectivity" >
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
                      <el-input v-model="formData.jsonStr.missWesternSymptom.mainCauses" placeholder="主要病因"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="常见症状">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.commonSymptom" placeholder="常见症状"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="检查项目">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.inspectionItems" placeholder="检查项目"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="多发群体">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.multiplePopulation" placeholder="多发群体"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="相关疾病(old)">
                      <span>formData.jsonStr.missWesternSymptom.commonDiseasesOld</span>
                      <!--<el-input v-model="formData.jsonStr.missWesternSymptom.commonDiseasesOld" placeholder="相关疾病(old)"></el-input>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相关疾病">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.commonDiseases" placeholder="相关疾病"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="编辑医生">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.editDoctor" placeholder="编辑医生"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核医生">
                      <el-input v-model="formData.jsonStr.missWesternSymptom.auditDoctor" placeholder="审核医生"></el-input>
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
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
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
            <div class="title">发病部位</div>
            <div class="body">
              <div  style="padding-bottom: 10px;">
                <el-button @click="doAddDislocation" type="primary">新增发病部位</el-button>
              </div>
              <div v-for="(itemd, index) in formData.jsonStr.missWesternSymptom.dislocationList" style="margin-bottom: 5px;">
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dislocation.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dislocation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.dislocation.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dislocation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dislocation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.dislocation.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dislocation.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dislocation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dislocation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dislocation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dislocation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dislocation.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.dislocation.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dislocation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dislocation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.dislocation.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dislocation.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">相关中医疾病</div>
            <div class="body">
              <el-button type="primary" @click="showEnvironmentDialog">添加医院信息</el-button>
              <div style="padding-top: 10px;" v-if="formData.jsonStr.missWesternSymptom.environment.length"
                   v-for="(item,index) in formData.jsonStr.missWesternSymptom.environment">
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.disease.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.disease.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.disease.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.disease.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.disease.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.disease.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.disease.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.disease.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.disease.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.disease.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.disease.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.disease.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.disease.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.disease.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.disease.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.disease.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.disease.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">相关西医疾病</div>
            <div class="body">
              <div  style="padding-bottom: 10px;">
                <el-button @click="doAdddepartment" type="primary">新增科室</el-button>
              </div>

              <div v-for="(itemd, index) in formData.jsonStr.missWesternSymptom.departmentMapDTO" style="margin-bottom: 5px;">
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diseasewest.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diseasewest.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.diseasewest.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diseasewest.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diseasewest.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.diseasewest.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diseasewest.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diseasewest.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diseasewest.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diseasewest.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diseasewest.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diseasewest.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.diseasewest.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diseasewest.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diseasewest.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.diseasewest.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diseasewest.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">流行病学</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.epidemiology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.epidemiology.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.epidemiology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.epidemiology.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.epidemiology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.epidemiology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.epidemiology.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.epidemiology.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.epidemiology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.epidemiology.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.epidemiology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.epidemiology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.epidemiology.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.epidemiology.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.epidemiology.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.epidemiology.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.epidemiology.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.epidemiology.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">症状起因</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.symptomOrigin" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.symptomOrigin.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptomOrigin.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.symptomOrigin.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptomOrigin.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptomOrigin.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.symptomOrigin.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.symptomOrigin.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptomOrigin.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.symptomOrigin.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptomOrigin.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptomOrigin.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptomOrigin.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.symptomOrigin.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptomOrigin.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptomOrigin.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.symptomOrigin.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.symptomOrigin.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床表现</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.clinicalManifestation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalManifestation.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalManifestation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.clinicalManifestation.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalManifestation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalManifestation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.clinicalManifestation.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalManifestation.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalManifestation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalManifestation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalManifestation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalManifestation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalManifestation.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.clinicalManifestation.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalManifestation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalManifestation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.clinicalManifestation.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalManifestation.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.inspect" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.inspect.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.inspect.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.inspect.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.inspect.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.inspect.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.inspect.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.inspect.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.inspect.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.inspect.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.inspect.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.inspect.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.inspect.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.inspect.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.inspect.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.inspect.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.inspect.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.inspect.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">诊断</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.diagnosi" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosi.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosi.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.diagnosi.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosi.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosi.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.diagnosi.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosi.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosi.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diagnosi.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosi.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosi.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosi.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.diagnosi.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosi.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosi.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.diagnosi.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosi.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">鉴别诊断</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.differentialDiagnosis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.differentialDiagnosis.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.differentialDiagnosis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.differentialDiagnosis.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.differentialDiagnosis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.differentialDiagnosis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.differentialDiagnosis.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.differentialDiagnosis.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.differentialDiagnosis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.differentialDiagnosis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.differentialDiagnosis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.differentialDiagnosis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.differentialDiagnosis.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.differentialDiagnosis.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.differentialDiagnosis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.differentialDiagnosis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.differentialDiagnosis.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.differentialDiagnosis.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床意义</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.clinicalSignificance" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalSignificance.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalSignificance.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.clinicalSignificance.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalSignificance.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalSignificance.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.clinicalSignificance.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalSignificance.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalSignificance.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalSignificance.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalSignificance.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalSignificance.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalSignificance.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.clinicalSignificance.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalSignificance.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalSignificance.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.clinicalSignificance.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalSignificance.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.treatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatment.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.treatment.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.treatment.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatment.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatment.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.treatment.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.treatment.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatment.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预防措施</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.preventiveMeasure" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventiveMeasure.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventiveMeasure.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.preventiveMeasure.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventiveMeasure.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventiveMeasure.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.preventiveMeasure.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventiveMeasure.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventiveMeasure.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.preventiveMeasure.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventiveMeasure.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventiveMeasure.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventiveMeasure.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.preventiveMeasure.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventiveMeasure.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventiveMeasure.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.preventiveMeasure.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventiveMeasure.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">日常护理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.dailyNursing" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dailyNursing.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dailyNursing.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.dailyNursing.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dailyNursing.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dailyNursing.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.dailyNursing.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dailyNursing.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dailyNursing.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dailyNursing.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dailyNursing.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dailyNursing.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dailyNursing.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.dailyNursing.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dailyNursing.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dailyNursing.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.dailyNursing.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dailyNursing.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">注意事项</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.attentionMatter" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.attentionMatter.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.attentionMatter.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.attentionMatter.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.attentionMatter.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.attentionMatter.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.attentionMatter.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.attentionMatter.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.attentionMatter.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.attentionMatter.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.attentionMatter.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.attentionMatter.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.attentionMatter.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.attentionMatter.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.attentionMatter.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.attentionMatter.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.attentionMatter.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.attentionMatter.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">影响因素</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.influenceFactor" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.influenceFactor.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.influenceFactor.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.influenceFactor.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.influenceFactor.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.influenceFactor.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.influenceFactor.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.influenceFactor.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.influenceFactor.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.influenceFactor.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.influenceFactor.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.influenceFactor.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.influenceFactor.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.influenceFactor.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.influenceFactor.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.influenceFactor.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.influenceFactor.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.influenceFactor.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">急诊（120）指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.consultation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.consultation.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.consultation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.consultation.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.consultation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.consultation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.consultation.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.consultation.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.consultation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.consultation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.consultation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.consultation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.consultation.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.consultation.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.consultation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.consultation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.consultation.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.consultation.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">门诊指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWesternSymptom.section" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.relationshipWestern.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.section.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.section.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.section.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.section.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.section.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.section.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.section.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.section.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.section.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.section.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.section.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.section.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.section.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.section.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.section.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.section.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.section.finalSuggestion"></el-input>
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
              <!--<span style="color: red;" v-if="formData.jsonStr.missWesternSymptom[item.key] === '' ||formData.jsonStr.missWesternSymptom[item.key].length ===0">（空） </span>-->
              <!--<span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missWesternSymptom[item.key])}}</span>-->
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
            <el-button @click="doSubmit('approveFail')">审核不通过</el-button>
            <el-button @click="doSubmit('approveSuccess')">审核通过</el-button>
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
        isCheck: true,
        isShowLeaderDiaolg: false,
        isShowEnvironmentDialog: false,
        isShowRefrencesImageDialog: false,
        formData: {
          'taskStatus': 'drafts',
          'taskType': 'create',
          'taskMenuType': 'missWesternSymptom',
          'taskTitle': this.formData.jsonStr.missWesternSymptom.name,
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missWesternSymptom': {
              id: '',
              introduction: '',
              picturepath: '',
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
            approvsls: {}// 各模块评审结果
          }
        },
        approvsls: {
          // 概述
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
          // 基本信息
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
          // 发病部位
          dislocation: {
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
          // 相关疾病
          disease: {
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
          // 相关西医疾病
          diseasewest: {
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
          // 流行病学
          epidemiology: {
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
          // 症状起因
          symptomOrigin: {
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
          // 临床表现
          clinicalManifestation: {
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
          // 检查
          inspect: {
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
          // 诊断
          diagnosi: {
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
          // 鉴别诊断
          differentialDiagnosis: {
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
          // 临床意义
          clinicalSignificance: {
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
          // 治疗
          treatment: {
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
          // 预防措施
          preventiveMeasure: {
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
          // 日常护理
          dailyNursing: {
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
          // 注意事项
          attentionMatter: {
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
          // 影响因素
          influenceFactor: {
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
          // 急诊（120）指征
          consultation: {
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
          // 门诊指征
          section: {
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
        }, // 各模块评审结果
        dislocationPList: [], // 发病部位
        dislocationList: [], // 发病部位
        infectivityList: enumerate.infectivityList,
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
      this.formData = JSON.parse(localStorage.getItem('curTrearment'))
      this.initDislocationList()
      const params = {
        currentPage: 1,
        pageSize: 9999,
        parentDepartmentId: 0
      }
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
      doCheck() {
        const params = {
          chineseName: this.formData.jsonStr.missChineseSymptom.chineseName,
          englishName: this.formData.jsonStr.missChineseSymptom.englishName,
          otherName: this.formData.jsonStr.missChineseSymptom.otherName
        }
        doSymptomCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      clearPic() {
        this.formData.jsonStr.missWesternSymptom.picturepath = ''
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
        this.formData.jsonStr.missWesternSymptom.picturepath = URL.createObjectURL(file.raw)
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
        this.formData.jsonStr.missWesternSymptom.dislocationList.push(param)
      },
      doDeleteDislocation(index) {
        this.formData.jsonStr.missWesternSymptom.dislocationList.splice(index, 1)
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
        this.formData.jsonStr.approvsls = this.approvsls
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
        if (this.formData.jsonStr.missWesternSymptom.leadteamInfo.length > 0) {
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
