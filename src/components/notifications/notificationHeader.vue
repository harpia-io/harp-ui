<template>
  <div class="main__buttons">
    <div class="sort">
      <div class="main__buttons-messengers">
        <dest-type-btn-ui
          :active="dstUi"
          @updateBtnState="onUpdateDestinationBtnState('ui')"
        />
        <dest-type-btn-teams
          :active="dstTeams"
          @updateBtnState="onUpdateDestinationBtnState('teams')"
        />
        <dest-type-btn-email
          :active="dstEmail"
          @updateBtnState="onUpdateDestinationBtnState('email')"
        />
        <dest-type-btn-telegram
          :active="dstTelegram"
          @updateBtnState="onUpdateDestinationBtnState('telegram')"
        />
        <dest-type-btn-voice
          :active="dstVoice"
          @updateBtnState="onUpdateDestinationBtnState('voice')"
        />
        <dest-type-btn-slack
          :active="dstSlack"
          @updateBtnState="onUpdateDestinationBtnState('slack')"
        />
        <dest-type-btn-SMS
          :active="dstSMS"
          @updateBtnState="onUpdateDestinationBtnState('sms')"
        />
        <dest-type-btn-signl4
          :active="dstSignl4"
          @updateBtnState="onUpdateDestinationBtnState('signl4')"
        />
        <dest-type-btn-jira
          :active="dstJira"
          @updateBtnState="onUpdateDestinationBtnState('jira')"
        />
        <dest-type-btn-p-d
          :active="dstPD"
          @updateBtnState="onUpdateDestinationBtnState('pagerduty')"
        />
        <dest-type-btn-webhook
          :active="dstWebhook"
          @updateBtnState="onUpdateDestinationBtnState('webhook')"
        />
      </div>

      <div class="main__buttons-notify" v-if="!historyMode">
        <state-btn-active
          :active="stateActive"
          @onUpdateNotificationState="onUpdateNotificationState('active')"
          :count="notificationStats.active"
          :colorId="3"
        />
        <state-btn-handled
          :active="stateHandled"
          @onUpdateNotificationState="onUpdateNotificationState('handled')"
          :count="notificationStats.handled"
          :colorId="3"
        />
        <state-btn-snoozed
          :active="stateSnoozed"
          @onUpdateNotificationState="onUpdateNotificationState('snoozed')"
          :count="notificationStats.snoozed"
          :colorId="3"
        />
        <state-btn-acknowledged
          :active="stateAcknowledged"
          @onUpdateNotificationState="onUpdateNotificationState('acknowledged')"
          :count="notificationStats.acknowledged"
          :colorId="3"/>
        <!--        <state-btn-all-->
        <!--          :count="notificationStats.all"-->
        <!--          :colorId="3"-->
        <!--        />-->
      </div>
    </div>

    <!--Time pickers-->
    <div class="notification-header__time-pikers" v-if="historyMode">
      <div class="handle__buttons__notification-header">
        <!--
        <button v-for="option in time_options"
                class="button__light"
                @click="timer = option.time"
                :class="{'active': quickFilter ? timer === option.time : option.custom}">
          Last {{ option.title }}
        </button>
        -->
        <!--
        <button class="button__light">
          <icon-calendar></icon-calendar>
          Last {{ selectedTimeTitle }}
          <icon-angle-down></icon-angle-down>
        </button>
        -->

        <date-time-picker :wrap="true"
                          :range="true"
                          dateType="iso"
                          @onDateTimeSelected="onTimePeriodChange"
                          disableDates="after">
        </date-time-picker>
      </div>
      <!--      <div class="timepicker-block" :class="{'active': !quickFilter}">-->
      <!--        <input class="input" type="date" name="calendar" v-model="date">-->
      <!--        <input class="input" type="time" name="time" v-model="time">-->
      <!--      </div>-->
      <!--      <div class="timepicker-block" :class="{'active': !quickFilter}">-->
      <!--        <input class="input" type="date" name="calendar" v-model="date">-->
      <!--        <input class="input" type="time" name="time" v-model="time">-->
      <!--      </div>-->
    </div>
    <div class="main__search" :class="{'tag-filter-history-mode': historyMode}">
      <!--      <div class="time__frame">-->
      <!--        <span>Time frame:</span>-->
      <!--        <button class="button__text-icon">15m</button>-->
      <!--        <button class="button__text-icon">30m</button>-->
      <!--        <button class="button__text-icon">1h</button>-->
      <!--        <button class="button__text-icon">3h</button>-->
      <!--        <button class="button__text-icon">6h</button>-->
      <!--        <button class="button__text-icon">12h</button>-->
      <!--        <button class="button__text-icon active">1d</button>-->
      <!--        <button class="button__text-icon">Custom</button>-->
      <!--      </div>-->
      <tag-search-block
        :global-search-select="globalSearchSelect"
        :global-filter-dict="globalFilterDict"
        :labels="globalFilterValues"
      />
      <div class="search__box" v-if="false">
        <button type="submit">
          <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.3548 2.22577C4.52211 2.22577 2.22577 4.52211 2.22577 7.3548C2.22577 10.1875 4.52211 12.4838 7.3548 12.4838C10.1875 12.4838 12.4838 10.1875 12.4838 7.3548C12.4838 4.52211 10.1875 2.22577 7.3548 2.22577ZM0.225769 7.3548C0.225769 3.41755 3.41755 0.225769 7.3548 0.225769C11.2921 0.225769 14.4838 3.41755 14.4838 7.3548C14.4838 9.12768 13.8367 10.7494 12.7657 11.9966L15.3477 14.5786L13.9334 15.9928L11.2604 13.3198C10.1386 14.0558 8.79671 14.4838 7.3548 14.4838C3.41755 14.4838 0.225769 11.2921 0.225769 7.3548Z"
                  fill="#9CA2AC" />
          </svg>
        </button>
        <input type="search"
               name="search"
               placeholder="Global search"
               class="input__search input"
               v-model="globally"
               @change="onUpdateGlobalSearch">
      </div>
    </div>
  </div>
