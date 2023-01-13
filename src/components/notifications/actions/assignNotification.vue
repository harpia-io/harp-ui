<template>
  <!-- popup code -->
  <div id="assign-notification" class="notification-action-popup__box notification-action-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Assign to</h4>
      <button class="popup__box-close" @click="close">
        <icon-popup-close></icon-popup-close>
      </button>
    </div>

    <div class="popup__box-main" style="height: unset">
<!--Jira fields-->
<!--      <div class="assign-to__fields">-->
<!--        <fieldset>-->
<!--          <legend>Jira project</legend>-->
<!--          <select-plugin name="environments" class="input__select input">-->
<!--            <option value="jira">Jira</option>-->
<!--            <option value="jira2">Jira 2</option>-->
<!--            <option value="jira3">Jira 3</option>-->
<!--          </select-plugin>-->
<!--        </fieldset>-->
<!--        <fieldset>-->
<!--          <legend>Description</legend>-->
<!--          <input type="text" name="description" placeholder="JIRAProject" class="input__text input">-->
<!--        </fieldset>-->
<!--        <fieldset>-->
<!--          <legend>Number</legend>-->
<!--          <select-plugin name="number" class="input__select input">-->
<!--            <option value="JIRAProject">JIRAProject</option>-->
<!--            <option value="jira2">Jira 2</option>-->
<!--            <option value="jira3">Jira 3</option>-->
<!--          </select-plugin>-->
<!--        </fieldset>-->
<!--      </div>-->

      <!--Recipients-->
      <div class="scenario-section__block-row">
        <div class="scenario-section__block-row-item">
          <div class="scenario-section__block-row-title">Recipients:</div>
        </div>
        <div class="scenario-section__block-row-item">
          <div class="scenario-section__block-row-list ">
            <email-form
              style="max-width: 220px"
              v-for="(email, index) in recipients" :key="index"
              :email="email"
              @update-email="updateEmail(index, $event)"
              @remove-email="recipients.splice(index, 1)">
            </email-form>
          </div>
          <span v-if="v$.recipients.$invalid" class="input form-validation-error">
          At least one recipient should be in the list
        </span>
        </div>
        <div class="scenario-section__block-row-item align-right">
          <button class="button__edit button__add" @click="recipients.push('')">
            <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3051 6.09995C11.3051 6.59995 10.9051 6.99995 10.4051 6.99995H6.80508V10.4C6.80508 10.9 6.40508 11.3 5.90508 11.3C5.40508 11.3 5.00508 10.9 5.00508 10.4V6.99995H1.60508C1.10508 6.99995 0.705078 6.59995 0.705078 6.09995C0.705078 5.59995 1.10508 5.19995 1.60508 5.19995H5.00508V1.59995C5.00508 1.09995 5.40508 0.699951 5.90508 0.699951C6.40508 0.699951 6.80508 1.09995 6.80508 1.59995V5.19995H10.4051C10.9051 5.19995 11.3051 5.59995 11.3051 6.09995Z" fill="#00C284"/>
            </svg>
            Add
          </button>
        </div>
      </div>

      <!--Time filter buttons-->
      <div class="handle__buttons">
        <button v-for="option in time_options"
                :key="option.time"
                @click="setTime(option.time, option.custom)"
                class="button__light"
                :class="{'active': quickFilter ? timer === option.time : option.custom}">{{ option.title }}</button>
      </div>

      <div class="snooze__buttons">
        <div class="left">
          <p class="checkbox">
            <input v-model="stickySeverity" type="checkbox" id="stickyseverity" name="onlycomments">
            <label for="stickyseverity">Sticky severity</label>
          </p>
          <p class="checkbox">
            <input v-model="stickyOutput" type="checkbox" id="stickyoutput" name="onlycomments">
            <label for="stickyoutput">Sticky output</label>
          </p>
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
      <!--Resubmit-->
<!--      <div class="snooze__buttons">-->
<!--        <div class="left">-->
<!--          <label for="resubmit_interval">Resubmit interval</label>-->
<!--          <input v-model="resubmitInterval" type="number" id="resubmit_interval" name="resubmit-interval">-->

<!--          <span>hours</span>-->
<!--        </div>-->
<!--      </div>-->
      <!-- popup buttons -->
      <div class="popup__box-buttons">
        <button class="button__large button__default close" @click="close">Close</button>
        <button class="button__large button__accent handle"
                @click="submit"
                :disabled="formInvalid"
                :class="{'button__accent': true, 'disabled': formInvalid}"
        >Assign</button>
      </div>

    </div>
  </div>
</template>

<script>
import { HIDE_ASSIGN_DIALOG, ASSIGN_NOTIFICATION } from '@/store/actions/notificationActions'
import emailForm from '@/components/forms/emailForm'
import DateTimePicker from '@/components/DateTimePicker'
import IconPopupClose from '@/components/icons/iconPopupClose'
import { minLength, required, minValue } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const { DateTime } = require('luxon')

export default {
  components: { IconPopupClose, DateTimePicker, emailForm },
  data () {
    return {
      v$: useVuelidate(),
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
      comment: '',
      recipients: [''],
      resubmitInterval: 8
    }
  },
  computed: {
    dateTimeError () {
      return this.dateTime ? new Date(this.dateTime).getTime() < new Date().getTime() : false
    },
    dateTime () {
      if (this.quickFilter) {
        return DateTime.utc().plus({ minutes: this.timer }).toISO()
      } else {
        return this.custom_datetime
      }
    },
    formInvalid () {
      return this.v$.$invalid
    }
  },
  validations () {
    return {
      recipients: {
        required,
        minLength: minLength(1)
      },
      resubmitInterval: {
        required,
        minValue: minValue(1)
      }
    }
  },
  beforeMount () {
    this.updateDateTime()
  },
  methods: {
    close () {
      this.$store.commit(HIDE_ASSIGN_DIALOG)
    },
    setTime (time, custom) {
      this.quickFilter = !custom
      this.timer = time
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
    },
    updateEmail (index, value) {
      this.recipients[index] = value
    },
    addRecipient () {
      this.recipients.push('')
      // this.v$.$validate()
    },
    submit () {
      const body = {
        sticky_severity: Number(this.stickySeverity),
        sticky_output: Number(this.stickyOutput),
        action_ts: this.dateTime,
        recipients: this.recipients
      }
      this.$store.dispatch(ASSIGN_NOTIFICATION, body)
    }
  }
}
</script>

<style scoped>
#assign-notification {
  max-width: 750px;
}
.notification-action-popup {
  background: var(--c-white);
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
.disabled {
  background-color: dimgrey;
}
#resubmit_interval {
  width: 30px;
  margin: 0 10px;
  border: 1px solid black;
}
</style>
