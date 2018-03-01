<template>
  <div>

    <!-- Search For Deposit -->
    <section class="bg-primary-dark pt-5 pb-2 px-3 px-md-5">
      <v-container>
        <v-layout wrap align-center>
          <v-flex xs7 sm5 md4>
            <v-text-field flat color="primary" dark v-model="form.transactionId" placeholder="Transaction ID" :error-messages="errors.collect('transaction_id')" v-validate="'alpha_num|max:30'" data-vv-name="transaction_id" data-vv-as="Transaction ID" required></v-text-field>
          </v-flex>

          <v-flex xs4 sm3>
            <v-btn small color="primary" dark class="text-capitalize" :disabled="!form.transactionId || this.errors.collect('transaction_id').length > 0" ref="findDepositSubmitBtn" :to="`/view-deposit/${form.transactionId}`">
              <v-icon left small>fa-eye</v-icon>View</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End Search For Deposit -->

    <transition name="fade" :duration="300" mode="out-in" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
      <v-container v-if="deposit && depositState === 'success'" key="success" class="position-relative">
        <v-layout wrap justify-space-around>
          <v-flex xs10 sm4 md3 class="mb-5">
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

          <v-flex xs10 sm4 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="success" class="h-100 d-flex flex-column white--text" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h2 class="display-2 text-xs-center text-elevation">$ {{ amountAccumulated }}</h2>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Amount Accumulated
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs10 sm3 class="mb-5">
            <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" class="h-100 d-flex flex-column bg-primary-dark white--text" raised>
              <v-card-title primary-title class="bg-transparent-dark justify-center">
                <h3 class="headline text-xs-center text-elevation" v-text="countdown"></h3>
              </v-card-title>
              <v-divider dark class="flex-none"></v-divider>
              <v-card-text class="flex-none font-all-caps bg-transparent-dark">
                Countdown
              </v-card-text>
            </v-card>
          </v-flex>

          <transition name="fade" appear appear-active-class="fadeIn" leave-active-class="fadeOut">
            <v-layout v-if="!depositIsActive" wrap justify-center class="position-absolute h-100 w-100 bg-transparent-white-2" style="top: 0; left:0;">
              <v-flex xs12 tag="div" class="text-xs-center py-5 px-3 px-md-5">
                <h2 class="display-1">Your deposit is not Active</h2>
                <p class="title mt-3">Please ensure you have made the deposit to
                  <code>R833hd83j</code>
                </p>
              </v-flex>
            </v-layout>
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
                  <v-list-tile-content>Date Initiated:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ $moment(deposit.date_initialized).fromNow() }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="deposit.date_confirmed">
                  <v-list-tile-content>Date Confirmed:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ deposit.date_confirmed | moment().fromNow() }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider v-if="deposit.account_info"></v-divider>
              <v-card-text v-if="deposit.account_info">
                <small>
                  <strong>Account Information:</strong>
                </small> <br><br> {{ deposit.account_info }}
              </v-card-text>
              <v-divider v-if="deposit.comment"></v-divider>
              <v-card-text v-if="deposit.comment">
                <small>
                  <strong>Comment:</strong>
                </small> <br><br> {{ deposit.comment }}
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 d-flex justify-center class="mb-5 child-flex-none" v-if="deposit.status === 'Active'">
            <v-btn :disabled="!depositIsActive" small color="primary" :to="`/make-withdrawal/${deposit.id}`">
              <v-icon left small>fa-cloud-download-alt</v-icon>Withdraw Now</v-btn>
          </v-flex>
        </v-layout>

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
    </transition>

    <v-divider></v-divider>

    <v-container class="p-3 pt-md-5 pb-6">
      <v-layout wrap justify-space-between class="child-flex-none">
        <v-btn small color="primary" class="text-capitalize" to="/make-deposit">
          <v-icon left small>fa-plus</v-icon>Make Deposit</v-btn>

        <v-btn small color="primary" class="text-capitalize" to="/deposits">
          <v-icon left small>fa-gem</v-icon>Deposits</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { store } from '../store';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'ViewDepositPage',
  data() {
    return {
      form: {
        transactionId: ''
      }
    };
  },

  computed: {
    deposit() {
      return this.$store.getters.specificDeposit;
    },
    depositState() {
      return this.$store.getters.specificDepositState;
    },
    depositIsActive() {
      return this.deposit.date_confirmed ? true : false;
    },
    amountAccumulated() {
      if (!this.deposit) {
        const zero = 0;
        return zero.toFixed(2);
      }
      const amount = this.deposit.amount_deposited;

      const ratePerDay = 0.6 / 365;
      let noOfDays = 0;
      if (this.deposit.date_confirmed) {
        noOfDays = (new Date() - this.deposit.date_confirmed) / 86400000;
      }
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
    }
  }
};
</script>
