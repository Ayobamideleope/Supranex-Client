<template>
  <div class="h-100">
    <v-container fill-height>
      <v-layout wrap justify-center>
        <v-flex xs10 sm7 md5 lg4 class="d-flex justify-center align-center chlid-flex-none my-4">
          <form @submit.prevent="forgotPassword" class="w-100">
            <h3 class="headline mb-4 text-xs-center primary--text font-weight-bold font-family-secondary">Forgot Password</h3>

            <v-text-field v-model="form.email" label="E-mail" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name="email" type="email" required solo class="border border-primary elevation-0 mb-3"/>

            <v-layout justify-space-between>
              <v-btn color="accent" round :loading="formIsProcessing" type="submit">Forgot Password</v-btn>

              <v-btn flat round color="primary" to="/signin">Back to Sign In</v-btn>
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
  name: 'ForgotPasswordPage',
  data () {
    return {
      form: {
        email: ''
      },
      formIsProcessing: false
    }
  },

  methods: {
    forgotPassword () {
      this.$validator
        .validateAll()
        .then(validity => {
          if (!validity) {
            return this.$store.dispatch('setSnackbar', {
              text: 'Please kindly check form for errors.',
              color: 'error'
            })
          }

          this.$store.dispatch('setSnackbar', {
            text: 'A reset link is being sent to your mail'
          })

          this.formIsProcessing = true
          // Remove previous alerts
          this.showAlert = false

          auth
            .sendPasswordResetEmail(this.form.email, {
              url: 'https://www.supranex.com/dashboard/'
            })
            .then(user => {
              this.clear()
              this.formIsProcessing = false
              this.$store.dispatch('setSnackbar', {
                text: 'Reset Link Sent! Please check you inbox',
                textColor: 'success--text'
              })
              this.$router.push({ path: '/signin' })
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
