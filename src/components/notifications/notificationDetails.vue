<template>
  <div class="popup__box reports popup__xlarge notification-details">
    <!--
    <div class="settings-page__background-filter" v-if="showStatistics"></div>
    -->
    <div class="popup__box-header">
      <h4 class="popup__box-title">{{showStatistics ? 'Notification statistics' : 'Notification details'}}</h4>
      <button class="popup__box-close" @click="closeDialog">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>
    <notification-statistics v-if="showStatistics"
                             :history="notificationHistoryReversed"
                             @close="openStatistics()"></notification-statistics>
    <div class="popup__box-body">
      <loading-spinner height="500px" loader="dots" v-if="!notificationObj && !showStatistics"/>
      <div v-if="notificationObj && !showStatistics" class="popup__box-main-second" style="background: none;">
        <!-- buttons row -->
        <div class="notification__buttons">
          <div class="left">
            <nd-copy-btn v-clipboard:copy="notificationShortDetails"/>
            <nd-trends-btn  @click="openStatistics()"/>
            <nd-copy-link-btn v-clipboard:copy="notificationUrl"/>
            <nd-assign-btn  @click="assignNotification"/>
            <nd-bug-btn v-if="false"/>
          </div>

          <div class="right" v-if="!historyMode">
            <action-handle-btn @click.stop="handleNotification" :active="handled" type="button__icon"/>
            <action-handle-btn
              v-if="notificationBaseObj.notification_state === 'handled'" :cancel="true"
              @click.stop="cancelHandleNotification" :active="handled" :toolTipText="'Cancel handle'"
              type="button__icon"/>
            <!--Cancel Handle notification-->
<!--            <div class="alert__button cancel-action" v-if="notificationBaseObj.notification_state === 'handled'">-->
<!--              <button class="button__icon-transparent" @click.stop="cancelHandleNotification">-->
<!--                <Tooltip tooltipText="Cancel handle">-->
<!--                  <icon-handled :active="notificationBaseObj.notification_state === 'handled'" :cancel="true"/>-->
<!--                </Tooltip>-->
<!--              </button>-->
<!--            </div>-->
            <action-resolve-btn @click.stop="resolveNotification" type="button__icon"/>
            <action-snooze-btn @click.stop="snoozeNotification" :active=snoozed type="button__icon"/>
            <action-snooze-btn
              v-if="notificationBaseObj.notification_state === 'snoozed'" :cancel="true"
              @click.stop="cancelSnoozeNotification" :active=snoozed :toolTipText="'Cancel snooze'"
              type="button__icon"/>
            <!--Cancel Snooze notification-->
<!--            <div class="alert__button cancel-action" v-if="notificationBaseObj.notification_state === 'snoozed'">-->
<!--              <button class="button__icon-transparent" @click.stop="cancelSnoozeNotification">-->
<!--                <Tooltip tooltipText="Cancel snooze">-->
<!--                  <icon-snoozed :active="notificationBaseObj.notification_state === 'snoozed'" :cancel="true"/>-->
<!--                </Tooltip>-->
<!--              </button>-->
<!--            </div>-->
            <action-acknowledge-btn @click.stop="acknowledgeNotification" :active="acknowledged" type="button__icon"/>
            <action-acknowledge-btn
              v-if="notificationBaseObj.notification_state === 'acknowledged'" :cancel="true"
              @click.stop="cancelAcknowledgeNotification" :active="acknowledged" :toolTipText="'Cancel ack'"
              type="button__icon"/>
            <!--Cancel Acknowledge-->
<!--            <div class="alert__button cancel-action" v-if="notificationBaseObj.notification_state === 'acknowledged'">-->
<!--              <button class="button__icon-transparent" @click.stop="cancelAcknowledgeNotification">-->
<!--                <Tooltip tooltipText="Cancel ack">-->
<!--                  <icon-acknowledged :active="notificationBaseObj.notification_state === 'acknowledged'" :cancel="true"/>-->
<!--                </Tooltip>-->
<!--              </button>-->
<!--            </div>-->
          </div>
        </div>

        <!-- notifications content -->
        <div class="notifications__list">
          <div class="notifications__box">
            <header>
              <h4>Notification details: </h4>
              <!--Links-->
              <div class="notification-details__links">
                <a target="_blank" style="font-size: 12px;" class="notifications__additional-links" v-for="(urlLink, urlName) in notificationObj.additional_urls" :key="urlName" :href="urlLink">{{urlName}}</a>
              </div>
              <!--Critical sign-->
              <icon-alert :btn-color="notificationObj.severity === 3 ? '#E23E34' : '#e58e17'"/>
            </header>

            <div class="notifications__box-list">
              <p><span>Name:</span><b>{{ notificationObj.name }}</b></p>
              <p><span>Environment:</span><b>{{ notificationObj.studio }}</b></p>
              <p><span>MS:</span><b>{{ notificationObj.monitoring_system }}</b></p>
              <p><span>Source:</span><b>{{ notificationObj.source }}</b></p>
