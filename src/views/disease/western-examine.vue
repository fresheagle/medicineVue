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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.dislocation.fisrtTrailApprovalResult">
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.department.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.department.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.department.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.department.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.diagnosisBasis.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosisBasis.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosisBasis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.diagnosisBasis.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosisBasis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosisBasis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.diagnosisBasis.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosisBasis.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosisBasis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diagnosisBasis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosisBasis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosisBasis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosisBasis.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.diagnosisBasis.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosisBasis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosisBasis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.diagnosisBasis.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosisBasis.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.tRelatedDisease.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.tRelatedDisease.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.tRelatedDisease.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.tRelatedDisease.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.tRelatedDisease.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.tRelatedDisease.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.tRelatedDisease.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.tRelatedDisease.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.tRelatedDisease.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.tRelatedDisease.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.tRelatedDisease.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.tRelatedDisease.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.tRelatedDisease.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.tRelatedDisease.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.tRelatedDisease.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.tRelatedDisease.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.tRelatedDisease.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.etiologyPathogenesis.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.etiologyPathogenesis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.etiologyPathogenesis.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.etiologyPathogenesis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.etiologyPathogenesis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.etiologyPathogenesis.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.etiologyPathogenesis.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.etiologyPathogenesis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.etiologyPathogenesis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.etiologyPathogenesis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.etiologyPathogenesis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.etiologyPathogenesis.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.etiologyPathogenesis.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.etiologyPathogenesis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.etiologyPathogenesis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.etiologyPathogenesis.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.etiologyPathogenesis.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.pathology.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pathology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.pathology.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pathology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.pathology.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pathology.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pathology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pathology.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pathology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pathology.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.pathology.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathology.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pathology.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.pathology.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pathology.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.clinicalTypesClass.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTypesClass.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.clinicalTypesClass.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTypesClass.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTypesClass.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.clinicalTypesClass.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalTypesClass.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTypesClass.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalTypesClass.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTypesClass.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTypesClass.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalTypesClass.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.clinicalTypesClass.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalTypesClass.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalTypesClass.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.clinicalTypesClass.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalTypesClass.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.symptom.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptom.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.symptom.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptom.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptom.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.symptom.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.symptom.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptom.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.symptom.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptom.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptom.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.symptom.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.symptom.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.symptom.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.symptom.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.symptom.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.symptom.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.laboratoryExamination.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.laboratoryExamination.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.laboratoryExamination.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.laboratoryExamination.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.laboratoryExamination.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.laboratoryExamination.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.laboratoryExamination.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.laboratoryExamination.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.laboratoryExamination.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.laboratoryExamination.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.laboratoryExamination.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.laboratoryExamination.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.laboratoryExamination.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.laboratoryExamination.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.laboratoryExamination.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.laboratoryExamination.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.laboratoryExamination.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.text_otherCheck.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.text_otherCheck.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.text_otherCheck.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.text_otherCheck.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.text_otherCheck.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.text_otherCheck.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.text_otherCheck.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.text_otherCheck.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.text_otherCheck.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.text_otherCheck.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.text_otherCheck.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.text_otherCheck.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.text_otherCheck.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.text_otherCheck.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.text_otherCheck.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.text_otherCheck.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.text_otherCheck.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.preventionTreatment.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.preventionTreatment.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.preventionTreatment.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventionTreatment.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.preventionTreatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionTreatment.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.preventionTreatment.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionTreatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionTreatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.preventionTreatment.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventionTreatment.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.diagnosticPoints.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosticPoints.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.diagnosticPoints.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosticPoints.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosticPoints.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.diagnosticPoints.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosticPoints.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosticPoints.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diagnosticPoints.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosticPoints.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosticPoints.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.diagnosticPoints.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.diagnosticPoints.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosticPoints.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.diagnosticPoints.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.diagnosticPoints.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.diagnosticPoints.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.treatmentPrognosis" :options="editorOption"></quill-editor>
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
                               :rows="2" v-model="approvsls.treatmentPrognosis.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentPrognosis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.treatmentPrognosis.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentPrognosis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentPrognosis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.treatmentPrognosis.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatmentPrognosis.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentPrognosis.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentPrognosis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentPrognosis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentPrognosis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentPrognosis.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.treatmentPrognosis.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentPrognosis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentPrognosis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.treatmentPrognosis.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatmentPrognosis.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.nursing.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.nursing.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.nursing.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.nursing.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.nursing.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.nursing.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.nursing.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.nursing.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.nursing.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.nursing.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.nursing.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.nursing.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.nursing.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.nursing.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.nursing.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.nursing.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.nursing.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.preventionMeasures.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionMeasures.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.preventionMeasures.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionMeasures.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionMeasures.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.preventionMeasures.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventionMeasures.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionMeasures.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.preventionMeasures.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionMeasures.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionMeasures.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.preventionMeasures.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.preventionMeasures.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventionMeasures.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.preventionMeasures.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.preventionMeasures.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.preventionMeasures.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.dietaryConditioning.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dietaryConditioning.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.dietaryConditioning.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dietaryConditioning.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dietaryConditioning.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.dietaryConditioning.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dietaryConditioning.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dietaryConditioning.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dietaryConditioning.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dietaryConditioning.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dietaryConditioning.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dietaryConditioning.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.dietaryConditioning.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dietaryConditioning.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dietaryConditioning.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.dietaryConditioning.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dietaryConditioning.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
            <div class="title">急诊（120）指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.consultation" :options="editorOption"></quill-editor>
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
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.section" :options="editorOption"></quill-editor>
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
          <div class="card">
            <div class="title">现代研究</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missWsetDisease.modernResearch" :options="editorOption"></quill-editor>
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
                               :rows="2" v-model="approvsls.modernResearch.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.modernResearch.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.modernResearch.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.modernResearch.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.modernResearch.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.modernResearch.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.modernResearch.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.modernResearch.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.modernResearch.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.modernResearch.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.modernResearch.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.modernResearch.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.modernResearch.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.modernResearch.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.modernResearch.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.modernResearch.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.modernResearch.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
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
                               :rows="2" v-model="approvsls.treatmentCost.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentCost.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.treatmentCost.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentCost.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentCost.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.treatmentCost.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatmentCost.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentCost.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentCost.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentCost.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentCost.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.treatmentCost.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.treatmentCost.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentCost.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.treatmentCost.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.treatmentCost.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.treatmentCost.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">体格检验</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.medicalExamination" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.medicalExamination.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicalExamination.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicalExamination.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.medicalExamination.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalExamination.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicalExamination.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.medicalExamination.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicalExamination.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicalExamination.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicalExamination.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalExamination.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicalExamination.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicalExamination.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.medicalExamination.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalExamination.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicalExamination.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.medicalExamination.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicalExamination.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">家庭处理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.familyTreatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.familyTreatment.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.familyTreatment.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.familyTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.familyTreatment.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.familyTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.familyTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.familyTreatment.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.familyTreatment.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.familyTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.familyTreatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.familyTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.familyTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.familyTreatment.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.familyTreatment.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.familyTreatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.familyTreatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.familyTreatment.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.familyTreatment.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊科室</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.department" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.department.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.department.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.department2.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.department.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.department.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.department.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.department.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医生问诊</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.doctorConsulation  " :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.doctorConsulation.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorConsulation.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorConsulation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.doctorConsulation.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorConsulation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorConsulation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.doctorConsulation.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorConsulation.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorConsulation.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.doctorConsulation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorConsulation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorConsulation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.doctorConsulation.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.doctorConsulation.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorConsulation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.doctorConsulation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.doctorConsulation.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.doctorConsulation.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预计检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.expectedInspection" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.expectedInspection.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedInspection.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedInspection.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.expectedInspection.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedInspection.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedInspection.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.expectedInspection.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedInspection.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedInspection.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedInspection.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedInspection.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedInspection.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedInspection.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.expectedInspection.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedInspection.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedInspection.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.expectedInspection.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedInspection.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预计治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missInstitution.expectedTreatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.expectedTreatment.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedTreatment.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.expectedTreatment.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.expectedTreatment.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedTreatment.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedTreatment.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedTreatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.expectedTreatment.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.expectedTreatment.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedTreatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.expectedTreatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.expectedTreatment.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.expectedTreatment.finalSuggestion"></el-input>
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
                <span style="color: red;" v-if="formData.jsonStr.missWsetDisease[item.key] === '' ||formData.jsonStr.missWsetDisease[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missWsetDisease[item.key])}}</span>
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
              dislocationList: [],
              medicalExamination: '',
              familyTreatment: '',
              department: '',
              doctorConsulation: '',
              expectedInspection: '',
              expectedTreatment: ''
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
          // 科室信息
          department: {
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
          // 相关疾病
          tRelatedDisease: {
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
          // 病因与发病机制
          etiologyPathogenesis: {
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
          // 病理
          pathology: {
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
          // 临床分型与分类
          clinicalTypesClass: {
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
          // 症状体征
          symptom: {
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
          // 实验室检查
          laboratoryExamination: {
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
          // 其他辅助检查
          text_otherCheck: {
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
          // 并发症
          preventionTreatment: {
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
          // 诊断要点
          diagnosticPoints: {
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
          // 治疗
          treatmentPrognosis: {
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
          // 护理
          nursing: {
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
          preventionMeasures: {
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
          // 膳食调理
          dietaryConditioning: {
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
          },
          // 现代研究
          modernResearch: {
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
          // 治疗费用参考
          treatmentCost: {
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
          medicalExamination: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
          familyTreatment: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
          //就诊科室
          department2: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
          doctorConsulation: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
          expectedInspection: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
          expectedTreatment: {
            fisrtTrailApprovalResult: '',
            secondTrailApprovalResult: '',
            finalTrailApprovalResult: '',
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
        keyArr: [{ key: 'epidemiology', value: '流行病学' }, { key: 'tRelatedDisease', value: '相关疾病' }, { key: 'etiologyPathogenesis', value: '病因与发病机制' },
          { key: 'pathology', value: '病理' }, { key: 'clinicalTypesClass', value: '临床分型与分类' },{ key: 'symptom', value: '症状体征' },
          { key: 'laboratoryExamination', value: '实验室检查' }, { key: 'text_otherCheck', value: '其他辅助检查' },{ key: 'preventionTreatment', value: '并发症' },
          { key: 'diagnosticPoints', value: '诊断要点' }, { key: 'differentialDiagnosis', value: '鉴别诊断' },{ key: 'treatmentPrognosis', value: '治疗' },
          { key: 'nursing', value: '护理' }, { key: 'preventionMeasures', value: '预防措施' },{ key: 'dietaryConditioning', value: '膳食调理' },
          { key: 'attentionMatter', value: '注意事项' }, { key: 'consultation', value: '急诊（120）指征' },{ key: 'section', value: '门诊指征' },
          { key: 'modernResearch', value: '现代研究' }, { key: 'treatmentCost', value: '治疗费用参考' }
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
      this.formData = JSON.parse(localStorage.getItem('curTrearment'))
      this.approvsls = this.formData.jsonStr.approvsls
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
          chineseName: this.formData.jsonStr.missWsetDisease.chineseName,
          englishName: this.formData.jsonStr.missWsetDisease.englishName,
          otherName: this.formData.jsonStr.missWsetDisease.otherName
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
        this.formData.jsonStr.approvsls = this.approvsls
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
