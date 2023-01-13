<template>
  <div :class="['linked-alerts__box',
                {'linked-alerts__box-selected': notificationsSelected.includes(notification.notification_id)},
                { red: severity(3),
                  yellow: severity(2),
                  green: severity(0)}]"
       :id="'notificationId-' + notification.notification_id"
       @click.stop="mouseClickListener"
       @mouseleave="onMouseLeave"
       @mouseover="showAlertBtn = true">
    <div :class="['linked-alerts__box-buttons', {'linked-alerts__box-buttons-group': inGroup}]">
<!--      <icon-eye />-->
<!--      "ui": 1,-->
<!--      "email": 2,-->
<!--      "jira": 3,-->
<!--      "skype": 4,-->
<!--      "teams": 5,-->
<!--      "telegram": 6,-->
<!--      "pagerduty": 7,-->
<!--      "sms": 8,-->
<!--      "voice": 9,-->
<!--      "whatsapp": 10-->
<!--      "signl4": 11-->
<!--      <span>{{notification.body.notification_type}}</span>-->
      <dest-type-icon-ui v-if="notification.body.notification_type === 1"/>
      <dest-type-icon-email v-if="notification.body.notification_type === 2"/>
      <dest-type-icon-teams v-if="notification.body.notification_type === 5"/>
      <dest-type-icon-telegram v-if="notification.body.notification_type === 6"/>
      <dest-type-icon-signl4 v-if="notification.body.notification_type === 11"/>
<!--      <dest-type-icon-email v-if="notification.body.notification_type === 3"/>-->
<!--      <dest-type-icon-email v-if="notification.body.notification_type === 4"/>-->
<!--      <dest-type-icon-teams v-if="notification.body.notification_type === 5"/>-->
<!--      <dest-type-icon-telegram v-if="notification.body.notification_type === 6"/>-->
<!--      <dest-type-icon-telegram v-if="notification.body.notification_type === 7"/>-->
<!--      <dest-type-icon-telegram v-if="notification.body.notification_type === 8"/>-->
<!--      <dest-type-icon-telegram v-if="notification.body.notification_type === 9"/>-->
<!--      <dest-type-icon-telegram v-if="notification.body.notification_type === 10"/>-->

<!--      <state-lamp />-->
      <icon-new v-if="notification.notification_status === 2" />
      <icon-flapping v-if="notification.notification_status === 3" />
      <icon-urgent v-if="notification.notification_status === 4" />
      <icon-test v-if="notification.notification_status === 5" />
<!--      <div class="assign-to__initials" v-if="Object.keys(notification.assigned_to).length>0">-->
      <div class="assign-to__initials" v-if="notification.notification_state!=='active'">
        <Tooltip :tooltipText="handledByToolTip()" position="right">
          <span >{{Object.keys(notification.assigned_to).length > 0 ? notification.assigned_to.initials : notification.action_by.initials}}</span>
        </Tooltip>
      </div>
    </div>
