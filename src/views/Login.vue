<template>
  <section class="page-login">
    <div class="login__box">
      <div class="logo-block">
        <harp-logo style="padding-right: 20px"/>
        <harp-text/>
      </div>
      <h1>Login to your account</h1>
      <form @submit.prevent="login">
        <fieldset>
          <legend>Username</legend>
          <input type="text" name="username"
            placeholder="Enter login" class="input"
            v-model="form.username">
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              class="input"
              v-model="form.password">
          </fieldset>
          <button type="submit" class="button__large button__accent login">Login</button>
      </form>
      <div class="login-error" v-if="loginError">
        <span class="error-text">Can't login to the system.</span>
      </div>
      <router-link v-if="forgotPassword" class="forgot-password-link" to="/forgot-password">
        <span class="">Forgot password?</span>
      </router-link>
    </div>
  </section>
</template>
<script>
// import { required, minLength } from '@vuelidate/validators'
// import { useVuelidate } from '@vuelidate/core'
// import { request } from '@/tools/requests'
import { AUTH_REQUEST, AUTH_LOGOUT } from '@/store/actions/auth'
import harpLogo from '@/assets/images/harpLogo'
import harpText from '@/assets/images/harpText'
// import { timeout, signal, controller } from '@/tools/timeout'

export default {
  name: 'login',
  components: { harpLogo, harpText },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginError: false,
      errorMessage: null,
      forgotPassword: false
    }
  },
  methods: {
    login () {
      this.loginError = false
      const body = {
        username: this.form.username,
        password: this.form.password
      }
      console.log('Login. login. body:', body)
      this.$store.dispatch(AUTH_REQUEST, body).then(() => {
        this.$router.push('/notifications-panel')
        console.log('Login success')
      }).catch((err) => {
        this.forgotPassword = true
        this.errorMessage = 'Can\'t login to the system. Please check internet connection'
        this.loginError = true
        console.log('Login error: ', err)
      })
      console.log('Login finish')
    },
    logout () {
      console.log('Login. logout ...')
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login?message=logoutfromlogin')
        })
    }
  }
  // setup: () => ({
  // }),
  // validations () {
  //   return {
  //     form: {
  //       username: { minLength: 3 },
  //       password: { }
  //     }
  //   }
  // }
}

</script>

<style>
.login-error {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  border-radius: 5px;
  float: left;
  max-width: 300px;
  padding: 6px 30px;
  margin: 10px 0;
}
.error-text {
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250,250,250,.3);
}

.logo-block {
  display: flex;
  align-items: center;
  width: 280px;
}
</style>
