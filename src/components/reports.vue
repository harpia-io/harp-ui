<template>
  <div class="reports_header" v-if="report">
    <!--    <div>-->
    <!--      <dropdown @selectedItem="selected" :preselected="1" :items="intervals" title="Interval"></dropdown>-->
    <!--    </div>-->
    <div>
      <date-time-picker :wrap="true"
                        :range="true"
                        dateType="ts"
                        :title="'Period'"
                        @onDateTimeSelected="onTimePeriodChange"
                        disableDates="after"></date-time-picker>
    </div>
  </div>
  <loading-spinner :opacity="0" height="400px" v-show="!(from && to) || loading"></loading-spinner>
  <div class="reports_body" v-if="report" v-show="(from && to) && !loading">
    <div :style="`width: ${(100 * graph.width / 3) + '%'}; height: ${graph.height + 'px'};`" :key="graph" v-for="graph in graphs">
      <iframe :src="`${baseUrl}/d-solo/${report.report_id}/notification-statistics?orgId=${1}&theme=light&var-namespace=${namespace}&from=${from}&to=${to}&panelId=${graph.graph}`"
              height="100%" width="100%" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
// import Dropdown from '../layouts/Dropdown'
import DateTimePicker from './DateTimePicker'
// import Dropdown from '../layouts/Dropdown'
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
  name: 'reports',
  // components: { LoadingSpinner, Dropdown, DateTimePicker },
  components: { LoadingSpinner, DateTimePicker },
  computed: {
    report () {
      return this.$store.state.notificationActions.reportObj
    },
    interval () {
      return this.intervals.find(x => x.id === this.selectedInterval).interval
    },
    baseUrl () {
      return window.Config.grafana_reports
    },
    namespace () {
      return window.Config.namespace
    }
  },
  methods: {
    selected (val) {
      this.selectedInterval = val
    },
    onTimePeriodChange (val) {
      console.log(val)
      if (Array.isArray(val)) {
        this.from = val[0]
        this.to = val[1]
      } else {
        this.from = val
        this.to = new Date().getTime()
      }
    },
    getDefaultTimestamp () {
      const from = new Date()
      this.from = from.setUTCHours(from.getUTCHours() - 1)
      this.to = new Date().getTime()
    }
  },
  mounted () {
    this.getDefaultTimestamp()
    setTimeout(() => { this.loading = false }, 1500)
  },
  data: () => ({
    showDropdown: true,
    from: null,
    to: null,
    loading: true,
    selectedInterval: 1,
    graphs: [
      { graph: 63, width: 3, height: 100 },
      { graph: 57, width: 1, height: 300 },
      { graph: 60, width: 1, height: 300 },
      { graph: 66, width: 1, height: 300 },
      { graph: 62, width: 1.5, height: 300 },
      { graph: 64, width: 1.5, height: 300 },
      { graph: 58, width: 1.5, height: 300 },
      { graph: 65, width: 1.5, height: 300 },
      { graph: 61, width: 3, height: 300 }
    ],
    intervals: [
      { id: 1, title: '1 min', metric: 'min', period: 1, interval: '1m' },
      { id: 2, title: '5 min', metric: 'min', period: 5, interval: '5m' },
      { id: 3, title: '10 min', metric: 'min', period: 10, interval: '10m' },
      { id: 4, title: '30 min', metric: 'min', period: 30, interval: '30m' },
      { id: 5, title: '1 hour', metric: 'hour', period: 1, interval: '1h' },
      { id: 6, title: '6 hour', metric: 'hour', period: 6, interval: '6h' },
      { id: 7, title: '12 hour', metric: 'hour', period: 12, interval: '12h' },
      { id: 8, title: '1 day', metric: 'day', period: 1, interval: '1d' },
      { id: 9, title: '7 days', metric: 'day', period: 7, interval: '7d' },
      { id: 10, title: '14 days', metric: 'day', period: 14, interval: '14d' },
      { id: 11, title: '30 days', metric: 'day', period: 30, interval: '30d' }
    ]
  })
}
</script>

<style lang="scss">
.reports_header {
  border-bottom: 1px solid white;
  padding: 0 0 10px;
  margin: 5px 5px 0;
  display: flex;
  > * {
    flex: 1 0;
  }
  > div:last-child {
    flex: 0 0;
    white-space: nowrap;
  }
}
.reports_body {
  padding-top: 5px;
  max-height: calc(100vh - 122px);
  overflow-y: scroll;
  > div {
    display: inline-block;
    padding: 5px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--c-aside-bg);
    border-radius: 100px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
}
</style>