<!--    notification columns-->
    <div :key="cell"
         :style="{'width': (columns[i].width + 1) + 'px'}"
         v-for="(cell, i) in columns" class="alert_cell">
      {{ notification.body[cell['id_']] ? notification.body[cell['id_']] : notification.body.additional_fields[cell['id_']] }}
    </div>
    <div class="linked-alerts__box-time alert_cell time-cell">{{ timeFormatter() }}</div>
    <div class="alerts__buttons" v-show="showAlertBtn && !historyMode">
      <!--Handle notification-->
      <div class="alert__button">
        <button class="button__icon-transparent" @click.stop="handleNotification">
          <Tooltip tooltipText="Handle" :position="index === 0 ? 'bottom' : 'top'">
            <icon-handled/>
          </Tooltip>
        </button>
      </div>
      <!--Cancel Handle notification-->
      <div class="alert__button cancel-action" v-if="notification.notification_state === 'handled'">
        <button class="button__icon-transparent" @click.stop="cancelHandleNotification">
          <Tooltip tooltipText="Cancel handle" :position="index === 0 ? 'bottom' : 'top'">
            <icon-handled :active="notification.notification_state === 'handled'" :cancel="true"/>
          </Tooltip>
        </button>
      </div>
      <!--Resolve notification-->
      <div class="alert__button">
        <button class="button__icon-transparent" @click.stop="resolveNotification">
          <Tooltip tooltipText="Resolve" :position="index === 0 ? 'bottom' : 'top'">
            <icon-resolve/>
          </Tooltip>
        </button>
      </div>
      <!--Snooze notification-->
      <div class="alert__button">
        <button class="button__icon-transparent" @click.stop="snoozeNotification">
          <Tooltip :tooltipText="notification.notification_state === 'snoozed' ? 'Snoozed by: ' + notification.action_by.initials : 'Snooze'" :position="index === 0 ? 'bottom' : 'top'">
            <icon-snoozed/>
          </Tooltip>
        </button>
      </div>
      <!--Cancel Snooze notification-->
      <div class="alert__button cancel-action" v-if="notification.notification_state === 'snoozed'">
        <button class="button__icon-transparent" @click.stop="cancelSnoozeNotification">
          <Tooltip tooltipText="Cancel snooze" :position="index === 0 ? 'bottom' : 'top'">
            <icon-snoozed :active="notification.notification_state === 'snoozed'" :cancel="true"/>
          </Tooltip>
        </button>
      </div>
      <!--Acknowledge-->
      <div class="alert__button">
        <button class="button__icon-transparent" @click.stop="acknowledgeNotification">
          <Tooltip :tooltipText="notification.notification_state === 'acknowledged' ? 'By: ' + notification.action_by.initials : 'Ack'" :position="index === 0 ? 'bottom' : 'top'">
            <icon-acknowledged/>
          </Tooltip>
        </button>
      </div>
      <!--Cancel Acknowledge-->
      <div class="alert__button cancel-action" v-if="notification.notification_state === 'acknowledged'">
        <button class="button__icon-transparent" @click.stop="cancelAcknowledgeNotification">
          <Tooltip tooltipText="Cancel ack" :position="index === 0 ? 'bottom' : 'top'">
            <icon-acknowledged :active="notification.notification_state === 'acknowledged'" :cancel="true"/>
          </Tooltip>
        </button>
      </div>
    </div>
    <div class="alert__button-box" v-show="alertsDetailsShow && notificationShortDetails">
      <div class="alert__button-bx">
        <button
          v-for="(linkObj, index) in additionalUrls"
          :key="index"
          @click="followLink(linkObj.urlLink)"
          class="button__edit button__add"
        > {{ linkObj.urlName }}
        </button>

      </div>

      <div class="alert__button-list">
        <div><p>Current output:</p><span>{{ currentOutput }}</span></div>
        <div><p>Previous output:</p><span>{{ previousOutput }}</span></div>
<!--        <div><p>Previous output:</p><span>{{ notification.body.output.previous }}</span></div>-->
<!--        <div><p>Previous output:</p><span>{{ notification.body }}</span></div>-->
<!--        <div><p>Trigger expression:</p><span>network-proxy-1.local() > 200</span></div>-->
<!--        <div><p>Requested by:</p><span>OPS team</span></div>-->
      </div>

    </div>
  </div>
  <confirmation-popup ref="confirmation"></confirmation-popup>
</template>

<script>
// import stateLamp from '@/components/icons/iconLamp'
// import teams from '@/components/icons/destTypeIconTeams'
import iconNew from '@/components/icons/iconNew'
import ConfirmationPopup from '@/components/popups/confirmationPopup'

// import iconEye from '@/components/icons/destTypeIconUi'
// import iconActive from '@/components/icons/iconActive'
import iconHandled from '@/components/icons/iconHandled'
import iconSnoozed from '@/components/icons/iconSnoozed'
import iconAcknowledged from '@/components/icons/iconAcknowledged'
import iconResolve from '@/components/icons/iconResolve'
import {
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  OPEN_NOTIFICATION_SNOOZE_DIALOG,
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  CANCEL_HANDLE_NOTIFICATION,
  CANCEL_SNOOZE_NOTIFICATION,
  CANCEL_ACKNOWLEDGE_NOTIFICATION
} from '@/store/actions/notificationActions'
// import DestTypeBtnEmail from '@/components/icons/destTypeBtnEmail'
// import DestTypeBtnTeams from '@/components/icons/destTypeBtnTeams'
// import DestTypeBtnUi from '@/components/icons/destTypeBtnUi'
// import DestTypeBtnTelegram from '@/components/icons/destTypeBtnTelegram'
// import DestTypeBtnSignl4 from '@/components/icons/destTypeBtnSignl4'

import DestTypeIconEmail from '@/components/icons/destTypeIconEmail'
import DestTypeIconTeams from '@/components/icons/destTypeIconTeams'
import DestTypeIconUi from '@/components/icons/destTypeIconUi'
import DestTypeIconTelegram from '@/components/icons/destTypeIconTelegram'
import DestTypeIconSignl4 from '@/components/icons/destTypeIconSignl4'
// import store from '@/store'
// import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import Tooltip from '@/components/Tooltip'
import IconFlapping from '@/components/icons/iconFlapping'
import IconUrgent from '@/components/icons/iconUrgent'
import IconTest from '@/components/icons/iconTest'
import { ref } from 'vue'

