webpackJsonp([35],{Gyt3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),s=a.n(i),n=a("woOf"),l=a.n(n),o=a("Q3je"),r={data:function(){return{tableList:[],listLoading:!0,isShowEditVisible:!1,isShowCreateVisible:!1,deleteVisible:!1,temp:{uid:"",cname:"",date:"",status:""},formData:{taskStatus:"creating",taskType:"",taskMenuType:"",taskTitle:"",taskChangeVote:"",taskChangePoints:"",taskChangeComments:""},total:0,page:1,pageSize:10,status:[{statusId:1,label:"启用"},{statusId:0,label:"禁用"}],value:"",searchName:"",filterTableDataEnd:[]}},created:function(){this.fetchData()},filters:{statusFilter:function(t){return{1:"success",2:"danger"}[t]}},methods:{fetchData:function(){this.listLoading=!0,this.tableList=[{taskId:1,taskTitle:"liming"}],this.listLoading=!1},doFilter:function(){var t=this;""!==this.searchName?(console.log(this.searchName),this.filterTableDataEnd=[],this.tableList.forEach(function(e,a){e.cname&&e.cname.indexOf(t.searchName)>=0&&(t.filterTableDataEnd.push(e),console.log(t.filterTableDataEnd))}),this.page=1,this.total=this.filterTableDataEnd.length,this.currentChangePage(this.filterTableDataEnd)):this.fetchData()},clickfun:function(t){console.log(t.target.innerText)},handleUpdate:function(t){this.isShowEditVisible=!0,this.temp=l()({},t),console.log(t)},doCreate:function(){this.isShowCreateVisible=!0},deleteUpdate:function(t){console.log(t),this.deleteVisible=!0,this.temp=l()({},t)},submitDelete:function(){var t=l()({},this.temp);console.log(t),console.log(this.tableList);var e=!0,a=!1,i=void 0;try{for(var n,o=s()(this.tableList);!(e=(n=o.next()).done);e=!0){var r=n.value;if(r.uid===this.temp.uid){var c=this.tableList.indexOf(r);this.tableList.splice(c,1),this.fetchData(),console.log(this.tableList);break}}}catch(t){a=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(a)throw i}}this.deleteVisible=!1,this.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),console.log(t),t.status=e},updateData:function(){var t=this,e=l()({},this.temp);console.log(e),Object(o.d)(e).then(function(){var e=!0,a=!1,i=void 0;try{for(var n,l=s()(t.tableList);!(e=(n=l.next()).done);e=!0){var o=n.value;if(o.uid===t.temp.uid){var r=t.tableList.indexOf(o);t.tableList.splice(r,1,t.temp);break}}}catch(t){a=!0,i=t}finally{try{!e&&l.return&&l.return()}finally{if(a)throw i}}t.isShowEditVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})},handleSizeChange:function(t){this.page=t,console.log(this.page),this.fetchData()},handleCurrentChange:function(t){this.page=t,console.log(this.page),this.fetchData()},currentChangePage:function(t){var e=(this.page-1)*this.pageSize,a=this.page*this.pageSize;for(this.tableList=[];e<a;e++)t[e]&&this.tableList.push(t[e])}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableList,border:"","element-loading-text":"拼命加载中"}},[a("el-table-column",{attrs:{prop:"taskTitle",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskMenuType",label:"类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskStatus",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskChangeVote",label:"通过情况"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskChangePoints",label:"评分"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taskChangeComments",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{prop:"operation",label:"操作 ",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),"2"!=e.row.status?a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(a){t.handleModifyStatus(e.row,"2")}}},[t._v("启用\n        ")]):t._e(),t._v(" "),"1"!=e.row.status?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleModifyStatus(e.row,"1")}}},[t._v("禁用\n        ")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){t.deleteUpdate(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{layout:"total, prev, pager, next",background:"","page-size":10,total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},staticRenderFns:[]},h=a("VU/8")(r,c,!1,null,null,null);e.default=h.exports}});