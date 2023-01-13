<template>
  <div class="form-input-flex-with-number">
    <div class="scenario-section__block-row-item list-item-number">
      {{index + 1}}.
    </div>
    <div class="form-input-with-delete">
      <div class="form-input-with-delete__input-block">
        <input type="text" name="text"
               placeholder="PagerDuty ID"
               class="input__text input"
               :class="{'invalid': v$.$invalid}"
               :value="id"
               @blur="v$.id.$touch"
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
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import RemoveIcon from '@/components/icons/removeIcon'

export default {
  components: { RemoveIcon },
  props: ['id', 'index'],
  emits: ['remove-item', 'update-item'],
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      id: { required }
    }
  },
  beforeMount () {
    this.v$.id.$touch()
  }
}
</script>

<style>
</style>
