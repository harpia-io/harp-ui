<template>
  <div id="snooze-notification" class="notification-action-popup__box notification-action-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Snooze notification</h4>
      <button @click="close" class="popup__box-close">
        <icon-popup-close></icon-popup-close>
      </button>
    </div>

    <div class="popup__box-main" style="height: unset">

      <fieldset>
        <textarea class="input input__area" placeholder="Write your comment that will be visible in alert history..." v-model="comment"></textarea>
      </fieldset>

      <div class="handle__buttons">
        <button v-for="option in time_options"
                :key="option.time"
                @click="setTime(option.time, option.custom)"
                class="button__light"
                :class="{'active': quickFilter ? timer === option.time : option.custom}">{{ option.title }}</button>
      </div>

      <div class="snooze__buttons">
        <div class="left">
          <Tooltip :tooltipText="'Not selected - cancel if severity changed'">
            <p class="checkbox">
              <input v-model="stickySeverity" type="checkbox" id="stickyseverity" name="onlycomments">
              <label for="stickyseverity">Sticky severity</label>
            </p>
          </Tooltip>
          <Tooltip :tooltipText="'Not selected - cancel if alert output changed'">
            <p class="checkbox">
              <input v-model="stickyOutput" type="checkbox" id="stickyoutput" name="onlycomments">
              <label for="stickyoutput">Sticky output</label>
            </p>
          </Tooltip>
        </div>
        <div v-if="!quickFilter" class="right timepicker-block">
          <date-time-picker show-shortcuts="snooze"
                            :wrap="false"
                            date-type="iso"
                            disable-dates="before"
                            @onDateTimeSelected="selectedDateTime"></date-time-picker>
          <!--
          <input class="input" type="date" name="calendar" v-model="date">
          <input class="input" type="time" name="time" v-model="time">
          -->
          <div class="timepicker-error">
            {{ dateTimeError ? 'Please select-plugin a time later than now' : '' }}
          </div>
        </div>
      </div>
      <!-- popup buttons -->
      <div class="popup__box-buttons">
        <button class="button__large button__default close" @click="close">Close</button>
        <button class="button__large button__accent handle" @click="submit">Snooze</button>
      </div>

    </div>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip'
import { SNOOZE_NOTIFICATION, HIDE_SNOOZE_DIALOG } from '@/store/actions/notificationActions'
import DateTimePicker from '@/components/DateTimePicker'
import IconPopupClose from '@/components/icons/iconPopupClose'
const { DateTime } = require('luxon')

export default {
  components: { IconPopupClose, DateTimePicker, Tooltip },
  data () {
    return {
      time_options: [
        { time: 10, title: '10 min' },
        { time: 15, title: '15 min' },
        { time: 30, title: '30 min' },
        { time: 60, title: '1 hour' },
        { time: 2 * 60, title: '2 hours' },
        { time: 4 * 60, title: '4 hours' },
        { time: 8 * 60, title: '8 hours' },
        { time: 0, title: 'Custom', custom: true }
      ],
      timer: 15,
      custom_datetime: null,
      stickySeverity: false,
      stickyOutput: false,
      date: '',
      time: '',
      quickFilter: true,
      comment: ''
    }
  },
  watch: {},
  computed: {
    dateTimeError () {
      return this.dateTime ? new Date(this.dateTime).getTime() < new Date().getTime() : false
    },
    dateTime () {
      if (this.quickFilter) {
        return DateTime.now().plus({ minutes: this.timer }).toISO()
      } else {
        return this.custom_datetime
      }
    }
  },
  beforeMount () {
    this.updateDateTime()
  },
  methods: {
    close () {
      this.$store.commit(HIDE_SNOOZE_DIALOG)
    },
    setTime (time, custom) {
      this.quickFilter = !custom
      this.timer = time
    },
    submit () {
      if (!this.dateTimeError) {
        const body = {
          sticky_severity: this.stickySeverity,
          sticky_output: this.stickyOutput,
          action_ts: this.dateTime,
          comment: this.comment
        }
        this.$store.dispatch(SNOOZE_NOTIFICATION, body)
      }
    },
    selectedDateTime (time) {
      this.custom_datetime = time
    },
    updateDateTime () {
      // const dt = DateTime.now()
      // this.date = dt.toISODate()
      // this.time = dt.toLocaleString(DateTime.TIME_24_SIMPLE)
      this.quickFilter = true
      // console.log('snoozeNotification. updateDateTime.', this.date, this.time)
    }
  }
}
</script>

<style scoped>
#snooze-notification {
  max-width: 750px;
}
.notification-action-popup {
  background: var(--c-white);
  /*padding: 20px;*/
  /*border-radius: var(--r-radius);*/
  margin: 20px;
}
.notification-action-popup__box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-background);
  width: 100%;
  max-height: 100vh;
  z-index: 6;
}
.timepicker-error {
  color: red;
  display: block;
  margin-top: 5px;
}
.timepicker-block {
  width: 280px;
}
.timepicker-block.active input{
  background-color: #3c3c3c;
  color: white;
}
</style>
