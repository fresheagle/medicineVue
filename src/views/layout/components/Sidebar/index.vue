
<template>
    <el-menu
    mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in curMenus" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'menus',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      curMenus: []
    }
  },
  created() {
    // this.curMenus=JSON.parse(localStorage.getItem('curMenus'));
    this.curMenus = [
      { path: '/', name: '首页',
        children: [{ path: 'dashboard', name: '首页' }
        ]
      },
      {
        path: '/task',
        name: '我的任务',
        children: [
          { path: 'drafts', name: '草稿箱' },
          { path: 'unfinished', name: '未完成任务' },
          { path: 'toFirAudited', name: '待初审任务' },
          { path: 'toSecAudited', name: '待二审任务' },
          { path: 'toFinalAudited', name: '待终审发布任务' },
          { path: 'finished', name: '已完成任务' },
          { path: 'discarded', name: '已废止任务' }
        ]
      },
      {	path: '/institution', name: '医疗机构',
        children: [{ path: 'public', name: '公立医疗机构' },
          { path: 'private', name: '非公立医疗机构' },
          { path: 'special', name: '非公特型机构' },
          { path: 'medical', name: '非公医美机构' },
          { path: 'information', name: '医院科室信息参数维护' }
        ]
      },
      { path: '/modernDoctor', name: '现代医生',
        children: [{ path: 'cooperation', name: '医生信息' }
        ]
      },
      { path: '/disease', name: '疾病',
        children: [
          { path: 'basics', name: '基础疾病' },
          { path: 'chinese', name: '中医疾病' },
          { path: 'western', name: '西医疾病' },
          { path: 'chinese-western', name: '中西医疾病' }
        ]
      },
      { path: '/drugs', name: '药品',
        children: [{ path: 'chinese', name: '中成药' },
          { path: 'western', name: '西药' }
        ]
      },
      { path: '/symptom', name: '症状',
        children: [{ path: 'list', name: '症状参数' },
          { path: 'western', name: '发病部位参数' }
        ]
      },
      { path: '/enterprise', name: '医药企业',
        children: [{ path: 'list', name: '药品企业信息' }
        ]
      },
      { path: '/trash', name: '回收站',
        children: [{ path: 'prescription', name: '回首数据查询' },
          { path: 'verification', name: '数据删除任务记录查询' },
          { path: 'verification', name: '数据恢复任务' }
        ]
      },
      { path: '/trash1', name: '配置管理',
        children: [{ path: 'prescription', name: '回首数据查询' },
          { path: 'verification', name: '数据删除任务记录查询' },
          { path: 'verification', name: '数据恢复任务' }
        ]
      }
    ]
  }
}
</script>