<!--                <p><span>Service:</span><b>{{ notificationObj.service }}</b></p>-->
<!--                <p><span>Object:</span><b>{{ notificationObj.object }}</b></p>-->
<!--                <p><span>Layer:</span><b>infrastructure</b></p>-->
            </div>
<!--              <div class="notifications__box-list" v-if="Object.keys(notificationObj.additional_urls).length > 0">-->
<!--                <p><span>Links: </span><b>-->
<!--                  <a class="notifications__additional-links" v-for="(urlLink, urlName) in notificationObj.additional_urls" :key="urlName" :href="urlLink">{{urlName}}</a>-->
<!--                </b></p>-->
<!--              </div>-->
            <div class="notifications__box-list">
              <p><span>Output:</span><b>{{ notificationObj.output.current }}</b></p>
              <p><span>Output before:</span><b>{{ notificationObj.output.previous }}</b></p>
<!--                <p><span>Threshold:</span><b>200</b></p>-->
<!--                <p><span>Trigger expression:</span><b>network-proxy-1.local() > 200</b></p>-->
<!--                <p><span>Requested by:</span><b>OPS team</b></p>-->
            </div>
            <div class="notifications__box-list" v-if="Object.keys(notificationObj.additional_fields).length > 0">
              <p v-for="(value, field) in notificationObj.additional_fields" :key="field"><span>{{ field }}:</span><b>{{ value }}</b></p>
            </div>
            <div v-if="false" class="notifications__chart">
              chart render this
            </div>
          </div>

          <div class="notifications__box right">
            <!-- tabs -->
            <div class="tabs">
              <div class="tabs__bar">
                <button class="history"
                        :class="{'active': tabShow === 'history' }"
                        @click="tabShow = 'history'"
                >History</button>
                <button class="procedure"
                        :class="{'active': tabShow === 'scenario'}"
                        @click="tabShow = 'scenario'"
                >Scenario</button>
              </div>

              <div class="tabs__content">
                <history-details
                  v-show="tabShow === 'history'"
                  :notification-base-obj="notificationBaseObj"
                  :history="notificationHistory"
                  @update-history="loadNotificationHistory"
                />
                <scenario-details
                  :scenarioObj="notificationObj.notification_procedure"
                  v-show="tabShow === 'scenario'"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <confirmation-popup ref="confirmation"></confirmation-popup>
<!--  </section>-->
</template>

<script>
import ndCopyBtn from '@/components/icons/ndCopyBtn'
import ndTrendsBtn from '@/components/icons/ndTrendsBtn'
import ndCopyLinkBtn from '@/components/icons/ndCopyLinkBtn'
import ndAssignBtn from '@/components/icons/ndAssignBtn'
import ndBugBtn from '@/components/icons/ndBugBtn'
import actionHandleBtn from '@/components/icons/actionHandleBtn'
import actionResolveBtn from '@/components/icons/actionResolveBtn'
import actionSnoozeBtn from '@/components/icons/actionSnoozeBtn'
import actionAcknowledgeBtn from '@/components/icons/actionAcknowledgeBtn'
import iconHandled from '@/components/icons/iconHandled'
import iconSnoozed from '@/components/icons/iconSnoozed'
import iconAcknowledged from '@/components/icons/iconAcknowledged'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import ScenarioDetails from '@/components/notifications/scenarioDetails'
import HistoryDetails from '@/components/notifications/historyDetails'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import Tooltip from '@/components/Tooltip'
import {
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  OPEN_NOTIFICATION_SNOOZE_DIALOG,
  OPEN_NOTIFICATION_ASSIGN_DIALOG,
  CANCEL_HANDLE_NOTIFICATION,
  CANCEL_SNOOZE_NOTIFICATION,
  CANCEL_ACKNOWLEDGE_NOTIFICATION
} from '@/store/actions/notificationActions'
import NotificationStatistics from '@/components/notifications/notificationStatistics'
import LoadingSpinner from '../LoadingSpinner'
import IconAlert from '@/components/icons/iconAlert'
import { ref } from 'vue'
// import store from '@/store'
// import notificationActions from '@/store/modules/notificationActions'

