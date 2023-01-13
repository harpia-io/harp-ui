<template>
  <div class="aside__box active">
    <div class="aside__box-title">
      <svg width="16" height="17" viewbox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.714355" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect y="8.09912" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect x="7.38477" y="0.714355" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect x="7.38477" y="8.09912" width="8.61538" height="8.61538" rx="1.4" fill="white"/>
      </svg>
      <span>Reports</span>
    </div>
    <div class="aside__box-main reports">
      <div :class="{'reports-selected': selectedReport ? report.report_id === selectedReport.report_id : false}"
           v-for="report in reports"
           @click="selectReport(report)"
           :key="report.id">
        {{ report.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_REPORT_OBJ } from '@/store/actions/notificationActions'

export default {
  data () {
    return {
      reports: [
        { id: 1, name: 'Notification Statistics', report_id: 'k6afYRD7k' }
        // { id: 2, name: 'TOP Statistics', report_id: 'Fvzmu-qGkd' }
      ]
    }
  },
  mounted () {
    if (!this.$route.query.report_id) {
      this.selectReport(this.reports[0])
    } else {
      if (this.reports.map(x => x.report_id).includes(this.$route.query.report_id)) {
        this.selectReport(this.reports.find(x => x.report_id === this.$route.query.report_id))
      } else {
        this.selectReport(this.reports[0])
      }
    }
  },
  computed: {
    selectedReport () {
      return this.$store.state.notificationActions.reportObj
    }
  },
  methods: {
    selectReport (report) {
      const reportObj = {
        report_id: report.report_id
      }
      this.$store.commit(UPDATE_REPORT_OBJ, reportObj)
      this.$router.push({ query: { report_id: report.report_id } })
    }
  }
}

</script>

<style lang="scss">
  .aside__box-main.reports {
    div {
      margin-bottom: 10px;
      cursor: pointer;
      &:hover{
        color: var(--c-accent);
      }
    }
  }
  .reports-selected {
    font-weight: bold;
    &:hover{
      color: white !important;
    }
  }
</style>
