import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

import Layout from '../views/layout/Layout'
import CreateLayout from '../views/layout/createLayout'

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
      { path: 'drafts', name: '草稿箱', component: () => import('../views/task/drafts') },
      { path: 'unfinished', name: '未完成任务', component: () => import('../views/task/unfinished'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'toFirAudited', name: '待初审任务', component: () => import('../views/task/toFirAudited'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'toSecAudited', name: '待二审任务', component: () => import('../views/task/toSecAudited'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'toFinalAudited', name: '待终审发布任务', component: () => import('../views/task/toFinalAudited'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'finished', name: '已完成任务', component: () => import('../views/task/finished'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'discarded', name: '已废止任务', component: () => import('../views/task/discarded'), meta: { title: 'svgicons', roles: ['admin'] }},
      { path: 'toFirAudited/examine', name: '已废止任务', component: () => import('../views/task/dialog/examine'), meta: { title: 'svgicons', roles: ['admin'] }}
    ]
  },
  {
    path: '/disease',
    component: Layout,
    name: '疾病',
    children: [
      { path: 'chinese', name: '中医疾病', component: () => import('../views/disease/chinese') },
      { path: 'chinese-create', name: '中医疾病', component: () => import('../views/disease/chinese-create') },
      { path: 'western', name: '西医疾病', component: () => import('../views/disease/western') },
      { path: 'western-create', name: '西医疾病', component: () => import('../views/disease/western-create') }
    ]
  },
  {
    path: '/institution',
    component: Layout,
    name: '医疗机构',
    children: [
      { path: 'treatment', name: '医疗机构', component: () => import('../views/institution/treatment') },
      { path: 'treatment/pool/:taskProgress', name: '医疗机构', component: () => import('../views/institution/taskPool') },
      { path: 'create', name: '新建医疗机构', component: () => import('../views/institution/create') },
      { path: 'edit', name: '修改医疗机构', component: () => import('../views/institution/edit') },
      { path: 'examine', name: '审核医疗机构', component: () => import('../views/institution/examine') },
      { path: 'public', name: '公立医疗机构', component: () => import('../views/institution/public') },
      { path: 'chinese', name: '中医疾病', component: () => import('../views/disease/chinese') },
      { path: 'western', name: '西医疾病', component: () => import('../views/disease/western') },
      { path: 'chinese-western', name: '中西医疾病', component: () => import('../views/disease/chinese-western') }
    ]
  },
  {
    path: '/create',
    component: CreateLayout,
    name: '新建',
    children: [
      { path: 'treatment', name: '新建医疗机构', component: () => import('../views/institution/create') }
    ]
  },
  {
    path: '/modernDoctor',
    component: Layout,
    name: '医生信息',
    children: [
      { path: 'cooperation', name: '医生信息', component: () => import('../views/modernDoctor/cooperation') },
      { path: 'cooperation-create', name: '医生信息', component: () => import('../views/modernDoctor/cooperation-create') }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: '文章',
    children: [
      { path: 'list', name: '文章', component: () => import('../views/article/list') },
      { path: 'article-create', name: '文章', component: () => import('../views/article/article-create') }
    ]
  },
  {
    path: '/drugs',
    component: Layout,
    name: '药品',
    children: [
      { path: 'chinese', name: '中成药', component: () => import('../views/drugs/chinese') },
      { path: 'chinese-create', name: '中成药', component: () => import('../views/drugs/chinese-create') },
      { path: 'western', name: '西医制剂', component: () => import('../views/drugs/western') },
      { path: 'western-create', name: '西医制剂', component: () => import('../views/drugs/western-create') }
    ]
  },
  // {
  //   path: '/enterprise',
  //   component: Layout,
  //   name: '药品企业',
  //   children: [
  //     { path: 'list', name: '药品企业', component: () => import('../views/enterprise/list') }
  //   ]
  // },
  {
    path: '/symptom',
    component: Layout,
    name: '症状',
    children: [
      { path: 'chinese', name: '中医症状', component: () => import('../views/symptom/chinese') },
      { path: 'chinese-create', name: '中医症状', component: () => import('../views/symptom/chinese-create') },
      { path: 'western', name: '西医症状', component: () => import('../views/symptom/western') },
      { path: 'western-create', name: '西医症状', component: () => import('../views/symptom/western-create') }
    ]
  },
  {
    path: '/member',
    component: Layout,
    name: '配置管理',
    children: [
      { path: 'user', name: '用户管理', component: () => import('../views/member/user') },
      { path: 'role', name: '角色管理', component: () => import('../views/member/role') }
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
  { path: '*', redirect: '/404', hidden: true }
]
