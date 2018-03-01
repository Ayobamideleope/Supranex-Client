<template>
  <div class="h-100">
    <v-container fill-height>
      <v-layout wrap justify-center class="transition-medium">
        <v-flex xs10 sm7 md5 lg4 class="d-flex justify-center align-center chlid-flex-none">
          <form @submit.prevent="signin" key="signin">
            <h3 class="headline mb-4 text-xs-center primary--text font-weight-bold font-family-secondary">Sign In</h3>

            <v-text-field v-model="form.email" label="E-mail" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-name="email" type="email" required/>

            <v-text-field v-model="form.password" label="Password" :error-messages="errors.collect('password')" v-validate="'required'" data-vv-name="password" required :append-icon="showSigninPassword ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (showSigninPassword = !showSigninPassword)" :type="showSigninPassword ? 'text' : 'password'"></v-text-field>

            <v-layout wrap justify-space-between>
              <v-btn flat small round color="primary" to="/forgot-password">Forgot Password?</v-btn>

              <v-btn flat small round color="primary" to="/signup">Create an Account?</v-btn>
            </v-layout>

            <v-layout wrap justify-center class="child-flex-none">
              <v-btn color="primary" :loading="formIsProcessing" round type="submit">Sign In</v-btn>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { auth } from '../firebaseInit';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'SigninPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      showSigninPassword: false,
      formIsProcessing: false
    };
  },

  methods: {
    signin() {
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
            text: 'Processing Verification'
          });

          this.formIsProcessing = true;

          const vm = this;

          auth
            .signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(user => {
              this.clear();
              this.formIsProcessing = false;
            })
            .catch(error => {
              this.formIsProcessing = false;
              this.$store.dispatch('setSnackbar', {
                text: error.message,
                textColor: 'error--text'
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
