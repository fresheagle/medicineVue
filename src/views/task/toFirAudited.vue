<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <!--<el-select v-model="value" clearable placeholder="状态">-->
          <!--<el-option-->
          <!--v-for="item in status"-->
          <!--:key="item.statusId"-->
          <!--:label="item.label"-->
          <!--:value="item.statusId">-->
          <!--</el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item >
          <el-input placeholder="名称" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column prop="taskTitle" label="任务名称"></el-table-column>
      <el-table-column prop="taskMenuType"  label="任务来源"></el-table-column>
      <el-table-column prop="taskType"  label="任务类型"></el-table-column>
      <el-table-column prop="taskStatus" label="状态">
        <template slot-scope="scope">
          {{i18n[scope.row.taskStatus]}}
        </template>
      </el-table-column>
      <el-table-column prop="taskChangePoints" label="评分" ></el-table-column>
      <el-table-column prop="taskChangeComments" label="备注" ></el-table-column>
      <el-table-column prop="operation" label="操作 ">
        <template slot-scope="scope" >
          <!--<el-button  type="text" @click="handleUpdate(scope.row)">查看</el-button>-->
          <el-button  type="text" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button  type="text" @click="handleSubmit(scope.row)">提交</el-button>
          <el-button  type="text" @click="handleCompare(scope.row)">对比</el-button>
          <!--<el-button  type="text" @click="deleteUpdate(scope.row)">删除</el-button>-->
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

    <create-basics-dialog  :visible.sync="isShowCreateVisible" :row-data="missDiseaseCurRowData"
                           :cur-task-type="curTaskType" @refreshList="fetchData"></create-basics-dialog>
    <create-chinese-dialog :visible.sync="isShowCreateChineseVisible" :row-data="missChineseDiseaseCurRowData"
                           :cur-task-type="curTaskType" @refreshList="fetchData"></create-chinese-dialog>
    <create-western-dialog :visible.sync="isShowCreateWesternVisible" :row-data="missWesternCurRowData"
                           :cur-task-type="curTaskType" @refreshList="fetchData"></create-western-dialog>
    <create-combination-dialog :visible.sync="isShowCreateCombineVisible" :row-data="missCombineDiseaseCurRowData"
                               :cur-task-type="curTaskType" @refreshList="fetchData"></create-combination-dialog>

    <create-public-dialog  :visible.sync="isShowCreatePublicVisible" :row-data="missInstitutionCurRowData"
                           :cur-task-type="curTaskType" @refreshList="fetchData"></create-public-dialog>
    <create-symptom-dialog  :visible.sync="isShowCreateSymptomVisible" :row-data="missSymptomCurRowData"
                            :cur-task-type="curTaskType" @refreshList="fetchData"></create-symptom-dialog>
    <create-enterprise-dialog  :visible.sync="isShowCreateEnterpriseVisible" :row-data="missMedicalCompanyCurRowData"
                               :cur-task-type="curTaskType" @refreshList="fetchData"></create-enterprise-dialog>
    <create-drugs-chinese-dialog  :visible.sync="isShowCreateDrugsChineseVisible" :row-data="missMedicalCurRowData"
                                  :cur-task-type="curTaskType" @refreshList="fetchData"></create-drugs-chinese-dialog>

    <delete-dialog  :visible.sync="deleteVisible" :row-data="curRowData" :cur-task-type="curTaskType"
                    @refreshList="fetchData"></delete-dialog>
    <submit-next-dialog  :visible.sync="isShowSubmit" :row-data="curRowData" :cur-task-type="curTaskType"
                         @refreshList="fetchData"></submit-next-dialog>
    <first-compare-dialog :visible.sync="isShowCompare" :row-data="curRowData" :cur-task-type="curTaskType"
                          @refreshList="fetchData"></first-compare-dialog>

  </div>
</template>



