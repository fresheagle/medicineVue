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
                <el-form-item label="药品类型">
                  <el-input v-model="formData.jsonStr.missChineseMedical.medicalType"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missChineseMedical.picturePath" :src="formData.jsonStr.missChineseMedical.picturePath" class="avatar">
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
                    v-model="formData.jsonStr.missChineseMedical.introduction">
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
                               :rows="2" v-model="approvsls.diagnosisBasis.firstSuggestion"></el-input>
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
            <div class="title">基本信息</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="90px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商品名称">
                      <el-input v-model="formData.jsonStr.missChineseMedical.shopName" placeholder="请输入医生出生日期"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="汉语拼音">
                      <el-input v-model="formData.jsonStr.missChineseMedical.chinesePinyin" placeholder="请输入医生出生日期"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="药品类型">
                      <el-input v-model="formData.jsonStr.missChineseMedical.drugType" placeholder="药品类型"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医保类型">
                      <el-input v-model="formData.jsonStr.missChineseMedical.healthType" placeholder="医保类型"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="处方类型">
                      <el-radio v-model="formData.jsonStr.missChineseMedical.recipeType" label="1">处方</el-radio>
                      <el-radio v-model="formData.jsonStr.missChineseMedical.recipeType" label="2">非处方</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参考价格">
                      <el-input v-model="formData.jsonStr.missChineseMedical.price" placeholder="参考价格"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="中成药类型">
                      <el-select
                        v-model="formData.jsonStr.missChineseMedical.chineseMedicalType"
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
                        v-model="formData.jsonStr.missChineseMedical.chineseMedicalDepartment"
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
                      <el-input v-model="formData.jsonStr.missChineseMedical.editDoctor" placeholder="编辑医生"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="审核医生">
                      <el-input v-model="formData.jsonStr.missChineseMedical.auditDoctor" placeholder="审核医生"></el-input>
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
                        <el-radio-group v-model="approvsls.summary.fisrtTrailApprovalResult">
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
            <div class="title">主要成分</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.component" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.component.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.component.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.component.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.component.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.component.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.component.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.component.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.component.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.component.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.component.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.component.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.component.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.component.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.component.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.component.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.component.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.component.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.component.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">性状</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.property" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.property.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.property.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.property.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.property.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.property.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.property.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.property.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.property.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.property.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.property.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.property.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.property.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.property.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.property.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.property.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.property.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.property.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.property.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">组成</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.constitute" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.constitute.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.constitute.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.constitute.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.constitute.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.constitute.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.constitute.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.constitute.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.constitute.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.constitute.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.constitute.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.constitute.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.constitute.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.constitute.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.constitute.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.constitute.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.constitute.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.constitute.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.constitute.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">主要功效</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.mainMeffect" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.mainMeffect.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.mainMeffect.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.mainMeffect.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.mainMeffect.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.mainMeffect.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.mainMeffect.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.mainMeffect.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.mainMeffect.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.mainMeffect.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.mainMeffect.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.mainMeffect.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.mainMeffect.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.mainMeffect.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.mainMeffect.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.mainMeffect.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.mainMeffect.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.mainMeffect.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.mainMeffect.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">适应病症</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.indication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.indication.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.indication.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.indication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.indication.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.indication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.indication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.indication.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.indication.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.indication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.indication.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.indication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.indication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.indication.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.indication.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.indication.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.indication.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.indication.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.indication.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">规格</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.medicFormat" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.medicFormat.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicFormat.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicFormat.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.medicFormat.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicFormat.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicFormat.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.medicFormat.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicFormat.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicFormat.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicFormat.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicFormat.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicFormat.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.medicFormat.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.medicFormat.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicFormat.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.medicFormat.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.medicFormat.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.medicFormat.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">用法用量</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.dosage" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.dosage.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dosage.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dosage.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.dosage.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dosage.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dosage.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.dosage.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dosage.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dosage.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dosage.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dosage.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dosage.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.dosage.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.dosage.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dosage.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.dosage.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.dosage.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.dosage.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床应用及指南</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.clinicalApplication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.clinicalApplication.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalApplication.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalApplication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.clinicalApplication.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalApplication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalApplication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.clinicalApplication.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalApplication.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalApplication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalApplication.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalApplication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalApplication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.clinicalApplication.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.clinicalApplication.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalApplication.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.clinicalApplication.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.clinicalApplication.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.clinicalApplication.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">不良反应</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.adverseReactions" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.adverseReaction.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.adverseReaction.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.adverseReaction.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.adverseReaction.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.adverseReaction.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.adverseReaction.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.adverseReaction.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.adverseReaction.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.adverseReaction.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.adverseReaction.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.adverseReaction.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.adverseReaction.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.adverseReaction.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.adverseReaction.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.adverseReaction.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.adverseReaction.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.adverseReaction.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.adverseReaction.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">禁忌</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.taboo" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.taboo.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.taboo.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.taboo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.taboo.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.taboo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.taboo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.taboo.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.taboo.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.taboo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.taboo.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.taboo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.taboo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.taboo.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.taboo.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.taboo.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.taboo.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.taboo.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.taboo.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">注意事项</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.notice" :options="editorOption"></quill-editor>
              </div>
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
          <div class="card">
            <div class="title">药物相互作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.interactions" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.interactions.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.interactions.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.interactions.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.interactions.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.interactions.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.interactions.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.interactions.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.interactions.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.interactions.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.interactions.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.interactions.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.interactions.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.interactions.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.interactions.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.interactions.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.interactions.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.interactions.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.interactions.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药性分析</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.analyze" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.analyze.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.analyze.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.analyze.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.analyze.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.analyze.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.analyze.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.analyze.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.analyze.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.analyze.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.analyze.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.analyze.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.analyze.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.analyze.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.analyze.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.analyze.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.analyze.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.analyze.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.analyze.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药理作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.pharmacology" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.pharmacology.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacology.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.pharmacology.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.pharmacology.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacology.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacology.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pharmacology.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacology.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacology.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacology.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.pharmacology.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacology.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacology.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.pharmacology.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacology.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">毒理作用</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.toxicologicalEffects" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.toxicologicalEffects.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.toxicologicalEffects.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.toxicologicalEffects.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.toxicologicalEffects.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.toxicologicalEffects.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.toxicologicalEffects.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.toxicologicalEffects.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.toxicologicalEffects.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.toxicologicalEffects.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.toxicologicalEffects.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.toxicologicalEffects.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.toxicologicalEffects.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.toxicologicalEffects.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.toxicologicalEffects.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.toxicologicalEffects.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.toxicologicalEffects.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.toxicologicalEffects.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.toxicologicalEffects.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">贮藏</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.storageMethod" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.storageMethod.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.storageMethod.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.storageMethod.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.storageMethod.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.storageMethod.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.storageMethod.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.storageMethod.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.storageMethod.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.storageMethod.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.storageMethod.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.storageMethod.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.storageMethod.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.storageMethod.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.storageMethod.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.storageMethod.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.storageMethod.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.storageMethod.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.storageMethod.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">有效期</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.ytime" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.ytime.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.ytime.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.ytime.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.ytime.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.ytime.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.ytime.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.ytime.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.ytime.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.ytime.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.ytime.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.ytime.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.ytime.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.ytime.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.ytime.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.ytime.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.ytime.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.ytime.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.ytime.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">执行标准</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.standard" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.standard.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.standard.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.standard.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.standard.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.standard.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.standard.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.standard.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.standard.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.standard.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.standard.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.standard.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.standard.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.standard.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.standard.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.standard.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.standard.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.standard.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.standard.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">执行文号</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.approvaNum" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.approvaNum.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.approvaNum.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.approvaNum.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.approvaNum.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.approvaNum.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.approvaNum.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.approvaNum.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.approvaNum.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.approvaNum.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.approvaNum.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.approvaNum.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.approvaNum.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.approvaNum.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.approvaNum.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.approvaNum.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.approvaNum.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.approvaNum.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.approvaNum.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">联合用药</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.combinedMedication" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.combinedMedication.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.combinedMedication.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.combinedMedication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.combinedMedication.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.combinedMedication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.combinedMedication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.combinedMedication.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.combinedMedication.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.combinedMedication.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.combinedMedication.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.combinedMedication.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.combinedMedication.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.combinedMedication.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.combinedMedication.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.combinedMedication.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.combinedMedication.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.combinedMedication.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.combinedMedication.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医师建议</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.physicianAdvice" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.physicianAdvice.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.physicianAdvice.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.physicianAdvice.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.physicianAdvice.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.physicianAdvice.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.physicianAdvice.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.physicianAdvice.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.physicianAdvice.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.physicianAdvice.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.physicianAdvice.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.physicianAdvice.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.physicianAdvice.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.physicianAdvice.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.physicianAdvice.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.physicianAdvice.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.physicianAdvice.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.physicianAdvice.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.physicianAdvice.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">鉴别</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.identify" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.identify.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.identify.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.identify.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.identify.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.identify.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.identify.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.identify.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.identify.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.identify.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.identify.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.identify.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.identify.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.identify.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.identify.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.identify.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.identify.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.identify.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.identify.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.pharmacyCheck" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.pharmacyCheck.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacyCheck.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacyCheck.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.pharmacyCheck.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacyCheck.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacyCheck.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.pharmacyCheck.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacyCheck.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacyCheck.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pharmacyCheck.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacyCheck.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacyCheck.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.pharmacyCheck.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.pharmacyCheck.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pharmacyCheck.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.pharmacyCheck.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.pharmacyCheck.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.pharmacyCheck.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">含量测定</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.contentPic" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.contentPic.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.contentPic.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.contentPic.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.contentPic.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.contentPic.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.contentPic.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.contentPic.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.contentPic.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.contentPic.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.contentPic.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.contentPic.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.contentPic.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.contentPic.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.contentPic.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.contentPic.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.contentPic.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.contentPic.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.contentPic.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">附注</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.notes" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.notes.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notes.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notes.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.notes.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notes.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notes.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.notes.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notes.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notes.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.notes.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notes.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notes.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.notes.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.notes.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.notes.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.notes.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.notes.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.notes.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <!--药品标识需要配图 -->
          <div class="card">
            <div class="title">药品标识</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.drugIdentifying" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.drugIdentifying.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIdentifying.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIdentifying.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.drugIdentifying.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIdentifying.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIdentifying.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.drugIdentifying.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIdentifying.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIdentifying.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.drugIdentifying.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIdentifying.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIdentifying.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIdentifying.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.drugIdentifying.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIdentifying.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIdentifying.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.drugIdentifying.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIdentifying.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">药品介绍</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.drugIntroduc" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.drugIntroduc.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIntroduc.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIntroduc.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.drugIntroduc.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIntroduc.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIntroduc.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.drugIntroduc.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIntroduc.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIntroduc.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.drugIntroduc.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIntroduc.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIntroduc.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.drugIntroduc.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.drugIntroduc.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.drugIntroduc.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.drugIntroduc.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.drugIntroduc.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.drugIntroduc.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">历史发展</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.history" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.history.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.history.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.history.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.history.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.history.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.history.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.history.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.history.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.history.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.history.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.history.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.history.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.history.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.history.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.history.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.history.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.history.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.history.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">获奖情况</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.awards" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.awards.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.awards.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.awards.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.awards.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.awards.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.awards.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.awards.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.awards.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.awards.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.awards.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.awards.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.awards.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.awards.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.awards.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.awards.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.awards.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.awards.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.awards.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">生产地址</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.address" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.address.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.address.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.address.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.address.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.address.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.address.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.address.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.address.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.address.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.address.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.address.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.address.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.address.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.address.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.address.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.address.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.address.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.address.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">生产企业</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.enterprise" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.enterprise.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.enterprise.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.enterprise.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.enterprise.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.enterprise.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.enterprise.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.enterprise.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.enterprise.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.enterprise.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.enterprise.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.enterprise.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.enterprise.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.enterprise.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.enterprise.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.enterprise.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.enterprise.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.enterprise.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.enterprise.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <!--产品信息需要配图 -->
          <div class="card">
            <div class="title">产品信息</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.productInfo" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.productInfo.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.productInfo.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.productInfo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.productInfo.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.productInfo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.productInfo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.productInfo.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.productInfo.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.productInfo.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.productInfo.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.productInfo.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.productInfo.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.productInfo.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.productInfo.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.productInfo.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.productInfo.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.productInfo.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.productInfo.finalSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">信息来源</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseMedical.messageFrom" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div v-if="formData.taskStatus === 'firAuditeding'">
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="初审">
                    <el-radio-group v-model="approvsls.messageFrom.fisrtTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.messageFrom.firstSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'secAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.messageFrom.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input  v-model="approvsls.messageFrom.firstApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.messageFrom.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.messageFrom.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="二审">
                    <el-radio-group v-model="approvsls.messageFrom.secondTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.messageFrom.secondSuggestion"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="formData.taskStatus === 'finalAuditeding'">
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.messageFrom.fisrtTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.messageFrom.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.messageFrom.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.messageFrom.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <el-radio-group v-model="approvsls.messageFrom.secondTrailApprovalResult">
                          <el-radio-button label="通过">通过</el-radio-button>
                          <el-radio-button label="不通过">不通过</el-radio-button>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="得分">
                        <el-input v-model="approvsls.messageFrom.secondApprovalPoint"></el-input>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.messageFrom.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea"
                                   :rows="2" v-model="approvsls.messageFrom.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
                <el-form ref="formData" :model="formData" label-width="80px">
                  <el-form-item label="终审">
                    <el-radio-group v-model="approvsls.messageFrom.finalTrailApprovalResult">
                      <el-radio-button label="通过">通过</el-radio-button>
                      <el-radio-button label="不通过">不通过</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="意见">
                    <el-input  type="textarea"
                               :rows="2" v-model="approvsls.messageFrom.finalSuggestion"></el-input>
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
              <!--<span style="color: red;" v-if="formData.jsonStr.missChineseMedical[item.key] === '' ||formData.jsonStr.missChineseMedical[item.key].length ===0">（空） </span>-->
              <!--<span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missChineseMedical[item.key])}}</span>-->
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
          'taskMenuType': 'missChineseMedical',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missChineseMedical': {
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
          // 主要成分
          component: {
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
          // 性状
          property: {
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
          // 组成
          constitute: {
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
          // 主要功效
          mainMeffect: {
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
          // 适应病症
          indication: {
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
          // 规格
          medicFormat: {
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
          // 用法用量
          dosage: {
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
          // 临床应用及指南
          clinicalApplication: {
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
          // 不良反应
          adverseReaction: {
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
          // 禁忌
          taboo: {
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
          },
          // 药物相互作用
          interactions: {
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
          // 药性分析
          analyze: {
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
          // 药理作用
          pharmacology: {
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
          // 毒理作用
          toxicologicalEffects: {
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
          // 贮藏
          storageMethod: {
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
          // 有效期
          ytime: {
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
          // 执行标准
          standard: {
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
          // 执行文号
          approvaNum: {
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
          // 联合用药
          combinedMedication: {
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
          // 医师建议
          physicianAdvice: {
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
          // 鉴别
          identify: {
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
          pharmacyCheck: {
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
          // 含量测定
          contentPic: {
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
          // 附注
          notes: {
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
          // 药品标识
          drugIdentifying: {
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
          // 药品介绍
          drugIntroduc: {
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
          // 历史发展
          history: {
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
          // 获奖情况
          awards: {
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
          // 生产地址
          address: {
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
          // 生产企业
          enterprise: {
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
          // 产品信息
          productInfo: {
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
          // 信息来源
          messageFrom: {
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
        keyArr: [{ key: 'introduction', value: '简介' }, { key: 'component', value: '成分' }, { key: 'property', value: '教育经历' },
          { key: 'indication', value: '适应症' }, { key: 'medicFormat', value: '规格' }, { key: 'dosage', value: '用法用量' },
          { key: 'clinicalApplication', value: '临床应用及指南' },
          { key: 'adverseReactions', value: '不良反应' }, { key: 'taboo', value: '禁忌' }, { key: 'notice', value: '注意事项' },
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
      this.formData = JSON.parse(localStorage.getItem('curTrearment'))
    },
    filters: {
    },
    methods: {
      doCheck() {
        const params = {
          comName: this.formData.jsonStr.missChineseMedical.comName,
          shopName: this.formData.jsonStr.missChineseMedical.shopName,
          chinesePinyin: this.formData.jsonStr.missChineseMedical.chinesePinyin
        }
        doMedicalCheck(params).then(response => {
          if (response && response.meta.success) {
            this.formData.taskId = response.data
            this.isCheck = true
          }
        })
      },
      clearPic() {
        this.formData.jsonStr.missChineseMedical.picturePath = ''
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
        this.formData.jsonStr.missChineseMedical.picturepath = URL.createObjectURL(file.raw)
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
        this.formData.jsonStr.missChineseMedical.institutionList.push(param)
      },
      doDeleteInstitution(index) {
        this.formData.jsonStr.missChineseMedical.institutionList.splice(index, 1)
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
        this.formData.taskTitle = this.formData.jsonStr.missChineseMedical.shopName
        this.formData.jsonStr.approvsls = this.approvsls
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
        if (this.formData.jsonStr.missChineseMedical.leadteamInfo.length > 0) {
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
