<template>
  <div>
    <headerbar></headerbar>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <navbar></navbar>
          <app-main></app-main>
        </div>
    </div>
    <footer></footer>

  </div>

</template>


<script>
import { Headerbar, Navbar, Sidebar, AppMain } from '../../views/layout/components'
import headerbar from '../../views/layout/components/Header'
import Footer from '../../views/layout/components/Footer'
export default {
  name: 'layout',
  components: {
    headerbar,
    Navbar,
    Sidebar,
    AppMain,
    Footer
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