<script>
  import { getMissionList } from '../../api/task'

  import createBasicsDialog from '../dialog/createBasicsDialog'
  import deleteDialog from '../dialog/deleteDialog'
  import submitNextDialog from '../dialog/submitNextDialog'
  import firstCompareDialog from '../dialog/firstCompareDialog'

  import createChineseDialog from '../disease/dialog/createChineseDialog'
  import createWesternDialog from '../disease/dialog/createWesternDialog'
  import createCombinationDialog from '../disease/dialog/createCombinationDialog'
  import createPublicDialog from '../institution/dialog/createPublicDialog'
  import createSymptomDialog from '../symptom/dialog/createSymptomDialog'
  import createEnterpriseDialog from '../enterprise/dialog/createEnterpriseDialog'
  import createDrugsChineseDialog from '../drugs/dialog/createChineseDialog'

  import i18n from '../../i18n/local'

  export default {
    components: {
      createBasicsDialog,
      createChineseDialog,
      createWesternDialog,
      createCombinationDialog,
      createPublicDialog,
      createSymptomDialog,
      createEnterpriseDialog,
      createDrugsChineseDialog,
      deleteDialog,
      submitNextDialog,
      firstCompareDialog
    },
    data() {
      return {
        i18n: i18n.zh.i18nView,
        tableList: [],
        listLoading: true,
        isShowCreateVisible: false,
        isShowCreateChineseVisible: false,
        isShowCreateWesternVisible: false,
        isShowCreateCombineVisible: false,
        isShowCreatePublicVisible: false,
        isShowCreateSymptomVisible: false,
        isShowCreateEnterpriseVisible: false,
        isShowCreateDrugsChineseVisible: false,
        isShowSubmit: false,
        isShowCompare: false,
        deleteVisible: false,

        formData: {
          'taskStatus': '',
          'taskType': '',
          'taskMenuType': '',
          'taskTitle': '',
          'taskChangeVote': '',
          'taskChangePoints': '',
          'taskChangeComments': '',
          'taskId': '',
          'jsonStr': {}
        },
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

        curRowData: {},
        missDiseaseCurRowData: {},
        missChineseDiseaseCurRowData: {},
        missWesternCurRowData: {},
        missCombineDiseaseCurRowData: {},
        missInstitutionCurRowData: {},
        missSymptomCurRowData: {},
        missMedicalCompanyCurRowData: {},
        missMedicalCurRowData: {},
        curTaskType: ''
      }
    },
    created() {
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
        this.listLoading = false
        const params = {
          currentPage: 1,
          pageSize: 1000,
          taskStatus: 'toFirAudited'
          // chineseName=XXX&englishName=XXX&otherName=XXX
        }
        getMissionList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          console.log(pageList)
          this.total = response.data.total
          this.tableList = pageList
          this.listLoading = false
        })
      },
      doCreate() {
        this.isShowCreateVisible = true
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
        switch (row.taskMenuType) {
          case 'missDisease' :
            this.missDiseaseCurRowData = Object.assign({}, row)
            this.isShowCreateVisible = true
            break
          case 'missChineseDisease' :
            this.missChineseDiseaseCurRowData = Object.assign({}, row)
            this.isShowCreateChineseVisible = true
            break
          case 'missWestern' :
            this.missWesternCurRowData = Object.assign({}, row)
            this.isShowCreateWesternVisible = true
            break
          case 'missCombineDisease' :
            this.missCombineDiseaseCurRowData = Object.assign({}, row)
            this.isShowCreateCombineVisible = true
            break
          case 'missInstitution' :
            this.missInstitutionCurRowData = Object.assign({}, row)
            this.isShowCreatePublicVisible = true
            break
          case 'missSymptom' :
            this.missSymptomCurRowData = Object.assign({}, row)
            this.isShowCreateSymptomVisible = true
            break
          case 'missMedicalCompany' :
            this.missMedicalCompanyCurRowData = Object.assign({}, row)
            this.isShowCreateEnterpriseVisible = true
            break
          case 'missMedical' :
            this.missMedicalCurRowData = Object.assign({}, row)
            this.isShowCreateDrugsChineseVisible = true
            break
          default :
            break
        }
      },
      handleCompare(row) {
        // 调用查看版本的接口
        this.isShowCompare = true
        this.curRowData = row
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
