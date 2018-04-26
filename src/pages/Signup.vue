<template>
  <div class="hf-100">
    <v-container fill-height>
      <v-layout wrap justify-center>
        <v-flex xs10 sm7 md5 lg4 class="d-flex justify-center align-center chlid-flex-none my-4">
          <form @submit.prevent="signup" class="w-100">
            <h3 class="headline mb-4 text-xs-center primary--text font-weight-bold font-family-secondary">SIGN UP</h3>

            <v-text-field v-model="form.email" label="E-mail" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name="email" type="email" required solo class="border border-primary elevation-0 mb-4"></v-text-field>

            <v-layout wrap justify-space-between>
              <v-flex xs12 xl5>
                <v-text-field v-model="form.password" label="Password" :error-messages="errors.collect('password')" v-validate="'required|min:8'" data-vv-name="password" required :append-icon="showSignupPassword ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSignupPassword = !showSignupPassword)" :type="showSignupPassword ? 'text' : 'password'" solo class="border border-primary elevation-0" />
              </v-flex>

              <v-flex xs12 class="hidden-xl-only caption">
                <p>Password must:
                  <ul class="list-position-inside">
                    <li :class="{'success--text': isMoreThanMin}">not be less than 8 characters</li>
                  </ul>
                </p>
              </v-flex>

              <v-flex xs12 xl5>
                <v-text-field v-model="form.confirmPassword" label="Confirm Password" :error-messages="errors.collect('confirmPassword')" v-validate="'required'" data-vv-name="confirmPassword" data-vv-as="Confirm Password" required :append-icon="showSignupConfirmPassword ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSignupConfirmPassword = !showSignupConfirmPassword)" :type="showSignupConfirmPassword ? 'text' : 'password'" solo class="border border-primary elevation-0 mb-3" />
              </v-flex>
            </v-layout>

            <p class="hidden-lg-and-down">Password must:
              <ul class="list-position-inside">
                <li :class="{'success--text': isMoreThanMin}">not be less than 8 characters</li>
              </ul>
            </p>

            <!-- <v-layout wrap justify-space-around> -->
            <p class="mt-3 mb-0 body-2">Were you referred by someone?</p>
            <v-switch :label="showReferrer ? 'Yes' : 'No'" v-model="showReferrer" hide-details></v-switch>
            <!-- </v-layout> -->

            <transition name="fade-transition">
              <v-text-field v-if="showReferrer" v-model="referrer" label="Referrer's ID" :error-messages="errors.collect('referrer')" v-validate="'alpha_num'" data-vv-name="referrer" required solo class="border border-primary elevation-0"></v-text-field>
            </transition>

            <v-layout justify-space-between class="mt-4">
              <v-btn color="primary" round :loading="formIsProcessing" type="submit">Sign Up</v-btn>

              <v-btn flat round color="primary" to="/signin">Have an Account?</v-btn>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { auth } from '../firebaseInit'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'SignupPage',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      },
      referrer: '',
      showReferrer: false,
      showSignupPassword: false,
      showSignupConfirmPassword: false,
      formIsProcessing: false
    }
  },

  computed: {
    containsLowerCase () {
      const lowerCaseRegExp = new RegExp('(.*[a-z])')
      return lowerCaseRegExp.test(this.form.password)
    },
    containsUpperCase () {
      const upperCaseRegExp = new RegExp('(.*[A-Z])')
      return upperCaseRegExp.test(this.form.password)
    },
    containsNumbers () {
      const numberRegExp = new RegExp('(.*[0-9])')
      return numberRegExp.test(this.form.password)
    },
    containsSymbols () {
      const symbolRegExp = new RegExp('(.*[-_+!@#$%^&*])')
      return symbolRegExp.test(this.form.password)
    },
    isMoreThanMin () {
      return this.form.password.length >= 8
    }
  },

  watch: {},

  created () {
    if (this.$route.query.referrer) {
      this.referrer = this.$route.query.referrer
      this.showReferrer = true
    }
  },

  destroyed () {},

  methods: {
    signup () {
      this.$validator
        .validateAll()
        .then(validity => {
          if (!validity) {
            return this.$store.dispatch('setSnackbar', {
              text: 'Please kindly check form for errors.',
              color: 'error'
            })
          }

          if (this.form.password !== this.form.confirmPassword) {
            return this.$store.dispatch('setSnackbar', {
              text: 'Passwords do not match.',
              color: 'error'
            })
          }

          this.$store.dispatch('setSnackbar', {
            text: 'Your request is being processed'
          })

          this.formIsProcessing = true
          // Remove previous alerts
          this.showAlert = false

          auth
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(user => {
              this.clear()
              this.formIsProcessing = false
              this.$store.dispatch('setSnackbar', {
                text: 'Your account has been created!',
                textColor: 'success--text'
              })
              this.$store.dispatch('sendEmailVerification')
              if (this.referrer) {
                this.$store.dispatch('addReferrerToDb', {
                  uid: user.uid,
                  referrer: this.referrer
                })
              }
            })
            .catch(error => {
              this.formIsProcessing = false
              this.$store.dispatch('setSnackbar', {
                text: error.message,
                textColor: 'error--text'
              })
            })
        })
        .catch(error => console.error(error))
    },

    clear () {
      for (let field in this.form) {
        this.form[field] = ''
      }
      this.$validator.reset()
    }
  }
}
</script>
