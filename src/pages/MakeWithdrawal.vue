<template>
  <div>
    <v-container v-if="deposit && depositState === 'success'" key="success" class="position-relative">
      <v-layout wrap justify-space-around>
        <transition name="fade" :duration="300" appear appear-active-class="animated fadeInLeft">
          <v-flex xs10 sm3 md3 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="info" class="h-100 d-flex flex-column white--text" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h2 class="display-2 text-xs-center text-elevation">$ {{ deposit.amount_deposited }}</h2>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Amount Deposited
              </v-card-text>
            </v-card>
          </v-flex>
        </transition>

        <v-flex xs10 sm2 class="mb-5 child-flex-none" d-flex justify-center align-center>
          <v-icon v-if="$vuetify.breakpoint.smAndUp" key="right">fa-chevron-right</v-icon>
          <v-icon v-else-if="$vuetify.breakpoint.xsOnly" key="down">fa-chevron-down</v-icon>
        </v-flex>

        <transition name="fade" :duration="300" appear appear-active-class="animated fadeInRight">
          <v-flex xs10 sm4 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="success" class="h-100 d-flex flex-column white--text" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h3 class="display-2 text-xs-center text-elevation">$ {{ amountAccumulated }}</h3>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Amount Accumulated
              </v-card-text>
            </v-card>
          </v-flex>
        </transition>

        <v-flex xs12 d-flex justify-center class="child-flex-none">
          <v-divider class="w-50 primary mb-5"></v-divider>
        </v-flex>

        <transition name="fade" :duration="300" appear appear-active-class="animated fadeInLeft">
          <v-flex xs10 sm3 md3 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="accent" class="h-100 d-flex flex-column white--text" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h2 class="headline text-xs-center text-elevation" v-text="countdown"></h2>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Countdown
              </v-card-text>
            </v-card>
          </v-flex>
        </transition>

        <v-flex xs10 sm2 class="mb-5 child-flex-none" d-flex justify-center align-center>
          <v-icon v-if="$vuetify.breakpoint.smAndUp" key="right">fa-chevron-right</v-icon>
          <v-icon v-else-if="$vuetify.breakpoint.xsOnly" key="down">fa-chevron-down</v-icon>
        </v-flex>

        <transition name="fade" :duration="300" appear appear-active-class="animated fadeInRight">
          <v-flex xs10 sm4 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" class="h-100 d-flex flex-column white--text bg-primary-dark" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h3 class="display-2 text-xs-center text-elevation">$ {{ amountAfterAYear }}</h3>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Amount After A Year
              </v-card-text>
            </v-card>
          </v-flex>
        </transition>
      </v-layout>

      <v-layout wrap justify-center>
        <v-flex xs10 sm8 md6 lg7 class="mb-5">
          <v-card>
            <v-card-title>
              <v-badge color="accent" v-if="deposit.status === 'Initialized'">
                <v-icon slot="badge" dark small>fa-ellipsis-h</v-icon>
                <span class="headline">
                  Initiatialized
                </span>
              </v-badge>
              <v-badge color="success" v-if="deposit.status === 'Active'">
                <v-icon slot="badge" dark small>fa-check</v-icon>
                <span class="headline">
                  Active
                </span>
              </v-badge>
              <v-badge color="secondary" v-if="deposit.status === 'Yielded'">
                <v-icon slot="badge" dark small>fa-check</v-icon>
                <span class="headline">
                  Yielded
                </span>
              </v-badge>
              <v-badge color="info" v-if="deposit.status === 'Withdrawing'">
                <v-icon slot="badge" dark small>fa-cloud-download-alt</v-icon>
                <span class="headline">
                  Withdrawing
                </span>
              </v-badge>
              <v-badge color="secondary" v-if="deposit.status === 'Withdrawn'">
                <v-icon slot="badge" dark small>fa-cloud-download-alt</v-icon>
                <span class="headline">
                  Withdrawn
                </span>
              </v-badge>
              <v-badge color="error" v-if="deposit.status === 'Rejected'">
                <v-icon slot="badge" dark small>fa-exclamation-triangle</v-icon>
                <span class="headline">
                  Rejected
                </span>
              </v-badge>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>ID:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ deposit.id }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Date Initiated:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ $moment(deposit.date_initialized).fromNow() }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="deposit.date_confirmed">
                <v-list-tile-content>Date Confirmed:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ deposit.date_confirmed | moment().fromNow() }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-card-text v-if="deposit.comment">
              <small>
                <strong>Comment:</strong>
              </small> <br><br> {{ deposit.comment }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout wrap justify-center class="mb-5">
        <v-flex xs10 sm8 md6 lg7>
          <v-card dark raised>
            <v-card-title class="title">
              Are you sure?
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="warning--text">Please note that this request is irrevocable; Once you push the withdrawn button, there's no cancelling.</p>

            </v-card-text>
            <v-card-actions class="d-flex justify-space-between child-flex-none">
              <v-btn color="accent" v-if="depostIsActive" :loading="formIsProcessing" dark @click="requestWithdrawal">
                <v-icon small left>fa-cloud-download-alt</v-icon>Withdraw Now
              </v-btn>

              <v-btn color="primary" dark :to="`/view-deposit/${deposit.id}`">
                <v-icon small left>fa-arrow-left</v-icon>Back
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <transition name="fade" appear appear-active-class="fadeIn" leave-active-class="fadeOut">
        <v-layout v-if="!depostIsActive" wrap justify-center class="position-absolute h-100 w-100 bg-transparent-white-2" style="top: 0; left:0;">
          <v-flex xs12 tag="div" class="text-xs-center py-5 px-3 px-md-5">
            <h2 class="display-1">The Deposit is not in Active</h2>
            <p class="title mt-3">You should only make withdrawals of active deposit/savings
            </p>
          </v-flex>
        </v-layout>
      </transition>

    </v-container>

    <v-container v-else-if="depositState === 'loading'" key="loading" class="py-5">
      <v-layout justify-center class="child-flex-none">
        <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
      </v-layout>
    </v-container>

    <v-container v-else-if="depositState === 'error'" key="error" class="py-5">
      <v-layout justify-center>
        <v-flex xs10 sm8>
          <v-alert type="error" :value="true">
            No deposit could be loaded with this id. Please check the link. <br><br> Or
            <v-btn color="secondary" dark @click="fetchData">Retry</v-btn>
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider></v-divider>

    <v-container class="p-3 pt-md-5 pb-6">
      <v-layout wrap justify-space-between class="child-flex-none">
        <v-btn small color="primary" class="text-capitalize" to="/dashboard">
          <v-icon left small>fa-user</v-icon>Dashboard</v-btn>

        <v-btn small color="primary" class="text-capitalize" to="/deposits">
          <v-icon left small>fa-gem</v-icon>Deposits</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from '../firebaseInit';
import { store } from '../store';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'MakeWithdrawalPage',
  data() {
    return {
      formIsProcessing: false
    };
  },

  computed: {
    deposit() {
      return this.$store.getters.specificDeposit;
    },
    depositState() {
      return this.$store.getters.specificDepositState;
    },
    depostIsActive() {
      return this.deposit.date_confirmed && this.deposit.status === 'Active';
    },
    amountAccumulated() {
      if (!this.deposit.date_confirmed) {
        const zero = 0;
        return zero.toFixed(2);
      }

      const amount = this.deposit.amount_deposited;

      const ratePerDay = 0.6 / 365;
      const noOfDays = (new Date() - this.deposit.date_confirmed) / 86400000;
      const interest = amount * ratePerDay * noOfDays;

      return this.numberToCurrencyFormat((amount + interest).toFixed(2));
    },

    countdown() {
      if (!this.deposit.date_confirmed) {
        return this.$moment.duration(31536000, 'seconds').humanize(true);
      }

      const dateConfirmed = this.deposit.date_confirmed;

      const secondsInAYear = 31536000;
      const secondsElapsed = (new Date() - dateConfirmed) / 1000;
      const secondsRemaining = secondsInAYear - secondsElapsed;

      return this.$moment.duration(secondsRemaining, 'seconds').humanize(true);
    },
    amountAfterAYear() {
      if (!this.deposit) {
        const zero = 0;
        return zero.toFixed(2);
      }
      const amount = this.deposit.amount_deposited;

      const ratePerYear = 0.6;
      const interest = amount * ratePerYear;

      return this.numberToCurrencyFormat((amount + interest).toFixed(2));
    }
  },

  watch: {
    $route: 'fetchData'
  },

  beforeRouteEnter: (to, from, next) => {
    if (!store.getters.deposits) {
      store.dispatch('fetchDeposits');
    }
    next();
  },

  created() {
    this.fetchData();
  },

  destroyed() {},

  methods: {
    fetchData() {
      this.$store.dispatch('fetchSpecificDeposit', {
        id: this.$route.params.id
      });
    },
    numberToCurrencyFormat(n) {
      return String(n).replace(/(\d)(?=(\d{3})+\.)/g, '$1, ');
    },

    requestWithdrawal() {
      if (!this.depostIsActive) {
        throw new Error('The Deposit is not Active');
      }
      this.$store.dispatch('setSnackbar', {
        text: 'Your request is being processed'
      });

      this.formIsProcessing = true;

      db
        .collection('deposits-test')
        .doc(this.deposit.id)
        .update({
          status: 'Withdrawing'
        })
        .then(docRef => {
          this.formIsProcessing = false;
          this.$store.dispatch('setSnackbar', {
            text: 'The withdrawal of your deposit has been Initiated!',
            timeout: 16000,
            textColor: 'success--text'
          });
          this.$router.push({ path: `/view-deposit/${this.deposit.id}` });
        })
        .catch(error => {
          this.formIsProcessing = false;
          this.$store.dispatch('setSnackbar', {
            text: error.message,
            timeout: 25000
          });
        });
    }
  }
};
</script>
