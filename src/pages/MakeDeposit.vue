<template>
  <div>
    <v-container>
      <v-layout wrap justify-center>

        <v-flex xs10 tag="h2" :class="{'mt-4 pb-3 text-xs-center grey--text text--darken-4 font-all-caps': true, 'display-1': $vuetify.breakpoint.smAndDown, 'display-2': $vuetify.breakpoint.mdAndUp}">How much would you like to deposit?</v-flex>

        <v-flex xs12>
          <transition-group tag="v-layout" class="wrap justify-center transition__child--medium" appear appear-active-class="animated zoomIn" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut position-absolute" move-class="move-transition">
            <v-flex xs10 sm4 md3 class="px-3 my-3" key="input">
              <v-card color="accent" class="white--text h-100 d-flex flex-column" raised>
                <v-card-title primary-title class="bg-transparent-dark-2 justify-center">
                  <!-- <h2 class="display-2 text-xs-center text-elevation">$ 0.00</h2> -->
                  <v-text-field color="accent" dark prefix="$" v-model="form.deposit_amount" label="You Deposit" placeholder="0.00" :error-messages="errors.collect('deposit_amount')" v-validate="'required|numeric|min_value:100'" data-vv-name="deposit_amount" data-vv-as="Deposit" required></v-text-field>
                </v-card-title>
                <v-divider dark class="flex-none"></v-divider>
                <v-card-text class="font-all-caps flex-none">
                  You Deposit
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex v-if="amountYouGet" xs12 sm6 md5 class="px-3 my-3" key="output">
              <v-card color="success" class="white--text h-100 d-flex h-100 flex-column h-100" raised>
                <v-card-title primary-title class="bg-transparent-dark-2 justify-center">
                  <h2 class="display-2 text-xs-center text-elevation">$ {{ amountYouGet }}</h2>
                </v-card-title>
                <v-divider dark class="flex-none"></v-divider>
                <v-card-text class="font-all-caps flex-none">
                  You Get
                </v-card-text>
              </v-card>
            </v-flex>
          </transition-group>
        </v-flex>

        <v-flex xs10 class="mt-5 child-flex-none d-flex justify-center">
          <v-btn large :loading="formIsProcessing" color="primary" dark @click="showDialog = true">
            <v-icon small left>fa-plus</v-icon>Deposit NOW</v-btn>
        </v-flex>

        <v-dialog v-model="showDialog" max-width="290" persistent>
          <v-card>
            <v-card-title class="headline">Make Deposit?</v-card-title>
            <v-card-text>Are you sure you want to make a deposit of
              <span class="primary--text">${{ form.deposit_amount }}</span>. <br><br> Please note that you will have to transfer this
              <strong>exact</strong> amount to the address that will provided after your request has been made.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat="flat" @click.native="showDialog = false">Disagree</v-btn>
              <v-btn color="primary" flat="flat" @click.native="makeDeposit">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <v-flex v-show="showBtcAddress" xs10 tag="h4" class="mt-4 p-3 text-xs-center grey--text text--darken-4 grey lighten-5">
            <p class="success--text">
              You Deposit has been Initialized.
            </p>

            <p>
              Please kindly deposit
              <span class="primary--text">$ {{ amountDeposited }}</span> to this BTC Address:
              <code>1JoeWHZ2QvRbfzwFg1mk8fH4ri1js3XPmo</code>
            </p>

            <p class="info--text">
              Your transaction ID is
              <code>{{ depositRefId }}</code>
            </p>

          </v-flex>
        </transition>

        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <v-flex xs10 class="mt-4 child-flex-none d-flex justify-center">
            <v-btn large class="mt" v-if="showBtcAddress" color="primary" dark :to="`/view-deposit/${depositRefId}`">
              <v-icon small left>fa-eye</v-icon>View Deposit</v-btn>
          </v-flex>
        </transition>

        <v-flex xs12 class="mt-5 mb-3">
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-layout wrap justify-space-between class="child-flex-none">
            <v-btn small color="primary" class="text-capitalize" to="/deposits">
              <v-icon left small>fa-gem</v-icon>Deposits</v-btn>

            <v-btn small color="primary" class="text-capitalize" to="/dashboard">
              <v-icon left small>fa-user</v-icon>Dashboard</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from '../firebaseInit';

export default {
  name: 'MakeDepositPage',

  data() {
    return {
      form: {
        deposit_amount: ''
      },
      formIsProcessing: false,
      showDialog: false,
      amountDeposited: 0,
      depositRefId: '',
      showBtcAddress: false
    };
  },

  computed: {
    amountYouGet() {
      if (
        this.form.deposit_amount < 100 ||
        this.errors.collect('deposit_amount').length > 0
      )
        return '';
      const deposit = Number(this.form.deposit_amount);
      if (!deposit) return '';
      const interest = deposit * this.$store.getters.ratePerYear;
      let total = deposit + interest;
      return this.numberToCurrencyFormat(total.toFixed(2));
    }
  },

  created() {
    if (this.$route.query.amount) {
      this.form.deposit_amount = this.$route.query.amount;
    }
  },

  methods: {
    numberToCurrencyFormat(n) {
      return String(n).replace(/(\d)(?=(\d{3})+\.)/g, '$1, ');
    },

    makeDeposit() {
      this.showDialog = false;

      this.$validator
        .validateAll()
        .then(validity => {
          if (!validity) {
            return this.$store.dispatch('setSnackbar', {
              text: 'Please kindly check form for errors.',
              color: 'error'
            });
          }

          this.$store.dispatch('setSnackbar', {
            text: 'Your request is being processed'
          });

          this.formIsProcessing = true;
          // Remove previous alerts
          this.showBtcAddress = false;

          db
            .collection('deposits-test')
            .add({
              uid: this.$store.getters.user.uid,
              user_email: this.$store.getters.user.email,
              date_initialized: new Date(),
              amount_deposited: Number(this.form.deposit_amount),
              status: 'Initialized',
              createdAt: new Date(),
              updatedAt: new Date()
            })
            .then(docRef => {
              this.depositRefId = docRef.id;
              this.amountDeposited = this.form.deposit_amount;
              this.showBtcAddress = true;
              this.clear();
              this.formIsProcessing = false;
              this.$store.dispatch('setSnackbar', {
                text: 'Your Deposit has been Initialized!',
                timeout: 16000,
                textColor: 'success--text'
              });
              // this.$store.dispatch('fetchDeposits');
            })
            .catch(error => {
              this.formIsProcessing = false;
              this.$store.dispatch('setSnackbar', {
                text: error.message,
                timeout: 25000
              });
            });
        })
        .catch(error => console.error(error));
    },

    clear() {
      for (let field in this.form) {
        this.form[field] = '';
      }
      this.$validator.reset();
    }
  }
};
</script>
