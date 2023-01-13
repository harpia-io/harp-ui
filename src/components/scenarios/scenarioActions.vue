<template>
  <!--Add action button-->
   <div class="dropdown">
      <button class="add__new add__action">
        <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
            fill="#00C284" />
        </svg>
        Add action
      </button>
      <div class="dropdown-content">
        <button
          v-for="(actionType, index) in actionsTypes" :key="index"
          @click="addAction(actionType)">
          {{ actionType }}</button>
      </div>
    </div>
  <div class="scenario__action-list">
    <div v-for="(scenarioAction, index) in actionsArray" :key="index">
      <action
        :action-obj-prop="scenarioAction"
        :action-index="index"
        @update-action-trigger-delay-time="onUpdateActionTriggerDelayTime"
        @save-action="saveAction(index)"
        @clone-action="cloneAction(index)"
        @delete-action="deleteAction(index)"
        @validated="updateValidState(index, $event)"
      />
    </div>
  </div>

</template>

<script>
import action from '@/components/scenarios/action'
import _ from 'lodash'
import { AVAILABLE_BOTS_REQUEST } from '@/store/actions/config'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
export default {
  name: 'scenarioActions',
  components: {
    action
  },
  props: ['actionsArrayProp'],
  emits: ['validated', 'update-action-trigger-delay-time'],
  computed: {
    actionsArray () {
      return this.actionsArrayProp
    }
    // actionsValid () {
    //   console.log('scenarioActions. computed. actionsValid:', this.actionValidList.every(Boolean))
    //   this.$emit('validated', this.actionValidList.every(Boolean))
    //   return this.actionValidList
    // }
  },
  watch: {
    actionValidList () {
      console.log('scenarioActions. watch. actionsValid:', this.actionValidList.every(Boolean))
      this.$emit('validated', this.actionValidList.every(Boolean))
    },
    actionsArrayProp () {
      this.createValidationList()
    }
  },
  beforeMount () {
    this.getActiveBots()
    // this.createValidationList()
  },
  data () {
    return {
      defaultActions: {
        ui: {
          execute_after_seconds: 0,
          action_trigger_delay: '0s',
          type: 'ui',
          enabled: true,
          body: {
            action_name: 'New added action',
            recipients: [''],
            description: '',
            affected_func: '',
            should_check: [],
            environment_impact: '',
            risks: '',
            notification_period: {},
            resubmit: null
          }
        },
        email: {
          execute_after_seconds: 0,
          action_trigger_delay: '0s',
          type: 'email',
          enabled: true,
          body: {
            action_name: '',
            recipients: [''],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
        teams: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'teams',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
        jira: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'jira',
          enabled: true,
          body: {
            action_name: '',
            projectId: '',
            notification_period: {},
            resubmit: null
          }
        },
        pagerduty: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'pagerduty',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            notification_period: {},
            resubmit: null
          }
        },
        skype: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'skype',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            notification_period: {},
            resubmit: null
          }
        },
        telegram: {
          execute_after_seconds: 30,
          action_trigger_delay: '0s',
          type: 'telegram',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            notification_period: {},
            resubmit: null
          }
        },
        whatsapp: {
          execute_after_seconds: 60,
          action_trigger_delay: '0s',
          type: 'whatsapp',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            notification_period: {},
            resubmit: null
          }
        },
        signl4: {
          execute_after_seconds: 30,
          action_trigger_delay: '0s',
          type: 'signl4',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            notification_period: {},
            resubmit: null
          }
        },
        slack: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'slack',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
        webhook: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'webhook',
          enabled: true,
          body: {
            action_name: 'Restart service: POST',
            webhooks: [
              {
                url: 'https://your-company.com/remote-actions?max_retries=3&not_working_hours=true',
                http_method: 'POST',
                json: '{"server": "hostname", "group": "group_value"}',
                basicAuth: {
                  login: '',
                  password: ''
                },
                headers: '{"ContentType": "application/json"}'
              }
            ],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
        voice: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'voice',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
        sms: {
          execute_after_seconds: 300,
          action_trigger_delay: '0s',
          type: 'sms',
          enabled: true,
          body: {
            action_name: '',
            ids: [''],
            description: '',
            notification_period: {},
            resubmit: null
          }
        },
      },
      actionsTypes: [
        'ui',
        // 'email',
        'teams',
        // 'jira',
        'pagerduty',
        // 'skype',
        // 'telegram',
        'signl4',
        'webhook'
        // 'slack'
        // 'whatsapp',
        // 'voice',
        // 'sms'
      ],
      actionValidList: []
    }
  },
  methods: {
    createValidationList () {
      console.log('scenarioActions. createValidationList:', this.actionsArrayProp)
      this.actionsArrayProp.forEach(action => {
        this.actionValidList.push(true)
      })
    },
    addAction (actionName) {
      console.log('scenarioActions. addAction. actionName:', actionName)
      this.actionValidList.push(false)
      this.actionsArray.push(this.defaultActions[actionName])
      this.$emit('validated', this.actionValidList.every(Boolean))
    },
    saveAction (index) {
      console.log('scenarioActions. methods. saveAction. index:', index)
    },
    cloneAction (index) {
      console.log('scenarioActions. methods. cloneAction. index:', index)
      const actionToClone = _.cloneDeep(this.actionsArray[index])
      actionToClone.body.action_name = 'Copy - ' + actionToClone.body.action_name
      this.actionsArray.splice(index + 1, 0, actionToClone)
    },
    deleteAction (index) {
      console.log('scenarioActions. methods. deleteAction. index:', index)
      this.actionValidList.splice(index, 1)
      this.actionsArray.splice(index, 1)
      this.$emit('validated', this.actionValidList.every(Boolean))
    },
    updateValidState (index, value) {
      console.log('scenarioActions. methods. updateValidState. index:', index, 'value', value)
      this.actionValidList[index] = value
      this.$emit('validated', this.actionValidList.every(Boolean))
    },
    onUpdateActionTriggerDelayTime (newValue) {
      console.log('scenarioActions. onUpdateActionTriggerDelayTime. newValue', newValue)
      this.$emit('update-action-trigger-delay-time', newValue)
    },
    getActiveBots () {
      console.log('botsDialog. onLoad')
      this.loading = true
      this.$store.dispatch(AVAILABLE_BOTS_REQUEST)
      const requestObj = {
        service: 'bots',
        path: '/bots/status/active',
        method: 'GET',
        options: {}
      }
      const msg = 'GET active bots'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('botsDialog. onLoad. response:', response)
          this.actionsTypes.push(...response.bots);
          this.loading = false
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: '',
            eventType: 'error',
            showError: true,
            message: 'Can\'t load bots.'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.error('botsDialog. onLoad. Error:', error)
          this.loading = false
          // this.$router.go(-1)
        })
    },
  }
}
</script>

<style scoped>

</style>
