<template>
  <div :class="['date-time-picker', {'date-time-picker-wrapped': wrap}]">
    <div class="date-time-picker-shortcuts-menu__block" v-if="wrap">
      <button @click="shortcutsMenuOpen = !shortcutsMenuOpen"
           class="date-time-picker__title button__filter">
        <icon-calendar btnColor="#000000"></icon-calendar>
        <div v-html="shortcutTitle !== 'Custom Range' ? (title ? `<b>${title}</b>: Last ${shortcutTitle}` : 'Last ' + shortcutTitle) : shortcutTitle"></div>
        <icon-angle-down></icon-angle-down>
      </button>
      <div class="status-menu user__box-menu date-time-picker-shortcuts-menu"
           v-if="shortcutsMenuOpen"
           @mouseleave="shortcutsMenuOpen = false">
        <button @click.stop="selectShortcut(option)"
                :key="option.time"
                v-html="option.title"
                :class="{'date-time-picker-shortcuts-menu-selected': shortcutTitle === option.title }"
                v-for="option in time_options">
        </button>
      </div>
    </div>
    <div class="date-time-picker__selector"
         :style="custom ? 'margin-right: 5px' : ''"
         v-if="wrap ? custom : true">
      <el-date-picker v-model="selectedDateTime"
                      ref="dateTimePicker"
                      :type="range ? 'datetimerange' : 'datetime'"
                      range-separator="To"
                      @focus="[focused = true]"
                      @blur="[focused = false]"
                      :editable="false"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      format="DD MMM YYYY HH:mm"
                      :disabledDate="disabledDate"
                      :default-value="generateTimeDateFromNow(0, 'back', true)"
                      :shortcuts="showShortcuts ? shortcuts[showShortcuts] : []"
                      :prefix-icon="!range ? 'el-icon-date' : ''"
                      placeholder="Select date and time">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import IconAngleDown from '@/components/icons/iconAngleDown'
import IconCalendar from '@/components/icons/iconCalendar'
import dayjs from 'dayjs'

export default {
  name: 'date-time-picker',
  components: { IconCalendar, IconAngleDown },
  props: ['showShortcuts', 'disableDates', 'wrap', 'range', 'dateType', 'title'],
  emits: ['onDateTimeSelected'],
  setup () {
    const dateTimePicker = ref(null)
    return { dateTimePicker }
  },
  methods: {
    selectShortcut (shortcut) {
      this.custom = !!shortcut.custom
      this.shortcutTitle = shortcut.title
      if (!this.custom) {
        this.selectedDateTime = this.generateTimeDateFromNow(shortcut.time, 'back', false)
      }
      this.shortcutsMenuOpen = false
    },
    disabledDate (date) {
      if (this.disableDates === 'before') {
        return date < new Date(new Date().setDate(new Date().getDate() - 1))
      } else if (this.disableDates === 'after') {
        return date > new Date(new Date().setDate(new Date().getDate()))
      }
    },
    generateTimeDateFromNow (time, direction, utc) {
      let date = new Date()
      if (utc) {
        const UTCdiff = new Date().getTimezoneOffset() / 60
        date = new Date(date.setHours(date.getHours() + UTCdiff))
      }
      console.log(date)
      date.setTime(date.getTime() + (direction === 'back' ? -time : time))
      console.log(date)
      return date
    }
  },
  watch: {
    custom (val) {
      if (val) {
        this.selectedDateTime = null
      }
    },
    selectedDateTime (value) {
      if (value === null) {
        return
      }
      let UTCdiff = null
      let selected = null
      if (this.custom) {
        UTCdiff = new Date(value[0]).getTimezoneOffset() / 60
        const selectedDateFrom = new Date(value[0])
        const selectedDateTo = new Date(value[1])
        selected = [
          new Date(selectedDateFrom.setHours(selectedDateFrom.getHours() - UTCdiff)),
          new Date(selectedDateTo.setHours(selectedDateTo.getHours() - UTCdiff))
        ]
        if (this.dateType === 'iso') {
          selected = selected.map(x => x.toISOString())
        } else {
          selected = selected.map(x => x.getTime())
        }
      } else {
        selected = value
        console.log('selected before', value)
        if (!this.range) {
          UTCdiff = new Date(value).getTimezoneOffset() / 60
          const selectedDate = new Date(value)
          selected = new Date(selectedDate.setHours(selectedDate.getHours() - UTCdiff))
        }
        console.log('selected', value)
        if (this.dateType === 'iso') {
          selected = selected.toISOString()
        } else {
          selected = selected.getTime()
        }
      }
      if (this.dateType === 'iso') {
        this.$emit('onDateTimeSelected', selected)
      }
      this.$emit('onDateTimeSelected', selected)
    }
  },
  data () {
    return {
      customShortCut: false,
      shortcutsMenuOpen: false,
      shortcutTitle: '1 hour',
      custom: false,
      time_options: [
        { time: 3600 * 1000 / 12, title: '5 min' },
        { time: 3600 * 1000 / 2, title: '30 min' },
        { time: 3600 * 1000, title: '1 hour' },
        { time: 3600 * 1000 * 3, title: '3 hours' },
        { time: 3600 * 1000 * 6, title: '6 hours' },
        { time: 3600 * 1000 * 12, title: '12 hours' },
        { time: 3600 * 1000 * 24, title: '1 day' },
        { time: 3600 * 1000 * 24 * 3, title: '3 days' },
        { time: 3600 * 1000 * 24 * 7, title: '7 days' },
        { time: 0, title: 'Custom Range', custom: true }
      ],
      focused: false,
      datePickerOptions: {
        disabledDate (date) {
          return date > new Date()
        }
      },
      shortcuts: {
        snooze: [
          {
            text: '24 hours',
            onClick (ctx) {
              const date = new Date()
              date.setTime(date.getTime() + (3600 * 1000 * 24) + (3600 * 1000 * date.getTimezoneOffset() / 60))
              ctx.emit('pick', dayjs(date))
            }
          },
          {
            text: '1 week',
            onClick (ctx) {
              const date = new Date()
              date.setTime(date.getTime() + (3600 * 1000 * 24 * 7) + (3600 * 1000 * date.getTimezoneOffset() / 60))
              ctx.emit('pick', dayjs(date))
            }
          },
          {
            text: '2 weeks',
            onClick (ctx) {
              const date = new Date()
              date.setTime(date.getTime() + (3600 * 1000 * 24 * 14) + (3600 * 1000 * date.getTimezoneOffset() / 60))
              ctx.emit('pick', dayjs(date))
            }
          },
          {
            text: '1 month',
            onClick (ctx) {
              const date = new Date()
              date.setTime(date.getTime() - (3600 * 1000 * 24 * 30) + (3600 * 1000 * date.getTimezoneOffset() / 60))
              ctx.emit('pick', dayjs(date))
            }
          }
        ],
        // history: [
        //   {
        //     text: '5 min',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 / 5))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '30 min',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 / 2))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '1 hour',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '3 hours',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 3))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '12 hours',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 12))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '1 day',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 24))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '3 days',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 24 * 3))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '7 days',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 24 * 7))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '14 days',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 24 * 14))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   },
        //   {
        //     text: '1 month',
        //     onClick (ctx) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - (3600 * 1000 * 24 * 30))
        //       ctx.emit('pick', dayjs(date))
        //     }
        //   }
        // ]
      },
      selectedDateTimeTitle: '1 hour',
      selectedDateTime: '',
      defaultTime: new Date(2000, 1, 1, 12, 0, 0)
    }
  }
}
</script>

