<template>
  <title>Log in - Harp</title>

  <div class="login-card-layout">
    <div class="login-card-layout-card">
      <div class="logo-block">
        <harp-logo style="padding-right: 20px"/>
        <harp-text/>
      </div>
      <div class="login-card-layout-harp-logo-container"></div>
      <div class="login-container">
        <!--LogIn-->
        <div v-if="signIn" class="LoginEmailPasswordForm">
          <span class="registration-header">Log in</span>
          <div class="LoginEmailPasswordForm-emailAndPassword">
            <span class="LoginFieldHeader">Email address</span>
            <input type="email" class="LoginInput"
                   name="e" autoComplete="email"
                   autofocus="" v-model="email"
                   @blur="v$.email.$touch()"
            />
            <div v-if="v$.email.$invalid && email.length > 0">
              <span class="input form-validation-error"
              >Invalid email address</span>
            </div>
            <span class="LoginFieldHeader">Password</span>
            <input type="password" class="LoginInput"
                   name="p" autoComplete="current-password"
                   v-model="loginPassword"
            />
            <div v-if="loginError">
              <span class="input form-validation-error"
              >Invalid email address or password</span>
            </div>
          </div>
<!--          <a class="forgot-password-link">-->
            <router-link class="forgot-password-link" to="/forgot-password">
              <span class="">Forgot your password?</span>
            </router-link>
<!--          </a>-->
          <div class="button__large button__accent login" style="margin-top: 20px"
               :invalid="!logInValid"
               :class="{'button__accent': logInValid, 'disabled': !logInValid}"
               @click="logIn"
          >Log in
          </div>
          <div class="LoginSignUp-block">
            <span class="LoginSignUp-text">Don't have an account?</span>
            <a href="#" @click.prevent="signIn=false">Sign up</a>
          </div>
        </div>
        <!--SignUp-->
        <div v-else class="LoginEmailPasswordForm">
          <span class="registration-header">Try for free</span>
          <div class="LoginEmailPasswordForm-emailAndPassword">
            <span class="LoginFieldHeader">Email</span>
            <input type="email" class="LoginInput" name="e"
                   autoComplete="email" autofocus=""
                   v-model="email"
                   @blur="v$.email.$touch()"
            />
            <div v-if="v$.email.$invalid && email.length > 0">
              <span class="input form-validation-error"
              >Invalid email address</span>
            </div>
            <div v-if="emailExist">
              <span class="input form-validation-error"
              >Email already registered in the system. Use LogIn form to login</span>
            </div>
<!--            <span class="LoginFieldHeader">Password</span>-->
<!--            <input type="password" class="LoginInput" name="p"-->
<!--                   autoComplete="current-password"-->
<!--                   v-model="password"-->
<!--                   @blur="v$.password.$touch()"-->
<!--            />-->
<!--            <div v-if="v$.password.$error">-->
<!--              <span v-for="(error, index) in v$.password.$errors" :key="index"-->
<!--                    class="input form-validation-error"-->
<!--              >{{ error.$message }}</span>-->
<!--            </div>-->
<!--            <span class="LoginFieldHeader">Confirm password</span>-->
<!--            <input type="password" class="LoginInput" name="p"-->
<!--                   autoComplete="confirm-password"-->
<!--                   v-model="confirmPassword"-->
<!--                   @blur="v$.confirmPassword.$touch()"-->
<!--            />-->
<!--            <div v-if="v$.confirmPassword.$error">-->
<!--              <span class="input form-validation-error">Passwords must be identical</span>-->
<!--            </div>-->
            <span class="LoginSignUp-agreement-text">
              By signing up, I agree to the Harp
              <a href="https://harpia.io/about-us/">Privacy Policy</a> and
              <a href="https://harpia.io/about-us/">Terms of Service</a></span>
          </div>
          <div class="button__large login" style="margin-top: 20px"
               :invalid="v$.email.$invalid"
               :class="{'button__accent': !v$.email.$invalid, 'disabled': v$.email.$invalid}"
               @click="signUp"
          >Sing up
          </div>
          <div  class="LoginSignUp-block">
            <span class="LoginSignUp-text">Already have an account?</span>
            <a href="#" @click.prevent="signIn=true">Log in</a>
          </div>
        </div>
      </div>
    </div>
    <div class="LoginFooter"></div>
  </div>
  <confirmation-popup ref="confirmation"></confirmation-popup>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import harpLogo from '@/assets/images/harpLogo'