</template>

<script>
import destTypeBtnUi from '@/components/icons/destTypeBtnUi'
import destTypeBtnTeams from '@/components/icons/destTypeBtnTeams'
import destTypeBtnEmail from '@/components/icons/destTypeBtnEmail'
import destTypeBtnTelegram from '@/components/icons/destTypeBtnTelegram'
import destTypeBtnWhatsApp from '@/components/icons/destTypeBtnWhatsApp'
import destTypeBtnSMS from '@/components/icons/destTypeBtnSMS'
import destTypeBtnVoice from '@/components/icons/destTypeBtnVoice'
import destTypeBtnSlack from '@/components/icons/destTypeBtnSlack'
import destTypeBtnSignl4 from '@/components/icons/destTypeBtnSignl4'
import destTypeBtnJira from '@/components/icons/destTypeBtnJira'
import destTypeBtnPD from '@/components/icons/destTypeBtnPD'
import destTypeBtnWebhook from '@/components/icons/destTypeBtnWebhook'
import StateBtnActive from '@/components/icons/stateBtnActive'
import StateBtnHandled from '@/components/icons/stateBtnHandled'
import StateBtnSnoozed from '@/components/icons/stateBtnSnoozed'
import StateBtnAcknowledged from '@/components/icons/stateBtnAcknowledged'
import StateBtnAll from '@/components/icons/stateBtnAll'
import store from '@/store'
import { UPDATE_DESTINATION_FILTER, UPDATE_STATE_FILTER } from '@/store/actions/config'
import DateTimePicker from '@/components/DateTimePicker'
import IconCalendar from '@/components/icons/iconCalendar'
import IconAngleDown from '@/components/icons/iconAngleDown'
import TagSearchBlock from '@/tools/tagSearch/tagSearchBlock'
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

const { DateTime } = require('luxon')

