<template>
    <div class="form-input-with-delete">
      <div class="form-input-with-delete__input-block">
        <input type="text" name="text"
               placeholder="Jira project"
               class="input__text input"
               :class="{'invalid': v$.$invalid}"
               :value="projectId"
               @blur="v$.projectId.$touch"
               @input="$emit('update-item', $event.target.value)"/>
      </div>
      <div v-if="v$.$error">
        <span v-for="(error, index) in v$.$errors" :key="index"
              class="input form-validation-error"
        >{{ error.$message }}</span>
      </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  components: {},
  props: ['projectId'],
  emits: ['update-item'],
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      projectId: { required }
    }
  },
  beforeMount () {
    this.v$.projectId.$touch()
  }
}
</script>

<style>
</style>
