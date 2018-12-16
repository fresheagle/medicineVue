<template>
  <div class="app-container">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="姓名" v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doFilter()"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doCreate()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="tableList" v-loading="listLoading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column prop="jsonStr.missMedical.comName" label="名称">
        <template slot-scope="scope">
          {{scope.row.jsonStr.missMedical.comName}}
        </template>
      </el-table-column>
      <el-table-column prop="jsonStr.missMedical.alisaName" label="别名">
        <template slot-scope="scope">
          {{scope.row.jsonStr.missMedical.alisaName}}
        </template>
      </el-table-column>

      <el-table-column prop="operation" label="操作 ">
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

    <create-chinese-dialog :visible.sync="isShowCreateVisible" :row-data="curRowData"
                           :cur-task-type="curTaskType" @refreshList="fetchData"></create-chinese-dialog>
    <delete-dialog :visible.sync="deleteVisible" :row-data="curRowData" :cur-task-type="curTaskType"
                   @refreshList="fetchData"></delete-dialog>

  </div>
</template>


<script>
  import {getEdicilList, doCreateDisBasics} from '../../api/task'
  import enumerate from '../../store/modules/enumerate'

  import createChineseDialog from './dialog/createChineseDialog'
  import deleteDialog from '../dialog/deleteDialog'


  import i18n from '../../i18n/local'

  const viewName = 'i18nView'
  export default {
    components: {
      createChineseDialog,
      deleteDialog,
    },
    data() {
      return {
        enumerate: enumerate,
        i18n: i18n.zh.i18nView,
        tableList: [],
        listLoading: true,
        isShowCreateVisible: false,
        isShowEditVisible: false,
        isShowCompare: false,
        isShowSubmit: false,
        deleteVisible: false,
        isShowComResoultDialog: false,
        formData: {
          "taskStatus": "",
          "taskType": "",
          "taskMenuType": "missMedical",
          "taskTitle": "",
          "taskChangeVote": "",
          "taskChangePoints": "",
          "taskChangeComments": "",
          "taskId": "",
          "jsonStr": {
            "medicalCompanyList": {
              "medicalCompanyId": "",
              "companyChineseName": "",
              "companyEnglishName": "",
            },
            "missMedical": {
              "id": "",
              "medicalType": "",
              "comName": "",
              "chinesePinyin": "",
              "alisaName": "",
              "shopName": "",
              "englishName": "",
              "drugType": "",
              "ytime": "",
              "enterprise": "",
              "approvalNum": "",
              "healthType": "",
              "storageMethod": "",
              "drugIdentifying": "",
              "address": "",
              "recipeType": "",
              "price": "",
              "picturePath": "",
              "datastatus": "",
              "taskId": "",
              "taskStatus": "",
              "constitute": "",
              "property": "",
              "func": "",
              "mainAttend": "",
              "standard": "",
              "pharmacology": "",
              "toxicologicalEffects": "",
              "clinicalApplication": "",
              "adverseReactions": "",
              "taboo": "",
              "notice": "",
              "identify": "",
              "pharmacyCheck": "",
              "contentPic": "",
              "medicFormat": "",
              "notes": "",
              "component": "",
              "mainMeffect": "",
              "analyze": "",
              "interactions": "",
              "history": "",
              "drugIntroduce": "",
              "awards": "",
              "research": "",
              "monograph": "",
              "messageFrom": "",
              "productInfo": "",
              "indication": "",
              "dosage": "",
              "introduction": "",
              "taskJson": "",
            }
          }
        },
        versionData: [{taskId: 1, taskTitle: "测试1", taskVersion: "1.0", taskMenuType: "基础疾病"},
          {taskId: 2, taskTitle: "测试2", taskVersion: "2.0", taskMenuType: "基础疾病"}, {
            taskId: 3,
            taskTitle: "测试3",
            taskVersion: "3.0",
            taskMenuType: "基础疾病"
          }],
        leftVersionData: {taskId: 1, taskTitle: "测试1", taskVersion: "1.0", taskMenuType: "基础疾病"},
        leftVersionKeyArr: [],
        rightVersionData: {taskId: 1, taskTitle: "测试1", taskVersion: "2.0", taskMenuType: "基础疾病"},
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
        curRowData: {},
        curTaskType: "",//作为参数，区分是创建还是更新操作
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
        const params = {
          currentPage: 1,
          pageSize: 1000,
          // chineseName:"",
          // englishNam:"",
          // otherName:"",
        }
        //this.listQuery
        getEdicilList(params).then(response => {
          const limit = 10
          const pageList = response.data.params.filter((item, index) => index < limit * this.page && index >= limit * (this.page - 1))
          this.total = response.data.total
          this.tableList = pageList
          this.listLoading = false
        })
      }
      ,
      doCreate() {
        this.curTaskType = "create";
        this.curRowData = Object.assign({}, this.formData);
        this.isShowCreateVisible = true;
        const params = {
          currentPage: 1,
          pageSize: 1000,
        }
        this.$store.dispatch('getDepartment', params).then(() => {
        }).catch(() => {
        })
      }
      ,
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
      }
      ,
      handleUpdate(row) {
        this.curTaskType = "update";
        this.curRowData = Object.assign({}, row);
        this.isShowCreateVisible = true;
      }
      ,
      deleteUpdate(row) {
        this.deleteVisible = true;
        this.curTaskType = 'delete';
        this.curRowData = Object.assign({}, row);
      }
      ,
      handleSubmit(row) {
        this.isShowSubmit = true;
        this.curRowData = Object.assign({}, row)
      }
      ,
      handleCompare(row) {
        //调用查看版本的接口
        this.isShowCompare = true;
        doCreateDisBasics(row.taskId).then(response => {
          this.isShowCompare = false;
          this.curRowData = response.data;
        })
      }
      ,
      handleSizeChange(val) {
        this.page = val
        this.fetchData()
      }
      ,
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      }
      ,
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
        }
        ,
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
