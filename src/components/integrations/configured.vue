<template>
  <div class="integrations-dialog">
    <add-integration
      v-if="showAddIntegrationDialog"
      @close="closeAddIntegrationDialog"
      @add-integration="putIntegrationToList"
    />
    <div class="integrations-dialog__navbar">
      <!-- left -->
      <div class="tabs__box-in">
        <div class="search__box">
          <input type="search" name="search" placeholder="Search"
                 class="input__search input" v-model="search">
          <button type="submit">
            <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.3548 2.22577C4.52211 2.22577 2.22577 4.52211 2.22577 7.3548C2.22577 10.1875 4.52211 12.4838 7.3548 12.4838C10.1875 12.4838 12.4838 10.1875 12.4838 7.3548C12.4838 4.52211 10.1875 2.22577 7.3548 2.22577ZM0.225769 7.3548C0.225769 3.41755 3.41755 0.225769 7.3548 0.225769C11.2921 0.225769 14.4838 3.41755 14.4838 7.3548C14.4838 9.12768 13.8367 10.7494 12.7657 11.9966L15.3477 14.5786L13.9334 15.9928L11.2604 13.3198C10.1386 14.0558 8.79671 14.4838 7.3548 14.4838C3.41755 14.4838 0.225769 11.2921 0.225769 7.3548Z"
                    fill="#9CA2AC" />
            </svg>
          </button>
        </div>
      </div>
      <!-- right -->
      <div class="tabs__box-in">
        <button class="add__new" style="margin: 0 0 0 auto;" @click="addIntegration">
          <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
              fill="#00C284" />
          </svg>
          Add integration
        </button>
      </div>
    </div>
    <div class="integrations-dialog__content">
      <div id="container" class="integrations-dialog__content-sidebar">
        <div class="integrations-dialog__content-integrations-list">
          <div v-for="integrationObj in configuredIntegrations" :key="integrationObj.integration_id"
               class="integrations-dialog__content-integrations-list-item severity-green">
