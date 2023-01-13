<template>
  <div class="form-input-with-delete">
    <div class="form-input-with-delete__input-block">
      <input type="password" name="password"
             placeholder="new password"
             class="input__text input"
             :class="{'invalid': v$.$invalid}"
             :value="password"
             @blur="v$.password.$touch"
             @input="$emit('update-password', $event.target.value)"/>
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
  props: ['password'],
  emits: ['update-password'],
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      password: { required }
    }
  },
  beforeMount () {
    this.v$.password.$touch()
  }
}
</script>

<style scoped>

</style>
