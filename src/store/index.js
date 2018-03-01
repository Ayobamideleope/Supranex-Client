// @ts-check

import Vue from 'vue';
import Vuex from 'vuex';
import { default as db, auth } from '../firebaseInit';
import router from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    route: {
      path: '',
      params: {},
      query: {}
    },

    user: null,
    userEmailVerificationSent: '',

    snackbar: {
      show: false,
      color: '',
      text: '',
      textColor: '',
      btnTextColor: '',
      timeout: 0
    },

    deposits: {
      state: '',
      data: null
    },
    specificDeposit: {
      state: '',
      data: null
    }
  },

  mutations: {
    signin(state, payload) {
      state.user = payload;
    },
    signout(state) {
      state.user = null;
    },
    setUserEmailVerificationSent(state, payload) {
      state.userEmailVerificationSent = payload;
    },

    toggleSnackbar(state, payload) {
      state.snackbar.show = payload;
    },
    setSnackbar(
      state,
      {
        text,
        textColor = 'grey--text text--lighten-3',
        color = 'toolbar--transparent',
        btnColor = 'bg-transparent-white',
        btnTextColor = 'grey--text text--lighten-3',
        timeout = 6000
      }
    ) {
      // console.log('setting snackbar')

      state.snackbar.show = false;
      state.snackbar.text = text;
      state.snackbar.textColor = textColor;
      state.snackbar.color = color;
      state.snackbar.btnTextColor = btnTextColor;
      state.snackbar.show = true;
      state.snackbar.timeout = timeout;
    },

    setDeposits(state, payload) {
      // console.dir(['about to set deposits', payload.data]);
      state.deposits.data = payload.data;
      // console.dir(state.deposits);
    },
    setDepositsState(state, payload) {
      state.deposits.state = payload.state;
    },
    setSpecificDeposit(state, { data }) {
      // console.log('about to set specific deposit');
      // console.dir(data);

      state.specificDeposit.data = data;

      // console.log('already set specific deposit')
      // console.dir(state.specificDeposit)
    },
    setSpecificDepositState(state, payload) {
      // console.log('about to set specific deposit state')

      state.specificDeposit.state = payload.state;
    }
  },

  actions: {
    signin({ commit, getters, state }, payload) {
      commit('signin', payload);

      commit('setSnackbar', {
        text: 'Your have signed in!',
        textColor: 'success--text'
      });

      if (state.route.query.redirect) {
        router.replace({ path: state.route.query.redirect });
      } else {
        router.replace({ path: '/dashboard' });
      }
    },
    signout({ commit }) {
      // console.log('signed out');
      auth.signOut();
      commit('signout');
      router.push({ path: '/signin' });
    },
    sendEmailVerification({ commit, dispatch }) {
      auth.currentUser
        .sendEmailVerification()
        .then(() => {
          commit('setEmailVerificationSent', 'success');
          dispatch('setSnackbar', { text: 'Email verification sent' });
        })
        .catch(error => {
          commit('setEmailVerificationSent', 'error');
          dispatch('setSnackbar', {
            text: 'Error Sending Email verification',
            textColor: 'error--text'
          });
        });
    },

    toggleSnackbar({ commit }, payload) {
      commit('toggleSnackbar', payload);
    },
    setSnackbar({ commit }, payload) {
      commit('setSnackbar', payload);
    },

    fetchDeposits({ state, commit }, payload) {
      const fetchedDeposits = [];
      // console.dir(payload)
      commit('setDepositsState', { state: 'loading' });

      db
        .collection('deposits-test')
        .where('uid', '==', state.user.uid)
        .orderBy('date_initialized')
        .onSnapshot(
          querySnapshot => {
            fetchedDeposits.splice(0, fetchedDeposits.length);
            querySnapshot.forEach(doc => {
              let data = doc.data();
              data['id'] = doc.id;
              // console.log(['data and id: ', data]);
              fetchedDeposits.push(data);
            });
            commit('setDeposits', {
              data: fetchedDeposits
            });
            // console.dir(['fetched Deposits', fetchedDeposits]);
            commit('setDepositsState', { state: 'success' });
          },
          error => {
            console.error(error);
          }
        );
    },
    async fetchSpecificDeposit({ commit, dispatch }, { id }) {
      // return new Promise((resolve, reject) => {
      let state = 'loading';
      commit('setSpecificDepositState', { state });
      // console.log('changed state to loading')

      await dispatch('fetchSpecificDepositFromLocal', { id }).then(
        ([returnedState, data]) => {
          // console.log('local-then')

          if (returnedState) {
            state = 'success';
            commit('setSpecificDeposit', { data });
            commit('setSpecificDepositState', { state });
          }
        }
      );
      // console.log('after-local')

      // if (state !== 'success') {
      await dispatch('fetchSpecificDepositFromDb', { id })
        .then(([returnedState, data]) => {
          // console.log('local-then')

          if (returnedState) {
            state = 'success';
            commit('setSpecificDeposit', { data });
            commit('setSpecificDepositState', { state });
          } else {
            commit('setSpecificDepositState', { state: 'error' });
          }
        })
        .catch(error => {
          commit('setSpecificDepositState', { state: 'error' });
          console.error(error);
        });
    },
    fetchSpecificDepositFromLocal({ commit, getters }, { id }) {
      return new Promise((resolve, reject) => {
        const localDepositsCollection = getters.deposits;
        if (!localDepositsCollection) resolve([false, null]);

        const deposit = localDepositsCollection.find(
          deposit => deposit.id === id
        );
        resolve(deposit ? [true, deposit] : [false, null]);
      });
    },
    fetchSpecificDepositFromDb({ commit, getters }, { id }) {
      // console.log('fetching specific from db');

      return db
        .collection('deposits-test')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) {
            let deposit = doc.data();
            deposit['id'] = doc.id;
            return [true, deposit];
          } else {
            return [false, null];
          }
        });
    },

    parseSpecificQuerySnapshot({ commit }, querySnapshot) {
      // console.log('in parsesqs')
      // console.log(querySnapshot)
      let data = null;

      querySnapshot.forEach(doc => {
        // console.log(doc.data());
        return (data = doc.data());
      });
      return data;
    }
  },

  getters: {
    route(state) {
      return state.route;
    },
    routePath(state) {
      return state.route.path;
    },
    routeParams(state) {
      return state.route.params;
    },
    routeQuery(state) {
      return state.route.query;
    },

    user(state) {
      return state.user;
    },
    userPage(state) {
      const userPagesPaths = [
        '/dashboard',
        '/make-deposit',
        '/view-deposit',
        '/deposits',
        '/make-withdrawal',
        '/withdrawals'
      ];
      for (const userPage of userPagesPaths) {
        if (state.route.path.startsWith(userPage)) {
          return true;
        }
      }
      // return userPagesPaths.includes(state.route.path);
      return false;
    },
    userEmailVerificationSent(state) {
      return state.userEmailVerificationSent;
    },

    showSnackbar(state) {
      return state.snackbar.show;
    },
    snackbar(state) {
      return state.snackbar;
    },

    deposits(state) {
      let deposits = state.deposits.data;
      if (!deposits) return deposits; // deposits == null in state
      // deposits = deposits.sort((currentDeposit, nextDeposit) => {
      //   return currentDeposit.date > nextDeposit.date
      // })
      return deposits;
    },
    depositsState(state) {
      return state.deposits.state;
    },

    specificDeposit(state) {
      let deposit = state.specificDeposit.data;
      if (!deposit) return deposit;
      return deposit;
    },

    specificDepositState(state) {
      return state.specificDeposit.state;
    }
  }
});
