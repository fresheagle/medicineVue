<template>
  <div class="app-container">
    <div>
      <el-form label-width="80px">
        <el-row id="searchBar" style="min-width: 1600px;">
          <el-col :span="4">
            <el-form-item label="标题:">
              <el-input  placeholder="请输入标题"  v-model="searchBody.taskTitle"></el-input>
            </el-form-item>
            <el-form-item label="作者:">
              <el-input placeholder="多个用逗号隔开"  v-model="searchCreateUser"></el-input>
            </el-form-item>
            <el-form-item label="在线状态:">
              <el-select v-model="searchBody.dataStatus" placeholder="请选择">
                <el-option
                  v-for="item in trailStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="初审者:">
              <el-input placeholder="多个用逗号隔开"  v-model="searchFirstTrialUser"></el-input>
            </el-form-item>
            <el-form-item label="二审者:">
              <el-input placeholder="多个用逗号隔开"  v-model="searchSecondTrialUser"></el-input>
            </el-form-item>
            <el-form-item label="终审者:">
              <el-input placeholder="多个用逗号隔开"  v-model="searchFinalTrialUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="编辑组:">
              <el-select v-model="searchBody.createUser" multiple placeholder="请选择">
                <el-option
                  v-for="item in group"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进度:">
              <el-select
                v-model="searchBody.taskStatus"
                multiple
                filterable
                allow-create
                collapse-tags
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in enumerate.taskStatus"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算状态:">
              <el-select v-model="searchBody.createRole" placeholder="请选择">
                <el-option
                  v-for="item in enumerate.createRoleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建日期:">
              <el-date-picker
                class="timeSelect"
                v-model="searchBody.taskCreateTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="更新日期:">
              <el-date-picker
                v-model="searchBody.updateTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="初审日期:">
              <el-date-picker
                v-model="searchBody.taskFirstTrialTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二审日期:">
              <el-date-picker
                v-model="searchBody.taskSecondTrialTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="终审日期:">
              <el-date-picker
                v-model="searchBody.taskFinalTrialTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item >
              <el-button type="primary" @click="doFilter()">搜索</el-button>
              <el-button type="primary" @click="resetSearchBody()">重置条件</el-button>
              <el-button type="primary" @click="doExport()">导出结果</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="doCreate()" v-if="curRoleCode.indexOf('000') !== -1 || curRoleCode.indexOf('001') !== -1">创建</el-button>
          <el-button type="primary" @click="doOnline()" :disabled="!(multipleSelection.length > 0)">上线</el-button>
          <el-button type="primary" @click="doOffline()" :disabled="!(multipleSelection.length > 0)">下线</el-button>
          <el-button type="primary" @click="toShowBatchDelete()" :disabled="!(multipleSelection.length > 0)">删除</el-button>
          <el-button type="primary" @click="toShowExamine()" :disabled="!(multipleSelection.length > 0)">批量审核</el-button>
          <el-button type="primary" @click="toShowSettlement()" :disabled="!(multipleSelection.length > 0)">结算</el-button>
          <el-button type="primary" @click="toShowResetStatus()" :disabled="!(multipleSelection.length > 0)">重置进度</el-button>
          <el-button type="primary" @click="toShowAssign()" :disabled="!(multipleSelection.length > 0)">指派新作者</el-button>
          <el-button type="text" @click="toTaskPool('drafts')" v-if="curRoleCode.indexOf('001') !== -1">草稿箱</el-button>
          <el-button type="text" @click="toTaskPool('toFirAudited')" v-if="curRoleCode.indexOf('002') !== -1">初审池</el-button>
          <el-button type="text" @click="toTaskPool('toSecAudited')" v-if="curRoleCode.indexOf('003') !== -1">二审池</el-button>
          <el-button type="text" @click="toTaskPool('toFinalAudited')" v-if="curRoleCode.indexOf('004') !== -1">终审池</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中"
              @selection-change="handleSelectionChange"
              style="width: 100%;min-width: 1600px;">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column prop="taskTitle" label="标题" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="taskStatus" label="最新进度" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button type="text" @click="showExamineMsg(scope.row)">{{scope.row.taskStatus | statusFilter}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="作者" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.createUser.userName}}
        </template>
      </el-table-column>
      <el-table-column prop="taskCreateTime" label="创建日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.taskCreateTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="createUserRole" label="编辑组" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.createUserRole.userName}}
        </template>
      </el-table-column>
      <el-table-column prop="firstTrialUser" label="初审者" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.firstTrialUser.userName}}
        </template>
      </el-table-column>
      <el-table-column prop="taskFirstTrialPoint" label="初审得分" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="taskFirstTrialTime" label="初审日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.taskFirstTrialTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="secondTrialUser" label="二审者" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.secondTrialUser.userName}}
        </template>
      </el-table-column>
      <el-table-column prop="taskSecondTrialPoint" label="二审得分" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="taskSecondTrialTime" label="二审日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.taskSecondTrialTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="finalTrialUser" label="终审者" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.finalTrialUser.userName}}
        </template>
      </el-table-column>
      <!--<el-table-column prop="taskFinalTrialPint" label="终审得分" :show-overflow-tooltip="true">-->
      <!--</el-table-column>-->
      <el-table-column prop="taskFinalTrialTime" label="终审日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.taskFinalTrialTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="taskFinalTrialPint" label="更新日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="detailCount" label="版本" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCompare(scope.row)">{{scope.row.detailCount}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="dataStatus" label="在线状态" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.dataStatus === 'online'">已上线</span>
          <span v-else-if="scope.row.dataStatus === 'offline'">已下线</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="accounts" label="其他状态" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.accounts === 'unaccounts'">未结算</span>
          <span v-else-if="scope.row.accounts === 'accounts'">已结算</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleExamine(scope.row)"
                     v-if="(curRoleCode.indexOf('000') !== -1 || curRoleCode.indexOf('002') !== -1 || curRoleCode.indexOf('003') !== -1 || curRoleCode.indexOf('004') !== -1)
                     && (scope.row.taskStatus === 'firAuditeding' || scope.row.taskStatus === 'secAuditeding' || scope.row.taskStatus === 'finalAuditeding')">审核</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)" v-if="curRoleCode.indexOf('000') !== -1 || curRoleCode.indexOf('001') !== -1">编辑</el-button>
          <el-button type="text" @click="deleteUpdate(scope.row)" v-if="curRoleCode.indexOf('000') !== -1">删除</el-button>
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

    <delete-dialog :visible.sync="deleteVisible" :row-data="curRowData" :cur-task-type="curTaskType"
                   @refreshList="fetchData"></delete-dialog>
    <examine-dialog :visible.sync="isShowExamineVisible" :cur-select-data="multipleSelection" @refreshList="fetchData"></examine-dialog>
    <online-dialog :visible.sync="isShowOnlineVisible" :cur-select-data="multipleSelection" @refreshList="fetchData"></online-dialog>
    <offline-dialog :visible.sync="isShowOfflineVisible" :cur-select-data="multipleSelection" @refreshList="fetchData"></offline-dialog>
    <settlement-dialog :visible.sync="isShowSettlementVisible" :cur-select-data="multipleSelection" @refreshList="fetchData"></settlement-dialog>
    <reset-status-dialog :visible.sync="isShowResetStatusVisible" :cur-select-data="multipleSelection" @refreshList="fetchData"></reset-status-dialog>
    <assign-dialog :visible.sync="isShowAssignVisible" :cur-select-data="multipleSelection"></assign-dialog>
    <first-compare-dialog :visible.sync="isShowCompare" :row-data="curRowData" :cur-task-type="curTaskType"
                          @refreshList="fetchData"></first-compare-dialog>

    <el-dialog
      title="审核留言"
      :visible.sync="isShowExamineMsgDialog"
      :append-to-body="true"
      width="30%">
      <div>
        <el-form ref="formData" label-width="100px">
          <el-form-item label="审核意见：" >
            {{this.taskChangeComments}}
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button  @click="isShowExamineMsgDialog = false">取 消</el-button>
    </span>
    </el-dialog>

  </div>
