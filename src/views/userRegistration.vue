<template>
  <section class="page-login registration-form">
    <div class="registration__box">
      <div>
        <h1 style="text-align: center;">Register account</h1>
      </div>
      <vee-form @submit="register" :validation-schema="schema" class="register-form">
        <input-text
          class="input-message"
          name="full_name"
          type="text"
          label="Full name"
          placeholder="Your name"
          :value="userFullName"
          success-message="Nice to meet you"
        />
        <input-text
          class="input-message"
          name="username"
          type="text"
          label="Username"
          :value="username"
          placeholder="Your nickname"
          success-message="Looks good"
        />
        <input-text
          class="input-message"
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          success-message="Nice and secure!"
        />
        <input-text
          class="input-message"
          name="confirm_password"
          type="password"
          label="Confirm Password"
          placeholder="Type it again"
          success-message="Glad you remembered it!"
        />
        <button
          type="submit"
          class="button__large button__accent login" style="margin: auto; margin-top: 35px;" >Register</button>
      </vee-form>
      <div class="login-error" v-if="loginError">
        <span class="error-text">Can't login to the system.</span>
      </div>
    </div>
  </section>
</template>

<script>
import { Form } from 'vee-validate'
import inputText from '@/forms/inputText'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import * as Yup from 'yup'
import store from '@/store'

export default {
  name: 'registration',
  components: {
    'vee-form': Form,
    'input-text': inputText
  },
  computed: {
    // username () {
    //   return this.schema.username
    // }
  },
  watch: {
    // username () {
    //   this.checkValidUser()
    // }
  },
  data () {
    return {
      firstName: '',
      secondName: '',
      username: '',
      password: '',
      confirmPass: '',
      token: '',
      email: '',
      userFullName: '',
      loginError: false,
      errorMessage: null,
      schema: Yup.object().shape({
        name: Yup.string().required(),
        username: Yup.string().min(6).required().test('user-valid', 'Username already exist', (value) => this.checkValidUser(value)),
        password: Yup.string().min(8).required().matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must contain 8 characters including Uppercase, Lowercase, Number and special case Character'
        ),
        full_name: Yup.string().min(3).required(),
        confirm_password: Yup.string()
          .required()
          .oneOf([Yup.ref('password')], 'Passwords do not match')
      })
    }
  },
  beforeMount () {
    this.parseQuery()
  },
  methods: {
    registerTst (values) {
      console.log(values)
      console.dir(this.schema)
    },
    register (values) {
      const user = {
        first_name: values.first_name,
        second_name: '',
        username: values.username,
        email: this.email,
        token: this.token,
        password: values.password
      }
      const requestObj = {
        service: 'users',
        path: '/users/invite/confirm',
        method: 'POST',
        body: JSON.stringify(user),
        options: {}
      }
      console.log('userRegistration. register. body: ', JSON.stringify(user))
      const msg = 'Invite user'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('userRegistration. register. response:', response)
          this.$router.push({ path: 'login', query: { source: 'registration' } })
        })
        .catch((error) => {
          console.error('userRegistration. register. Error:', error)
        })
    },
    async checkValidUser (username) {
      console.log('userRegistration. checkValidUser. body:', username)
      let valid = false
      const requestObj = {
        service: 'users',
        path: '/users/user-exist',
        method: 'POST',
        body: JSON.stringify({
          username: username,
          token: this.token
        }),
        options: { reportError: true }
      }
      const msg = 'username validation'
      const popupOptions = {
        showDialog: false
      }
      await store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('userRegistration. checkValidUser. response:', response.user_exist)
          // this.userValid = !response.user_exist
          valid = !response.user_exist
          return !response.user_exist
        })
        .catch((error) => {
          console.error('userRegistration. checkValidUser. Error:', error)
          return false
        })
      return valid
    },
    parseQuery () {
      const query = this.$route.query
      this.email = this.$route.query.email
      this.username = this.$route.query.username
      // this.userFullName = this.$route.query.username
      this.token = this.$route.query.token
      console.log('userRegistration. parseQuery', query)
    }
  }
}

</script>

<style>
.login-error {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  border-radius: var(--r-radius);
  float: left;
  max-width: 300px;
  padding: 20px 30px;
  margin-top: 10px
}
.error-text {
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250,250,250,.3);
}
.login-field-error {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  border-radius: var(--r-radius);
  float: left;
  max-width: 300px;
  padding: 20px 30px;
  margin-top: 10px
}
.registration-form {
  display: flex;
  flex-direction: column;
}
.registration__box {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  background: var(--c-white);
  padding: 1.5rem;
  width: 100%;
  max-width: 300px;
}
</style>
