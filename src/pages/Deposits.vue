<template>
  <div>
    <v-container class="position-relative">
      <!-- <v-layout wrap justify-space-around class="child-flex-none"> -->
      <v-layout wrap justify-space-around>
        <v-flex xs6 sm3 class="mb-3 p-2 p-sm-2 p-md-3 p-lg-4">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="error" class="white--text d-flex flex-column h-100" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-2 text-xs-center text-elevation">{{ rejectedDeposits }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="font-all-caps bg-transparent-dark flex-none">
              Rejected Deposited
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6 sm3 class="mb-3 p-2 p-sm-2 p-md-3 p-lg-4">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="warning" class="white--text d-flex flex-column h-100" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-2 text-xs-center text-elevation">{{ unconfirmedDeposits }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="font-all-caps bg-transparent-dark flex-none">
              Unconfirmed Deposits
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6 sm3 class="mb-3 p-2 p-sm-2 p-md-3 p-lg-4">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="success" class="white--text d-flex flex-column h-100" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-2 text-xs-center text-elevation">{{ activeDeposits }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="font-all-caps bg-transparent-dark flex-none">
              Active Deposits
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6 sm3 class="mb-3 p-2 p-sm-2 p-md-3 p-lg-4">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" class="bg-primary-dark white--text d-flex flex-column h-100" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-2 text-xs-center text-elevation">{{ allDeposits }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="font-all-caps bg-transparent-dark flex-none">
              All Deposits
            </v-card-text>
          </v-card>
        </v-flex>

        <transition name="fade" appear appear-active-class="animated fadeInUp">
          <v-flex xs12 v-if="deposits">
            <v-card>
              <v-card-title>
                <span class="title">Deposits</span>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
              </v-card-title>
              <v-data-table :headers="headers" :items="deposits" :search="search" disable-initial-sort>
                <template slot="items" slot-scope="props">
                  <!-- <td>{{ $moment(props.item.date_initialized).fromNow() }}</td> -->
                  <td>{{ countdown(props.item) }}</td>
                  <td>{{ props.item.amount_deposited }}</td>
                  <td :class="{'accent--text': props.item.status === 'Initialized', 'success--text': props.item.status === 'Active', 'secondary--text': props.item.status === 'Yielded', 'info--text': props.item.status === 'Withdrawing', 'secondary--text': props.item.status === 'Withdrawn', 'error--text': props.item.status === 'Rejected'}">{{ props.item.status }}</td>
                  <td>
                    <v-tooltip top transition="scale-transition">
                      <v-btn slot="activator" small flat icon :to="`/view-deposit/${props.item.id}`">
                        <v-icon class="grey--text text--darken-2" small>fa-eye</v-icon>
                      </v-btn>
                      <span>View Deposit</span>
                    </v-tooltip>

                    <v-tooltip top transition="scale-transition" v-if="props.item.status === 'Active'">
                      <v-btn slot="activator" small flat icon :to="`/make-withdrawal/${props.item.id}`">
                        <v-icon color="accent" small>fa-cloud-download-alt</v-icon>
                      </v-btn>
                      <span>Withdraw</span>
                    </v-tooltip>
                  </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no deposits.
                </v-alert>
              </v-data-table>
            </v-card>
          </v-flex>
        </transition>

        <v-flex xs12 d-flex justify-center class="mt-6 child-flex-none">
          <v-btn color="primary" to="/make-deposit">
            <v-icon left small>fa-gem</v-icon>Deposit Now</v-btn>
        </v-flex>
      </v-layout>

    </v-container>

    <v-divider></v-divider>

    <v-container class="p-3 pt-md-5 pb-6">
      <v-layout wrap justify-space-between class="child-flex-none">
        <v-btn small color="primary" class="text-capitalize" to="/make-deposit">
          <v-icon left small>fa-cloud-download-alt</v-icon>Withdrawals</v-btn>

        <v-btn small color="primary" class="text-capitalize" to="/dashboard">
          <v-icon left small>fa-user</v-icon>Dashboard</v-btn>
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
  name: 'DepositsPage',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'date_initialized'
        },
        {
          text: 'Amount',
          value: 'amount_deposited'
        },
        { text: 'Status', value: 'status' },
        { text: 'Actions', sortable: false }
      ]
    };
  },

  computed: {
    deposits() {
      return this.$store.getters.deposits;
    },

    rejectedDeposits() {
      if (!this.deposits) {
        return this.deposits; // null
      }

      return this.deposits.filter(
        value => value.date_rejected && value.status === 'Rejected'
      ).length;
    },

    unconfirmedDeposits() {
      if (!this.deposits) {
        return this.deposits; // null
      }

      return this.deposits.filter(
        value => value.date_initialized && value.status === 'Initialized'
      ).length;
    },

    activeDeposits() {
      if (!this.deposits) {
        return this.deposits; // null
      }

      return this.deposits.filter(
        value => value.date_confirmed && value.status === 'Active'
      ).length;
    },

    allDeposits() {
      if (!this.deposits) {
        return this.deposits; // null
      }

      return this.deposits.length;
    }
  },

  watch: {},

  beforeRouteEnter: (to, from, next) => {
    if (!store.getters.deposits) {
      store.dispatch('fetchDeposits');
    }
    next();
  },

  created() {},

  destroyed() {},

  methods: {
    countdown(deposit) {
      const dateConfirmed = deposit.date_confirmed;

      if (!dateConfirmed) {
        return this.$moment.duration(31536000, 'seconds').humanize(true);
      }

      const secondsInAYear = 31536000;
      const secondsElapsed = (new Date() - dateConfirmed) / 1000;
      const secondsRemaining = secondsInAYear - secondsElapsed;

      return this.$moment.duration(secondsRemaining, 'seconds').humanize(true);
    }
  }
};
</script>
