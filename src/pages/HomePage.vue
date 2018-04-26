<template>
  <div>

    <!-- Welcome  -->
    <section id="get-started" class="pt-6 pt-md-6 pb-5" style="margin-top: -65px;">
      <v-container dark>
        <v-layout wrap justify-center>

          <v-flex xs10 tag="p" class="headline font-weight-bold text-xs-center accent--text mt-3 mt-sm-4 mb-1" dark>
            <em>Save Your Money in</em>
          </v-flex>
          <v-flex xs10 tag="p" class="headline font-weight-bold text-xs-center primary--text mb-1" dark style="letter-spacing: 1px !important">
            Supranex Bitcoin Saving Accounts
          </v-flex>
          <v-flex xs10 tag="p" class="headline text-xs-center grey--text text--lighten-4 mb-5" dark>And EARN
            <span class="accent--text">100% guaranteed</span> interest anually.</v-flex>

          <v-flex xs6 sm4 md3 class="">
            <v-text-field dark v-model="form.saving.input" placeholder="You Save" :error-messages="errors.collect('saving-input')" v-validate="'required|numeric|min_value:100'" data-vv-name="saving-input" data-vv-as="Input" required solo class="border transparent elevation-0 rounded-0 border-right-0" style="border-color: #184774 !important;"></v-text-field>
          </v-flex>

          <v-flex xs6 sm4 md3 class="">
            <v-text-field dark v-model="savingOutput" placeholder="You Get" :error-messages="errors.collect('saving-output')" data-vv-name="saving-output" disabled solo class="border transparent elevation-0 rounded-0" style="border-color: #184774 !important;"></v-text-field>
          </v-flex>

          <v-flex xs12 tag="p" class="text-xs-center grey--text text--lighten-4 caption" dark>
            **Savings Calculator**
          </v-flex>

          <v-flex xs12 tag="p" class="text-xs-center grey--text text--lighten-4" dark>
            <em>It's very easy, simple and risk free!</em>
          </v-flex>
          <v-flex xs12 tag="p" class="text-xs-center grey--text text--lighten-4" dark>You can withdraw your funds at any time</v-flex>

          <v-flex xs12 tag="p" class="body-2 text-xs-center grey--text text--lighten-4" dark>It pays to save in Supranex Bitcoin Savings Account</v-flex>

          <v-flex xs10 class="mt-5 child-flex-none d-flex justify-center">
            <v-btn large class="mt-3" depressed outline dark @click="redirectToDepositPage">Save NOW</v-btn>
          </v-flex>

          <v-flex xs10 class="mt-5 child-flex-none d-flex justify-center">
            <div class="btcwdgt-price" bw-theme="dark" style="-webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12) !important; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12) !important;"></div>
          </v-flex>

        </v-layout>
      </v-container>
    </section>
    <!-- End Welcome -->

    <!-- How It Works -->
    <section id="how-it-works" class="py-4">
      <page-section-header text="How It Works" class="primary--text"></page-section-header>
      <v-container>
        <h3 class="title text-xs-center">
          Earning interest is easy and transparent with
          <span class="accent--text">Supranex</span>
        </h3>
        <v-layout wrap>
          <v-flex xs12 sm4 class="p-4">
            <v-card flat="" color="white" class="d-flex flex-column">
              <v-card-text light class="text-xs-center flex-none">
                <img src="/static/images/image-icons/deposit.png" alt="deposit image" style="height: 100px;">
              </v-card-text>
              <v-card-title class="layout p-1 justify-center flex-none">
                <div class="primary--text title">Deposit</div>
              </v-card-title>
              <v-card-text light class="text-xs-center">
                Get started by making a deposit. This can be tracked at any time using the public blockchain ledger
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm4 class="p-4">
            <v-card flat="" color="white" class="d-flex flex-column">
              <v-card-text light class="text-xs-center flex-none">
                <img src="/static/images/image-icons/dollar-coin-at-hand.png" alt="deposit image" style="height: 100px;">
              </v-card-text>
              <v-card-title class="layout p-1 justify-center flex-none">
                <div class="primary--text title">Earn</div>
              </v-card-title>
              <v-card-text light class="text-xs-center">
                Begin earning interests the intant your earnings are verified following proper confirmations
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm4 class="p-4">
            <v-card flat="" color="white" class="d-flex flex-column">
              <v-card-text light class="text-xs-center flex-none">
                <img src="/static/images/image-icons/dollar-note-at-hand.png" alt="deposit image" style="height: 100px;">
              </v-card-text>
              <v-card-title class="layout p-1 justify-center flex-none">
                <div class="primary--text title">Withdraw</div>
              </v-card-title>
              <v-card-text light class="text-xs-center">
                <h4 class="body-2 pb-2">
                  <strong>You are in control</strong>
                </h4>
                You can place a withdrawal request at anytime
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End How It Works -->

    <!-- About -->
    <section id="about" class="section-about py-5 py-md-6">
      <v-container>
        <v-layout wrap justify-space-between align-center="">
          <v-flex xs12 sm8>
            <h3 class="headline accent--text ml-2 mb-2">
              <strong>About Supranex</strong>
            </h3>
            <p class="text-xs-center text-sm-left grey--text text--lighten-3">
              Supranex is a reputable cryptocurrence company that offers the best interest on your Supranex Bitcoin Saving Account and provides an instant cryptocurrency exchange platform with the best crypto-to-crypto rates on the market.
            </p>
          </v-flex>

          <v-flex xs12 sm3 d-flex v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-end': $vuetify.breakpoint.smAndUp}">
            <v-btn color="accent" dark class="flex-none">Read More</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End About -->

    <!-- Referral Bonus -->
    <section id="referral-bonus" class="py-5 py-md-6">
      <page-section-header text="5% Referral Bonus" class="primary--text"></page-section-header>

      <v-container>
        <v-layout wrap justify-space-around align-center>
          <v-flex xs12 sm5 d-flex v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-end': $vuetify.breakpoint.smAndUp}" class="child-flex-none">
            <img class="img-contain" style="height: auto; max-height: 250px; max-width: 90%; width: auto" src="/static/images/image-icons/partnership.png" alt="Partnership Image">
          </v-flex>
          <v-flex xs12 sm6>
            <div class="d-flex justify-space-between align-center my-5">
              <img src="/static/images/image-icons/check.png" alt="Check Image" style="height: 50px; width: auto; max-width: 100%;" class="img-contain">
              <div class="ml-3">
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
              </div>
            </div>

            <div class="d-flex justify-space-between align-center my-5">
              <img src="/static/images/image-icons/check.png" alt="Check Image" style="height: 50px; width: auto; max-width: 100%;" class="img-contain">
              <div class="ml-3">
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
              </div>
            </div>

            <div class="d-flex justify-space-between align-center my-5">
              <img src="/static/images/image-icons/check.png" alt="Check Image" style="height: 50px; width: auto; max-width: 100%;" class="img-contain">
              <div class="ml-3">
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
                <p class="m-1">
                  You get 5% Commission. You get 5% Commision.
                </p>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End Referral Bonus -->

    <!-- Counters -->
    <section class="py-4 py-md-5 grey lighten-4">
      <v-container>
        <v-layout wrap v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-space-between': $vuetify.breakpoint.smAndUp}">
          <v-flex tag="p" xs12 sm3 class="text-xs-center mb-4 mb-sm-0">
            <span class="display-1 mb-3 d-inline-block">$25,600</span> <br>
            <span class="title font-weight-normal font-all-caps">MONEY SAVED</span>
          </v-flex>

          <v-flex tag="p" xs12 sm3 class="text-xs-center mb-4 mb-sm-0">
            <span class="display-1 mb-3 d-inline-block">424</span> <br>
            <span class="title font-weight-normal font-all-caps">CUSTOMERS</span>
          </v-flex>
          <v-flex tag="p" xs12 sm3 class="text-xs-center mb-4 mb-sm-0">
            <span class="display-1 mb-3 d-inline-block">200</span> <br>
            <span class="title font-weight-normal font-all-caps">WITHDRAWALS</span>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End Counters -->

    <!-- Testimonials -->
    <section class="py-4 py-md-5">
      <page-section-header text="Testimonials" class="primary--text"></page-section-header>

      <v-container class="mt-4">
        <v-carousel light style="height: 250px;" hide-delimiters class="elevation-0">
          <v-carousel-item class="" src="" v-for="testimony in testimonials" :key="testimony.name">
            <v-layout wrap justify-space-around align-center>
              <v-flex xs12 sm4 d-flex class="flex-column" align-center justify-center>
                <v-avatar size="150px">
                  <img style="max-height: 100%; height: 150px; max-width:100%; width: auto;" :src="testimony.image" alt="avatar">
                </v-avatar>

                <h4 class="title pt-3" v-text="testimony.name"></h4>
              </v-flex>

              <v-flex xs12 sm6 d-flex v-text="testimony.text" class="mt-4 mt-sm-0 pl-3">
              </v-flex>
            </v-layout>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </section>
    <!-- End Testimonials -->

    <!-- FAQ -->
    <section id="faq" class="section-faq py-5 py-md-6">
      <h2 class="headline text-xs-center mb-4 grey--text text--lighten-2 text-elevation">
        <strong>Frequently Asked Questions</strong>
      </h2>

      <v-container>
        <v-layout wrap v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-space-between': $vuetify.breakpoint.smAndUp}">
          <v-flex xs12 sm9>
            <v-expansion-panel popout dark>
              <v-expansion-panel-content v-for="(item,i) in faq" :key="i" class="bg-transparent-dark" style="background: url('/static/images/overlays/01.png');">
                <div slot="header" v-text="item.question" class="title"></div>
                <v-card class="bg-transparent-dark-2">
                  <v-card-text v-text="item.answer "></v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
          <v-flex xs12 sm2 class="hidden-xs-only chlid-flex-none">
            <img style="height: auto; max-height: 150px; max-width: 90%; width: auto; filter: invert(90%);" src="/static/images/image-icons/faq.png " alt="Partnership Image">
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- End FAQ -->

    <!-- Contact Us -->
    <section class="py-5 py-md-6">
      <page-section-header text="Contact Us" class="primary--text"></page-section-header>

      <v-container>
        <v-layout wrap v-bind="{'justify-center': $vuetify.breakpoint.xsOnly, 'justify-space-around': $vuetify.breakpoint.smOnly, 'justify-space-between': $vuetify.breakpoint.mdAndUp}" align-center tag="form" @submit.prevent="sendMessage">
          <v-flex xs12 sm5 md4>
            <v-text-field v-model="form.contact.name" label="Name" :error-messages="errors.collect('name')" v-validate="'required|max:40'" data-vv-name="name" required></v-text-field>

            <v-text-field v-model="form.contact.email" label="E-mail" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name="email" type="email" required></v-text-field>

            <v-text-field v-model="form.contact.subject" label="Subject" :counter="150" :error-messages="errors.collect('subject')" v-validate="'required|max:150'" data-vv-name="subject" required></v-text-field>
          </v-flex>

          <v-flex xs12 sm5 md4>
            <v-text-field v-model="form.contact.message" :counter="500" label="Your Message" :error-messages="errors.collect('message')" v-validate="'required|max:500'" data-vv-name="message" required textarea></v-text-field>
          </v-flex>

          <v-flex xs12 sm12 md2 d-flex justify-center class="child-flex-none">
            <v-btn dark color="primary" :loading="contactFormIsProcessing" type="submit" class="elevation-5">Send</v-btn>
          </v-flex>

        </v-layout>
      </v-container>
    </section>
    <!-- End Contact Us -->

  </div>