import harpText from '@/assets/images/harpText'
import { ref } from 'vue'
import { AUTH_REQUEST } from '@/store/actions/auth'

// const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
export default {
  name: 'login-single-org',
  components: { ConfirmationPopup, harpLogo, harpText },
  data () {
    return {
      v$: useVuelidate(),
      signIn: true,
      username: '',
      email: '',
      loginPassword: '',
      // password: 'Q1w2e3r4t%',
      // confirmPassword: 'Q1w2e3r4t%',
      emailExist: false,
      loginError: false
    }
  },
  computed: {
    // signUpValid () {
    //   return !this.v$.password.$invalid && !this.v$.confirmPassword.$invalid
    // },
    logInValid () {
      return !this.v$.email.$invalid
    }
  },
  beforeMount () {
    this.parseRouteQuery()
  },
  watch: {
    email () {
      this.emailExist = false
    }
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  validations () {
    return {
      email: { required, email }
      // password: {
      //   isPasswordStrong: helpers.withMessage(
      //     'Must contain 8 characters including Uppercase, Lowercase, Number and special case character',
      //     this.isPasswordStrongValidator
      //   )
      // },
      // confirmPassword: { sameAs: sameAs(this.password) }
    }
  },
  methods: {
    // isPasswordStrongValidator (password) {
    //   return regex.test(password)
    // },
    logIn () {
      if (this.logInValid) {
        const body = {
          username: this.email,
          password: this.loginPassword
        }
        console.log('LoginSingleOrl. logIn. body: ', body)
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
      } else {
        this.v$.email.$touch()
      }
    },
    async emailExistCheck () {
      let emailExist = true
      const msg = 'Email exist check'
      const popupOptions = {
        showDialog: true
      }
      const path = '/users/user-email-exist/' + encodeURI(this.email)
      const requestObj = {
        service: 'users',
        path: path,
        method: 'GET',
        body: null,
        options: {}
      }
      await this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          emailExist = response.user_exist
        })
        .catch((error) => {
          console.error('LoginSingleOrg. emailExist Error:', error)
        })
      return emailExist
    },
    async signUp () {
      if (!this.v$.email.$invalid) {
        const emailExistRes = await this.emailExistCheck()
        console.log('LoginSignleOrg. singUp. emailExistRes', emailExistRes)
        if (emailExistRes) {
          this.emailExist = true
        } else {
          this.emailExist = false
          const msg = 'Register user'
          const popupOptions = {
            showDialog: true
          }
          const body = {
            email: this.email
          }
          const requestObj = {
            service: 'environments',
            path: '/environments/create-organization',
            method: 'PUT',
            body: JSON.stringify(body),
            options: {}
          }
          this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
            .then(response => {
              this.$refs.confirmation.showScenario('orgRegistration')
            })
            .catch((error) => {
              console.error('LoginSingleOrg. signUp Error:', error)
            })
        }
      } else {
        this.v$.email.$touch()
      }
    },
    parseRouteQuery () {
      const query = this.$route.query
      this.demo = query.demo
      console.log(this.demo)
      if (this.demo) {
        console.log('LoginSingleOrg. parseRouteQuery. Demo mode')
        this.email = window.Config.demo_email
        this.loginPassword = window.Config.demo_password
        this.logIn()
      }
    }
  }
}
</script>

