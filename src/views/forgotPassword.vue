<template>
  <section class="page-login registration-form">
    <div class="registration__box">
      <div>
        <h1 style="text-align: center; padding-bottom: 10px">Restore password</h1>
      </div>
      <div class="LoginEmailPasswordForm">
        <div class="LoginEmailPasswordForm-emailAndPassword">
          <span class="LoginFieldHeader">Email address</span>
          <input type="email" name="email"
                 placeholder="Email"
                 class="input__text input"
                 :class="{'invalid': v$.email.$invalid}"
                 v-model="email"
                 autocomplete="off">
        </div>
        <div v-if="v$.email.$invalid && email.length > 0">
              <span class="input form-validation-error"
              >Invalid email address</span>
        </div>
      </div>
      <div class="register-form">
        <button
          type="submit"
          class="button__large login"
          style="margin: auto; margin-top: 35px;"
          :disabled="v$.$invalid"
          :class="{'button__accent': !v$.$invalid, 'disabled': v$.$invalid}"
          @click="restorePassword"
        >Send restore link</button>
      </div>
    </div>
  </section>
  <confirmation-popup ref="confirmation"></confirmation-popup>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'

export default {
  name: 'password-restore',
  components: { ConfirmationPopup },
  data () {
    return {
      v$: useVuelidate(),
      email: ''
    }
  },
  validations () {
    return {
      email: { required, email }
    }
  },
  methods: {
    async restorePassword () {
      const user = {
        username: this.username,
        token: this.token,
        password: this.password
      }
      const requestObj = {
        service: 'users',
        path: '/users/reset-password-email/' + this.email,
        method: 'POST',
        body: JSON.stringify(user),
        options: {}
      }
      console.log('resetPassword. changePassword. body: ', requestObj)
      const msg = 'changePassword'
      const popupOptions = {
        showDialog: true
      }
      await this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('resetPassword. changePassword. response:', response)
          this.$refs.confirmation.showScenario('orgRegistration')
          this.$router.push({ path: 'login', query: { source: 'registration' } })
        })
        .catch((error) => {
          console.error('resetPassword. changePassword Error:', error)
        })
    }
  }
}

</script>

<style>

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
.LoginFieldHeader {
  font-size: 12px;
  line-height: 18px;
  margin-top: 16px;
  color: var(--color-text-weak);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.LoginEmailPasswordForm {
  display: flex;
  flex-direction: column;
}
.LoginEmailPasswordForm-emailAndPassword {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.password-field {
  padding: 10px 0;
}
.disabled {
  background-color: dimgrey;
}
</style>