</template>

<script>
import PageSectionHeader from '../components/PageSectionHeader'

export default {
  name: 'HomePage',

  data () {
    return {
      isWelcome: false,
      isWelcomeSavings: false,
      isWelcomeExchange: false,
      form: {
        saving: {
          input: null
        },
        exchange: {
          input: null,
          output: null,
          rate: 0.5
        },
        contact: {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      },
      contactFormIsProcessing: false,
      testimonials: [
        {
          name: 'Mr Somebody',
          image: '/static/images/image-icons/partnership.png',
          text:
            'Et libero consequatur adipisci quia natus distinctio sapiente repudiandae. Sequi distinctio tempora sit voluptatem pariatur. Voluptatem praesentium et aut facere. Odio perspiciatis iste animi ut.'
        },
        {
          name: 'Mr Another',
          image: '/static/images/image-icons/partnership.png',
          text:
            'Aut molestiae ea perferendis dolorem officia magnam omnis maxime. Tenetur illum et voluptas voluptatem. Perferendis cumque voluptas voluptate aut nostrum non eligendi voluptas. Commodi excepturi ullam vel. Saepe officia in sit sint.'
        }
      ],
      faq: [
        {
          question: 'How do I invest Supranex?',
          answer:
            'To invest, you need to create Supranex Investment Account by clicking "Create Account" and following the simple process. When your account is created and your e-mail is verified, you can proceed to login. Click "Deposit" in your account and follow the process. Once we receive your funds after 3 Bitcoin network confirmations, your interest will start accumulating.'
        },
        {
          question: 'What is the deposit method',
          answer: 'The deposit method is Bitcoin.'
        },
        {
          question: 'What is the withdrawal method?',
          answer: 'The withdrawal method is Bitcoin.'
        }
      ]
    }
  },

  computed: {
    savingOutput () {
      if (this.errors.collect('saving-input').length > 0) return ''
      const deposit = Number(this.form.saving.input)
      if (!deposit) return ''
      const interest = deposit * this.$store.getters.ratePerYear
      let total = deposit + interest
      return this.numberToCurrencyFormat(total.toFixed(2))
    }
  },

  mounted () {},

  methods: {
    numberToCurrencyFormat (n) {
      return String(n).replace(/(\d)(?=(\d{3})+\.)/g, '$1, ')
    },
    redirectToDepositPage () {
      if (this.errors.collect('saving-input').length > 0) {
        return this.$store.dispatch('setSnackbar', {
          text: 'Please kindly check your saving input for errors.',
          color: 'error'
        })
      }

      this.$router.push({
        path: '/make-deposit',
        query: {
          amount: this.form.saving.input
        }
      })
    },
    sendMessage () {
      console.log('message is being sent')
    }
  },

  components: {
    PageSectionHeader
  }
}
</script>

<style lang="scss">
#get-started {
  background-color: #2e5785;
}
</style>