<!--            <div>{{ integration.severity }}</div>-->
            <div>
              <grafana-icon v-if="integrationObj.integration_type === 'grafana'"/>
              <zabbix-icon v-if="integrationObj.integration_type === 'zabbix'"/>
              <prometheus-logo v-if="integrationObj.integration_type === 'prometheus'"/>
            </div>
            <div class="integrations-dialog__content-integrations-list-item-name"
                 :class="{'active': integrationObj.integration_id === chosenIntegrationId}"
                 @click="openIntegration(integrationObj.integration_id)">
              {{ integrationObj.integration_name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="configuredIntegrations.length > 0" class="integrations-dialog__content-body">
<!--        Name-->
        <div class="integrations-dialog__content-body-item integrations-dialog__content-body-item__height">
          <div>1. Integration name:</div>
          <div :class="{'form-validation__simple-block': !integrationNameValid}">
            <input type="text" name="name" placeholder="Name"
                   class="input__text input" v-model="integrationName">
            <div v-if="!integrationNameValid">
            <span class="input form-validation-error"
            >Integration name required</span>
            </div>
          </div>
        </div>
<!--        Environments-->
        <div class="integrations-dialog__content-body-item">
          <div>2. Environment:</div>
          <div :class="{'form-validation__simple-block': !environmentIdValid}">
            <environments-drop-down
              :active-env-id="chosenEnv"
              @emit-active-env-id="changeEnvId"
            ></environments-drop-down>
            <div v-if="!environmentIdValid">
            <span class="input form-validation-error"
            >Choose environment</span>
            </div>
          </div>

<!--          <div>-->
<!--           ({{ environmentId }})-->
<!--          </div>-->
        </div>
<!--        Rules-->
<!--        <div class="integrations-dialog__content-body-item">-->
<!--          2. Environment: {{ integrations[activeIntegrationIndex].config.rules }}-->
<!--        </div>-->
<!--        Scenarios-->
        <div class="integrations-dialog__content-body-item">
          <div>3. Default scenario:</div>
          <div :class="{'form-validation__simple-block': !scenarioIdValid}">
            <scenarions-drop-down
              :active-scenario-id="chosenScenario"
              @emit-active-scenario-id="changeScenarioId"
            />
            <div v-if="!scenarioIdValid">
              <span class="input form-validation-error"
              >Choose default scenario</span>
            </div>
          </div>
        </div>
<!--        Copy url-->
        <div class="integrations-dialog__content-body-item integrations-dialog__content-body-item__height">
          <div>4. Copy url:</div>
          <div class="integration-url" >
            <input type="text" class="input__text input" v-if="integrationUrl" v-model="integrationUrl" disabled>
            <span style="color: #F5A623" v-else> Click Add button to generate URL </span>
          </div>
          <nd-copy-btn description='Copy URL' v-clipboard:copy="integrationUrl"/>
        </div>
<!--        Go to settings-->
        <div class="integrations-dialog__content-body-item integrations-dialog__content-body-item__height">
          <div>5. Go to settings page:</div>
          <div>
            <a :href="'https://docs.harpia.io/docs/incoming-integrations/' + integrationToUpdate.integration_type" target="_blank">
              docs
            </a>
          </div>
<!--          <div>{{ integrationKey }}</div>-->
        </div>
<!--        Delete integration -->
        <div>
          <button class="button__medium button__delete delete"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onDelete">
            Delete integration
          </button>
        </div>
      </div>
    </div>
    <div class="integrations-dialog__content-body-footer">
      <div class="popup__box-buttons">
        <button class="button__large button__default close" @click="closeDialog">Close</button>
        <button v-if="chosenIntegrationId !== 0"
                class="button__large button__accent save"
                :invalid="!formValid"
                :class="{'button__accent': formValid, 'disabled': !formValid}"
                @click="onSave"
        >Save</button>
        <button v-else class="button__large button__accent save"
                @click="onSave"
                :invalid="!formValid"
                :class="{'button__accent': formValid, 'disabled': !formValid}"
        >Add</button>
      </div>
    </div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
  </div>
</template>

<script>
import grafanaIcon from '@/components/icons/grafanaIcon'
import zabbixIcon from '@/components/icons/zabbixIcon'
import prometheusLogo from '@/components/logos/prometheusLogo'
import environmentsDropDown from '@/components/dropdowns/environmentsDropDown'
import ScenarionsDropDown from '@/components/dropdowns/scenarionsDropDown'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import ndCopyBtn from '@/components/icons/ndCopyBtn'
import addIntegration from '@/components/integrations/addIntegration'
import { HIDE_INTEGRATIONS, HIDE_SECOND_BACKDROP, SHOW_SECOND_BACKDROP } from '@/store/actions/localActions'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'
export default {
  props: [
    'configuredIntegrations',
    'environments',
    'preChosenIntegrationId'
  ],
  emits: ['add-integration', 'update-integrations-list'],
  components: {
    ScenarionsDropDown,
    grafanaIcon,
    zabbixIcon,
    prometheusLogo,
    environmentsDropDown,
    ndCopyBtn,
    addIntegration,
    ConfirmationPopup
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  data () {
    return {
      search: '',
      integrations: [],
      integrationToUpdate: {},
      chosenIntegrationId: 0,
      newIntegration: false,
      integrationName: '',
      integrationType: '',
      environmentId: null,
      scenarioId: null,
      integrationKey: null,
      showAddIntegrationDialog: false,
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      integrationName: { required },
      environmentId: { required },
      scenarioId: { required }
    }
  },
  computed: {
    // chosenIntegration () {
    //   console.log('configured. computed. chosenIntegration', this.chosenIntegrationId, this.configuredIntegrations)
    //   return this.configuredIntegrations.find(integration => integration.integration_id === this.chosenIntegrationId)
    // }
    chosenEnv () {
      return this.environmentId
    },
    chosenScenario () {
      return this.scenarioId
    },
    integrationUrl () {
      let url = ''
      if (this.integrationKey) {
        url = window.Config.domain +
          '/harp-collectors/monitoring-system/' + this.integrationType + '?integration_key=' +
          this.integrationKey
      }
      return url
    },
    formValid () {
      return !this.v$.$invalid
    },
    integrationNameValid () {
      return !this.v$.integrationName.$invalid
    },
    environmentIdValid () {
      return !this.v$.environmentId.$invalid
    },
    scenarioIdValid () {
      return !this.v$.scenarioId.$invalid
    }
  },
  beforeMount () {
    this.chosenIntegrationId = this.preChosenIntegrationId
    if (this.configuredIntegrations.length > 0) {
      if (this.chosenIntegrationId === 0) {
        this.openIntegration(this.configuredIntegrations[0].integration_id)
      } else {
        this.openIntegration(this.chosenIntegrationId)
      }
    }
    this.v$.$touch()
  },
  methods: {
    openIntegration (integrationId) {
      console.log('integrations. configured. openIntegration. integrationId:', integrationId)
      this.integrationToUpdate = this.configuredIntegrations.find(integration => integration.integration_id === Number(integrationId))
      this.chosenIntegrationId = integrationId
      this.integrationName = this.integrationToUpdate.integration_name
      this.environmentId = this.integrationToUpdate.config.environment_id
      this.scenarioId = this.integrationToUpdate.config.scenario_id
      this.integrationType = this.integrationToUpdate.integration_type
      this.integrationKey = this.integrationToUpdate.integration_key
      this.newIntegration = integrationId === 0
    },
    changeEnvId (envId) {
      console.log('configured. changeEnvId. chosen:', envId)
      this.environmentId = envId
    },
    changeScenarioId (scenarioId) {
      console.log('configured. changeScenarioId. chosen:', scenarioId)
      this.scenarioId = scenarioId
    },
    addIntegration () {
      console.log('integrations. configured. methods. addIntegration')
      this.showAddIntegrationDialog = true
      this.$store.commit(SHOW_SECOND_BACKDROP)
    },
    putIntegrationToList (newIntegration) {
      console.log('integrations. configured. methods. putIntegrationToList. newIntegration:', newIntegration)
      this.integrationToUpdate = newIntegration
      this.environmentId = this.integrationToUpdate.config.environment_id
      this.scenarioId = this.integrationToUpdate.config.scenario_id
      this.integrationName = this.integrationToUpdate.integration_name
      this.integrationType = this.integrationToUpdate.integration_type
      this.integrationKey = this.integrationToUpdate.integration_key
      // #TODO change logic for 'chosen integration'
      this.chosenIntegrationId = this.integrationToUpdate.integration_id
      this.scrollToEnd()
      this.newIntegration = true
      this.$emit('add-integration', newIntegration)
    },
    async onDelete () {
      console.log('configured (integrations). onDelete. IntegratiionId', this.chosenIntegrationId)
      const confirmation = await this.$refs.confirmation.showScenario('delete')
      if (confirmation) {
        const requestObj = {
          service: 'integrations',
          path: '/integrations/configured/' + this.chosenIntegrationId,
          method: 'DELETE',
          options: {}
        }
        const msg = 'Delete integrations'
        console.log('configured (integrations). onDelete. requestObj:', requestObj)

        const popupOptions = {
          showDialog: true
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('integrationsDialog. onDelete. chosenIntegrationId:', this.chosenIntegrationId, '. response:', response)
            // this.chosenIntegrationId = response.integration_id
            // this.configuredIntegrations = response.integrations
            this.loading = false
            this.$emit('delete-integration', this.chosenIntegrationId)
            if (this.configuredIntegrations.length > 0) {
              this.openIntegration(this.configuredIntegrations[0].integration_id)
            }
          })
          .catch((error) => {
            const errorDescription = {
              errorObj: error,
              eventName: 'delete integration',
              eventType: 'error',
              showError: true,
              message: 'Can\'t delete integration.'
            }
            this.$store.dispatch(TRIGGER_ERROR, errorDescription)
            console.error('integrations. configured. onDelete. Error:', error)
            this.loading = false
          })
      }
    },
    onSave () {
      if (!this.formValid) {
        this.v$.touch()
        return
      }
      let requestObj = {}
      let msg = ''
      const body = JSON.stringify({
        integration_name: this.integrationName,
        integration_type: this.integrationToUpdate.integration_type,
        status: 'active',
        config: {
          environment_id: Number(this.environmentId),
          scenario_id: Number(this.scenarioId)
        }
      })
      if (this.newIntegration) {
        requestObj = {
          service: 'integrations',
          path: '/integrations/configured',
          method: 'PUT',
          body: body,
          options: {}
        }
        msg = 'Add integrations'
      } else {
        requestObj = {
          service: 'integrations',
          path: '/integrations/configured/' + this.chosenIntegrationId,
          method: 'POST',
          body: body,
          options: {}
        }
        msg = 'Update integrations'
      }
      console.log('configured. onSave. requestObj:', requestObj)

      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('integrationsDialog. onLoad. response:', response)
          console.log(this.chosenIntegrationId)
          this.chosenIntegrationId = response.integration_id
          // this.configuredIntegrations = response.integrations
          this.loading = false
          this.$emit('update-integrations-list', response.integration_id)
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: 'add/update integration',
            eventType: 'error',
            showError: true,
            message: 'Can\'t add/update integrations.'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.error('integrations. configured. onLoad. Error:', error)
          this.loading = false
        })
    },
    closeAddIntegrationDialog () {
      this.showAddIntegrationDialog = false
      this.$store.commit(HIDE_SECOND_BACKDROP)
    },
    scrollToEnd () {
      const container = this.$el.querySelector('#container')
      container.scrollTop = container.scrollHeight
    },
    closeDialog () {
      this.$store.commit(HIDE_INTEGRATIONS)
    }
  }
}
</script>

