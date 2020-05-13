<template>
  <div>
    <v-container class="position-relative">
      <!-- <v-layout wrap justify-space-around class="child-flex-none"> -->
      <v-layout wrap justify-space-around>
        <v-flex xs10 tag="h2" class="display-1 font-weight-bold mt-3 mb-5 text-xs-center">Dashboard</v-flex>
        <v-flex xs10 sm4 md3 class="mb-5">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="success" class="h-100 d-flex flex-column white--text" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-1 text-xs-center text-elevation">$ {{ amountOfActiveDeposits }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="flex-none font-all-caps bg-transparent-dark">
              Active Deposits
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs10 sm3 class="mb-5">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" color="info" class="h-100 d-flex flex-column white--text" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-1 text-xs-center text-elevation">$ {{ interestsAccured }}</h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class="flex-none font-all-caps bg-transparent-dark">
              Interests Accumulated
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs10 sm3 class="mb-5">
          <v-card style="background-image: url('/static/images/overlays/08.png'); background-repeat: repeat;" class="h-100 d-flex flex-column bg-primary-dark white--text" raised>
            <v-card-title primary-title class="bg-transparent-dark justify-center">
              <h2 class="display-2 text-xs-center text-elevation" v-text="noOfActiveDeposits"></h2>
            </v-card-title>
            <v-divider dark class="flex-none"></v-divider>
            <v-card-text class=" flex-none font-all-caps bg-transparent-dark">
              No of Active Deposits
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 d-flex justify-center class="mt-6 child-flex-none">
          <v-btn color="primary" to="/make-deposit">
            <v-icon left small>fa-gem</v-icon>Deposit Now</v-btn>
        </v-flex>
      </v-layout>

      <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
        <v-layout v-if="!$store.getters.user.emailVerified" wrap justify-center align-center class="position-absolute h-100 w-100 bg-transparent-white-2" style="top: 0; left:0;">
          <v-flex xs12 tag="h2" class="display-1 text-xs-center">You need to verify your email address</v-flex>
          <v-icon x-large class="shape-elevation">fa-arrow-down</v-icon>
        </v-layout>
      </transition>

    </v-container>

    <v-divider></v-divider>

    <v-container class="p-3 py-md-5">
      <v-layout wrap justify-end class="child-flex-none">

        <v-btn small color="primary" class="text-capitalize" to="/deposits">
          <v-icon left small>fa-gem</v-icon>Deposits</v-btn>
      </v-layout>
    </v-container>

    <v-divider></v-divider>

    <v-container class="p-5">
      <v-layout wrap v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-space-between': $vuetify.breakpoint.smAndUp}">
        <v-flex xs12 sm5 class="mb-5">
          <p class="body-2" v-text="$store.getters.user.email"></p>
          <v-btn flat color="accent" class="text-capitalize mt-0" style="margin-left: -16px" to="/change-password">Change Password</v-btn>

          <p class="body-2 mt-3 mb-0">Referral Link</p>
          <a :href="`https://www.supranex.com/signup?referrer=${this.$store.getters.user.uid}`" target="_blank" v-text="`https://www.supranex.com/signup?referrer=${this.$store.getters.user.uid}`" class="caption"></a>
        </v-flex>

        <v-flex xs12 sm5 v-if="!$store.getters.user.emailVerified">
          <h4 class="body-2 text-uppercase mb-4">Verify Email</h4>
          <transition name="fade" enter-active-class="fadeIn" leave-active-class="fadeOut">
            <div>
              <p>A verification message has been sent to your email. Please use the link to verify your account so you can enjoy all that supranex offers.</p>
              <p>Can't find the mail?
                <v-btn flat color="accent" round class="text-capitalize" @click="$store.dispatch('sendEmailVerification')">Resend Verification</v-btn>
              </p>
            </div>
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { store } from '../store'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'DashboardPage',
  data () {
    return {}
  },

  computed: {
    activeDeposits () {
      if (!this.$store.getters.deposits) {
        return this.$store.getters.deposits // null
      }

      return this.$store.getters.deposits.filter(
        value => value.date_confirmed && value.status === 'Active'
      )
    },
    amountOfActiveDeposits () {
      if (!this.activeDeposits) {
        const zero = 0
        return zero.toFixed(2)
      }
      return this.numberToCurrencyFormat(
        this.activeDeposits
          .reduce(
            (accumulate, deposit) => accumulate + deposit.amount_deposited,
            0
          )
          .toFixed(2)
      )
    },
    interestsAccured () {
      if (!this.activeDeposits) {
        const zero = 0
        return zero.toFixed(2)
      }
      return this.numberToCurrencyFormat(
        this.activeDeposits
          .reduce(
            (accumulate, deposit) =>
              accumulate + this.interestAccumulated(deposit),
            0
          )
          .toFixed(2)
      )
    },
    noOfActiveDeposits () {
      if (!this.activeDeposits) {
        return 0
      }
      return this.activeDeposits.length
    }
  },

  watch: {},

  beforeRouteEnter: (to, from, next) => {
    if (!store.getters.deposits) {
      store.dispatch('fetchDeposits')
    }
    next()
  },

  created () {},

  destroyed () {},

  methods: {
    interestAccumulated (deposit) {
      if (!deposit) {
        const zero = 0
        return zero.toFixed(2)
      }
      const amount = deposit.amount_deposited

      const ratePerDay = this.$store.getters.ratePerYear / 365
      let noOfDays = 0
      if (deposit.date_confirmed) {
        noOfDays = Math.floor((new Date() - deposit.date_confirmed) / 86400000)
        if (noOfDays > 365) { noOfDays = 365 }
      }
      return amount * ratePerDay * noOfDays // interest
    },
    numberToCurrencyFormat (n) {
      return String(n).replace(/(\d)(?=(\d{3})+\.)/g, '$1, ')
    }
  }
}
</script>
