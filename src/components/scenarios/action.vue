<template>
<!--  {{ actionObj }}-->
  <action-header @click="showDetails = !showDetails"
                 :action-type="actionObj.type"
                 :action-index="actionIndex"
                 :time="actionObj.execute_after_seconds"
                 :trigger-delay="actionObj.action_trigger_delay"
                 :action-name="actionObj.body.action_name"
                 :action-form-invalid="v$.$invalid"
                 @update-action-trigger-delay="onUpdateActionTriggerDelay"
                 @deleteAction="deleteAction"
                 @cloneAction="cloneAction"
  />
  <div class="scenario__action-main" v-show="showDetails">
    <action-ui
      v-if="actionObj.type === 'ui'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-email
      v-if="actionObj.type === 'email'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
      @validated="updateValidState"
    />
    <action-teams
      v-if="actionObj.type === 'teams'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-jira
      v-if="actionObj.type === 'jira'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-skype
      v-if="actionObj.type === 'skype'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-pager-duty
      v-if="actionObj.type === 'pagerduty'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-whatsapp
      v-if="actionObj.type === 'whatsapp'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-telegram
      v-if="actionObj.type === 'telegram'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-voice
      v-if="actionObj.type === 'voice'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-sms
      v-if="actionObj.type === 'sms'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-signl4
      v-if="actionObj.type === 'signl4'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-webhook
      v-if="actionObj.type === 'webhook'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
    <action-slack
      v-if="actionObj.type === 'slack'"
      v-model:action-name="actionObj.body.action_name"
      v-model:time="actionObj.execute_after_seconds"
      v-model:action-obj="actionObj.body"
    />
  </div>
</template>

<script>
import actionHeader from '@/components/scenarios/actionHeader'
import actionUI from '@/components/scenarios/actionUI'
import actionEmail from '@/components/scenarios/actionEmail'
import actionTeams from '@/components/scenarios/actionTeams'
import actionJira from '@/components/scenarios/actionJira'
import actionSkype from '@/components/scenarios/actionSkype'
import actionPagerDuty from '@/components/scenarios/actionPagerDuty'
import actionWhatsapp from '@/components/scenarios/actionWhatsApp'
import actionTelegram from '@/components/scenarios/actionTelegram'
import actionVoice from '@/components/scenarios/actionVoice'
import actionSMS from '@/components/scenarios/actionSMS'
import actionSignl4 from '@/components/scenarios/actionSignl4'
import actionWebhook from '@/components/scenarios/actionWebhook'
import actionSlack from '@/components/scenarios/actionSlack'
import useVuelidate from '@vuelidate/core'

export default {
  props: ['actionObjProp', 'actionIndex'],
  components: {
    actionHeader,
    'action-ui': actionUI,
    actionEmail,
    actionTeams,
    actionJira,
    actionSkype,
    actionPagerDuty,
    actionWhatsapp,
    actionTelegram,
    actionVoice,
    actionSignl4,
    actionWebhook,
    actionSlack,
    'action-sms': actionSMS
  },
  emits: ['save-action', 'clone-action', 'delete-action', 'validated', 'update-action-trigger-delay-time'],
  data () {
    return {
      showDetails: false,
      v$: useVuelidate()
    }
  },
  computed: {
    actionObj () {
      return this.actionObjProp
    }
  },
  watch: {
    actionObj () {
      console.log('action. watch actionObj:', this.actionObj)
    }
  },
  methods: {
    saveAction () {
      console.log('action(scenario). Save. actionObj:', this.actionObj)
      this.$emit('save-action')
    },
    cloneAction () {
      console.log('action(scenario). Clone. actionObj:', this.actionObj)
      this.$emit('clone-action')
    },
    deleteAction (actionObj) {
      console.log('action(scenario). Delete.')
      this.$emit('delete-action')
    },
    updateValidState (state) {
      console.log('action(scenario). updateValidState. state:', state)
      this.$emit('validated', state)
    },
    onUpdateActionTriggerDelay (newTime) {
      console.log('action(scenario). onUpdateActionTriggerDelay', this.actionIndex, newTime)
      this.$emit('update-action-trigger-delay-time', { index: this.actionIndex, value: newTime })
    }
  }
}
</script>

<style scoped>

</style>
