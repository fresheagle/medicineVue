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
              <el-button type="primary">导出结果</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="doReceive()">领取任务</el-button><!--该按钮放置到任务页面-->
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
          {{scope.row.taskStatus | statusFilter}}
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
      <el-table-column prop="taskFinalTrialPint" label="终审得分" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="taskFinalTrialTime" label="终审日期" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{fmtDate(scope.row.taskFinalTrialTime)}}
        </template>
      </el-table-column>

      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteUpdate(scope.row)">删除</el-button>
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
    <examine-dialog :visible.sync="isShowExamineVisible" :cur-select-data="multipleSelection"></examine-dialog>
    <settlement-dialog :visible.sync="isShowSettlementVisible"></settlement-dialog>
    <reset-status-dialog :visible.sync="isShowResetStatusVisible"></reset-status-dialog>
    <assign-dialog :visible.sync="isShowAssignVisible"></assign-dialog>

  </div>
</template>


<script>
  import { getTaskList, doCreateDisBasics, toClaimTask } from '../../api/task'
  import enumerate from '../../store/modules/enumerate'
  import deleteDialog from '../dialog/deleteDialog'
  import examineDialog from '../dialog/examineDialog'
  import settlementDialog from '../dialog/settlementDialog'
  import resetStatusDialog from '../dialog/resetStatusDialog'
  import assignDialog from '../dialog/assignDialog'

  import i18n from '../../i18n/local'

  const viewName = 'i18nView'
  export default {
    props: {
      curTaskMenuType: ''
    },
    components: {
      deleteDialog,
      examineDialog,
      settlementDialog,
      resetStatusDialog,
      assignDialog
    },
    data() {
      return {
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
        isShowCompare: false,
        isShowSubmit: false,
        deleteVisible: false,
        isShowComResoultDialog: false,
        searchCreateUser: '',
        searchFirstTrialUser: '',
        searchSecondTrialUser: '',
        searchFinalTrialUser: '',
        searchBody: {
          taskTitle: '',
          createUser: [],
          createRole: '0',
          taskStatus: [],
          taskCreateTime: [],
          updateTime: [],
          firstTrialUser: [],
          secondTrialUser: [],
          finalTrialUser: [],
          taskFirstTrialTime: [],
          taskSecondTrialTime: [],
          taskFinalTrialTime: []
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
        curTaskType: '' // 作为参数，区分是创建还是更新操作
      }
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', i18n.en)
        this.$i18n.mergeLocaleMessage('zh', i18n.zh)
      }
      this.searchBody.taskStatus[0] = this.$route.params.taskProgress
      this.fetchData()
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
      fetchData() {
        this.listLoading = false
        const params = this.searchBody
        params.currentPage = 1
        params.pageSize = 9999
        params.taskMenuType = this.curTaskMenuType
        // this.listQuery
        getTaskList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
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
        this.fetchData()
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
          'taskStatus': this.$route.params.taskProgress
        }
        toClaimTask(params).then(response => {
          if (response && response.meta.success) {
            this.fetchData()
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
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
            }
          }
        })
        // 页面数据改变重新统计数据数量和当前页
        this.page = 1
        this.total = this.filterTableDataEnd.length
        // 渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
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
      handleCompare(row) {
        // 调用查看版本的接口
        this.isShowCompare = true
        doCreateDisBasics(row.taskId).then(response => {
          this.isShowCompare = false
          this.curRowData = response.data
        })
      },
      handleSizeChange(val) {
        this.page = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
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
