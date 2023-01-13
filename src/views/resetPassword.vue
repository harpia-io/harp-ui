<template>
  <section class="page-login registration-form">
    <div class="registration__box">
      <div>
        <h1 style="text-align: center; padding-bottom: 10px">Reset password</h1>
      </div>
      <!--Password-->
      <div class="form-input-with-delete password-field">
        <div class="form-input-with-delete__input-block">
          <input type="password" name="password"
                 placeholder="Type new password"
                 class="input__text input"
                 :class="{'invalid': v$.password.$invalid}"
                 v-model="password"
                 @blur="touchFields">
        </div>
        <div v-if="v$.password.$error">
          <span v-for="(error, index) in v$.password.$errors" :key="index"
                class="input form-validation-error"
          >{{ error.$message }}</span>
        </div>
      </div>
<!--      <span> {{ password }}</span>-->
      <!--Confirm pass-->
      <div class="form-input-with-delete password-field">
        <div class="form-input-with-delete__input-block">
          <input type="password" name="confirmpass"
                 placeholder="Confirm password"
                 class="input__text input"
                 :class="{'invalid': v$.confirmPass.$invalid}"
                 v-model="confirmPass"
                 autocomplete="off"
                 >
        </div>
        <div v-if="v$.confirmPass.$error">
          <span v-for="(error, index) in v$.confirmPass.$errors" :key="index"
                class="input form-validation-error"
          >{{ error.$message }}</span>
        </div>
      </div>
<!--      <span> {{ confirmPass }}</span>-->
      <div class="register-form">
        <button
            type="submit"
            class="button__large login"
            style="margin: auto; margin-top: 35px;"
            :disabled="v$.$invalid"
            :class="{'button__accent': !v$.$invalid, 'disabled': v$.$invalid}"
            @click="changePassword"
        >Change password</button>
      </div>
<!--      <div class="login-error" v-if="loginError">-->
<!--        <span class="error-text">Can't login to the system.</span>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import useVuelidate from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
export default {
  name: 'password-reset',
  data () {
    return {
      v$: useVuelidate(),
      password: '',
      confirmPass: '',
      token: '',
      username: '',
      loginError: false,
      errorMessage: null
    }
  },
  validations () {
    return {
      password: {
        required,
        isPasswordStrong: helpers.withMessage(
          'Must contain 8 characters including Uppercase, Lowercase, Number and special case character',
          this.isPasswordStrongValidator
        )
      },
      confirmPass: { sameAs: sameAs(this.password) }
    }
  },
  beforeMount () {
    this.parseQuery()
  },
  methods: {
    isPasswordStrongValidator (password) {
      return regex.test(password)
    },
    touchFields () {
      this.v$.password.$touch()
      this.v$.confirmPass.$touch()
    },
    updatePass (value) {
      this.password = value
    },
    updateConfirmPass (value) {
      this.confirmPass = value
    },
    changePassword () {
      const user = {
        username: this.username,
        token: this.token,
        password: this.password
      }
      const requestObj = {
        service: 'users',
        path: '/users/reset-password/confirm',
        method: 'POST',
        body: JSON.stringify(user),
        options: {}
      }
      console.log('resetPassword. changePassword. body: ', JSON.stringify(user))
      const msg = 'changePassword'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('resetPassword. changePassword. response:', response)
          this.$router.push({ path: 'login', query: { source: 'registration' } })
        })
        .catch((error) => {
          console.error('resetPassword. changePassword Error:', error)
        })
    },
    parseQuery () {
      const query = this.$route.query
      this.username = this.$route.query.username
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

.password-field {
  padding: 10px 0;
}
.disabled {
  background-color: dimgrey;
}
</style>
