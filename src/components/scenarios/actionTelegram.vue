<template>
  <div class="scenario__action-fields">
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
<!--    <fieldset class="scenario-section__block-row-item">-->
<!--      <legend>Start after seconds</legend>-->
<!--      <input type="number" min="0" :value="time"-->
<!--             class="input"-->
<!--             @input="$emit('update:time', $event.target.value)">-->
<!--    </fieldset>-->
    <fieldset class="scenario-section__block-row-item" id="risks3">
      <legend>Description</legend>
      <input type="text"
             name="description"
             placeholder="Description"
             class="input__text input"
             v-model="actionDetails.description"
      >
    </fieldset>
  </div>
  <!--Ids list-->
  <div class="scenario-section__block-row">
    <fieldset class="scenario-section__block-row-item full-width">
      <legend>Telegram Chat Ids:
        <a :href="'https://docs.harpia.io/docs/scenarios-overview/telegram'" target="_blank">
          docs:
        </a>
      </legend>
      <telegram-form
        v-for="(id, index) in actionDetails.ids" :key="index"
        :id="id"
        :index="index"
        @update-item="updateId(index, $event)"
        @remove-item="actionDetails.ids.splice(index, 1)">
      </telegram-form>
      <span v-if="v$.actionDetails.ids.$invalid" class="input form-validation-error">
        At least one id should be in the list
      </span>
      <div class="scenario-section__block-row" id="add-operator-action-btn">
        <button @click="actionDetails.ids.push('')" class="button__edit button__add">
          <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3051 6.09995C11.3051 6.59995 10.9051 6.99995 10.4051 6.99995H6.80508V10.4C6.80508 10.9 6.40508 11.3 5.90508 11.3C5.40508 11.3 5.00508 10.9 5.00508 10.4V6.99995H1.60508C1.10508 6.99995 0.705078 6.59995 0.705078 6.09995C0.705078 5.59995 1.10508 5.19995 1.60508 5.19995H5.00508V1.59995C5.00508 1.09995 5.40508 0.699951 5.90508 0.699951C6.40508 0.699951 6.80508 1.09995 6.80508 1.59995V5.19995H10.4051C10.9051 5.19995 11.3051 5.59995 11.3051 6.09995Z" fill="#00C284"/>
          </svg>
          Add Chat ID
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import telegramForm from '@/components/forms/telegramForm'
export default {
  props: ['actionName', 'time', 'actionObj'],
  emits: ['update:actionName', 'update:time'],
  components: { telegramForm },
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
        ids: { required, minLength: minLength(1) }
      }
    }
  },
  methods: {
    updateId (index, value) {
      this.actionDetails.ids[index] = value
    }
  }
}
</script>
<style>
</style>
