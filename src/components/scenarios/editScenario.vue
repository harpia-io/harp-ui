<template>

  <div v-if="loading">
    <loading-spinner :opacity="0" />
  </div>
  <div v-else class="full-page-dialog">
    <div class="edit-scenario-dialog" id="scenario-edit">
      <div class="scenario__fields">
        <fieldset>
          <legend>Scenario name</legend>
          <input type="text" name="Name" placeholder="Name" class="input__text input" v-model="scenarioName">
        </fieldset>
        <fieldset>
          <legend>Requested</legend>
          <input type="text" name="requested" placeholder="Requested" class="input__text input" v-model="requestedBy">
        </fieldset>
        <fieldset>
          <legend>Scenario description</legend>
          <textarea class="input input__area" placeholder="Description..." v-model="description"></textarea>
        </fieldset>
      </div>
      <scenario-actions
        :actions-array-prop="actionsList"
        @update-action-trigger-delay-time="onUpdateActionTriggerDelayTime"
        @validated="actionsValid = $event"
      />
    </div>
    <!-- buttons -->
    <div class="popup__box-buttons scenario__edit-row">
      <button class="button__large button__delete delete" @click="deleteScenario">Delete</button>
      <button class="button__large button__default clone" @click="cloneScenario">Clone</button>
      <button class="button__large button__default close"
              @click="$router.push({name: 'Scenarios'})">Close</button>
      <!--      <button class="button__large button__default link-alert">Link alert</button>-->
<!--      :disabled="!formValid"-->
<!--      :class="{'button__accent': formValid}"-->
      <button class="button__large save"
              @click="!inProgress ? saveScenario() : false"
              :disabled="formInvalid"
              :class="{'button__accent': true, 'disabled': formInvalid}">
        <spinner v-if="inProgress"></spinner>
        <span v-if="!inProgress">Save</span>
      </button>
    </div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
  </div>
</template>

<script>

import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import scenarioActions from '@/components/scenarios/scenarioActions'
// import Loading from '@/components/Loading'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import LoadingSpinner from '@/components/LoadingSpinner'
import Spinner from '@/components/icons/spinner'

