<template>
  <div class="history active">

    <!-- history list -->
    <div class="history__list">
      <div class="history__list-filter">
        <p class="checkbox">
          <input type="checkbox" id="onlycomments" name="onlycomments" @change="showOutputOnly=!showOutputOnly">
          <label for="onlycomments">Actions</label>
        </p>
        <div style="margin-left: auto; padding-right: 15px; font-size: small">
          <p>{{ notificationStatistic }}</p>
        </div>
        <!--Leave comment button-->
        <button class="button__icon-transparent" @click="commentNotification">
          <svg width="16" height="14" viewbox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.43 0.078125H2.55441C1.41733 0.078125 0.492188 1.00327 0.492188 2.14035V8.79596C0.492188 9.93085 1.4133 10.8543 2.54709 10.8582V13.8786L6.88733 10.8585H13.43C14.567 10.8585 15.4922 9.93332 15.4922 8.79596V2.14035C15.4922 1.00327 14.567 0.078125 13.43 0.078125ZM11.4774 7.81277H4.50696V6.93387H11.4774V7.81277ZM11.4774 5.93777H4.50696V5.05887H11.4774V5.93777ZM11.4774 4.06277H4.50696V3.18387H11.4774V4.06277Z" fill="#3C3C3C"/>
          </svg>
        </button>
      </div>
      <!-- timeline -->
      <loading-spinner height="200px" v-if="!history.body"></loading-spinner>
      <div class="timeline__list">
        <div v-for="(event, index) in history.body"
             :key="index"
             v-show="!showOutputOnly || (showOutputOnly && Object.keys(event.comments).length > 0)"
          class="timeline__box"
             :class="{'red': dotColor(event) === 'red',
             'green': dotColor(event) === 'green',
             'grey': dotColor(event) === 'grey'}">
          <div class="time">{{ formatTimeStamp(event.last_change_ts)  }}</div>
          <div class="dot"><span></span></div>
          <div class="notification-history-text-block">
            <div class="name">{{ event.notification_action }}</div>
            <div v-if="IsUserAction(event.notification_action)"
                 class="name">{{ userActionText(event.notification_action, event.comments) }}</div>
            <div v-else
                 class="name">{{ event.notification_output }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { OPEN_NOTIFICATION_COMMENT_DIALOG } from '@/store/actions/notificationActions'
import LoadingSpinner from '@/components/LoadingSpinner'

const moment = require('moment-timezone')
export default {
  props: ['history', 'notificationBaseObj'],
  components: { LoadingSpinner },
  data () {
    return {
      showOutputOnly: false,
      comment: ''
    }
  },
  computed: {
    notificationStatistic () {
      console.log('statistics', this.history.statistics)
      if (this.history.statistics === undefined) {
        return ''
      } else {
        return 'Reopened: ' + this.history.statistics.reopen + ', snoozed: ' + this.history.statistics.snoozed
      }
    }
  },
  methods: {
    formatTimeStamp (value) {
      return moment(value * 1000).tz('UTC').format('DD.MM HH:mm:ss')
    },
    dotColor (event) {
      if (event.notification_action === 'Reopen event' || event.notification_action === 'Open event') {
        return 'red'
      } else if (event.notification_action === 'Close event') {
        return 'green'
      } else {
        return 'grey'
      }
    },
    commentNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_COMMENT_DIALOG, this.notificationBaseObj)
      // setTimeout(function () {
      //   this.$emit('update-history')
      // }, 2000)
    },
    IsUserAction (action) {
      let userAction = false
      if (['Handle alert', 'Snooze alert', 'Adding comment', 'Acknowledge alert'].includes(action)) {
        userAction = true
      }
      return userAction
    },
    userActionText (action, comments) {
      let text = ''
      if (['Snooze alert', 'Handle alert', 'Acknowledge alert'].includes(action)) {
        text = 'by: "' + comments.author + '" till: ' + comments.till
      } else if (['Resolve alert'].includes(action)) {
        text = 'by: "' + comments.author + '"'
      } else if (['Adding comment'].includes(action)) {
        text = 'by: "' + comments.author + '": "' + comments.comment + '"'
      }
      return text
    }
  }
}
</script>

<style scoped>
.history {
  max-height: 350px;
  /*overflow: auto;*/
}
.history .time {
  width: 50px;
  min-width: 50px;
}
.notification-history-text-block {
  display: flex;
  flex-direction: column;
}
</style>
