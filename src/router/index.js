import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/task',
    component: Layout,
    name: '我的任务',
    // meta: { roles: ['admin'] },
    children: [
      {path: 'drafts',name: '草稿箱',component: () => import('../views/task/drafts')},
      {path: 'unfinished',name: '未完成任务',component: () => import('../views/task/unfinished'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toFirAudited',name: '待初审任务',component: () => import('../views/task/toFirAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toSecAudited',name: '待二审任务',component: () => import('../views/task/toSecAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toFinalAudited',name: '待终审发布任务',component: () => import('../views/task/toFinalAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'finished',name: '已完成任务',component: () => import('../views/task/finished'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'discarded',name: '已废止任务',component: () => import('../views/task/discarded'),meta: { title: 'svgicons', roles: ['admin'] }},
    ]
  },
  {
    path: '/disease',
    component: Layout,
    name: '疾病',
    children: [
      {path: 'basics',name: '基础疾病',component: () => import('../views/disease/basics')},
      {path: 'chinese',name: '中医疾病',component: () => import('../views/disease/chinese')},
      {path: 'western',name: '西医疾病',component: () => import('../views/disease/western')},
      {path: 'chinese-western',name: '中西医疾病',component: () => import('../views/disease/chinese-western')}
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Table', icon: 'table' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'complexTable' }
      },
      {
        path: 'fullcalendar',
        name: 'Fullcalendar',
        component: () => import('@/views/fullcalendar/fullcalendar'),
        meta: { title: 'calendar' }
      }
    ]
  },
  {
    path: '/tab',
    name: 'tab',
    component: Layout,
    meta: { icon: 'example' },
    children: [
      {
        path: 'Tabs',
        name: 'Tabs',
        component: () => import('@/views/tab/index'),
        meta: { title: 'Tabs', icon: 'tab' }
      }
    ]
  },
  // 表单
  {
    path: '/form',
    component: Layout,
    redirect: '/table/BaseForm',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      {
        path: 'Form',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'BaseForm' }
      },
      {
        path: 'qiniu',
        name: 'qiniu',
        component: () => import('@/views/form/qiniu'),
        meta: { title: 'qiniu' }
      },
      {
        path: 'quillEditor',
        name: 'quillEditor',
        component: () => import('@/views/form/quillEditor'),
        meta: { title: 'quillEditor' }
      },
      {
        path: 'tinymce',
        name: 'tinymce',
        component: () => import('@/views/form/tinymce'),
        meta: { title: 'tinymce' }
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/task',
    component: Layout,
    name: '我的任务',
    children: [
      {path: 'drafts',name: '草稿箱',component: () => import('../views/task/drafts')},
      {path: 'unfinished',name: '未完成任务',component: () => import('../views/task/unfinished'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toFirAudited',name: '待初审任务',component: () => import('../views/task/toFirAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toSecAudited',name: '待二审任务',component: () => import('../views/task/toSecAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'toFinalAudited',name: '待终审发布任务',component: () => import('../views/task/toFinalAudited'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'finished',name: '已完成任务',component: () => import('../views/task/finished'),meta: { title: 'svgicons', roles: ['admin'] }},
      {path: 'discarded',name: '已废止任务',component: () => import('../views/task/discarded'),meta: { title: 'svgicons', roles: ['admin'] }},
    ]
  },

  // {path: '/institution',
  //   name: '医疗机构',
  //   component: Layout,
  //   meta: { roles: ['admin'] },
  //   children: [ {path: 'public',name: '公立医疗机构',component:() => import('institution/public'), hidden:false, },
  //     {path: 'private',name: '非公立医疗机构',component: () => import('institution/private'), hidden:false, },
  //     {path: 'special',name: '非公特型机构',component: () => import('institution/special'), hidden:false, },
  //     {path: 'medical',name: '非公医美机构',component: () => import('institution/medical'), hidden:false, },
  //     {path: 'information',name: '医院科室信息参数维护',component: () => import('institution/medical'), hidden:false, }
  //   ]
  // },
  // {path: '/modernDoctor',name: '现代医生',
  //   component: Layout,
  //   children: [ {path: 'cooperation',name: '医生信息',component: () => import('modernDoctor/information'), hidden:false, }
  //    ]
  // },
  // {path: '/disease',name: '疾病'component: Layout,
  //   children: [
  //     {path: 'western',name: '基础疾病',component: () => import('disease/basics'), hidden:false, },
  //     {path: 'chinese',name: '中医疾病',component: () => import('disease/chinese'), hidden:false, },
  //     {path: 'western',name: '西医疾病',component: () => import('disease/western'), hidden:false, },
  //     {path: 'chinese',name: '中西医疾病',component: () => import('disease/chinese-western'), hidden:false, }
  //   ]
  // },
  // {path: '/drugs',name: '药品',component: Layout,
  //   children: [ {path: 'chinese',name: '中成药',component: () => import('drugs/chinese'), hidden:false, },
  //     {path: 'western',name: '西药',component: () => import('drugs/western'), hidden:false, }
  //   ]
  // },
  // {path: '/symptom',name: '症状',component: Layout,
  //   children: [ {path: 'chinese',name: '症状参数',component: () => import('symptom/chinese'), hidden:false, },
  //     {path: 'western',name: '发病部位参数',component: () => import('symptom/western'), hidden:false, }
  //   ]
  // },
  // {path: '/enterprise',name: '医药企业',component: Layout,
  //   children: [ {path: 'chinese',name: '药品企业信息',component: () => import('enterprise/information'), hidden:false, }
  //   ]
  // },
  // {path: '/area',name: '地区参数',component: Layout,
  //   children: [ {path: 'chinese',name: '药品企业信息',component: () => import('area/information'), hidden:false, }
  //   ]
  // },
  // {path: '/trash',name: '回收站',component: Layout,
  //   children: [ {path: 'prescription',name: '回首数据查询',component: () => import('trash/prescription'), hidden:false, },
  //     {path: 'verification',name: '数据删除任务记录查询',component: () => import('trash/verification'), hidden:false, },
  //     {path: 'verification',name: '数据恢复任务',component: () => import('trash/verification'), hidden:false, }
  //   ]
  // },
  // {path: '/trash1',name: '配置管理',component: Layout,
  //   children: [ {path: 'prescription',name: '回首数据查询',component: () => import('trash/prescription'), hidden:false, },
  //     {path: 'verification',name: '数据删除任务记录查询',component: () => import('trash/verification'), hidden:false, },
  //     {path: 'verification',name: '数据恢复任务',component: () => import('trash/verification'), hidden:false, }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   name: 'icons',
  //   meta: { roles: ['admin'] },
  //   children: [
  //     {
  //       path: 'iconIndex',
  //       name: 'iconIndex',
  //       component: () => import('@/views/svg-icon/index'),
  //       meta: { title: 'svgicons', icon: 'icon', roles: ['admin'] }
  //     }
  //   ]
  // },
  // // 树形组件
  // {
  //   path: '/treeMen',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   meta: {
  //     title: 'treeMen',
  //     icon: 'TreeMean'
  //   },
  //   children: [
  //     {
  //       path: 'treeMen',
  //       name: 'treeMen-demo',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'treeMen', icon: 'TreeMean' }
  //     }
  //   ]
  // },
  // // 组件
  // {
  //   path: '/components',
  //   component: Layout,
  //   redirect: '/components/dragKanban',
  //   name: 'Components',
  //   meta: {
  //     title: 'Components',
  //     icon: 'component'
  //   },
  //   children: [
  //     {
  //       path: 'componentsmixin',
  //       name: 'mixin',
  //       component: () => import('@/views/components/backToTop'),
  //       meta: { title: 'backToTop' }
  //     },
  //     {
  //       path: 'mixin',
  //       name: 'componentMixin',
  //       component: () => import('@/views/components/mixin'),
  //       meta: { title: 'componentMixin' }
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/exportExcel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'exportExcel',
  //       name: 'exportExcel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       meta: { title: 'exportExcel', icon: 'excel' }
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n-demo',
  //   component: Layout,
  //   redirect: 'i18n-demo',
  //   children: [
  //     {
  //       path: 'indexLang',
  //       name: 'indexLang',
  //       component: () => import('@/views/i18n-demo/indexLang'),
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
