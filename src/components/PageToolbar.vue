<template>
  <transition name="slide-y-reverse-transition">
    <v-toolbar v-bind="{'flat': !raised}" transition="slide-y-reverse-transition" dark fixed clipped-left :class="{'pl-2 pl-sm-3 pl-md-5 toolbar': true, 'pr-2 pr-sm-3 pr-md-5': !drawerEnabled, 'py-3 bg-image-none': expanded && $route.name === 'Home', 'toolbar--transparent': !$store.getters.userPage, 'toolbar--opaque': $store.getters.userPage}" app>

      <!-- <transition name="shake" enter-active-class="animated shake" leave-active-class="animated shake">
        <v-toolbar-side-icon v-if="$store.getters.userPage" @click="$emit('dashboard-drawer-toggled');">
          <div class="d-flex flex-column justify-space-between p-2 child-flex-none" style="width: 32px; height: 33px;" @click="$emit('drawertoggled');">
            <div style="height: 1px; width: 100%; background-color: #fafafa"></div>
            <div style="height: 1px; width: 70%; background-color: #fafafa"></div>
            <div style="height: 1px; width: 85%; background-color: #fafafa"></div>
          </div>
        </v-toolbar-side-icon>
      </transition> -->

      <a href="/"><img src="/static/images/logo.png" alt="Supranex" style="height: 30px; width: auto"></a>

      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn dark href="/" flat class="text-capitalize">Home</v-btn>
        <v-btn v-if="!$store.getters.user" dark to="/signin" flat class="text-capitalize" active-class="default-class accent--text">Login</v-btn>
        <v-btn v-if="!$store.getters.user" dark to="/signup" flat class="text-capitalize" active-class="default-class accent--text">Create Account</v-btn>
        <v-btn v-if="$store.getters.user" dark to="/dashboard" flat class="text-capitalize" active-class="default-class accent--text">Dashboard</v-btn>
        <v-btn v-if="$store.getters.user" dark to="/make-deposit" flat class="text-capitalize" active-class="default-class accent--text">Make a Deposit</v-btn>
        <v-btn v-if="$store.getters.user" dark to="/deposits" flat class="text-capitalize" active-class="default-class accent--text">Deposits</v-btn>
      </v-toolbar-items>

      <transition name="flip-in-x" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
        <v-menu v-if="$store.getters.user" content-class="toolbar--transparent" flat offset-y open-on-hover transition="scale-transition" origin="center top">
          <v-btn depressed color="transparent" class="toobar--transparent text-lowercase" dark slot="activator" icon>
            <v-icon small>fa-angle-down</v-icon>
          </v-btn>
          <v-list dense dark class="transparent">
            <v-list-tile>
              <v-list-tile-title v-text="$store.getters.user.email"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="" to="/dashboard" active-class="default-class accent--text">
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile>
            <v-divider dark></v-divider>
            <v-list-tile @click="$store.dispatch('signout')">
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </transition>

      <v-toolbar-side-icon @click="$emit('dashboard-drawer-toggled');" v-if="$vuetify.breakpoint.smAndDown">
        <!-- <i class="fa-bars fa-lg"></i> -->
        <!-- <v-btn round color="transparent" flat> -->
        <div class="d-flex flex-column align-center justify-space-between p-2 child-flex-none" style="width: 32px; height: 33px;">
          <div style="height: 1px; width: 100%; background-color: #fafafa"></div>
          <div style="height: 1px; width: 70%; background-color: #fafafa"></div>
          <div style="height: 1px; width: 100%; background-color: #fafafa"></div>
        </div>
        <!-- </v-btn> -->
      </v-toolbar-side-icon>
    </v-toolbar>
  </transition>

</template>

<script>
export default {
  data () {
    return {
      scrolled: false,
      raised: false,
      expanded: true,
      routesCategories: []
    }
  },
  props: {
    drawerEnabled: {
      type: Boolean
    }
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 100 && this.scrolled === false) {
        this.raised = true
        this.expanded = false
        this.scrolled = true
      } else if (window.scrollY < 100 && this.scrolled === true) {
        this.raised = false
        this.expanded = true
        this.scrolled = false
      }
    },
    toggleDrawer () {
      this.$emit('drawertoggled')
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.scrolling-navbar {
  transition: padding 0.5s;
}

.bg-image-none {
  background-image: none !important;
}
</style>