<style scoped>
:root {
  --color-text: #151b26;
  --color-text-deprecated: #273240;
  --color-text-rgb: 21, 27, 38;
  --color-text-foreground: #fff;
  --color-text-disabled: #9ca6af;
  --color-text-disabled-deprecated: #cbd4db;
  --color-text-weak: #6f7782;
  --color-text-weak-deprecated: #9ca6af;
  --color-text-weak-hover: #151b26;
  --color-text-strong-disabled: #6f7782;
  --color-icon: #6f7782;
  --color-icon-deprecated: #273240;
  --color-icon-rgb: 111, 119, 130;
  --color-icon-foreground: #fff;
  --color-icon-hover: #273240;
  --color-icon-active: #151b26;
  --color-icon-disabled: #9ca6af;
  --color-icon-weak-deprecated: #9ca6af;
  --color-icon-strong: #151b26;
  --color-border: #e8ecee;
  --color-border-deprecated: #cbd4db;
  --color-border-rgb: 232, 236, 238;
  --color-border-inverse: #f6f8f9;
  --color-border-hover: #cbd4db;
  --color-border-active: #9ca6af;
  --color-border-strong: #cbd4db;
  --color-background-weak: #fff;
  --color-background-weak-rgb: 255, 255, 255;
  --color-background-weak-hover: #f6f8f9;
  --color-background-weak-hover-deprecated: #f6f8f9;
  --color-background-medium: #f6f8f9;
  --color-background-medium-rgb: 246, 248, 249;
  --color-background-hover: #e8ecee;
  --color-background-active: #cbd4db;
  --color-background-strong: #e8ecee;
  --color-background-strong-deprecated: rgba(232, 236, 238, 0.5);
  --color-placeholder: #6f7782;
  --color-placeholder-deprecated: #9ca6af;
  --color-selected-text: #008ce3;
  --color-selected-text-deprecated: #14aaf5;
  --color-selected-text-hover: #008ce3;
  --color-selected-icon: #14aaf5;
  --color-selected-icon-deprecated: #32c1ff;
  --color-selected-icon-strong-deprecated: #008ce3;
  --color-selected-border: #14aaf5;
  --color-selected-border-deprecated: #caeeff;
  --color-selected-border-hover: #008ce3;
  --color-selected-border-active: #008ce3;
  --color-selected-background: #edf8ff;
  --color-selected-background-deprecated: #caeeff;
  --color-selected-background-hover: #caeeff;
  --color-selected-background-active: #caeeff;
  --color-selected-background-strong: #14aaf5;
  --color-new-text: #14aaf5;
  --color-new-icon: #14aaf5;
  --color-new-icon-deprecated: #008ce3;
  --color-new-border: #14aaf5;
  --color-new-background: #32c1ff;
  --color-success-text: #00bf9c;
  --color-success-text-hover: #00bf9c;
  --color-success-text-hover-deprecated: #25e8c8;
  --color-success-icon: #25e8c8;
  --color-success-icon-hover: #00bf9c;
  --color-success-icon-strong: #00bf9c;
  --color-success-background: #e2fffa;
  --color-success-background-hover: #b0fff1;
  --color-warning-text: #f2a100;
  --color-warning-text-hover: #fcbd01;
  --color-warning-icon: #fcbd01;
  --color-warning-icon-hover: #f2a100;
  --color-warning-icon-strong: #f2a100;
  --color-warning-background: #fffede;
  --color-upsell-text: #fcbd01;
  --color-upsell-text-deprecated: #f2a100;
  --color-upsell-text-hover: #f2a100;
  --color-upsell-icon: #fcbd01;
  --color-upsell-icon-deprecated: #f2a100;
  --color-upsell-icon-hover: #f2a100;
  --color-upsell-icon-strong: #f2a100;
  --color-upsell-background: #fffede;
  --color-upsell-background-hover: #fff78f;
  --color-upsell-border: #fcbd01;
  --color-error-text: #ed4758;
  --color-error-text-deprecated: #ff5263;
  --color-error-icon: #ff5263;
  --color-error-icon-deprecated: #ed4758;
  --color-error-icon-hover: #ed4758;
  --color-error-icon-strong: #ed4758;
  --color-error-border: #ed4758;
  --color-error-border-deprecated: #ff5263;
  --color-error-background-weak: #ffedef;
  --color-error-background-strong: #ff5263;
  --color-soon-text: #00bf9c;
  --color-soon-icon: #00bf9c;
  --color-soon-icon-strong: #00bf9c;
  --color-soon-background: #e2fffa;
  --color-overdue-text: #ed4758;
  --color-overdue-icon: #ed4758;
  --color-overdue-icon-strong: #ed4758;
  --color-overdue-border: #ed4758;
  --color-overdue-background: #ffedef;
  --color-overdue-background-strong: #ff5263;
  --color-important-icon: #fcbd01;
  --color-important-icon-rgb: 252, 189, 1;
  --color-important-icon-hover: #f2a100;
  --color-important-icon-strong: #f2a100;
  --color-important-border: #ffe01b;
  --color-important-background: #fffede;
  --color-danger-text: #ed4758;
  --color-danger-text-deprecated: #ff5263;
  --color-danger-text-hover: #ed4758;
  --color-danger-text-hover-deprecated: #ff5263;
  --color-danger-text-active: #ed4758;
  --color-danger-icon: #ff5263;
  --color-danger-icon-deprecated: #ed4758;
  --color-danger-icon-hover: #ff5263;
  --color-danger-icon-strong: #ed4758;
  --color-danger-border: #ed4758;
  --color-danger-background-weak: #ffedef;
  --color-danger-background-strong: #ff5263;
  --color-drop-target-text: #14aaf5;
  --color-drop-target-border-deprecated: #273240;
  --color-drop-target-background: rgba(255, 255, 255, 0.95);
  --color-beta-text: #796eff;
  --color-beta-text-deprecated: #635ac7;
  --color-beta-text-weak: #aba3ff;
  --color-beta-icon: #796eff;
  --color-beta-icon-rgb: 121, 110, 255;
  --color-beta-icon-hover: #796eff;
  --color-beta-background: #796eff;
  --color-beta-background-deprecated: #9287ff;
  --color-beta-background-weak: #f0f0ff;
  --color-beta-background-strong: #635ac7;
  --color-beta-background-hover: #635ac7;
  --color-beta-border: #796eff;
  --color-beta-border-deprecated: #9287ff;
  --color-beta-border-hover: #635ac7;
  --color-beta-border-hover-deprecated: #aba3ff;
  --color-beta-border-active: #635ac7;
  --color-beta-border-active-deprecated: #aba3ff
}

