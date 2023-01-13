<template>
  <div class="popup__box settings popup__small second-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Add integration</h4>
      <button class="popup__box-close" @click="close">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>

    <div class="popup__box-main" style="height: 278px;">
      <!-- form -->
      <form class="form new-integration-form">
        <fieldset>
          <legend>New integration name</legend>
          <input type="text" name="name" placeholder="New integration name"
                 class="input__text input" v-model="integrationName">
          <div v-if="!integrationNameValid">
              <span class="input form-validation-error"
              >Integration name required</span>
          </div>
        </fieldset>

        <!--Integration types-->
        <fieldset>
          <legend>Integration</legend>
          <div class="edit-user__details-block-user-role">
            <select class="input__select input fieldset-select" v-model="integrationType">
              <option v-for="integrationObj in availableIntegrations"
                      :key="integrationObj.id"
                      :value="integrationObj.name">
                {{ integrationObj.name }}
              </option>
            </select>
          </div>
          <div v-if="!integrationTypeValid">
              <span class="input form-validation-error"
              >Choose integration type</span>
          </div>
        </fieldset>
        <!-- popup buttons -->
        <div class="popup__box-buttons">
          <button class="button__large submit" type="submit"
                  @click.prevent="addIntegration"
                  :invalid="!formValid"
                  :class="{'button__accent': formValid, 'disabled': !formValid}"
          >Add</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  emits: ['close', 'add-integration'],
  data () {
    return {
      v$: useVuelidate(),
      integrationName: '',
      integrationType: ''
    }
  },
  validations () {
    return {
      integrationName: { required },
      integrationType: { required }
    }
  },
  computed: {
    availableIntegrations () {
      return this.$store.getters.getAvailableIntegrations
    },
    formValid () {
      return !this.v$.$invalid
    },
    integrationNameValid () {
      return !this.v$.integrationName.$invalid
    },
    integrationTypeValid () {
      return !this.v$.integrationType.$invalid
    }
  },
  beforeMount () {
    this.v$.$touch()
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addIntegration () {
      const newIntegration = {
        integration_name: this.integrationName,
        integration_type: this.integrationType,
        integration_id: 0,
        severity: 'pending',
        config: {
          environment_id: null,
          scenario_id: null
        }
      }
      this.$emit('add-integration', newIntegration)
      this.close()
    }
  }
}
</script>

<style scoped>
.new-integration-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
