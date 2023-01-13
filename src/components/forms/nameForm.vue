<template>
  <div class="form-input-with-delete">
    <div class="form-input-with-delete__input-block">
      <input type="text" name="text"
             placeholder="Name"
             class="input__text input"
             :class="{'invalid': v$.$invalid}"
             :value="name"
             @blur="v$.name.$touch"
             @input="$emit('update-item', $event.target.value)"/>
      <button @click="$emit('remove-item')">
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
import { required } from '@vuelidate/validators'
import RemoveIcon from '@/components/icons/removeIcon'

export default {
  components: { RemoveIcon },
  props: ['name'],
  emits: ['remove-item', 'update-item'],
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      name: { required }
    }
  },
  beforeMount () {
    this.v$.name.$touch()
  }
}
</script>

<style>
</style>