.login-card-layout {
  align-items: center;
  background: var(--color-background-medium);
  display: flex;
  flex-direction: column;
  max-width: 330px;
}

.login-card-layout-card {
  background-color: #fff;
  /*border-radius: 8px;*/
  box-shadow: 0 5px 20px 0 rgba(21,27,38,.08);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
  max-width: 440px;
  padding: 24px 48px 48px;
  width: calc(100% + 50px);
}
.login-card-layout-harp-logo-container {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  /*margin-bottom: 48px;*/
}
.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.SeparatorRow {
  align-items: center;
  display: flex;
  text-align: center;
}
.SeparatorRow-horizontalLine {
  border-top: 1px solid var(--color-border);
  flex: 1 1 auto;
  margin-top: 8px;
  min-width: 1px;
  padding-top: 8px;
}
.SeparatorRow-label {
  color: var(--color-text-weak);
  margin: 0 8px;
}
.LoginDefaultView-separatorRow {
  color: #cbd4db !important;
  font-size: 16px;
}
.LoginEmailPasswordForm {
  display: flex;
  flex-direction: column;
}
.LoginEmailPasswordForm-emailAndPassword {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 32px;
}
.LoginInput {
  height: 36px;
  margin-top: 8px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  background-color: var(--color-background-weak);
  border: 1px;
  border-style: solid;
  border-color: var(--color-border-strong);
  border-radius: 6px;
  padding: 0 12px;
  box-sizing: border-box;
}
.forgot-password-link {
  /*height: 36px;*/
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  background-color: var(--color-background-weak);
  color: var(--color-text-weak);
}
.LoginFieldHeader {
  font-size: 12px;
  line-height: 18px;
  margin-top: 16px;
  color: var(--color-text-weak);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.LoginSignUp-block {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.LoginSignUp-text {
  margin-right: 10px;
  font-size: 14px;
  line-height: 18px;
  color: var(--color-text-weak);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.LoginSignUp-agreement-text {
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-weak);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.LoginFooter {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  margin-top: 64px;
}
.registration-header {
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  line-height: 18px;
  color: var(--color-text-weak);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,Arial,sans-serif;
}
.logo-block {
  display: flex;
  align-items: center;
}
</style>