export default {
  components: {
    IconAlert,
    LoadingSpinner,
    NotificationStatistics,
    HistoryDetails,
    ScenarioDetails,
    ndCopyBtn,
    ndTrendsBtn,
    ndCopyLinkBtn,
    ndAssignBtn,
    ndBugBtn,
    actionHandleBtn,
    actionResolveBtn,
    actionSnoozeBtn,
    actionAcknowledgeBtn,
    iconSnoozed,
    iconAcknowledged,
    iconHandled,
    Tooltip,
    ConfirmationPopup
  },
  props: {
    notificationBaseObj: Object
  },
  emits: [
    'close'
  ],
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  data () {
    return {
      loading: true,
      notificationObj: null,
      tabShow: 'history',
      showStatistics: false,
      notificationShortDetails: '',
      notificationUrl: '',
      notificationHistory: {},
      notificationHistoryReversed: {}
    }
  },
  computed: {
    historyMode () {
      return this.$store.getters.historyMode
    },
    notificationHistoryUpdateTrigger () {
      return this.$store.getters.notificationHistoryUpdateTrigger
    },
    snoozed () {
      if (this.notificationBaseObj.notification_state) {
        return this.notificationBaseObj.notification_state === 'snoozed'
      }
      return false
    },
    handled () {
      if (this.notificationBaseObj.notification_state) {
        return this.notificationBaseObj.notification_state === 'handled'
      }
      return false
    },
    acknowledged () {
      console.log('notificationDetails. computed. acknowledged. this.notificationBaseObj:', this.notificationBaseObj)
      if (this.notificationBaseObj.notification_state) {
        return this.notificationBaseObj.notification_state === 'acknowledged'
      }
      return false
    }
  },
  watch: {
    notificationObj () {
      this.notificationShortDetails = 'Name: ' + this.notificationObj.name + '\nObject: ' + this.notificationObj.object + '\nOutput: ' + this.notificationObj.output.current
      this.notificationUrl = this.$store.state.harpUrl + '#/notifications-panel?notification_id=' + this.notificationObj.id
    },
    notificationHistoryUpdateTrigger () {
      this.loadNotificationHistory()
    }
  },
  beforeMount () {
    this.onOpen()
  },
  methods: {
    openStatistics () {
      this.showStatistics = !this.showStatistics
    },
    onOpen () {
      console.log('notificationDetails. onOpen.')
      this.loading = true
      this.loadNotificationDetails()
      this.loading = false
      this.loadNotificationHistory()
    },
    loadNotificationDetails () {
      const requestObj = {
        service: 'actions',
        path: '/notifications/notification-details-main/' + this.notificationBaseObj.notification_id,
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Collect main details for notification with id: ' + this.notificationBaseObj.notification_id
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('notificationDetails. loadNotificationDetails. response:', response.msg)
          this.notificationObj = response.msg
          this.showLoader = false
        })
        .catch((error) => {
          this.showLoader = false
          console.error('notificationDetails. loadNotificationDetails. Error:', error)
        })
    },
    loadNotificationHistory () {
      const requestObj = {
        service: 'actions',
        path: '/notifications/notification-details-history/' + this.notificationBaseObj.notification_id,
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Collect history for notification with id: ' + this.notificationBaseObj.notification_id
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('notificationDetails. loadNotificationHistory. response:', response.msg)
          this.notificationHistory = response.msg.history
          this.notificationHistoryReversed = JSON.parse(JSON.stringify(response.msg.history))
          this.notificationHistoryReversed.body = this.notificationHistoryReversed.body.reverse()
          this.showLoader = false
        })
        .catch((error) => {
          this.showLoader = false
          console.error('notificationDetails. loadNotificationHistory. Error:', error)
        })
    },
    notificationSeverityColor () {
      return this.notificationObj.severity === 3 ? '#E23E34' : '#E2A234FF'
    },
    closeDialog () {
      this.$emit('close')
    },
    notificationID () {
      return [Number(this.notificationBaseObj.notification_id)]
    },
    handleNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_HANDLE_DIALOG, this.notificationID())
    },
    resolveNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_RESOLVE_DIALOG, this.notificationID())
    },
    snoozeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_SNOOZE_DIALOG, this.notificationID())
    },
    acknowledgeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG, this.notificationID())
    },
    assignNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_ASSIGN_DIALOG, this.notificationID())
    },
    async cancelHandleNotification () {
      const confirmation = await this.$refs.confirmation.showScenario('cancelHandle')
      if (confirmation) {
        this.$store.dispatch(CANCEL_HANDLE_NOTIFICATION, this.notificationID())
      }
    },
    async cancelSnoozeNotification () {
      const confirmation = await this.$refs.confirmation.showScenario('cancelSnooze')
      if (confirmation) {
        this.$store.dispatch(CANCEL_SNOOZE_NOTIFICATION, this.notificationID())
      }
    },
    async cancelAcknowledgeNotification () {
      const confirmation = await this.$refs.confirmation.showScenario('cancelAcknowledge')
      if (confirmation) {
        this.$store.dispatch(CANCEL_ACKNOWLEDGE_NOTIFICATION, this.notificationID())
      }
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1200px) and (max-height: 600px) {
  .notification-details {
    min-width: 800px;
    height: 450px;
    /*max-height: 100vh;*/
    overflow-y: scroll;
    /*overflow-x: scroll;*/
    /*border-radius: 12px;*/
    background-color: #EFF0F4;
    /*border: 1px solid gray;*/
  }
}
@media screen and (min-width: 1201px) {
  .notification-details {
    min-width: 1070px;
    min-height: 560px;
    max-height: 100vh;
    overflow-y: auto;
    /*border-radius: 12px;*/
    background-color: #EFF0F4;
    /*border: 1px solid gray;*/
  }
}
/*.notification-details {*/
/*  min-width: 1070px;*/
/*  min-height: 560px;*/
/*  max-height: 100vh;*/
/*  overflow-y: auto;*/
/*  !*border-radius: 12px;*!*/
/*  background-color: #EFF0F4;*/
/*  !*border: 1px solid gray;*!*/
/*}*/
.notifications__additional-links {
  padding-right: 5px;
}
.notification-details__links {
  margin-left: auto;
}
</style>
