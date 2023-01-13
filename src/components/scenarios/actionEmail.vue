<template>
  <div class="scenario__action-fields">
<!--    {{ v$.$errors }}-->
<!--    <fieldset class="scenario-section__block-row-item start-after-form">-->
<!--      <legend>Start after:</legend>-->
<!--      <time-selector/>-->
<!--      <input type="number" min="0" :value="time"-->
<!--             class="input"-->
<!--             @input="$emit('update:time', $event.target.value)">-->
<!--    </fieldset>-->
    <fieldset class="scenario-section__block-row-item">
      <legend>Action name</legend>
        <input type="text" name="action-name"
               placeholder="Name of the action"
               class="input__text input"
               :class="{'form-invalid': v$.actionDetails.action_name.$invalid}"
               @blur="v$.actionDetails.action_name.$touch"
                v-model="actionDetails.action_name"/>
<!--        @input="$emit('update:action-name', $event.target.value)"-->
      <span v-if="v$.actionDetails.action_name.minLength.$invalid"
            class="input form-validation-error"
      >{{ v$.actionDetails.action_name.minLength.$message }}</span>
    </fieldset>
    <fieldset class="scenario-section__block-row-item" id="description">
      <legend>Description</legend>
      <input type="text" name="risks" placeholder="Short description for the action"
             class="input__text input"
             v-model="actionDetails.description"
      >
    </fieldset>
  </div>
  <div class="scenario-section__block">
    <!--Recipients-->
    <div class="scenario-section__block-row">
      <div class="scenario-section__block-row-item">
        <div class="scenario-section__block-row-title">Recipients:</div>
      </div>
      <div class="scenario-section__block-row-item">
        <div class="scenario-section__block-row-list ">
          <email-form
            v-for="(email, index) in actionDetails.recipients" :key="index"
            :email="email"
            @update-email="updateEmail(index, $event)"
            @remove-email="actionDetails.recipients.splice(index, 1)">
          </email-form>
        </div>
        <span v-if="v$.actionDetails.recipients.$invalid" class="input form-validation-error">
          At least one recipient should be in the list
        </span>
      </div>
      <div class="scenario-section__block-row-item align-right">
        <button class="button__edit button__add" @click="actionDetails.recipients.push('')">
          <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3051 6.09995C11.3051 6.59995 10.9051 6.99995 10.4051 6.99995H6.80508V10.4C6.80508 10.9 6.40508 11.3 5.90508 11.3C5.40508 11.3 5.00508 10.9 5.00508 10.4V6.99995H1.60508C1.10508 6.99995 0.705078 6.59995 0.705078 6.09995C0.705078 5.59995 1.10508 5.19995 1.60508 5.19995H5.00508V1.59995C5.00508 1.09995 5.40508 0.699951 5.90508 0.699951C6.40508 0.699951 6.80508 1.09995 6.80508 1.59995V5.19995H10.4051C10.9051 5.19995 11.3051 5.59995 11.3051 6.09995Z" fill="#00C284"/>
          </svg>
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import emailForm from '@/components/forms/emailForm'
// import timeSelector from '@/components/forms/timeSelector'

export default {
  props: ['actionName', 'time', 'actionObj'],
  emits: ['update:actionName', 'update:time', 'validated'],
  components: {
    emailForm
    // timeSelector
  },
  computed: {
    actionDetails () {
      return this.actionObj
    }
  },
  data () {
    return {
      v$: useVuelidate(),
      validated: true
    }
  },
  validations () {
    return {
      actionDetails: {
        action_name: { required, minLength: minLength(5) },
        recipients: { required, minLength: minLength(1) }
      }
    }
  },
  methods: {
    updateEmail (index, value) {
      console.log('actionEmail. updateEmail', index, ': ', value)
      this.actionDetails.recipients[index] = value
    },
    addRecipient () {
      this.actionDetails.recipients.push('')
      this.v$.$validate()
    }
  }
}
</script>
<style>
</style>
