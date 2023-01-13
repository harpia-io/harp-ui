<template>
  <div class="statistics__button__back">
    <button @click="$emit('close')">
      ← Back to Notification details
    </button>
  </div>
  <div class="popup__box-main">

      <div class="statistics__header">
        <div class="stat__arrows">
          <Tooltip tooltipText='Previous'>
            <button class="statistics__chevron"
                    @click="['hour', 'day'].includes(period.time) ? offsetNumber-- : previousMonth()">
              <icon-chevron-left></icon-chevron-left>
            </button>
          </Tooltip>
          <Tooltip tooltipText='Next'>
            <button class="statistics__chevron"
                    @click="['hour', 'day'].includes(period.time) ? offsetNumber++ : nextMonth()">
              <icon-chevron-right></icon-chevron-right>
            </button>
          </Tooltip>
          <Tooltip tooltipText='Reset'>
            <button class="statistics__chevron"
                    @click="resetOffset()">
              <icon-restart btnColor="#3C3C3C"></icon-restart>
            </button>
          </Tooltip>
          <!--
          <button class="button__icon-transparent" @click="offsetNumber--">
            <icon-chevron-left></icon-chevron-left>
          </button>
          <button class="button__icon-transparent" @click="offsetNumber++">
            <icon-chevron-right></icon-chevron-right>
          </button>
          -->
        </div>
        <!-- Statistics Legend -->
        <div class="stat__buttons">
          <button v-for="option in period_options"
                  @click="selectPeriod(option.id)"
                  :key="option.id"
                  :class="['button__light', {'active': option.id === selectedPeriod}]">
            {{ option.title}}
          </button>
        </div>
      </div>
        <div class="statistics__main">
          <div class="stat__main-box info" v-if="history.body">
            <button v-for="filter in filters"
                    @click="selectFilter(filter)"
                    :class="{'statistics__filter-disabled': !isFilterSelected(filter)}"
                    :key="filter.icon" class="button__transparent">
              <component :btnColor="!isFilterSelected(filter) ? '#9CA2AC' : undefined" :is="filter.icon"></component>
              {{ filter.title }}
            </button>
            <button @click="resetFilters()" class="button__transparent">
              <u>Select All</u>
            </button>
            <button @click="selectedFilters = []" class="button__transparent statistics__main-unselect-button">
              <u>Unselect All</u>
            </button>
          </div>
          <!-- !history.body -->
          <div class="stat__main-box dates" v-if="!history.body">
            <loading-spinner loader="dots" :isFullPage="false"></loading-spinner>
          </div>
          <template v-if="history.body && period.time !== 'month' && singleHours.length === 24">
            <div class="stat__main-box dates" :key="slots" v-for="slots in [period.time === 'hour' ? getHourSlots() : getDaySlots()]">
              <div class="statistics__dates">
                <div :key="date" v-for="date in Object.keys(getDateHeaders(slots))"
                     :style="`width: calc(100% * ${(getDateHeaders(slots)[date].length) / period.cols })`">
                  {{ date }}
                </div>
              </div>
              <div class="statistics__columns">
                <div :key="slot.start"
                     @click.stop="drillDown(period.cols - col - 1, slot)"
                     class="stat__main-box time"
                     :style="`max-width: calc((100%) / ${period.cols}); min-width: calc((100%) / ${period.cols});`"
                     v-for="(slot, col) in slots">
                  <div @click.stop="drillDown(period.cols - col - 1, slot)">
                    <!-- {{ getDayName(slot) }} <b>{{ getMonthName(slot) }}</b> {{ getYearName(slot) }}-->
                    <div class="time-box" v-if="period.time === 'hour'">
                      <time> {{ cutHeadTime(singleHours[slot.hour_index].title, period.cols)}} </time>
                    </div>
                    <div :key="notification" class="button__time-wrapper"
                         v-for="(notification, i) in notificationsHistory.filter(x => (x.last_change_ts >= slot.start.getTime() / 1000) && (x.last_change_ts < slot.end.getTime() / 1000))">
                      <!--{{ notification }}-->
                      <button :class="['button__time', getColor(notification.notification_action), {'button__time-svg': period.cols === 24}]">
                        <component v-if="period.cols === 6 || period.cols === 3 || period.cols === 7 || period.cols === 24"
                                   :is="getIcon(notification.notification_action)"></component>
                        <span v-if="period.cols !== 24">{{ cutTimeStamp(timeStampToTime(notification.last_change_ts), period.cols) }}</span>
                      </button>
                      <div :class="['time__info', {'time__info__reversed': col > 1}, col > 1 ? 'time__info__reversed_' + period.cols: '', {'time__info__column-top time__info__reversed-vertical': i > 10 }]">
                        <notification-overflow  :ts="timeStampToTime(notification.last_change_ts)"
                                                :notification="notification"></notification-overflow>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="history.body && period.time === 'month'">
            <div class="stat__main-box dates">
              <div class="statistics__calendar-header">
                {{ months[selectedUtcMonth] }} {{ selectedUtcYear }}
              </div>
              <div class="statistics__calendar-body"
                   :key="month"
                   v-for="month in [monthDays(selectedUtcYear, selectedUtcMonth)]">
                <div class="statistics__calendar-week" v-for="row in 6" :key="row">
                  <div class="statistics__calendar-day" :key="i" v-for="(weekDay, i) in weekDays">
                    <div class="statistics__calendar-day__body"
                         :key="day.end"
                         @click="drillDownDay(day.end)"
                        :class="{'statistics__day-current': day.date === currentUtcDay && selectedUtcMonth === currentUtcMonth && selectedUtcYear === currentUtcYear }"
                         v-for="day in month[row-1].filter(x => x.day === weekDay)">
                      <div class="statistics__calendar-day__body-date">{{ day.date }}</div>
                      <div v-for="notifications in [notificationsHistory.filter(x => (x.last_change_ts >= day.start / 1000) && (x.last_change_ts < day.end / 1000))]"
                           :key="notifications" class="statistics__calendar-day__body-notifications"
                           :style="notifications.length < 2 ? 'overflow-y: initial' : ''">
                        <div :key="i" class="button__time-wrapper" v-for="(notification, i) in notifications">
                          <button :class="['button__time', getColor(notification.notification_action)]">
                            <component :is="getIcon(notification.notification_action)"/>
                            <span>{{ cutTimeStamp(timeStampToTime(notification.last_change_ts), period.cols).substring(0, 5) }}</span>
                          </button>
                          <div :class="['time__info',
                                       {'time__info__reversed time__info__reversed_0': [0, 3, 4, 5, 6].includes(Number(day.day_index))},
                                       {'time__info__reversed-vertical': row > 3 }]"
                            :style="row < 4 ? `bottom: ${-76}px;` : `top: ${-60}px;`"
                            >
                            <!-- :style="row > 3 ? `bottom: ${215 + 75*(4-row)}px;` : `top: ${268 - (66*(3-row))}px;`" -->
                            <notification-overflow :ts="timeStampToTime(notification.last_change_ts)"
                                                   :notification="notification"></notification-overflow>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!--
        <div class="popup__box-buttons" @click="$emit('close')">
          <button class="button__large button__accent ok">Back</button>
        </div>
        -->
      </div>
