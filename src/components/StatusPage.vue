<template>
  <div class="reports_header">
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
  <div class="reports_body" v-show="(from && to) && !loading">
    <div :style="`width: ${(100 * graph.width / 3) + '%'}; height: ${graph.height + 'px'};`" :key="graph" v-for="graph in graphs">
      <iframe :src="`${baseUrl}/d-solo/W3dcDjkGz/status-page?orgId=${1}&theme=light&from=${from}&to=${to}&panelId=${graph.graph}`"
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
      { graph: 37, width: 3, height: 500 },
      { graph: 38, width: 3, height: 300 },
      { graph: 44, width: 1.5, height: 300 },
      { graph: 42, width: 1.5, height: 300 }
    ],
    intervals: [
      { id: 1, title: '1 min', metric: 'min', period: 1, interval: '1m' },
      { id: 2, title: '5 min', metric: 'min', period: 5, interval: '5m' },
      { id: 3, title: '10 min', metric: 'min', period: 10, interval: '10m' },
      { id: 4, title: '30 min', metric: 'min', period: 30, interval: '30m' },
      { id: 5, title: '1 hour', metric: 'hour', period: 1, interval: '1h' }
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
