<template>
  <task-pool :cur-task-menu-type="curTaskMenuType"></task-pool>
</template>


<script>
  import taskPool from '../components/taskPool'
  export default {
    components: {
      taskPool
    },
    data() {
      return {
        curTaskMenuType: 'missWesternMedical'
      }
    },
    created() {
    },
    filters: {
    },
    methods: {
    },
    watch: {
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