<style lang="scss">
  .date-time-picker {
    width: 100%;
    position: relative;
  }
  .date-time-picker__title {
    background-color: white;
    // position: absolute;
    top: 0;
    height: 40px;
    z-index: 999999;
    width: 210px;
    padding: 10px;
    // margin-right: 5px;
    border-radius: var(--r-radius);
    cursor: pointer;
    align-items: center;
    display: flex;
    > *:first-child {
      flex: 0 0 16px;
    }
    > *:nth-child(2) {
      flex: 1 0;
      padding: 0 3px;
    }
    > *:nth-child(3) {
      flex: 0 0 16px;
    }
    &:hover {
      //
    }
    > * {
      vertical-align: middle;
    }
  }
  .date-time-picker-shortcuts-menu {
    left: 0;
    top: 45px;
  }
  .date-time-picker-shortcuts-menu-selected {
    color: var(--c-accent);
    font-weight: bold;
  }
  .el-date-editor--datetimerange {
    border-color: white !important;
    .el-input__icon.el-range__icon.el-icon-time {
      display: none;
    }
    .el-input__icon.el-range__close-icon{
      display: none;
    }
    .el-range-input {
      width: 47% !important;
    }
    .el-range-separator {
      width: 6% !important;
    }
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    min-width: 440px;
    border-radius: var(--r-radius);
  }
  .date-time-picker-shortcuts-menu__block {
    display: inline-block;
    vertical-align: middle;
  }
  .date-time-picker-wrapped .date-time-picker__selector {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }
  .el-date-table td.today span {
    color: var(--c-accent);
  }
  .el-date-editor .el-range-input {
    color: black;
  }
  .el-date-editor .el-range-input::placeholder {
    color: var(--c-text);
  }
  .el-date-table td.start-date span, .el-date-table td.end-date span {
    background-color: var(--c-accent);
  }
  .el-date-table td.available:hover {
    color: var(--c-accent);
  }
  .el-time-panel__btn.confirm {
    color: var(--c-accent);
  }
  .el-picker-panel__icon-btn:hover {
    color: var(--c-accent);
  }
  .el-input__inner:focus {
    border-color: var(--c-accent);
  }
  .el-picker-panel * {
    border-color: #e4e4e4;
  }
  .el-date-table td.disabled div {
   background-color: #efefef;
  }
  .el-input__inner {
    border-color: #e4e4e4;
  }
  .el-input__inner::placeholder {
    color: #e4e4e4;
  }
  .el-date-table td.in-range div {
    background-color: #efefef;
  }
  .el-date-table td.in-range div:hover {
    background-color: #efefef;
  }
  .el-picker-panel__shortcut:hover {
    color: var(--c-accent);
  }
</style>
