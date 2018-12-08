<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <!--<el-form-item>-->
        <!--<el-select v-model="value" clearable placeholder="状态">-->
        <!--<el-option-->
        <!--v-for="item in status"-->
        <!--:key="item.statusId"-->
        <!--:label="item.label"-->
        <!--:value="item.statusId">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item >
        <el-input placeholder="姓名" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="doCreate()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="expand">
        <!--<template slot-scope="props">-->
          <!--<el-form label-position="left" inline class="demo-table-expand">-->
            <!--<el-form-item label="临床类型">-->
              <!--<span>{{ props.row.jsonStr.clinical_types_class }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="临床表现">-->
              <!--<span>{{ props.row.jsonStr.clinical_manifestation }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="体征">-->
              <!--<span>{{ props.row.jsonStr.sign }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="店铺 ID">-->
              <!--<span>{{ props.row.jsonStr.shopId }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="实验室检查">-->
              <!--<span>{{ props.row.jsonStr.laboratory_examination }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="诊断要点">-->
              <!--<span>{{ props.row.jsonStr.diagnostic_points }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="鉴别诊断">-->
              <!--<span>{{ props.row.jsonStr.differential_diagnosis }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="鉴别诊断">-->
              <!--<span>{{ props.row.jsonStr.differential_diagnosis }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="并发症及防治">-->
              <!--<span>{{ props.row.jsonStr.prevention_treatment }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="治疗与预后">-->
              <!--<span>{{ props.row.jsonStr.treatment_prognosis }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="预防调护">-->
              <!--<span>{{ props.row.jsonStr.preventive_nursing }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="护理">-->
              <!--<span>{{ props.row.jsonStr.nursing }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="防治措施">-->
              <!--<span>{{ props.row.jsonStr.prevention_measures }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="膳食调理">-->
              <!--<span>{{ props.row.jsonStr.dietary_conditioning }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="耐药性">-->
              <!--<span>{{ props.row.jsonStr.drug_resistance }}</span>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="注意事项">-->
              <!--<span>{{ props.row.jsonStr.attention_matter }}</span>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="taskTitle" label="名称"></el-table-column>
      <el-table-column prop="taskType" label="任务类型"></el-table-column>
      <el-table-column prop="taskMenuType" label="疾病类别"></el-table-column>
      <el-table-column prop="taskStatus" label="状态" ></el-table-column>
      <el-table-column prop="taskChangeVote" label="评分" ></el-table-column>
      <el-table-column prop="taskId" label="更新时间" >
      </el-table-column>

      <el-table-column prop="operation" label="操作 ">
        <template slot-scope="scope" >
          <el-button  type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button  type="text" @click="handleSubmit(scope.row)">提交</el-button>
          <el-button  type="text" @click="handleCompare(scope.row)">对比</el-button>
          <el-button  type="text" @click="deleteUpdate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination layout="total, prev, pager, next"
         background
         :page-size="10"
         @size-change="handleSizeChange"
         :total="total"
         @current-change="handleCurrentChange"
         style="text-align:center;">
    </el-pagination>
    <!-- 新增基础疾病-->
    <!--<el-dialog title="新增基础疾病" :visible.sync="isShowCreateVisible" :append-to-body="true" width="80%" top="10vh">-->
      <!--<el-form label-width="100px" :model="formData" ref="formData">-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="任务标题" prop="taskTitle">-->
              <!--<el-input v-model="formData.taskTitle"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="中文名称" prop="chinese_name">-->
              <!--<el-input v-model="formData.jsonStr.chinese_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="英文名称" prop="english_name">-->
              <!--<el-input v-model="formData.jsonStr.english_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="拉丁名称" prop="latin_name">-->
              <!--<el-input v-model="formData.jsonStr.latin_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="其他名称" prop="other_name">-->
              <!--<el-input v-model="formData.jsonStr.other_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="相关疾病" prop="related_diseases">-->
              <!--<el-input v-model="formData.jsonStr.related_diseases"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="疾病分类">-->
              <!--<el-select v-model="formData.jsonStr.disease_type" >-->
                <!--<el-option-->
                  <!--v-for="item in diseaseTypeList"-->
                  <!--:key="item.id"-->
                  <!--:label="item.value"-->
                  <!--:value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="主发病部位">-->
              <!--<el-select v-model="formData.jsonStr.location_pid" >-->
                <!--<el-option-->
                  <!--v-for="item in locationPidList"-->
                  <!--:key="item.id"-->
                  <!--:label="item.value"-->
                  <!--:value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--&lt;!&ndash;<el-input v-model="formData.jsonStr.location_pid"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="次发病部位" >-->
              <!--<el-select v-model="formData.jsonStr.location_disease" >-->
                <!--<el-option-->
                  <!--v-for="item in locationDiseaseList"-->
                  <!--:key="item.id"-->
                  <!--:label="item.value"-->
                  <!--:value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--&lt;!&ndash;<el-input v-model="formData.jsonStr.location_disease"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="主要病因" prop="main_causes">-->
              <!--<el-input v-model="formData.jsonStr.main_causes"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="常见症状" prop="common_symptom">-->
              <!--<el-input v-model="formData.jsonStr.common_symptom"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="多发群体" prop="multiple_population">-->
              <!--<el-input v-model="formData.jsonStr.multiple_population"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="传染性" >-->
              <!--<el-select v-model="formData.jsonStr.infectivity" >-->
                <!--<el-option-->
                <!--v-for="item in infectivityList"-->
                <!--:key="item.id"-->
                <!--:label="item.value"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--&lt;!&ndash;<el-input v-model="formData.jsonStr.infectivity"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="季节特点" prop="sea_characteristic">-->
              <!--<el-input v-model="formData.jsonStr.sea_characteristic"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="科室父级" prop="department_pid">-->
              <!--<el-input v-model="formData.jsonStr.department_pid"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="就诊科室" prop="department_id">-->
              <!--<el-input v-model="formData.jsonStr.department_id"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="临床类型" prop="clinical_types_class">-->
              <!--<el-input v-model="formData.jsonStr.clinical_types_class"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="临床表现" prop="clinical_manifestation">-->
              <!--<el-input v-model="formData.jsonStr.clinical_manifestation"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="体征" prop="sign">-->
              <!--<el-input v-model="formData.jsonStr.sign"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="实验室检查" prop="laboratory_examination">-->
              <!--<el-input v-model="formData.jsonStr.laboratory_examination"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="诊断要点" prop="diagnostic_points">-->
              <!--<el-input v-model="formData.jsonStr.diagnostic_points"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="鉴别诊断" prop="differential_diagnosis">-->
              <!--<el-input v-model="formData.jsonStr.differential_diagnosis"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="并发症及防治" prop="prevention_treatment">-->
              <!--<el-input v-model="formData.jsonStr.prevention_treatment"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="治疗与预后" prop="treatment_prognosis">-->
              <!--<el-input v-model="formData.jsonStr.treatment_prognosis"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="预防调护" prop="preventive_nursing">-->
              <!--<el-input v-model="formData.jsonStr.preventive_nursing"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="护理" prop="nursing">-->
              <!--<el-input v-model="formData.jsonStr.nursing"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="防治措施" prop="prevention_measures">-->
              <!--<el-input v-model="formData.jsonStr.prevention_measures"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="膳食调理" prop="dietary_conditioning">-->
              <!--<el-input v-model="formData.jsonStr.dietary_conditioning"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="耐药性" prop="drug_resistance">-->
              <!--<el-input v-model="formData.jsonStr.drug_resistance"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8">-->
            <!--<el-form-item label="注意事项" prop="attention_matter">-->
              <!--<el-input v-model="formData.jsonStr.attention_matter"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="isShowCreateVisible = false">取消</el-button>-->
        <!--<el-button type="primary" :loading="listLoading" @click="createOK" class="title1">保存</el-button>-->
        <!--<el-button type="primary" :loading="listLoading" @click="submitOK" class="title1">提交</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!-- 编辑基础疾病-->
    <el-dialog title="编辑基础疾病" :visible.sync="isShowEditVisible" :append-to-body="true" width="80%" top="10vh">
      <el-form label-width="100px" :model="formData" ref="formData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务标题" prop="taskTitle">
              <el-input v-model="formData.taskTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中文名称" prop="chinese_name">
              <el-input v-model="formData.jsonStr.chinese_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="英文名称" prop="english_name">
              <el-input v-model="formData.jsonStr.english_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="拉丁名称" prop="latin_name">
              <el-input v-model="formData.jsonStr.latin_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="其他名称" prop="other_name">
              <el-input v-model="formData.jsonStr.other_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="相关疾病" prop="related_diseases">
              <el-input v-model="formData.jsonStr.related_diseases"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="疾病分类">
              <el-select v-model="formData.jsonStr.disease_type" >
                <el-option
                  v-for="item in diseaseTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主发病部位">
              <el-select v-model="formData.jsonStr.location_pid" >
                <el-option
                  v-for="item in locationPidList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
              <!--<el-input v-model="formData.jsonStr.location_pid"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="次发病部位" >
              <el-select v-model="formData.jsonStr.location_disease" >
                <el-option
                  v-for="item in locationDiseaseList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
              <!--<el-input v-model="formData.jsonStr.location_disease"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主要病因" prop="main_causes">
              <el-input v-model="formData.jsonStr.main_causes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="常见症状" prop="common_symptom">
              <el-input v-model="formData.jsonStr.common_symptom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="多发群体" prop="multiple_population">
              <el-input v-model="formData.jsonStr.multiple_population"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="传染性" >
              <el-select v-model="formData.jsonStr.infectivity" >
                <el-option
                  v-for="item in infectivityList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
              <!--<el-input v-model="formData.jsonStr.infectivity"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节特点" prop="sea_characteristic">
              <el-input v-model="formData.jsonStr.sea_characteristic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="科室父级" prop="department_pid">
              <el-input v-model="formData.jsonStr.department_pid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="就诊科室" prop="department_id">
              <el-input v-model="formData.jsonStr.department_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="临床类型" prop="clinical_types_class">
              <el-input v-model="formData.jsonStr.clinical_types_class"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="临床表现" prop="clinical_manifestation">
              <el-input v-model="formData.jsonStr.clinical_manifestation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="体征" prop="sign">
              <el-input v-model="formData.jsonStr.sign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实验室检查" prop="laboratory_examination">
              <el-input v-model="formData.jsonStr.laboratory_examination"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="诊断要点" prop="diagnostic_points">
              <el-input v-model="formData.jsonStr.diagnostic_points"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="鉴别诊断" prop="differential_diagnosis">
              <el-input v-model="formData.jsonStr.differential_diagnosis"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="并发症及防治" prop="prevention_treatment">
              <el-input v-model="formData.jsonStr.prevention_treatment"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="治疗与预后" prop="treatment_prognosis">
              <el-input v-model="formData.jsonStr.treatment_prognosis"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预防调护" prop="preventive_nursing">
              <el-input v-model="formData.jsonStr.preventive_nursing"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="护理" prop="nursing">
              <el-input v-model="formData.jsonStr.nursing"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="防治措施" prop="prevention_measures">
              <el-input v-model="formData.jsonStr.prevention_measures"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="膳食调理" prop="dietary_conditioning">
              <el-input v-model="formData.jsonStr.dietary_conditioning"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="耐药性" prop="drug_resistance">
              <el-input v-model="formData.jsonStr.drug_resistance"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注意事项" prop="attention_matter">
              <el-input v-model="formData.jsonStr.attention_matter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEditVisible = false">取消</el-button>
        <el-button type="primary" :loading="listLoading" @click="editSaveOK" class="title1">保存</el-button>
        <el-button type="primary" :loading="listLoading" @click="editSubmitOK" class="title1">提交</el-button>
      </div>
    </el-dialog>

    <!-- 对比弹框 -->
    <el-dialog
      title="版本比对"
      :visible.sync="isShowCompare" :append-to-body="true"
      width="30%">
      <div>
        <el-table
          ref="multipleTable"
          :data="versionData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleVersionSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column  prop="taskTitle" label="标题" ></el-table-column>
          <el-table-column  prop="taskVersion" label="版本"> </el-table-column>
          <el-table-column  prop="taskMenuType" label="数据源"  show-overflow-tooltip> </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCompare = false">取 消</el-button>
        <el-button type="primary" @click="compareOk">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 版本比对结果弹框 -->
    <el-dialog
      title="版本比对结果"
      :visible.sync="isShowComResoultDialog" :append-to-body="true"
      width="80%">
      <div>
        <el-row>
          <el-col :span="12">
            <div >
              <el-row>
                <el-col :span="8" v-for="key in leftVersionKeyArr">
                  <span> {{i18n[key]}}:</span>
                  <span v-if="leftVersionData[key]===rightVersionData[key]">{{leftVersionData[key]}}</span>
                  <span v-else style="color: #ff0000">{{leftVersionData[key]}}</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div >
              <el-row>
                <el-col :span="8" v-for="key in leftVersionKeyArr">
                  <span> {{i18n[key]}}:</span>
                  <span>{{rightVersionData[key]}}</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowComResoultDialog = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 提交审核弹框 -->
    <el-dialog
      title="提交审核"
      :visible.sync="isShowSubmit" :append-to-body="true"
      width="30%">
      <span>确认提交本条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSubmit = false">取 消</el-button>
        <el-button type="primary" @click="submitNext">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹框 -->
    <!--<el-dialog-->
      <!--title="删除"-->
      <!--:visible.sync="deleteVisible" :append-to-body="true"-->
      <!--width="30%">-->
      <!--<span>确认删除吗</span>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="deleteVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="submitDelete">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->

    <create-basics-dialog  :visible.sync="isShowCreateVisible"></create-basics-dialog>
    <delete-dialog  :visible.sync="deleteVisible" :row-data="curRowData"></delete-dialog>
  </div>
</template>



<script>
  import { getDisBasicsList, doCreateDisBasics } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'

  import createBasicsDialog from '../dialog/createBasicsDialog'
  import deleteDialog from '../dialog/deleteDialog'
  import i18n from '../../i18n/local'
  const viewName = 'i18nView'
  export default {
    components: {
      createBasicsDialog,
      deleteDialog,
    },
    data() {
      return {
        i18n:i18n.zh.i18nView,
        tableList: [{
          "taskId":"123",
          "taskStatus":"草稿箱",
          "taskType":"新建",
          "taskMenuType":"miss_disease",
          "taskTitle":"测试1",
          "taskChangeVote":"121",
          "taskChangePoints":"123",
          "taskChangeComments":"阿斯顿",
          "jsonStr":{
            "chinese_name":"中文名字",
            "english_name":"英文",
            "other_name":"其他",
            "latin_name":"",
            "related_diseases":"",
            "disease_type":"chinese",
            "location_pid":"",
            "location_disease":"",
            "main_causes":"",
            "common_symptom":"",
            "multiple_population":"",
            "infectivity":1,
            "sea_characteristic":"",
            "department_pid":"",
            "department_id":"",
            "clinical_types_class":"",
            "clinical_manifestation":"",
            "sign":"",
            "laboratory_examination":"",
            "diagnostic_points":"",
            "differential_diagnosis":"",
            "prevention_treatment":"",
            "treatment_prognosis":"",
            "preventive_nursing":"",
            "nursing":"",
            "prevention_measures":"",
            "dietary_conditioning":"",
            "drug_resistance":"",
            "attention_matter":"",
            "picture_path":"",
            "thumbnail":"",
            "dataStatus":"",
          }
        }],
        listLoading: true,
        isShowCreateVisible:false,
        isShowEditVisible: false,
        isShowCompare:false,
        isShowSubmit:false,
        deleteVisible: false,
        isShowComResoultDialog:false,
        infectivityList:enumerate.infectivityList,
        diseaseTypeList:enumerate.diseaseTypeList,
        locationPidList:enumerate.locationPidList,
        locationDiseaseList:enumerate.locationDiseaseList,
        formData:{
          "taskStatus":"",
          "taskType":"",
          "taskMenuType":"miss_disease",
          "taskTitle":"",
          "taskChangeVote":"",
          "taskChangePoints":"",
          "taskChangeComments":"",
          "jsonStr":{
            "chinese_name":"",
            "english_name":"",
            "other_name":"",
            "latin_name":"",
            "related_diseases":"",
            "disease_type":"chinese",
            "location_pid":"",
            "location_disease":"",
            "main_causes":"",
            "common_symptom":"",
            "multiple_population":"",
            "infectivity":1,
            "sea_characteristic":"",
            "department_pid":"",
            "department_id":"",
            "clinical_types_class":"",
            "clinical_manifestation":"",
            "sign":"",
            "laboratory_examination":"",
            "diagnostic_points":"",
            "differential_diagnosis":"",
            "prevention_treatment":"",
            "treatment_prognosis":"",
            "preventive_nursing":"",
            "nursing":"",
            "prevention_measures":"",
            "dietary_conditioning":"",
            "drug_resistance":"",
            "attention_matter":"",
            "picture_path":"",
            "thumbnail":"",
            "dataStatus":"",
          }
        },
        versionData:[{taskId:1,taskTitle:"测试1",taskVersion:"1.0",taskMenuType:"基础疾病"},
          {taskId:2,taskTitle:"测试2",taskVersion:"2.0",taskMenuType:"基础疾病"},{taskId:3,taskTitle:"测试3",taskVersion:"3.0",taskMenuType:"基础疾病"}],
        leftVersionData:{taskId:1,taskTitle:"测试1",taskVersion:"1.0",taskMenuType:"基础疾病"},
        leftVersionKeyArr:[],
        rightVersionData:{taskId:1,taskTitle:"测试1",taskVersion:"2.0",taskMenuType:"基础疾病"},
        multipleSelection: [],
        total: 0,
        page: 1,
        pageSize: 10,
        status: [
          {
            statusId: 1,
            label: '启用'
          }, {
            statusId: 0,
            label: '禁用'
          }
        ],
        value: '',
        searchName: '',
        filterTableDataEnd: [],


        curRowData:{},
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.fetchData()
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          2: 'danger'
        }
        return statusMap[status]
      }
    },
    methods: {
      fetchData() {
        this.listLoading = false;
        const params={
          currentPage:1,
          pageSize:1000,
          chineseName:"",
          englishNam:"",
          otherName:"",
        }
        //this.listQuery
        getDisBasicsList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          console.log(pageList)
          this.total = response.data.total
          // this.tableList = pageList
          this.listLoading = false
        })
      },
      doCreate(){
        this.isShowCreateVisible=true;
      },
      createOK(){
        this.formData.taskStatus="drafts";
        this.formData.taskType="creat";
        doCreateDisBasics(this.formData).then(response => {
          this.isShowCreateVisible=false;
        })
      },
      submitOK(){
        this.formData.taskStatus="toFirAudited";
        this.formData.taskType="creat";
        doCreateDisBasics(this.formData).then(response => {
          this.isShowCreateVisible=false;
        })
      },
      doFilter() {
        if (this.searchName === '') {
          this.fetchData()
          // this.$message.warning('查询条件不能为空！')
          return
        }
        // 每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableList.forEach((value, index) => {
          if (value.taskTitle) {
            if (value.taskTitle.indexOf(this.searchName) >= 0) {
              this.filterTableDataEnd.push(value)
              console.log(this.filterTableDataEnd)
            }
          }
        })
        // 页面数据改变重新统计数据数量和当前页
        this.page = 1
        this.total = this.filterTableDataEnd.length
        // 渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
      },
      clickfun(e) {
        console.log(e.target.innerText)
      },
      handleUpdate(row) {
        this.isShowEditVisible = true;
        this.curTaskId=row.taskId;
        this.formData = Object.assign({}, row)
      },
      editSaveOK(){
        this.formData.taskStatus="drafts";
        this.formData.taskType="update";
        doCreateDisBasics(this.formData).then(response => {
          this.isShowEditVisible=false;
        })

      },
      editSubmitOK(){
        this.formData.taskStatus="toFirAudited";
        this.formData.taskType="update";
        doCreateDisBasics(this.formData).then(response => {
          this.isShowEditVisible=false;
        })
      },
      deleteUpdate(row) {
        this.deleteVisible = true;
        this.curRowData=Object.assign({}, row);
        // this.formData = Object.assign({}, row)
      },
      submitDelete() {
        this.formData.taskType="delete";
        const tempData = Object.assign({}, this.formData)
        doCreateDisBasics(tempData).then(response => {
          this.deleteVisible = false
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        console.log(row)
        row.status = status
      },
      handleSubmit(row){
        this.isShowSubmit = true;
        this.curTaskId=row.taskId;
        this.formData = Object.assign({}, row)
      },
      submitNext(){
        //提交下一步审核
        doCreateDisBasics(this.formData).then(response => {
          this.isShowSubmit=false;
        })

      },
      handleCompare(row){
        //调用查看版本的接口
        this.isShowCompare=true;
        doCreateDisBasics(row.taskId).then(response => {
          this.isShowCompare=false;
          this.versionData=response.data;
        })
      },
      handleVersionSelectionChange(val){
        this.multipleSelection = val;
      },
      compareOk(){
        debugger
        for (let key in this.leftVersionData) {
          this.leftVersionKeyArr.push(key); //属性
        }
        this.isShowComResoultDialog=true;
      },
      updateData() {
        const tempData = Object.assign({}, this.temp)
        console.log(tempData)
        // updateArticle(tempData).then(() => {
        //   for (const v of this.tableList) {
        //     if (v.uid === this.temp.uid) {
        //       const index = this.tableList.indexOf(v)
        //       this.tableList.splice(index, 1, this.temp)
        //       break
        //     }
        //   }
        //   this.isShowEditVisible = false
        //   this.$notify({
        //     title: '成功',
        //     message: '更新成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        // })
      },
      handleSizeChange(val) {
        this.page = val
        console.log(this.page)
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
        console.log(this.page)
        this.fetchData()
      },
      currentChangePage(list) {
        let from = (this.page - 1) * this.pageSize
        const to = this.page * this.pageSize
        this.tableList = []
        for (; from < to; from++) {
          if (list[from]) {
            this.tableList.push(list[from])
          }
        }
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

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
