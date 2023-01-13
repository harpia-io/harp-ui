<template>
  <div class="have-folder" @click="openGroup()"
       @mouseleave="onMouseLeave"
       @mouseover="showAlertBtn = true">
    <div class="linked-alerts__box folder active"
         :class="{
           red: severity(3),
           yellow: severity(2),
           green: severity(1)}">
      <div class="linked-alerts__box-folder notification__buttons-block">
        <svg :class="[{'arrow': openGroups.includes(formatGroupTitle(consolidationString()))}, 'arrow-flip']" width="11" height="6" viewbox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.50002 6L10.2631 0H0.736877L5.50002 6Z" fill="#3C3C3C"/>
        </svg>
        <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6133 2.6792H4.36053C4.10488 2.6792 3.89762 2.47195 3.89762 2.21629V1.98466C3.89762 1.72401 3.68631 1.5127 3.42566 1.5127H0.943937C0.422625 1.5127 0 1.93529 0 2.45663V10.3992L1.21116 4.50682C1.25541 4.29157 1.44484 4.1371 1.66459 4.1371H13.5573V3.62313C13.5573 3.10179 13.1346 2.6792 12.6133 2.6792Z" fill="#3C3C3C"/>
          <path d="M15.0561 5.06299H2.04217L0.220701 13.9245C0.160951 14.2152 0.383013 14.4876 0.679857 14.4876H14.2223C14.7034 14.4876 15.1076 14.1257 15.1605 13.6474L15.9943 6.11074C16.0561 5.55171 15.6185 5.06299 15.0561 5.06299Z" fill="#3C3C3C"/>
        </svg>
      </div>
      <div class="linked-alerts__box-role consolidation-role-block group-block-full-width" style="flex: 1 0">{{ formatGroupTitle(consolidationString()) }}</div>
      <div class="linked-alerts__box-role consolidation-role-block" style="width: initial">{{ consolidationObj.group_notifications_count }} Notifications</div>
      <div class="linked-alerts__box-role consolidation-role-block" style="width: initial">{{ timeFormatter(consolidationObj.current_duration) }}</div>
      <!--
      <div class="linked-alerts__box-host consolidation-host-block">{{ consolidationString() }}</div>
      -->
      <!--<div class="linked-alerts__box-time">4m</div>-->
      <div class="alerts__buttons" v-show="showAlertBtn" :style="{'z-index': 'unset'}">
        <!--Handle notification-->
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="handleNotification">
            <Tooltip tooltipText="Handle" :position="index === 0 ? 'bottom' : 'top'">
              <icon-handled/>
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="resolveNotification">
            <Tooltip tooltipText="Resolve" :position="index === 0 ? 'bottom' : 'top'">
              <icon-resolve/>
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="snoozeNotification">
            <Tooltip tooltipText="Snooze" :position="index === 0 ? 'bottom' : 'top'">
              <icon-snoozed/>
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="acknowledgeNotification">
            <Tooltip tooltipText='Ack' :position="index === 0 ? 'bottom' : 'top'">
              <icon-acknowledged/>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>

    <!-- child -->
    <div class="child" v-if="openGroups.includes(formatGroupTitle(consolidationString()))">
      <div v-for="(item, index) in consolidationObj.group_notifications" :key="index">
        <notification
          :notification="item"
          :index="index"
          :in-group="true"
          :columns="columns"
          @showNotificationPopup="$emit('showNotificationPopup', item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/notifications/alert'
import Tooltip from '@/components/Tooltip'
import iconHandled from '@/components/icons/iconHandled'
import iconSnoozed from '@/components/icons/iconSnoozed'
import iconAcknowledged from '@/components/icons/iconAcknowledged'
import iconResolve from '@/components/icons/iconResolve'
import {
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  OPEN_NOTIFICATION_SNOOZE_DIALOG
} from '@/store/actions/notificationActions'

export default {
  props: ['consolidationObj', 'index', 'openGroups'],
  emits: [
    'showNotificationPopup',
    'close-group',
    'open-group'
  ],
  components: {
    Notification,
    Tooltip,
    iconHandled,
    iconSnoozed,
    iconAcknowledged,
    iconResolve
  },
  data () {
    return {
      consolidationBlockOpen: false,
      showAlertBtn: false
    }
  },
  computed: {
    historyMode () {
      return this.$store.getters.historyMode
    },
    columns () {
      return this.$store.getters.userFilterColumns
    }
  },
  methods: {
    openGroup () {
      const group = this.formatGroupTitle(this.consolidationString())
      if (this.openGroups.includes(group)) {
        this.$emit('close-group', { group: group, ids: this.consolidationObj.group_notifications.map(x => x.notification_id) })
      } else {
        this.$emit('open-group', { group: group, ids: this.consolidationObj.group_notifications.map(x => x.notification_id) })
      }
    },
    formatGroupTitle (str) {
      return str.replace(/[""]/g, '')
    },
    timeFormatter (ts) {
      if (this.historyMode) {
        return ts
      }
      const seconds = ts
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
    severity (id) {
      return false
      // return this.consolidationObj.body.severity === id
    },
    onMouseLeave () {
      this.showAlertBtn = false
    },
    consolidationString () {
      return JSON.stringify(this.consolidationObj.group_tags).slice(1, -1)
    },
    notificationIDs () {
      const notificationList = []
      this.consolidationObj.group_notifications.forEach(notification => {
        notificationList.push(Number(notification.notification_id))
      })
      console.log(notificationList)
      return notificationList
    },
    handleNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_HANDLE_DIALOG, this.notificationIDs())
    },
    resolveNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_RESOLVE_DIALOG, this.notificationIDs())
    },
    snoozeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_SNOOZE_DIALOG, this.notificationIDs())
    },
    acknowledgeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG, this.notificationIDs())
    }
  }
}
</script>

<style scoped>
.notification__buttons-block {
  min-width: 103px;
}
.consolidation-role-block {
  width: initial;
}
.group-block-full-width {
  flex: 1 0;
}
.arrow-flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
