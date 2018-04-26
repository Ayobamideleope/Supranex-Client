<template>
  <v-app light class="white">

    <!-- Dashboard Drawer -->
    <!-- <v-navigation-drawer v-if="$store.getters.userPage" clipped fixed left class="drawer navigation-drawer--opaque" app v-model="dashboardDrawerEnabled" dark>

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile to="/dashboard" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile to="/make-deposit" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="text--lighten-2">fa-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Make a Deposit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile to="/deposits" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="text--lighten-2">fa-gem</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Deposits</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile @click="$store.dispatch('signout')" exact>
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text text--lighten-2">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <!-- End Dashboard Drawer -->

    <page-toolbar :drawer-enabled="false" @drawertoggled="drawerEnabled = !drawerEnabled" @dashboard-drawer-toggled="dashboardDrawerEnabled = !dashboardDrawerEnabled" />

    <v-content class="mb-5">
      <v-fab-transition>
        <v-btn @click="scrollToTop" v-show="showScrollToTop" fab v-bind="{ 'small': $vuetify.breakpoint.smAndDown }" raised dark :class="['elevation-20', (showScrollToTop) ? 'position-fixed' : '']" color="primary" style="position: fixed; bottom: 70px; right: 15px; opacity: 0.9; z-index: 4;">
          <v-icon>fa-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>

      <transition :name="routerViewTransitionName">
        <router-view></router-view>
      </transition>

      <v-snackbar bottom multi-line v-model="showSnackbar" :timeout="snackbar.timeout" :color="snackbar.color">
        <span :class="[snackbar.textColor, 'body-2']">{{ snackbar.text }}</span>
        <v-btn :class="[snackbar.btnTextColor]" dark flat @click.native="$store.dispatch('toggleSnackbar', false)">Close</v-btn>
      </v-snackbar>
    </v-content>

    <v-footer justify-center class="app-footer grey--text text--lighten-1 py-3 py-md-4" height="auto" app absolute>
      <v-container>
        <!-- <v-layout justify-space-between wrap>
          <v-flex xs5 sm3 order-xs1 order-sm1>
            <a href="#" class="px-1">
              <img class="img-contain" src="/static/images/image-icons/facebook.png" alt="facebook logo" style="height: 30px; max-width: 25%; width: auto;">
            </a>
            <a href="#" class="px-1">
              <img class="img-contain" src="/static/images/image-icons/twitter.png" alt="facebook logo" style="height: 30px; max-width: 25%; width: auto;">
            </a>
            <a href="#" class="px-1">
              <img class="img-contain" src="/static/images/image-icons/instagram.png" alt="facebook logo" style="height: 30px; max-width: 25%; width: auto;">
            </a>
          </v-flex>
          <v-flex tag="p" xs12 sm5 style="align-self: flex-end" order-xs3 order-sm2 class="text-xs-center">
            © Supranex 2017 - {{ new Date().getFullYear() }}
          </v-flex>
          <v-flex xs5 sm3 d-flex order-xs2 order-sm3 class="flex-column align-end">
            <img class="img-contain" src="/static/images/image-icons/mcafee.png" alt="mcafee logo" style="height: auto; max-height: 40px; max-width: 90%; width: auto;">
            <img class="img-contain" src="/static/images/image-icons/comodo.png" alt="comodo logo" style="height: auto; max-height: 35px; max-width: 80%; width: auto;">
          </v-flex>
        </v-layout> -->
        <v-layout wrap align-baseline>
          <v-flex xs12 sm3 class="black--text pt-2">Copyright © Supranex 2017 - {{ new Date().getFullYear() }}</v-flex>
          <v-flex xs12 sm8 offset-sm1>
            <v-layout align-baseline justify-end :class="{'child-flex-none': $vuetify.breakpoint.smAndUp, }" wrap>
              <v-flex>
                <a href="https://www.supranex.com/privacy-policy.html" class="footer__other-link black--text">Privacy Policy</a>
              </v-flex>
              <v-flex tag="span" class="p-3 black--text">|</v-flex>
              <v-flex>
                <a href="https://www.supranex.com/terms-and-conditions.html" class="footer__other-link black--text">Terms and Conditions</a>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 class="text-xs-center mt-3">
            <a href="#" class="px-3 py-2"><img src="/static/images/image-icons/facebook.png" class="footer__social-icon-img"></a>
            <a href="#" class="px-3 py-2"><img src="/static/images/image-icons/twitter.png" class="footer__social-icon-img"></a>
            <a href="#" class="px-3 py-2"><img src="/static/images/image-icons/instagram.png" class="footer__social-icon-img"></a>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>

    <!-- App Drawer -->
    <!-- <v-navigation-drawer fixed right class="drawer" app v-model="drawerEnabled" disable-resize-watcher dark>
      <v-toolbar flat class="bg-transparent-dark-2">
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title grey--text text--darken-2 font-all-caps">
              Supranex
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile href="/" exact active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark" v-if="!$store.getters.user">
        <v-list-tile to="/signin" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark" v-if="!$store.getters.user">
        <v-list-tile to="/signup" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Create an Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile to="/dashboard" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-gem</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Savings / Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile href="/how-it-works.html" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-list-ul</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">How It Works</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile href="/referral-system.html" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-users</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">5% Referral Bonus</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile href="/faq.html" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">FAQ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 bg-transparent-dark">
        <v-list-tile href="/about_supranex.html" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-exclamation</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <!-- End App Drawer -->
    <v-navigation-drawer clipped fixed right class="drawer navigation-drawer--opaque" app v-model="dashboardDrawerEnabled" dark :disable-resize-watcher="true">

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile href="/" exact active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark" v-if="!$store.getters.user">
        <v-list-tile to="/signin" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark" v-if="!$store.getters.user">
        <v-list-tile to="/signup" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="">Create an Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark">
        <v-list-tile to="/dashboard" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark" v-if="$store.getters.user">
        <v-list-tile to="/make-deposit" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="text--lighten-2">fa-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Make a Deposit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark" v-if="$store.getters.user">
        <v-list-tile to="/deposits" active-class="default-class accent--text" class="grey--text text--lighten-2">
          <v-list-tile-action>
            <v-icon class="text--lighten-2">fa-gem</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-normal">Deposits</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0 bg-transparent-dark" v-if="$store.getters.user">
        <v-list-tile @click="$store.dispatch('signout')" exact>
          <v-list-tile-action>
            <v-icon class="grey--text text--lighten-2">fa-key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text text--lighten-2">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { auth } from './firebaseInit';

