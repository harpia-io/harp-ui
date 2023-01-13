<template>
  <div>
  <div class="settings-page__content-tabs-body active">
    <div class="tabs__box">
      <div class="tabs__box-in">
        <loading-spinner height="400px" v-if="loading"></loading-spinner>
        <div v-if="!loading">
          <div  class="license__box" v-for="(licenseObj, index) in licenses" :key="index">
            <div class="license__box-title">
              <div class="license__box-name">{{ licenseObj.notificationName }}</div>
              <div class="license__box-num"><b>{{ licenseObj.current }} ({{ licenseObj.percUsed }}%)</b> / {{ licenseObj.available }} ({{ licenseObj.percAvailable }} %)</div>
            </div>
            <div class="license__box-line">
              <span class="black" :style="{'width': licenseObj.percUsed + '%'}"></span>
              <span :class="{'red': licenseObj.percUsed >= 80, 'yellow': licenseObj.percUsed >= 60 && licenseObj.percUsed <80, 'green': licenseObj.percUsed < 60 }"
                    :style="{'width': licenseObj.percAvailable + '%'}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="popup__box-buttons">
      <button class="button__large button__default close" @click="toggleOrgSettings">Close</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { HIDE_SETTINGS } from '@/store/actions/localActions'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import LoadingSpinner from '@/components/LoadingSpinner'

export default defineComponent({
  props: ['show'],
  watch: {
    show () {
      if (this.show === 'licenses') {
        this.loadLicenseUsage()
      }
    }
  },
  components: {
    LoadingSpinner

  },
  data () {
    return {
      licenses: [],
      loading: false
    }
  },
  beforeMount () {
  },
  methods: {
    onSaveBtnClick () {
      console.log('SaveBtnClick')
    },
    loadLicenseUsage () {
      this.loading = true
      console.log('licenses. loadLicensesUsage.')
      const requestObj = {
        service: 'licenses',
        path: '/licenses/all',
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Load licenses usage'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('licenses. loadLicensesUsage. response:', response.licenses)
          const licensesArray = ['alert', 'email', 'jira', 'skype', 'teams', 'telegram', 'pagerduty']
          const aggLicenses = []
          response.licenses.forEach(license => {
            const percUsed = Math.ceil(license.current_usage / license.limit * 100)
            if (licensesArray.includes(license.notification_name)) {
              aggLicenses.push({
                notificationName: license.notification_name,
                status: license.status,
                current: license.current_usage,
                available: license.limit - license.current_usage,
                percUsed: percUsed,
                percAvailable: 100 - percUsed
              })
            }
          })
          this.licenses = aggLicenses
          this.loading = false
        })
        .catch((error) => {
          console.error('licenses. loadLicensesUsage. Error:', error)
          this.loading = false
        })
    },
    formValid () {
      return true
    },
    toggleOrgSettings () {
      this.$store.commit(HIDE_SETTINGS)
    }
  }
})
</script>