export default {
  props: {
    notification: {},
    inGroup: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['showNotificationPopup'],
  components: {
    IconTest,
    IconUrgent,
    IconFlapping,
    DestTypeIconTelegram,
    DestTypeIconSignl4,
    DestTypeIconUi,
    DestTypeIconTeams,
    DestTypeIconEmail,
    // DestTypeBtnTelegram,
    // DestTypeBtnUi,
    // DestTypeBtnTeams,
    // DestTypeBtnEmail,
    // DestTypeBtnSignl4,
    // stateLamp,
    // teams,
    iconNew,
    // iconEye,
    // iconActive,
    iconSnoozed,
    iconAcknowledged,
    iconHandled,
    iconResolve,
    Tooltip,
    ConfirmationPopup
  },
  data () {
    return {
      alertsDetailsShow: false,
      showAlertBtn: false,
      mouserClicks: {
        delay: 400,
        clicks: 0,
        timer: null
      },
      notificationShortDetails: null
    }
  },
  computed: {
    notificationsSelected () {
      return this.$store.state.notificationActions.notificationsSelected
    },
    columns () {
      // console.log('alert. computed. columns. this.$store.getters.filterColumnsUpdatedCounter', this.$store.getters.filterColumnsUpdatedCounter)
      // console.log('alert. computed. columns. this.$store.getters.userFilterColumns', this.$store.getters.userFilterColumns)
      return this.$store.getters.userFilterColumns
    },
    historyMode () {
      return this.$store.getters.historyMode
    },
    additionalUrls () {
      const urlsList = []
      if (this.notificationShortDetails) {
        for (const [urlName, urlLink] of Object.entries(this.notificationShortDetails.additional_urls)) {
          urlsList.push({
            urlName: urlName,
            urlLink: urlLink
          })
        }
      }
      return urlsList
    },
    currentOutput () {
      if (this.notificationShortDetails) {
        return this.notificationShortDetails.output.current
      }
      return ''
    },
    previousOutput () {
      if (this.notificationShortDetails) {
        return this.notificationShortDetails.output.current
      }
      return ''
    }
  },
  watch: {},
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  methods: {
    severity (id) {
      return this.notification.body.severity === id
    },
    onMouseLeave () {
      this.alertsDetailsShow = false
      this.showAlertBtn = false
    },
    mouseClickListener () {
      this.mouserClicks.clicks++
      if (this.mouserClicks.clicks === 1) {
        const dblClickFunc = this.dblClickAction
        const self = this
        this.mouserClicks.timer = setTimeout(function () {
          // self.oneClickAction()
          dblClickFunc()
          self.mouserClicks.clicks = 0
        }, this.mouserClicks.delay)
      } else {
        clearTimeout(this.mouserClicks.timer)
        this.mouserClicks.clicks = 0
        this.dblClickAction()
      }
    },
    handledByToolTip () {
      if (Object.keys(this.notification.assigned_to).length > 0) {
        return 'Handled by: ' + this.notification.assigned_to.full_name
      }
      return this.notification.notification_state[0].toUpperCase() + this.notification.notification_state.substring(1) + ' by: ' + this.notification.action_by.full_name
    },
    dblClickAction () {
      this.alertsDetailsShow = false
      console.log(this.notification)
      this.showNotificationDetails()
    },
    timeFormatter () {
      if (this.historyMode) {
        return this.notification.last_change_ts.substring(0, this.notification.last_change_ts.length - 3)
      }
      const seconds = Math.floor(Date.now() / 1000 - this.notification.last_change_ts)
      if (seconds < 60) {
        return seconds + 's'
      } else if (seconds < 3600) {
        return Math.floor(seconds / 60) + 'm'
      } else if (seconds < 86400) {
        return Math.floor(seconds / 3600) + 'h'
      } else {
        return Math.floor(seconds / 86400) + 'd'
      }
    },
    async showNotificationDetails () {
      // console.log('alert. showNotificationDetails. ')
      this.$emit('showNotificationPopup')
    },
    followLink (url) {
      window.open(url, '_blank')
    },
    notificationID () {
      return [Number(this.notification.notification_id)]
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
/*.text {*/
/*  background-color: #3C3C3C*/
/*}*/
.linked-alerts__box {
  border-right: 1px solid white;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}
.assign-to__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #DEDEDE;
  width: 30px;
  height: 30px;
  border-radius: 6px;
}
/*.linked-alerts__box-selected {*/
/*  border-right: 1px solid var(--c-red);*/
/*  border-top: 1px solid var(--c-red);*/
/*  border-bottom: 1px solid var(--c-red);*/
/*}*/
</style>