import PageToolbar from './components/PageToolbar.vue';

export default {
  name: 'App',
  data() {
    return {
      drawerEnabled: false,
      routerViewTransitionName: 'scale-transition',
      scrolled: false,
      showScrollToTop: false,
      dashboardDrawerEnabled: false
    };
  },

  created() {},

  computed: {
    showSnackbar: {
      get() {
        return this.$store.getters.showSnackbar;
      },
      set(newValue) {
        this.$store.dispatch('toggleSnackbar', newValue);
      }
    },
    snackbar() {
      return this.$store.getters.snackbar;
    }
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.routerViewTransitionName =
        toDepth < fromDepth
          ? 'slide-y-reverse-transition'
          : 'slide-y-transition';
    }
  },

  methods: {
    handleScroll() {
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        this.showScrollToTop = true;
      } else {
        this.showScrollToTop = false;
      }
    },

    scrollToTop() {
      const scrollDuration = 600;
      let cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
      function step(newTimestamp) {
        scrollCount +=
          Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(
          0,
          Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
        );
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  },

  components: {
    PageToolbar
  }
};
</script>

<style>
.footer__other-link {
  text-decoration: transparent;
  transition: all 0.6s;
}
.footer__other-link:hover {
  text-decoration: underline;
}

.footer__social-icon-img {
  height: 32px;
  width: 32px;
}

a > .footer__social-icon-img:hover {
  filter: grayscale(100%);
}
</style>