</template>

<script>

import Popup from '@/layouts/Popup'
import IconChevronLeft from '@/components/icons/iconChevronLeft'
import IconChevronRight from '@/components/icons/iconChevronRight'
import IconRestart from '@/components/icons/iconRestart'
import IconCloseEvent from '@/components/icons/iconCloseEvent'
import IconPlus from '@/components/icons/iconPlus'
import IconComment from '@/components/icons/iconComment'
import IconHandleAlert from '@/components/icons/iconHandleAlert'
import IconResolveAlert from '@/components/icons/iconResolveAlert'
import IconAssignAlert from '@/components/icons/iconAssignAlert'
import IconSnoozeAlert from '@/components/icons/iconSnoozeAlert'
import IconAcknowledgeAlert from '@/components/icons/iconAcknowledgeAlert'
import IconCancelAlert from '@/components/icons/iconCancelAlert'
import NotificationOverflow from './notificationShortInfo'
import LoadingSpinner from '../LoadingSpinner'
import Tooltip from '@/components/Tooltip'

export default {
  emits: ['close'],
  components: {
    Tooltip,
    LoadingSpinner,
    NotificationOverflow,
    IconCancelAlert,
    IconAcknowledgeAlert,
    IconAssignAlert,
    IconResolveAlert,
    IconHandleAlert,
    IconComment,
    IconCloseEvent,
    IconRestart,
    IconPlus,
    IconChevronRight,
    IconChevronLeft,
    IconSnoozeAlert,
    Popup
  },
  props: ['history'],
  computed: {
    period () {
      return this.period_options.find(x => x.id === this.selectedPeriod)
    },
    notificationsHistory () {
      return this.history.body.filter(x => this.selectedFilters.includes(x.notification_action))
    }
  },
  mounted () {
    this.resetFilters()
    this.getCurrentUtc()
    this.generateSingleHours()
    this.generateDoubleHours()
    this.generateTetraHours()
  },
  methods: {
    resetFilters () {
      this.selectedFilters = this.filters.map(x => x.title)
    },
    resetOffset () {
      console.log(this.selectedPeriod !== 7)
      if (this.selectedPeriod !== 7) {
        this.offsetNumber = 0
      } else {
        this.selectedUtcMonth = this.currentUtcMonth
        this.selectedUtcYear = this.currentUtcYear
      }
      // this.getCurrentUtc()
    },
    nextMonth () {
      if (this.selectedUtcMonth === 11) {
        this.selectedUtcMonth = 0
        this.selectedUtcYear++
      } else {
        this.selectedUtcMonth++
      }
    },
    previousMonth () {
      if (this.selectedUtcMonth === 0) {
        this.selectedUtcMonth = 11
        this.selectedUtcYear--
      } else {
        this.selectedUtcMonth--
      }
    },
    selectPeriod (id) {
      if (this.period_options.find(x => x.id === id).time !== this.period.time) {
        this.offsetNumber = 0
      }
      this.selectedPeriod = id
    },
    drillDown (offset, slot) {
      if (this.period.time === 'hour') {
        this.offsetNumber = this.offsetNumber - offset + 1
        this.selectedPeriod = 1
      } else {
        const diff = Math.ceil((slot.end.getTime() - this.currentUtcTimeStamp) / 3600 / 1000)
        // alert(diff)
        this.offsetNumber = diff - 1
        this.selectedPeriod = 4
      }
    },
    drillDownDay (time) {
      const diff = Math.ceil((time - this.currentUtcTimeStamp) / 3600 / 1000)
      this.offsetNumber = diff - 1
      this.selectedPeriod = 4
    },
    cutHeadTime (ts, cols) {
      if (!ts) {
        return ''
      }
      if (cols === 24) {
        return ts.slice(0, 2)
      } else if (cols === 12) {
        return ts.slice(0, 5)
      } else {
        return ts
      }
    },
    cutTimeStamp (ts, cols) {
      if (cols === 24) {
        return ''
        // return ts.slice(2, 5)
      } else if (cols === 12) {
        return ts.slice(0, 5)
      } else {
        return ts
      }
    },
    getDateHeaders (slots) {
      let unique = slots.map(x => x.date)
      let headers = {}
      unique.forEach(
        (val) => {
          if (headers[val]) {
            headers[val].push(val)
          } else {
            headers[val] = [val]
          }
        }
      )
      return headers
    },
    getHourSlots () {
      let slots = []
      for (let i = 1; i < this.period.cols + 1; i++) {
        slots.push(this.getHourSlot(
          this.selectedUtcYear,
          this.selectedUtcMonth,
          this.selectedUtcDay,
          this.selectedUtcHour,
          this.period.cols - i + 1, 'hour'))
      }
      return slots
    },
    getHourSlot (year, month, day, hour, offset, metric) {
      const base = new Date(Date.UTC(year, month, day, hour, 0, 0))
      const start = new Date(base.getTime())
      const end = new Date(base.getTime())
      let date = new Date(base.getTime())
      date = new Date(date.setUTCHours(date.getUTCHours() - offset + this.offsetNumber + 1))
      // console.log(start.getHours() - offset + this.offsetNumber + 1)
      if (metric === 'hour') {
        return {
          date: date.getUTCDate() + ' ' + this.months[date.getUTCMonth()] + ' ' + date.getUTCFullYear(),
          start: new Date(start.setUTCHours(start.getUTCHours() - offset + this.offsetNumber + 1)),
          end: new Date(end.setUTCHours(end.getUTCHours() - offset + this.offsetNumber + 2)),
          hour_index: date.getUTCHours()
        }
      }
      return 'nope'
    },
    getColor (action) {
      if (this.filters.filter(x => x.title === action).length > 0) {
        return this.filters.find(x => x.title === action).color
      } else {
        return 'gray'
      }
    },
    getIcon (action) {
      if (this.filters.filter(x => x.title === action).length > 0) {
        return this.filters.find(x => x.title === action).icon
      } else {
        return ''
      }
    },
    monthDays (year, month) {
      const monthIndex = month
      const names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      let row = 0
      const date = new Date(Date.UTC(year, monthIndex, 1))
      const weeks = [[], [], [], [], [], []]
      while (date.getUTCMonth() === monthIndex) {
        if ((date.getUTCDay() === 1 && date.getUTCDate() !== 1) || (date.getUTCDate() === 1 && date.getUTCDay() === 1)) {
          row++
        }
        const start = new Date(Date.UTC(year, month, date.getUTCDate(), 0, 0, 0))
        const end = new Date(Date.UTC(year, month, date.getUTCDate(), 23, 59, 59, 999))
        weeks[row].push({
          date: date.getUTCDate(),
          day: names[date.getUTCDay()],
          day_index: date.getUTCDay(),
          start: start.getTime(),
          end: end.getTime()
        })
        date.setDate(date.getDate() + 1)
      }
      return weeks
    },
    getDaySlots () {
      const slots = []
      for (let i = 1; i < this.period.cols + 1; i++) {
        slots.push(this.getDaySlot(
          this.selectedUtcYear,
          this.selectedUtcMonth,
          this.selectedUtcDay,
          this.selectedUtcHour,
          this.period.cols - i + 1, 'day'))
      }
      return slots
    },
    selectFilter (filter) {
      if (!this.selectedFilters.includes(filter.title)) {
        this.selectedFilters.push(filter.title)
      } else {
        this.selectedFilters = this.selectedFilters.filter(x => x !== filter.title)
      }
    },
    isFilterSelected (filter) {
      return this.selectedFilters.includes(filter.title)
    },
    getDaySlot (year, month, day, hour, offset, metric) {
      const base = new Date(Date.UTC(year, month, day, 0, 0, 0))
      const start = new Date(Date.UTC(year, month, day, 0, 0, 0))
      const end = new Date(Date.UTC(year, month, day, 23, 59, 59, 999))
      const date = new Date(base.setUTCDate(base.getUTCDate() - offset + this.offsetNumber + 1))
      // console.log(start.getHours() - offset + this.offsetNumber + 1)
      if (metric === 'day') {
        return {
          date: date.getUTCDate() + ' ' + this.months[date.getUTCMonth()] + ' ' + date.getUTCFullYear(),
          start: new Date(start.setUTCDate(start.getUTCDate() - offset + this.offsetNumber + 1)),
          end: new Date(end.setUTCDate(end.getUTCDate() - offset + this.offsetNumber + 1))
        }
      }
      return 'nope'
    },
    getUtcStartTime (year, month, day, hour) {
      return new Date.UTC(year, month, day, hour)
    },
    getUtcEndTime (year, month, day, hour) {
      return new Date.UTC(year, month, day, hour)
    },
    getDayName (slot) {
      return slot.start.getDate()
    },
    timeStampToTime (ts) {
      const date = new Date(ts * 1000)
      return ('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + date.getUTCMinutes()).slice(-2) + ':' + (date.getUTCMilliseconds() + '00').substring(0, 2)
    },
    getMonthName (slot) {
      return this.months[slot.start.getMonth()]
    },
    getYearName (slot) {
      return slot.start.getFullYear()
    },
    getColIndex (currentHourIndex, cols, col) {
      if (currentHourIndex - cols + col - 1 < 0) {
        return currentHourIndex - cols + col - 1 + 24
      } else {
        return currentHourIndex - cols + col - 1
      }
    },
    getCurrentUtc () {
      this.currentUtcTimeStamp = new Date().getTime()
      this.currentUtcDay = new Date().getUTCDate()
      this.currentUtcHour = new Date().getUTCHours()
      this.currentUtcMonth = new Date().getUTCMonth()
      this.currentUtcYear = new Date().getUTCFullYear()
      this.selectedUtcDay = this.currentUtcDay
      this.selectedUtcHour = this.currentUtcHour
      this.selectedUtcMonth = this.currentUtcMonth
      this.selectedUtcYear = this.currentUtcYear
    },
    generateSingleHours () {
      for (let i = 0; i < 24; i++) {
        // console.log(('00' + i).substring(1) + ':00:00')
        this.singleHours.push({ title: (('0' + i).slice(-2) + ':00:00') })
      }
    },
    generateDoubleHours () {
      for (let i = 1; i < 24; i++) {
        // console.log(('00' + i).substring(1) + ':00:00')
        this.doubleHours.push({ title: (('00' + i).slice(-2) + ':00:00') })
      }
    },
    generateTetraHours () {
      for (let i = 1; i < 24; i++) {
        // console.log(('00' + i).substring(1) + ':00:00')
        this.tetraHours.push({ title: (('00' + i).substring(1) + ':00:00') })
      }
    }
  },
  data () {
    return {
      singleHours: [],
      doubleHours: [],
      tetraHours: [],
      selectedPeriod: 1,
      selectedUtcHour: 1,
      selectedUtcDay: 1,
      selectedUtcMonth: 1,
      selectedUtcYear: 1,
      offsetTime: 'hours',
      offsetNumber: 0,
      currentUtcTimeStamp: null,
      currentUtcHour: 1,
      currentUtcDay: 1,
      currentUtcMonth: 1,
      currentUtcYear: 1,
      selectedFilters: [],
      weekDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      months_long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      filters: [
        { icon: 'icon-plus', title: 'Create event', color: 'green' },
        { icon: 'icon-restart', title: 'Reopen event', color: 'yellow' },
        { icon: 'icon-close-event', title: 'Close event', color: 'red' },
        { icon: 'icon-comment', title: 'Adding comment', color: 'green' },
        { icon: 'icon-handle-alert', title: 'Handle alert', color: 'yellow' },
        { icon: 'icon-assign-alert', title: 'Assign alert', color: 'blue' },
        { icon: 'icon-resolve-alert', title: 'Resolve alert', color: 'green' },
        { icon: 'icon-snooze-alert', title: 'Snooze alert', color: 'yellow' },
        { icon: 'icon-acknowledge-alert', title: 'Acknowledge', color: 'yellow' },
        { icon: 'icon-cancel-alert', title: 'Cancel alert', color: 'red' }
      ],
      period_options: [
        { id: 1, title: '3 hours', number: 3, time: 'hour', cols: 3 },
        { id: 2, title: '6 hours', number: 6, time: 'hour', cols: 6 },
        { id: 3, title: '12 hours', number: 12, time: 'hour', cols: 12 },
        { id: 4, title: '24 hours', number: 1, time: 'hour', cols: 24 },
        { id: 5, title: '3 days', number: 3, time: 'day', cols: 3 },
        { id: 6, title: '7 days', number: 7, time: 'day', cols: 7 },
        { id: 7, title: '1 month', number: 1, time: 'month', cols: 0 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .statistics__button__back {
    padding: 10px 20px 0;
    margin-bottom: -8px;
    button {
      text-decoration: underline;
      &:hover {
        color: var(--c-accent);
      }
    }
  }
  .statistics__dates {
    display: flex;
    font-weight: bold;
    border-bottom: 1px solid var(--c-disable);
    height: 35px;
    > div {
      overflow: hidden;
      min-width: 0;
      height: 100%;
      line-height: 35px;
      text-align: center;
      border-right: 1px solid var(--c-disable);
      &:last-child {
        border-right: none;
      }
    }
  }
  .statistics__chevron {
    border: 1px solid var(--c-disable);
    padding: 11px 10px 9px;
    border-radius: var(--r-radius);
    width: 38.89px;
    height: 38.89px;
  }
  .stat__arrows {
    padding: 0;
    min-width: 200px;
  }
  .statistics__main-unselect-button {
    margin-top: -5px !important;
  }
  .stat__main-box.time {
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    &:hover {
      background-color: #fafafa;
      cursor: pointer;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      border-radius: 100px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--c-disable);
      border-radius: 100px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
  }
  .statistics__main {
    height: 485px;
    margin-bottom: 0;
  }
  .time__info {
    display: none;
  }
  .button__time {
    min-width: 19px;
    min-height: 19px;
    svg {
      width: 16px;
    }
  }
  .button__time-svg {
    padding: 1px;
    svg {
      width: initial;
    }
  }
  .button__time-wrapper {
    &:hover {
      .time__info {
        display: initial;
      }
    }
  }
  .statistics__filter-disabled {
    color: var(--c-text-light);
  }
  .statistics__calendar-header {
    height: 35px;
    text-align: center;
    font-weight: bold;
    line-height: 35px;
  }
  .statistics__calendar-week {
    display: flex;
    height: calc((100%) / 6);
    width: 100%;
    border-top: 1px solid var(--c-disable);
  }
  .statistics__calendar-body {
    width: 100%;
    height: calc(100% - 35px);
  }
  .statistics__calendar-day {
    border-right: 1px solid var(--c-disable);
    min-width: calc(100% / 7);
    max-width: calc(100% / 7);
    &:last-child {
      border-right: none;
    }
  }
  .time__info__column-top {
    top: -50px;
  }
  .statistics__calendar-day__body {
    min-height: 100%;
    max-height: 100%;
    position: relative;
    height: 100%;
    padding: 5px 5px 0;
    &:hover {
      cursor: pointer;
      background-color: #fafafa;
    }
  }
  .statistics__calendar-day__body-date {
    height: 20px;
    font-weight: bold;
  }
  .statistics__columns {
    display: flex;
    height: calc(100% - 35px);
  }
  .statistics__calendar-day__body-notifications {
    height: calc(100% - 20px);
    overflow-y: scroll;

  }
  .statistics__day-current {
    background-color: #fafafa;
  }
  .stat__main-box.dates {
    width: calc(100% - 160px);
    position: relative;
  }
</style>
