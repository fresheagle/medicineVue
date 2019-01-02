<template>
  <div>
    <headerbar></headerbar>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
        <div>
          <app-main></app-main>
        </div>
    </div>
  </div>

</template>

<script>
import { Navbar, Sidebar, AppMain } from '../../views/layout/components'
import headerbar from '../../views/layout/components/Header'
import Footer from '../../views/layout/components/Footer'
export default {
  name: 'createLayout',
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
