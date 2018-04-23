// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import { sync } from 'vuex-router-sync';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import VueMoment from 'vue-moment-lib';
import VueClipboard from 'vue-clipboard2';
import { auth } from './firebaseInit';

import 'vuetify/dist/vuetify.min.css';
import 'animate.css/animate.css';
import './assets/scss/app.scss';

// eslint-disable-next-line no-unused-vars
const unsync = sync(store, router);

Vue.use(Vuetify, {
  theme: {
    primary: '#2770b4',
    secondary: '#424242',
    accent: '#f7931a',
    error: '#dc3545',
    info: '#2196F3',
    success: '#28a745',
    warning: '#FFC107'
  }
});

Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('signin', {
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
          providerData: user.providerData
        });
      } /* else {
        this.$store.dispatch('signout');
      } */
    });
  },
  components: {
    App
  },
  render(h) {
    return h(App);
  }
});
