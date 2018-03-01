<template>
  <transition name="slide-y-reverse-transition">
    <v-toolbar v-bind="{'flat': !raised}" transition="slide-y-reverse-transition" dark fixed clipped-left :class="{'pl-2 pl-sm-3 pl-md-5 toolbar': true, 'pr-2 pr-sm-3 pr-md-5': !drawerEnabled, 'py-3': expanded && $route.name === 'Home', 'toolbar--transparent': !$store.getters.userPage, 'toolbar--opaque': $store.getters.userPage}" app>

      <v-toolbar-side-icon v-if="$store.getters.userPage" @click="$emit('dashboard-drawer-toggled');">
        <!-- <i class="fa-bars fa-lg"></i> -->
        <!-- <v-btn round color="transparent" flat> -->
        <div class="d-flex flex-column justify-space-between p-2 child-flex-none" style="width: 32px; height: 33px;" @click="$emit('drawertoggled');">
          <div style="height: 1px; width: 100%; background-color: #fafafa"></div>
          <div style="height: 1px; width: 70%; background-color: #fafafa"></div>
          <div style="height: 1px; width: 85%; background-color: #fafafa"></div>
        </div>
        <!-- </v-btn> -->
      </v-toolbar-side-icon>

      <router-link to="/" exact><img src="/static/images/logo.png" alt="Supranex" style="height: 30px; width: auto"></router-link>

      <v-spacer></v-spacer>

      <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
      <v-toolbar-items class="hidden-xs-only">

        <!-- <v-btn flat v-if="$route.name === 'HomePage'" to="/#get-started" exact>
          <v-icon left>fa-cloud-download-alt</v-icon>Get Started</v-btn>
        <v-btn flat v-if="$route.name === 'HomePage'" to="/#how-it-works">
          <v-icon left>fa-question</v-icon>How It Works</v-btn>
        <v-btn flat v-if="$route.name === 'HomePage'" to="/#about">
          <v-icon left>fa-question-circle</v-icon>About</v-btn>
        <v-btn flat v-if="$route.name === 'HomePage'" to="/#referral-bonus">
          <v-icon left>fa-info</v-icon>Referral Bonus</v-btn>
        <v-btn flat v-if="$route.name === 'HomePage'" to="/#faq">
          <v-icon left>fa-th-list</v-icon>FAQ</v-btn> -->

        <transition name="flip-in-x" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <v-menu v-if="$store.getters.user" content-class="toolbar--transparent" flat offset-y open-on-hover transition="scale-transition" origin="center top">
            <v-btn depressed color="transparent" class="toobar--transparent text-lowercase" dark slot="activator">{{ $store.getters.user.email }}
              <v-icon small right>fa-angle-down</v-icon>
            </v-btn>
            <v-list dense dark class="transparent">
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

      </v-toolbar-items>

      <v-toolbar-side-icon @click="$emit('drawertoggled');">
        <!-- <i class="fa-bars fa-lg"></i> -->
        <!-- <v-btn round color="transparent" flat> -->
        <div class="d-flex flex-column align-center justify-space-between p-2 child-flex-none" style="width: 32px; height: 33px;" @click="$emit('drawertoggled');">
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
  data() {
    return {
      scrolled: false,
      raised: false,
      expanded: true,
      routesCategories: []
    };
  },
  props: {
    drawerEnabled: {
      type: Boolean
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 100 && this.scrolled === false) {
        this.raised = true;
        this.expanded = false;
        this.scrolled = true;
      } else if (window.scrollY < 100 && this.scrolled === true) {
        this.raised = false;
        this.expanded = true;
        this.scrolled = false;
      }
    },
    toggleDrawer() {
      this.$emit('drawertoggled');
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.scrolling-navbar {
  transition: padding 0.5s;
}

.expand {
  padding-bottom: 6px;
  padding-top: 6px;
}
</style>