</template>


<script>
  import { getTaskList, toClaimTask, deleteTask, doExport } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  import firstCompareDialog from '../dialog/firstCompareDialog'

  // import createPublicDialog from './dialog/createPublicDialog'
  import deleteDialog from '../dialog/deleteDialog'
  import examineDialog from '../dialog/examineDialog'
  import settlementDialog from '../dialog/settlementDialog'
  import resetStatusDialog from '../dialog/resetStatusDialog'
  import assignDialog from '../dialog/assignDialog'
  import onlineDialog from '../dialog/onlineDialog'
  import offlineDialog from '../dialog/offlineDialog'
  import Cookies from 'js-cookie'

  import i18n from '../../i18n/local'

  const viewName = 'i18nView'
  export default {
    components: {
      deleteDialog,
      examineDialog,
      settlementDialog,
      resetStatusDialog,
      assignDialog,
      onlineDialog,
      offlineDialog,
      firstCompareDialog
    },
    props: {
      curTaskMenuType: ''
    },
    data() {
      return {
        curRoleCode: '',
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        tableList: [],
        listLoading: true,
        isShowCreateVisible: false,
        isShowExamineVisible: false,
        isShowSettlementVisible: false,
        isShowResetStatusVisible: false,
        isShowAssignVisible: false,
        isShowEditVisible: false,
        isShowOfflineVisible: false,
        isShowOnlineVisible: false,
        isShowExamineMsgDialog: false,
        isShowCompare: false,
        isShowSubmit: false,
        deleteVisible: false,
        isShowComResoultDialog: false,
        searchCreateUser: '',
        searchFirstTrialUser: '',
        searchSecondTrialUser: '',
        searchFinalTrialUser: '',
        trailStatusList: [{ label: '上线', value: 'online' }, { label: '下线', value: 'offline' }],
        searchBody: {
          taskTitle: '',
          createUser: [],
          createRole: '',
          taskStatus: [],
          taskCreateTime: [],
          updateTime: [],
          firstTrialUser: [],
          secondTrialUser: [],
          finalTrialUser: [],
          taskFirstTrialTime: [],
          taskSecondTrialTime: [],
          taskFinalTrialTime: [],
          taskMenuType: this.curTaskMenuType,
          dataStatus: ''
        },
        group: [{ label: '全部', value: 'all' }, { label: '草稿箱', value: 'drafts' }],
        multipleSelection: [],
        total: 0,
        page: 1,
        pageSize: 10,
        value: '',
        searchName: '',
        filterTableDataEnd: [],
        curRowData: {},
        curTaskType: '', // 作为参数，区分是创建还是更新操作
        taskChangeComments: '',
        compareData: []
      }
    },
    created() {
      this.curRoleCode = Cookies.get('roleCode')
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.fetchData(this.curTaskMenuType)
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          'drafts': '草稿',
          'toFirAudited': '待初审',
          'firAuditeding': '初审中',
          'firAuditedFailed': '初审未通过',
          'toSecAudited': '待二审',
          'secAuditeding': '二审中',
          'secAuditedFailed': '二审未通过',
          'toFinalAudited': '待终审',
          'finalAuditeding': '终审中',
          'finalAuditedFailed': '终审未通过',
          'finished': '终审通过'
        }
        return statusMap[status]
      }
    },
    methods: {
      fetchData(cruTaskMenuType) {
        this.listLoading = false
        const params = this.searchBody
        params.currentPage = this.page
        params.pageSize = this.pageSize
        params.taskMenuType = cruTaskMenuType
        getTaskList(params).then(response => {
          //const limit = 10
          //const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          const pageList = response.data.params
          this.total = response.data.total
          this.tableList = pageList
          this.listLoading = false
        })
      },
      fmtDate(obj) {
        if (obj === '' || obj === null) {
          return '--'
        }
        var date = new Date(obj)
        var y = 1900 + date.getYear()
        var m = '0' + (date.getMonth() + 1)
        var d = '0' + date.getDate()
        return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
      },
      resetSearchBody() {
        this.searchBody = {
          taskTitle: '',
          createUser: [],
          createRole: 'all',
          taskStatus: [],
          taskCreateTime: [],
          updateTime: [],
          firstTrialUser: [],
          secondTrialUser: [],
          finalTrialUser: [],
          taskFirstTrialTime: [],
          taskSecondTrialTime: [],
          taskFinalTrialTime: []
        }
        // 调用查询接口
        this.fetchData(this.curTaskMenuType)
      },
      doCreate() {
        var curPath = ''
        switch (this.curTaskMenuType) {
          case 'missInstitution':
            curPath = '/institution/create'
            break
          case 'missDoctor':
            curPath = '/modernDoctor/cooperation-create'
            break
          case 'missChineseDisease':
            curPath = '/disease/chinese-create'
            break
          case 'missWsetDisease':
            curPath = '/disease/western-create'
            break
          case 'missChineseMedical':
            curPath = '/drugs/chinese-create'
            break
          case 'missWesternMedical':
            curPath = '/drugs/western-create'
            break
          case 'missChineseSymptom':
            curPath = '/symptom/chinese-create'
            break
          case 'missWesternSymptom':
            curPath = '/symptom/western-create'
            break
          case 'missArticle':
            curPath = '/article/article-create'
            break
        }
        const { href } = this.$router.resolve({
          path: curPath
        })
        window.open(href, '_blank')
      },
      // 任务认领
      doReceive() {
        const result = []
        this.multipleSelection.forEach(function(item) {
          result.push(item.taskId)
        })
        const params = {
          'status': 1,
          'taskIds': result,
          'taskStatus': 'toFirAudited'
        }
        toClaimTask(params).then(response => {

        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 上线
      doOnline() {
        this.isShowOnlineVisible = true
      },
      //  下线
      doOffline() {
        this.isShowOfflineVisible = true
      },
      // 批量删除
      toShowBatchDelete() {
        const data = []
        this.multipleSelection.forEach(function(item) {
          data.push(item.taskId)
        })
        this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTask(data).then(response => {
            this.$emit('refreshList')
            this.$emit('update:visible', false)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 批量审核
      toShowExamine() {
        this.isShowExamineVisible = true
      },
      toShowSettlement() {
        this.isShowSettlementVisible = true
      },
      toShowResetStatus() {
        this.isShowResetStatusVisible = true
      },
      toShowAssign() {
        this.isShowAssignVisible = true
      },
      toTaskPool(taskStatus) {
        var curPath = ''
        switch (this.curTaskMenuType) {
          case 'missInstitution':
            curPath = '/institution/treatment/pool/'
            break
          case 'missDoctor':
            curPath = '/cooperation/pool/'
            break
          case 'missChineseDisease':
            curPath = '/disease/chinese/pool/'
            break
          case 'missWsetDisease':
            curPath = '/disease/western/pool/'
            break
          case 'missChineseMedical':
            curPath = '/drugs/chinese/pool/'
            break
          case 'missWesternMedical':
            curPath = '/drugs/western/pool/'
            break
          case 'missChineseSymptom':
            curPath = '/symptom/chinese/pool/'
            break
          case 'missWesternSymptom':
            curPath = '/symptom/western/pool/'
            break
          case 'missArticle':
            curPath = '/article/pool/'
            break
        }
        const { href } = this.$router.resolve({
          path: curPath + taskStatus
        })
        window.open(href, '_blank')
      },
      doFilter() {
        if (this.searchName === '') {
          this.fetchData(this.curTaskMenuType)
          // this.$message.warning('查询条件不能为空！')
          return
        }
        // 每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.tableList.forEach((value, index) => {
          if (value.taskTitle) {
            if (value.taskTitle.indexOf(this.searchName) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        })
        // 页面数据改变重新统计数据数量和当前页
        this.page = 1
        this.total = this.filterTableDataEnd.length
        // 渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
      },
      doExport() {
        this.listLoading = false
        const params = this.searchBody
        params.currentPage = 1
        params.pageSize = 9999
        params.taskMenuType = this.curTaskMenuType
        doExport(params).then(response => {
          const blob = new Blob([response], { type: 'application/excel' })
          const objectUrl = URL.createObjectURL(blob)
          var a = document.createElement('a')
          a.href = objectUrl
          a.download = 'export_file.xlsx'
          a.click()
        })
      },
      handleExamine(row) {
        const curTrearment = Object.assign({}, row)
        localStorage.setItem('curTrearment', JSON.stringify(curTrearment))
        var curPath = ''
        switch (this.curTaskMenuType) {
          case 'missInstitution':
            curPath = '/institution/examine'
            break
          case 'missDoctor':
            curPath = '/modernDoctor/cooperation-examine'
            break
          case 'missChineseDisease':
            curPath = '/disease/chinese-examine'
            break
          case 'missWsetDisease':
            curPath = '/disease/western-examine'
            break
          case 'missChineseMedical':
            curPath = '/drugs/chinese-examine'
            break
          case 'missWesternMedical':
            curPath = '/drugs/western-examine'
            break
          case 'missChineseSymptom':
            curPath = '/symptom/chinese-examine'
            break
          case 'missWesternSymptom':
            curPath = '/symptom/western-examine'
            break
          case 'missArticle':
            curPath = '/article/article-examine'
            break
        }
        const { href } = this.$router.resolve({
          path: curPath
        })
        window.open(href, '_blank')
      },
      handleUpdate(row) {
        const curTrearment = Object.assign({}, row)
        localStorage.setItem('curTrearment', JSON.stringify(curTrearment))
        var curPath = ''
        switch (this.curTaskMenuType) {
          case 'missInstitution':
            curPath = '/institution/edit'
            break
          case 'missDoctor':
            curPath = '/modernDoctor/cooperation-edit'
            break
          case 'missChineseDisease':
            curPath = '/disease/chinese-edit'
            break
          case 'missWsetDisease':
            curPath = '/disease/western-edit'
            break
          case 'missChineseMedical':
            curPath = '/drugs/chinese-edit'
            break
          case 'missWesternMedical':
            curPath = '/drugs/western-edit'
            break
          case 'missChineseSymptom':
            curPath = '/symptom/chinese-edit'
            break
          case 'missWesternSymptom':
            curPath = '/symptom/western-edit'
            break
          case 'missArticle':
            curPath = '/article/article-edit'
            break
        }
        const { href } = this.$router.resolve({
          path: curPath
        })
        window.open(href, '_blank')
      },
      deleteUpdate(row) {
        this.deleteVisible = true
        this.curTaskType = 'delete'
        this.curRowData = Object.assign({}, row)
      },
      handleSubmit(row) {
        this.isShowSubmit = true
        this.curRowData = Object.assign({}, row)
      },
      handleCompare(row) {
        // 调用查看版本的接口
        this.isShowCompare = true
        this.curRowData = row
      },
      handleSizeChange(val) {
        this.page = val
        this.fetchData(this.curTaskMenuType)
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetchData(this.curTaskMenuType)
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
      },
      showExamineMsg(rowInfo) {
        this.isShowExamineMsgDialog = true
        this.taskChangeComments = rowInfo.taskChangeComments
      }
    },
    watch: {
      searchCreateUser(newVal, oldVal) {
        var createUserStr = newVal.replace('，', ',')
        this.searchBody.createUser = createUserStr.split(',')
      },
      searchFirstTrialUser(newVal, oldVal) {
        var firstTrialUserStr = newVal.replace('，', ',')
        this.searchBody.firstTrialUser = firstTrialUserStr.split(',')
      },
      searchSecondTrialUser(newVal, oldVal) {
        var secondTrialUserStr = newVal.replace('，', ',')
        this.searchBody.secondTrialUser = secondTrialUserStr.split(',')
      },
      searchFinalTrialUser(newVal, oldVal) {
        var finalTrialUserStr = newVal.replace('，', ',')
        this.searchBody.finalTrialUser = finalTrialUserStr.split(',')
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
  #searchBar .el-date-editor--daterange{
    width: 310px;
  }
</style>