<style scoped>
.integrations-dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
}
.integrations-dialog__navbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 1200px), screen and (max-height: 730px){
  .integrations-dialog__content {
    width: 100%;
    /*max-height: 100%;*/
    margin-top: 10px;
    height: 236px;
    display: flex;
    border: 1px solid rgba(156, 162, 172, 0.32);
    border-radius: 5px;
    padding: 5px;
    flex-grow: 1;
  }
  .integrations-dialog__content-sidebar {
    min-width: 200px;
    border-right: 1px solid rgba(156, 162, 172, 0.32);
    overflow-y: auto;
  }
  .integrations-dialog__content-integrations-list {
    display: flex;
    flex-direction: column;
  }
  .integrations-dialog__content-integrations-list-item {
    display: flex;
    padding: 5px;
    border-radius: 6px;
    margin: 2px;
    align-items: center;
  }
  .integrations-dialog__content-integrations-list-item-name {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: grab;
  }
  .integrations-dialog__content-integrations-list-item-name.active {
    background-color: #00C284
  ;
  }
  .integrations-dialog__content-body {
    /*height: 70px;*/
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
    min-height: 217px;
  }
  .integrations-dialog__content-body-footer {
    height: 70px;
    display: flex;
    flex-direction: column;
  }
}
@media screen and (min-width: 1200px), screen and (min-height: 730px){
  .integrations-dialog__content {
    width: 100%;
    max-height: 81%;
    margin-top: 10px;
    display: flex;
    border: 1px solid rgba(156, 162, 172, 0.32);
    border-radius: 5px;
    padding: 5px;
    flex-grow: 1;
  }
  .integrations-dialog__content-sidebar {
    min-width: 200px;
    border-right: 1px solid rgba(156, 162, 172, 0.32);
    overflow-y: auto;
  }
  .integrations-dialog__content-integrations-list {
    display: flex;
    flex-direction: column;
  }
  .integrations-dialog__content-integrations-list-item {
    display: flex;
    padding: 5px;
    border-radius: 6px;
    margin: 2px;
    align-items: center;
  }
  .integrations-dialog__content-integrations-list-item-name {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: grab;
  }
  .integrations-dialog__content-integrations-list-item-name.active {
    background-color: #00C284
  ;
  }
  .integrations-dialog__content-body {
    height: 70px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .integrations-dialog__content-body-footer {
    height: 70px;
    display: flex;
    flex-direction: column;
  }
}

.integrations-dialog__content-body-item {
  /*border-bottom: 1px solid rgba(156, 162, 172, 0.32);*/
  padding: 5px;
  margin: 0 10px;
  display: flex;
  align-items: center;
}
.integrations-dialog__content-body-item__height {
  /*line-height: 42px;*/
  min-height: 42px;
}
.integrations-dialog__content-body-item > div {
 padding: 0 5px;
}
.integrations-dialog__content-body-item > div:first-child {
  padding: 0 5px;
  width: 157px;
}

.integration-url {
  flex-grow: 1;
}
.severity-red {
  border-left: 4px solid red;
}
.severity-green {
  border-left: 4px solid green;
}
</style>

<style lang="scss">
  .integrations-dialog__content-body-item .button__icon {
    width: 21px;
    height: 21px;
  }
  .integrations-dialog__content-body-item .input {
    padding: 6px 12px 6px;
  }
</style>