export default {
  name: 'notificationHeader',
  props: {
    notificationStats: Object,
    notificationStatesFilter: Object,
    destinationFilter: Object,
    timeFrame: String,
    globalSearch: String
  },
  emits: [
    'on-update-search-period',
    'onUpdateGlobalSearch'
  ],
  components: {
    TagSearchBlock,
    IconAngleDown,
    IconCalendar,
    DateTimePicker,
    destTypeBtnUi,
    destTypeBtnTeams,
    destTypeBtnEmail,
    destTypeBtnTelegram,
    destTypeBtnSMS,
    destTypeBtnVoice,
    destTypeBtnSlack,
    destTypeBtnWhatsApp,
    destTypeBtnSignl4,
    destTypeBtnJira,
    destTypeBtnPD,
    destTypeBtnWebhook,
    StateBtnActive,
    StateBtnHandled,
    StateBtnSnoozed,
    StateBtnAcknowledged,
    StateBtnAll
    // VueCtkDateTimePicker
  },
  data () {
    return {
      globally: this.globalSearch,
      // from: DateTime.utc().minus({ minutes: 180 }).toISO(),
      // to: DateTime.utc().toISO()
      timer: 180,
      quickFilter: true,
      fromDate: null,
      fromTime: null,
      tillDate: null,
      tillTime: null,
      selectedTimeTitle: '1 hour',
      selectedTime: null
    }
  },
  watch: {
    // timer () {
    //   this.onTimePeriodChange()
    // }
  },
  computed: {
    historyMode () {
      console.log('notificationHeader. computed. historyMode:', this.$store.getters.historyMode)
      return this.$store.getters.historyMode
    },
    btnStates () {
      return this.destinationFilter
    },
    dstUi () {
      return this.$store.state.config.filters.destinationFilter.ui
    },
    dstTeams () {
      return this.$store.state.config.filters.destinationFilter.teams
    },
    dstEmail () {
      return this.$store.state.config.filters.destinationFilter.email
    },
    dstTelegram () {
      return this.$store.state.config.filters.destinationFilter.telegram
    },
    dstWhatsapp () {
      return this.$store.state.config.filters.destinationFilter.whatsapp
    },
    dstSlack () {
      return this.$store.state.config.filters.destinationFilter.slack
    },
    dstVoice () {
      return this.$store.state.config.filters.destinationFilter.voice
    },
    dstSMS () {
      return this.$store.state.config.filters.destinationFilter.sms
    },
    dstSignl4 () {
      return this.$store.state.config.filters.destinationFilter.signl4
    },
    dstJira () {
      return this.$store.state.config.filters.destinationFilter.jira
    },
    dstPD () {
      return this.$store.state.config.filters.destinationFilter.pagerduty
    },
    dstWebhook () {
      return this.$store.state.config.filters.destinationFilter.webhook
    },
    stateActive () {
      return this.$store.state.config.filters.stateFilter.active
    },
    stateHandled () {
      return this.$store.state.config.filters.stateFilter.handled
    },
    stateSnoozed () {
      return this.$store.state.config.filters.stateFilter.snoozed
    },
    stateAcknowledged () {
      return this.$store.state.config.filters.stateFilter.acknowledged
    },
    notificationStates () {
      return this.notificationStatesFilter
    },
    globalFilterDict () {
      console.log('notificationHeader. globalFilterDict:', this.$store.state.config.tagFilters.global_filter_dict)
      return this.$store.state.config.tagFilters.global_filter_dict
    },
    globalSearchSelect () {
      console.log('notification. globalSearchSelect:', this.$store.state.config.tagFilters.global_search_select)
      return this.$store.state.config.tagFilters.global_search_select
    },
    globalFilterValues () {
      console.log('notification. globalFilterValues:', this.$store.state.config.tagFilterValues)
      return this.$store.state.config.tagFilterValues
    }
    // globally () {
    //   return this.globalSearch
    // }
  },
  methods: {
    onTimePeriodChange (date) {
      console.log('notificationHeader. onTimePeriodChange', date)
      // const time = DateTime.utc().minus({ minutes: this.timer }).toISO()
      // const time = new Date(date).toISOString()
      this.$emit('on-update-search-period', date)
    },
    onUpdateDestinationBtnState (btnName) {
      console.log('notificationHeader. onUpdateDestinationBtnState. btnName: ', btnName)
      store.commit(UPDATE_DESTINATION_FILTER, btnName)
      // this.$emit('updateDestBtnState', btnName)
    },
    onUpdateNotificationState (stateName) {
      console.log('notificationHeader. onUpdateNotificationState. stateName: ', stateName)
      store.commit(UPDATE_STATE_FILTER, stateName)
      // this.$emit('onUpdateNotificationStateFilter', stateName)
    },
    onUpdateGlobalSearch () {
      this.$emit('onUpdateGlobalSearch', this.globally)
    }
  }
}
</script>

<style scoped>
.handle__buttons__notification-header button{
  min-width: 75px;
}
.handle__buttons__notification-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding-left: 7px;
}
.notification-header__time-pikers {
  margin-left: auto;
}
.tag-filter-history-mode {
  width: calc(100% - 840px);
  flex-grow: 1;
}
</style>
