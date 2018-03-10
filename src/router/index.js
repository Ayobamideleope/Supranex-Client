import Vue from 'vue';
import Router from 'vue-router';

import { store } from '../store';
import HomePage from '@/pages/HomePage';
import Signup from '@/pages/Signup';
import Signin from '@/pages/Signin';
import ChangePassword from '@/pages/ChangePassword';
import ForgotPassword from '@/pages/ForgotPassword';
import Dashboard from '@/pages/Dashboard';
import MakeDeposit from '@/pages/MakeDeposit';
import ViewDeposit from '@/pages/ViewDeposit';
import Deposits from '@/pages/Deposits';
import MakeWithdrawal from '@/pages/MakeWithdrawal';
import AboutPage from '@/pages/AboutPage';
import ReferralBonusPage from '@/pages/ReferralBonusPage';
import FAQPage from '@/pages/FAQPage';
import HowItWorks from '@/pages/HowItWorks';

// @ts-check

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/make-deposit',
      name: 'MakeDeposit',
      component: MakeDeposit,
      meta: {
        requiresAuth: true,
        requiresUserVerified: true
      }
    },
    {
      path: '/view-deposit/:id',
      name: 'ViewDeposit',
      component: ViewDeposit,
      meta: {
        requiresAuth: true,
        requiresUserVerified: true
      }
    },
    {
      path: '/deposits',
      name: 'Deposits',
      component: Deposits,
      meta: {
        requiresAuth: true,
        requiresUserVerified: true
      }
    },
    {
      path: '/make-withdrawal/:id',
      name: 'MakeWithdrawal',
      component: MakeWithdrawal,
      meta: {
        requiresAuth: true,
        requiresUserVerified: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/referral-bonus',
      name: 'ReferralBonus',
      component: ReferralBonusPage
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQPage
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: {
          x: 0,
          y: 60
        }
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.user) {
      store.dispatch('setSnackbar', {
        text: 'You need to be Signed In',
        color: 'error'
      });
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.user) {
      store.dispatch('setSnackbar', {
        text: 'You are already Signed In',
        textColor: 'warning--text'
      });
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresUserVerified)) {
    if (!store.getters.user.emailVerified) {
      store.dispatch('setSnackbar', {
        text: 'Verify your Email Address',
        textColor: 'warning--text'
      });
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
