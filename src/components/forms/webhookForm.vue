<template>
  <div class="scenario-webhook-form__block">
    <div class="scenario-webhook-form__block-row">
      <div class="scenario-section__block-row-item list-item-number">
        {{index + 1}}.
      </div>
      <div class="webhook-url-input__block">
        <div class="form-input-with-delete__input-block">
          <input type="text" name="text"
                 placeholder="Webhook url"
                 class="input__text input webhook-url-input"
                 :class="{'invalid': v$.$invalid}"
                 v-model="url"
                 @blur="v$.url.$touch"
                 @input="updateWebhookObj"/>
        </div>
        <div v-if="v$.$error">
        <span v-for="(error, index) in v$.$errors" :key="index"
              class="input form-validation-error"
        >{{ error.$message }}</span>
        </div>
      </div>
      <div class="webhook-toggle-block" style="margin-left: auto">
        <span>POST request:</span>
        <label class="switch" :for="'json_' + index">
          <input type="checkbox" :id="'json_' + index" v-model="showJson" @input="updateWebhookObj">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="webhook-toggle-block">
        <span>Headers:</span>
        <label class="switch" :for="'headers_' + index">
          <input type="checkbox" :id="'headers_' + index" v-model="showHeaders" @input="updateWebhookObj">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="webhook-toggle-block">
        <span>BasicAuth:</span>
        <label class="switch" :for="'auth_' + index">
          <input type="checkbox" :id="'auth_' + index" v-model="showAuth" @input="updateWebhookObj">
          <span class="slider round"></span>
        </label>
      </div>
      <button @click="$emit('remove-item')">
        <remove-icon :color="'grey'"/>
      </button>
<!--      <button-->
<!--        class="scenario-webhook-form__row-item button__medium"-->
<!--        @click="showHeaders = !showHeaders">Headers</button>-->
<!--      <button-->
<!--        class="scenario-webhook-form__row-item button__medium"-->
<!--        @click="showVariables = !showVariables">Variables</button>-->
<!--      <button-->
<!--        class="scenario-webhook-form__row-item button__medium"-->
<!--        @click="showAuth = !showAuth">Auth</button>-->
    </div>
    <div class="scenario-webhook-form__block-row" v-if="showJson">
      <div class="scenario-webhook-form__row-item" style="width: 100%">
        <span>Body: </span>
        <textarea
          v-model="json"
          class="scenario-webhook__textarea"
          @input="updateWebhookObj"
        ></textarea>
      </div>
    </div>
    <div class="scenario-webhook-form__block-row" v-if="showHeaders">
      <div class="scenario-webhook-form__row-item" style="width: 100%">
        <span>Headers: </span>
        <textarea
          v-model="headers"
          class="scenario-webhook__textarea"
          @input="updateWebhookObj"
        ></textarea>
      </div>
    </div>
    <div class="scenario-webhook-form__block-row" v-if="showAuth">
      <div class="scenario-webhook-form__row-item" style="width: 100%">
        <span>Authentication: </span>
        <div class="scenario-webhook-form__auth_block">
          <span>Username:</span>
          <input type="text" name="text"
                 placeholder="login"
                 class="input__text input webhook-url-input"
                 v-model="basicAuth.login"
                 @input="updateWebhookObj"
          />
          <span>Password:</span>
          <input type="password" name="text"
                 placeholder="password"
                 class="input__text input webhook-url-input"
                 v-model="basicAuth.password"
                 @input="updateWebhookObj"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import RemoveIcon from '@/components/icons/removeIcon'

export default {
  components: { RemoveIcon },
  props: ['webhookObj', 'index'],
  emits: ['remove-item', 'update-item'],
  data () {
    return {
      v$: useVuelidate(),
      showHeaders: false,
      showJson: false,
      showAuth: false,
      url: '',
      headers: '',
      basicAuth: {},
      json: ''
    }
  },
  validations () {
    return {
      url: { required }
    }
  },
  beforeMount () {
    this.v$.url.$touch()
    this.parseWebhookObj()
  },
  methods: {
    parseWebhookObj () {
      console.log('webhookForm. parseWebhookObj. webhookObj:', this.webhookObj)
      this.url = this.webhookObj.url
      this.headers = this.webhookObj.headers
      this.basicAuth = this.webhookObj.basicAuth
      this.json = this.webhookObj.json
      this.showAuth = Object.keys(this.basicAuth).length > 0
      this.showJson = this.json.length > 0
      this.showHeaders = this.headers.length > 0
    },
    updateWebhookObj () {
      const self = this
      setTimeout(function () {
        console.log('webhookForm. updateWebhookObj. showJson:', self.showJson)
        console.log('webhookForm. updateWebhookObj. showHeaders:', self.showHeaders)
        console.log('webhookForm. updateWebhookObj. showAuth:', self.showAuth)
        const newObj = {
          url: self.url,
          http_method: self.showJson ? 'POST' : 'GET',
          json: self.showJson ? self.json : '',
          basicAuth: self.showAuth ? {
            login: self.basicAuth.login,
            password: self.basicAuth.password
          } : '',
          headers: self.showHeaders ? self.headers : ''
        }
        console.log('webhookForm. updateWebhookObj. newObj:', newObj)
        self.$emit('update-item', newObj)
      }, 100)
    }
  }
}
</script>

<style>
.webhook-url-input__block {
  min-width: 500px;
  display: flex;
}
.webhook-url-input {
  max-width: 580px;
  min-width: 500px;
}
.scenario-webhook-form__block {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}
.scenario-webhook-form__block-row {
  display: flex;
}
.scenario-webhook-form__row-item {
  padding: 10px;
}
.scenario-webhook-form__row-item span {
  font-size: small;
}
.webhook-toggle-block {
  display: flex;
  align-items: center;
}
.scenario-webhook__textarea {
  width: 100%;
  padding: 7px;
  font-size: medium;
}
.scenario-webhook-form__auth_block {
  display: flex;
  align-items: center;
}
.scenario-webhook-form__auth_block input {
  margin: 5px 10px;
  min-width: 100px;
  max-width: 150px;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 21px;
  margin: 5px
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
