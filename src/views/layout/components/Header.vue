<template>
  <el-menu class="headerbar" mode="horizontal">
    <div class="logo" >
      <el-dropdown class="avatar-container" trigger="click" style="margin-top: -10px;">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="logo">
          <span style="vertical-align: text-bottom;color: #fff; padding-left: 5px;">{{curUserCode}}</span>
          <!--<i class="el-icon-caret-bottom"></i>-->
        </div>

        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import logo from '@/assets/images/logo.jpg'
import { mapGetters } from 'vuex'
import nxTopLock from '@/components/nx-top-lock'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    nxTopLock
  },
  created() {
    this.curUserCode = Cookies.get('userCode')
  },
  data() {
    return {
      logo,
      curUserCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.headerbar {
  height: 55px;
  line-height: 55px;
  background-color: #304156;
  border-radius: 0px !important;
  .logo{
      display: inline-block;
      float: left;
      width: 55px;
      height: 55px;
      padding: .5rem 1rem;
      margin-right: 0;
      background: url(../../../assets/images/top_frame.png);
      background-size: 50px auto;;
      background-repeat: no-repeat;
      background-position: left center;
      border-bottom: 1px solid #cfd8dc;
  }
  .right-menu {
    float: right;
    height: 100%;
      .nx-help {
        display: inline-block;
        vertical-align: top;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50em;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
