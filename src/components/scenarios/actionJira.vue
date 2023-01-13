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
      <input type="text" name="Description"
             placeholder="Description"
             class="input__text input"
             v-model="actionDetails.description">
    </fieldset>

  </div>
  <!--Ids list-->
  <div class="scenario-section__block-row">
    <fieldset class="scenario-section__block-row-item full-width">
      <legend>Jira project:</legend>
      <jira-form
        :projectId="actionDetails.projectId"
        @update-item="updateProjectId"/>
    </fieldset>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import jiraForm from '@/components/forms/jiraForm'
export default {
  props: ['actionName', 'time', 'actionObj'],
  emits: ['update:actionName', 'update:time'],
  components: { jiraForm },
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
        projectId: { required, minLength: minLength(1) }
      }
    }
  },
  methods: {
    updateProjectId (value) {
      this.actionDetails.projectId = value
    }
  }
}
</script>
<style>
</style>
