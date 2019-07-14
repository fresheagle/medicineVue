<template>
  <div class="app-container" id="institutionCreate">
    <div style="top:0px;position: relative;">
      <el-row >
        <el-col :span="12" class="rowClass">
          <div class="card">
            <div class="title">概述</div>
            <div class="body">
              <el-form ref="formData" :model="formData" label-width="80px">
                <el-form-item label="名称">
                  <el-input v-model="formData.jsonStr.missChineseDisease.name"></el-input>
                </el-form-item>
                <el-form-item label="概述图">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="upSummarySuccess"
                    :before-upload="beSummaryUpload">
                    <img v-if="formData.jsonStr.missChineseDisease.picturepath" :src="formData.jsonStr.missChineseDisease.picturepath" class="avatar">
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
                    v-model="formData.jsonStr.missChineseDisease.introduction">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.summary.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.summary.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.summary.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.summary.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.summary.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.summary.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.summary.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.summary.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.summary.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.summary.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
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
                      <el-input v-model="formData.jsonStr.missChineseDisease.chineseName" placeholder="中文名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="英文名称">
                      <el-input v-model="formData.jsonStr.missChineseDisease.englishName" placeholder="英文名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="别名">
                      <el-input v-model="formData.jsonStr.missChineseDisease.otherName" placeholder="别名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相关西医疾病">
                      <el-input v-model="formData.jsonStr.missChineseDisease.relatedDiseases" placeholder="英文名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="主要病因">
                      <el-input v-model="formData.jsonStr.missChineseDisease.mainCauses" placeholder="主要病因"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="常见症状">
                      <el-input v-model="formData.jsonStr.missChineseDisease.commonSymptom" placeholder="常见症状"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="多发群体">
                      <el-input v-model="formData.jsonStr.missChineseDisease.multiplePopulation" placeholder="多发群体"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="传染性" >
                      <el-select v-model="formData.jsonStr.missChineseDisease.infectivity" >
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
                      <!--<el-select v-model="formData.jsonStr.missChineseDisease.diseaseType" disabled>-->
                      <!--<el-option-->
                      <!--v-for="item in enumerate.diseaseTypeList"-->
                      <!--:key="item.id"-->
                      <!--:label="item.value"-->
                      <!--:value="item.id">-->
                      <!--</el-option>-->
                      <!--</el-select>-->
                      <el-input v-model="formData.jsonStr.missChineseDisease.type" placeholder="疾病分类"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="中医发病部位">
                      <el-input v-model="formData.jsonStr.missChineseDisease.location" placeholder="中医发病部位"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.information.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.information.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.information.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.information.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.information.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.information.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.information.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.information.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.information.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.information.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">发病部位</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAddDislocation" type="primary">新增发病部位</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missChineseDisease.dislocationList" style="margin-bottom: 5px;">
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
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.dislocation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dislocation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dislocation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.dislocation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.dislocation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.dislocation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.dislocation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.dislocation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.dislocation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.dislocation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">指征机构</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAddSyndromeType" type="primary">新增指征机构</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missChineseDisease.syndromeType" style="margin-bottom: 5px;">
                <el-row >
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_symptom" placeholder="症状"></el-input>
                  </el-col>
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_name" placeholder="症名"></el-input>
                  </el-col>
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_treatment" placeholder="治法"></el-input>
                  </el-col>
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_representative_party" placeholder="代表方"></el-input>
                  </el-col>
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_chinese_medicine" placeholder="常用中药"></el-input>
                  </el-col>
                  <el-col :span="6" style="padding-right:40px;">
                    <el-input v-model="itemd.text_add_subtract" placeholder="加减"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-button @click="doDeleteSyndromeType(index)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.syndromeType.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.syndromeType.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.syndromeType.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.syndromeType.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.syndromeType.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.syndromeType.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.syndromeType.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.syndromeType.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.syndromeType.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.syndromeType.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊科室</div>
            <div class="body">
              <div  style="padding-bottom: 10px;"><el-button @click="doAdddepartment" type="primary">新增科室</el-button></div>
              <div v-for="(itemd, index) in formData.jsonStr.missChineseDisease.departmentMapDTO" style="margin-bottom: 5px;">
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
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.department.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.department.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.department.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">名词解释</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.nounInterpretation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.nounInterpretation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.nounInterpretation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.nounInterpretation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.nounInterpretation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.nounInterpretation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.nounInterpretation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.nounInterpretation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.nounInterpretation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.nounInterpretation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.nounInterpretation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">历史沿革</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.history" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.history.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.history.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.history.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.history.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.history.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.history.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.history.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.history.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.history.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.history.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">与西医病名关系</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.relationshipWestern" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.relationshipWestern.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.relationshipWestern.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.relationshipWestern.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relationshipWestern.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.relationshipWestern.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.relationshipWestern.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.relationshipWestern.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relationshipWestern.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.relationshipWestern.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relationshipWestern.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">病因</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.pathogeny" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.pathogeny.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pathogeny.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathogeny.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogeny.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.pathogeny.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pathogeny.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathogeny.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogeny.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.pathogeny.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogeny.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">病机</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.pathogenesis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.pathogenesis.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pathogenesis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathogenesis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogenesis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.pathogenesis.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.pathogenesis.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.pathogenesis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogenesis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.pathogenesis.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.pathogenesis.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临床表现</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.clinicalManifestation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.clinicalManifestation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalManifestation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalManifestation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalManifestation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.clinicalManifestation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalManifestation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalManifestation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalManifestation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.clinicalManifestation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalManifestation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">诊断依据</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.diagnosisBasis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.diagnosisBasis.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diagnosisBasis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosisBasis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diagnosisBasis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.diagnosisBasis.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diagnosisBasis.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diagnosisBasis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diagnosisBasis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.diagnosisBasis.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diagnosisBasis.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">病症鉴别</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.diseaseIdentification" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.diseaseIdentification.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diseaseIdentification.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diseaseIdentification.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diseaseIdentification.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.diseaseIdentification.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.diseaseIdentification.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.diseaseIdentification.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diseaseIdentification.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.diseaseIdentification.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.diseaseIdentification.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">相关检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.relatedExaminations" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.relatedExaminations.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.relatedExaminations.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.relatedExaminations.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relatedExaminations.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.relatedExaminations.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.relatedExaminations.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.relatedExaminations.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relatedExaminations.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.relatedExaminations.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.relatedExaminations.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">辨证要点</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.examinationPoints" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.examinationPoints.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.examinationPoints.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.examinationPoints.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.examinationPoints.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.examinationPoints.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.examinationPoints.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.examinationPoints.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.examinationPoints.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.examinationPoints.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.examinationPoints.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">治疗原则</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.treatmentPrinciples" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.treatmentPrinciples.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentPrinciples.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentPrinciples.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentPrinciples.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.treatmentPrinciples.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentPrinciples.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentPrinciples.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentPrinciples.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.treatmentPrinciples.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentPrinciples.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">外治法</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.externalTherapy" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.externalTherapy.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.externalTherapy.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.externalTherapy.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.externalTherapy.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.externalTherapy.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.externalTherapy.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.externalTherapy.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.externalTherapy.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.externalTherapy.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.externalTherapy.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">其他疗法</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.otherTherapies" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.otherTherapies.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.otherTherapies.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.otherTherapies.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.otherTherapies.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.otherTherapies.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.otherTherapies.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.otherTherapies.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.otherTherapies.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.otherTherapies.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.otherTherapies.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">转归预后</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.textPrognosis" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.textPrognosis.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.textPrognosis.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.textPrognosis.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textPrognosis.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.textPrognosis.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.textPrognosis.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.textPrognosis.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textPrognosis.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.textPrognosis.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textPrognosis.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预防调护</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.preventiveNursing" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.preventiveNursing.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.preventiveNursing.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventiveNursing.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.preventiveNursing.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.preventiveNursing.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.preventiveNursing.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.preventiveNursing.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.preventiveNursing.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.preventiveNursing.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.preventiveNursing.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">膳食调理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.textDietaryConditioning" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.textDietaryConditioning.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.textDietaryConditioning.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.textDietaryConditioning.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textDietaryConditioning.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.textDietaryConditioning.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.textDietaryConditioning.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.textDietaryConditioning.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textDietaryConditioning.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.textDietaryConditioning.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.textDietaryConditioning.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">临证备要</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.clinicalPreparation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.clinicalPreparation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalPreparation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalPreparation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalPreparation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.clinicalPreparation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.clinicalPreparation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.clinicalPreparation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalPreparation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.clinicalPreparation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.clinicalPreparation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">文献摘要</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.literatureAbstract" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.literatureAbstract.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.literatureAbstract.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.literatureAbstract.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.literatureAbstract.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.literatureAbstract.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.literatureAbstract.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.literatureAbstract.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.literatureAbstract.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.literatureAbstract.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.literatureAbstract.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">现代研究</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.modernResearch" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.modernResearch.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.modernResearch.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.modernResearch.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.modernResearch.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.modernResearch.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.modernResearch.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.modernResearch.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.modernResearch.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.modernResearch.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.modernResearch.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医案选读</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.medicalRead" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.medicalRead.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicalRead.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalRead.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalRead.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.medicalRead.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicalRead.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalRead.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalRead.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.medicalRead.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalRead.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">治疗费用参考</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.treatmentCost" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.treatmentCost.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentCost.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentCost.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentCost.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.treatmentCost.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.treatmentCost.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.treatmentCost.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentCost.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.treatmentCost.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.treatmentCost.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">急诊（120）指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.consultation" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.consultation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.consultation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.consultation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.consultation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.consultation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.consultation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.consultation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.consultation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.consultation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.consultation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">门诊指征</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.section" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.section.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.section.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.section.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.section.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.section.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.section.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.section.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.section.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.section.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.section.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">体格检验</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.medicalExamination" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.medicalExamination.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicalExamination.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalExamination.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalExamination.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.medicalExamination.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.medicalExamination.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.medicalExamination.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalExamination.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.medicalExamination.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.medicalExamination.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">家庭处理</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.familyTreatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.familyTreatment.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.familyTreatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.familyTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.familyTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.familyTreatment.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.familyTreatment.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.familyTreatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.familyTreatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.familyTreatment.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.familyTreatment.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">就诊科室</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.department" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.department2.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department2.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department2.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department2.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.department2.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.department2.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.department2.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department2.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.department2.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.department2.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">医生问诊</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.doctorConsulation  " :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.doctorConsulation.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.doctorConsulation.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorConsulation.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.doctorConsulation.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.doctorConsulation.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.doctorConsulation.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.doctorConsulation.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.doctorConsulation.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.doctorConsulation.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.doctorConsulation.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预计检查</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.expectedInspection" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.expectedInspection.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedInspection.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedInspection.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedInspection.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.expectedInspection.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedInspection.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedInspection.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedInspection.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.expectedInspection.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedInspection.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">预计治疗</div>
            <div class="body">
              <div>
                <quill-editor ref="myTextEditor" v-model="formData.jsonStr.missChineseDisease.expectedTreatment" :options="editorOption"></quill-editor>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="title">审核信息</div>
            <div class="body">
              <div>
                <el-collapse accordion>
                  <el-collapse-item title="初审信息" name="fisrtTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="初审">
                        <span>{{approvsls.expectedTreatment.fisrtTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedTreatment.firstApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedTreatment.firstTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedTreatment.firstSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="二审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="二审">
                        <span>{{approvsls.expectedTreatment.secondTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="得分">
                        <span>{{approvsls.expectedTreatment.secondApprovalPoint}}</span>
                      </el-form-item>
                      <el-form-item label="时间">
                        <span>{{approvsls.expectedTreatment.secondTrailSuggestTime}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedTreatment.secondSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                  <el-collapse-item title="终审信息" name="secondTrailApproval">
                    <el-form ref="formData" :model="formData" label-width="80px">
                      <el-form-item label="终审">
                        <span>{{approvsls.expectedTreatment.finalTrailApprovalResult}}</span>
                      </el-form-item>
                      <el-form-item label="意见">
                        <el-input  type="textarea" readonly
                                   :rows="2" v-model="approvsls.expectedTreatment.finalSuggestion"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-collapse-item>
                </el-collapse>
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
                <span style="color: red;" v-if="formData.jsonStr.missChineseDisease[item.key] === '' ||formData.jsonStr.missChineseDisease[item.key].length ===0">（空） </span>
                <span v-else style="color: #B3BBBE;">{{fnGetCpmisWords(formData.jsonStr.missChineseDisease[item.key])}}</span>
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
  import { doChineseDiseaseCheck, doCreateDisBasics, getDepartmentList, getDislocationList } from '../../api/task'
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
          'taskMenuType': 'missChineseDisease',
          'taskTitle': '',
          'operateCode': '', // 当前任务操作：save：保存，approveSuccess：提交/审核通过，approveFail：审核不通过
          'taskId': '',
          'taskFirstTrialPoint': '', // 二审总分数，可填可不填
          'taskSecondTrialPoint': '',
          'jsonStr': {
            'missChineseDisease': { // missChineseDisease
              name: '',
              picturepath: '',
              introduction: '',
              chineseName: '',
              englishName: '',
              otherName: '',
              relatedDiseases: '',
              diseaseType: '1',
              type: '',
              location: '',
              locationPid: '',
              locationDisease: '',
              mainCauses: '',
              commonSymptom: '',
              multiplePopulation: '',
              infectivity: 1,
              nounInterpretation: '',
              history: '',
              relationshipWestern: '',
              pathogeny: '',
              pathogenesis: '',
              clinicalManifestation: '',
              diagnosisBasis: '',
              diseaseIdentification: '',
              relatedExaminations: '',
              examinationPoints: '',
              treatmentPrinciples: '',
              externalTherapy: '',
              otherTherapies: '',
              textPrognosis: '',
              preventiveNursing: '',
              textDietaryConditioning: '',
              clinicalPreparation: '',
              literatureAbstract: '',
              modernResearch: '',
              medicalRead: '',
              treatmentCost: '',
              consultation: '',
              section: '',
              departmentMapDTO: [],
              dislocationList: [],
              syndromeType: [],
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
          // 基本信息
          information: {
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
          // 科室信息
          department: {
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
          // 发病部位
          dislocation: {
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
          // 指征机构
          syndromeType: {
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
          // 名词解释
          nounInterpretation: {
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
          // 历史沿革
          history: {
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
          // 与西医病名关系
          relationshipWestern: {
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
          // 病因
          pathogeny: {
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
          // 病机
          pathogenesis: {
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
          // 临床表现
          clinicalManifestation: {
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
          // 诊断依据
          diagnosisBasis: {
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
          // 病症鉴别
          diseaseIdentification: {
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
          // 相关检查
          relatedExaminations: {
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
          // 辨证要点
          examinationPoints: {
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
          // 治疗原则
          treatmentPrinciples: {
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
          // 外治法
          externalTherapy: {
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
          // 其他疗法
          otherTherapies: {
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
          // 转归预后
          textPrognosis: {
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
          // 预防调护
          preventiveNursing: {
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
          // 膳食调理
          textDietaryConditioning: {
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
          // 临证备要
          clinicalPreparation: {
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
          // 文献摘要
          literatureAbstract: {
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
          // 现代研究
          modernResearch: {
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
          // 医案选读
          medicalRead: {
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
          // 治疗费用参考
          treatmentCost: {
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
          // 急诊（120）指征
          consultation: {
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
          // 门诊指征
          section: {
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
          // 就诊科室
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
        dislocationList: [], // 发病部位
        dislocationPList: [], // 发病部位
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
        keyArr: [{ key: 'nounInterpretation', value: '名词解释' }, { key: 'history', value: '历史沿革' }, { key: 'relationshipWestern', value: '与西医病名关系' },
          { key: 'pathogeny', value: '病因' }, { key: 'pathogenesis', value: '病机' },{ key: 'clinicalManifestation', value: '临床表现' },
          { key: 'diagnosisBasis', value: '诊断依据' }, { key: 'diseaseIdentification', value: '病症鉴别' },{ key: 'relatedExaminations', value: '相关检查' },
          { key: 'examinationPoints', value: '辨证要点' }, { key: 'treatmentPrinciples', value: '治疗原则' },{ key: 'externalTherapy', value: '外治法' },
          { key: 'otherTherapies', value: '其他疗法' }, { key: 'textPrognosis', value: '转归预后' },{ key: 'preventiveNursing', value: '预防调护' },
          { key: 'textDietaryConditioning', value: '膳食调理' }, { key: 'clinicalPreparation', value: '临证备要' },{ key: 'literatureAbstract', value: '文献摘要' },
          { key: 'modernResearch', value: '现代研究' }, { key: 'medicalRead', value: '医案选读' },{ key: 'treatmentCost', value: '治疗费用参考' },
          { key: 'consultation', value: '急诊（120）指征' }, { key: 'section', value: '门诊指征' },{ key: 'medicalExamination', value: '体格检验' },
          { key: 'familyTreatment', value: '家庭处理' }, { key: 'department', value: '就诊科室' },{ key: 'doctorConsulation', value: '医生问诊' },
          { key: 'expectedInspection', value: '预计检查' }, { key: 'expectedTreatment', value: '预计治疗' }
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
        this.formData.jsonStr.missChineseDisease.picturepath = ''
      },
      doCheck() {
        const params = {
          chineseName: this.formData.jsonStr.missChineseDisease.chineseName,
          englishName: this.formData.jsonStr.missChineseDisease.englishName,
          otherName: this.formData.jsonStr.missChineseDisease.otherName
        }
        doChineseDiseaseCheck(params).then(response => {
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
        const params = {
          currentPage: 1,
          pageSize: 9999,
          parentDepartmentId: val
        }
        getDepartmentList(params).then(response => {
          this.departmentList = response.data.params
        })
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
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3)
      },
      /*
      * 概述图
      * */
      upSummarySuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.formData.jsonStr.missChineseDisease.picturepath = URL.createObjectURL(file.raw)
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
        this.formData.jsonStr.missChineseDisease.departmentMapDTO.push(param)
      },
      doDeleteDepartment(index) {
        this.formData.jsonStr.missChineseDisease.departmentMapDTO.splice(index, 1)
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
        this.formData.jsonStr.missChineseDisease.dislocationList.push(param)
      },
      doDeleteDislocation(index) {
        this.formData.jsonStr.missChineseDisease.dislocationList.splice(index, 1)
      },
      // 指征机构
      doAddSyndromeType() {
        const param = {
          'text_symptom': '',
          'text_name': '',
          'text_treatment': '',
          'text_representative_party': '',
          'text_chinese_medicine': '',
          'text_add_subtract': ''
        }
        this.formData.jsonStr.missChineseDisease.syndromeType.push(param)
      },
      doDeleteSyndromeType(index) {
        this.formData.jsonStr.missChineseDisease.syndromeType.splice(index, 1)
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
        this.formData.taskTitle = this.formData.jsonStr.missChineseDisease.chineseName
        this.formData.jsonStr.approvsls = this.approvsls
        doCreateDisBasics(this.formData).then(response => {
          if (response.meta.message === 'ok') {
            this.$router.push('/disease/chinese')
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
        if (this.formData.jsonStr.missChineseDisease.leadteamInfo.length > 0) {
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