export default {
  components: {
    Spinner,
    LoadingSpinner,
    ConfirmationPopup,
    scenarioActions
    // Loading
  },
  data () {
    return {
      loading: true,
      show: null,
      scenarioId: null,
      description: '',
      scenarioName: '',
      requestedBy: '',
      environment_id: '',
      edited_by: '',
      externalUrl: '',
      inProgress: false,
      actionsList: [],
      lastUpdateTs: '',
      createTs: '',
      tags: [],
      actionsValid: false,
      v$: useVuelidate()
    }
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  computed: {
    formInvalid () {
      return this.v$.$invalid
    }
  },
  watch: {
  },
  beforeMount () {
    this.getScenarioId()
    if (this.scenarioId > 0) {
      this.loadScenario()
    }
    this.loading = false
    this.v$.$validate()
    console.log('editScenario. beforeMount. $route', this.$route)
  },
  methods: {
    saveScenario () {
      console.log('editScenario. save. scenarioObj:', this.actionsList)
      const body = {
        scenario_name: this.scenarioName,
        // environment_id: this.environment_id,
        description: this.description,
        requested_by: this.requestedBy,
        external_url: '',
        tags: [],
        scenario_type: 1,
        scenario_actions: this.actionsList
        // edited_by: this.edited_by
      }
      const requestObj = {
        service: 'scenarios',
        path: '/scenarios/' + this.scenarioId,
        method: 'POST',
        body: JSON.stringify(body),
        options: {}
      }
      console.log('editScenario. save. body: ', JSON.stringify(body))
      let message = 'Edit scenario'
      if (this.scenarioId === 'new') {
        requestObj.path = '/scenarios'
        requestObj.method = 'PUT'
        message = 'Add scenario'
      }
      const popupOptions = {
        showDialog: true,
        reportError: true,
        eventName: 'update scenario',
        alert: { scenario: 'scenario_created' },
        self: this
      }
      this.inProgress = true
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, message, popupOptions })
        .then(response => {
          this.inProgress = false
          console.log('editScenario. save. response:', response)
          this.$router.push({ name: 'Scenarios' })
        })
        .catch((error) => {
          this.inProgress = false
          // const message = 'Can\'t update scenario.'
          // this.$store.dispatch(TRIGGER_ERROR, { error, message })
          console.error('editScenario. save. Error:', error)
        })
    },
    cloneScenario () {
      console.log('editScenario. clone. scenarioObj:', this.actions)
      this.scenarioName = 'Clone - ' + this.scenarioName
      this.$router.push({ name: 'Scenario edit', params: { scenarioId: 'new' } })
      this.scenarioId = 'new'
    },
    async deleteScenario () {
      const confirmation = await this.$refs.confirmation.showScenario('delete')
      if (confirmation) {
        const requestObj = {
          service: 'scenarios',
          path: '/scenarios/' + this.scenarioId,
          method: 'DELETE',
          body: null,
          options: {}
        }
        const message = 'Delete scenario'
        const popupOptions = {
          showDialog: true,
          reportError: true,
          eventName: 'delete scenario',
          self: this
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, message, popupOptions })
          .then(response => {
            console.log('editScenario. delete. response:', response)
          })
          .catch((error) => {
            // const message = 'Can\'t delete scenario.'
            // this.$store.dispatch(TRIGGER_ERROR, { error, message })
            console.error('editScenario. delete. Error:', error)
          })
      }
    },
    loadScenario () {
      console.log('editScenario. loadScenario. scenarioId:', this.scenarioId)
      const requestObj = {
        service: 'scenarios',
        path: '/scenarios/' + this.scenarioId,
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Load scenario'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('editScenario. loadScenario. response:', response.msg)
          this.scenarioName = response.msg.scenario_name
          this.environment_id = response.msg.environment_id
          this.requestedBy = response.msg.requested_by
          this.externalUrl = response.msg.external_url
          this.lastUpdateTs = response.msg.last_update_ts
          this.tags = response.msg.tags
          this.createTs = response.msg.create_ts
          this.actionsList = response.msg.scenario_actions
          this.description = response.msg.description
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: 'edit_scenario',
            eventType: 'error',
            showError: true,
            message: 'Can\'t load the scenario. Please check network connection'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.log(error)
          console.error('editScenario. loadScenario. Error:', error)
          // this.$router.go(-1)
        })
    },
    getScenarioId () {
      console.log('editScenario. getScenarioId. $route', this.$route)
      const scenarioId = this.$route.params.scenarioId
      console.log('editScenario. getScenarioId. scenarioId', scenarioId)
      this.scenarioId = scenarioId
    },
    disableAction (actionName) {
      this.actions[actionName].enabled = false
    },
    enableAction (actionName) {
      this.actions[actionName].enabled = true
    },
    deleteAction (actionName) {
      console.log('editScenario. deleteAction. actionName:', actionName)
      this.actions[actionName] = {}
      this.actionToShow()
    },
    onUpdateActionTriggerDelayTime (newValue) {
      console.log('editScenario. onUpdateActionTriggerDelayTime. index/newValue:', newValue)
      this.actionsList[newValue.index].action_trigger_delay = newValue.value
    }
  }
}
</script>

<style scoped>
#risks {
  flex-grow: 4;
}
#risks2 {
  flex-grow: 3;
}
#impact {
  flex-grow: 1;
}
#impact2 {
  flex-grow: 2;
}
#add-operator-action-btn {
  padding-top: 12px;
}
#teams-id {
  width: 100%;
}
#whats-app-id {
  width: 100%;
}
#telegram-id {
  width: 100%;
}
.full-page-dialog {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
}
.edit-scenario-dialog {
  background: var(--c-white);
  padding: 20px;
  border-radius: var(--r-radius);
  margin: 20px;
  min-height: calc(100% - 100px);
}
.disabled {
  background-color: dimgrey;
}
</style>
