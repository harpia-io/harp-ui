<template>
  <div class="form-input-with-delete">
    <div class="form-input-with-delete__input-block">
      <input type="email" name="email"
             placeholder="name@gmail.com"
             class="input__text input"
             :class="{'invalid': v$.$invalid}"
             :value="email"
             @blur="v$.email.$touch"
             @input="$emit('update-email', $event.target.value)"/>
      <button @click="$emit('remove-email')">
        <remove-icon />
      </button>
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
import { required, email } from '@vuelidate/validators'
import RemoveIcon from '@/components/icons/removeIcon'

export default {
  components: { RemoveIcon },
  props: ['email'],
  emits: ['remove-email', 'update-email'],
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      email: { required, email }
    }
  },
  beforeMount () {
    this.v$.email.$touch()
  }
}
</script>

<style scoped>

</style>
