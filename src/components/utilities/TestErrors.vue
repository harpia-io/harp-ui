<template>
  <div class="test-panel">
    <button class="button__filter" @click="simulateJSError()">
      JS Error
    </button>
    <button class="button__filter" @click="simulateRequestError()">
      Request Error
    </button>
    <button class="button__filter" @click="triggerAlert('socket_connection')">
      Trigger Socket Error
    </button>
    <button class="button__filter" @click="triggerAlert('slow_request')">
      Trigger Slow Error
    </button>
    <button class="button__filter" @click="triggerAlert('offline')">
      Trigger Network Alert
    </button>
    <button class="button__filter" @click="triggerAlert('online')">
      Trigger Network Alert
    </button>
    <button class="button__filter" @click="triggerAlert('backend')">
      Trigger Backend Alert
    </button>
  </div>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ALERT_SCENARIO } from '@/store/actions/clientStatus'

export default {
  name: 'test-errors',
  data () {
    return {
      test: {}
    }
  },
  methods: {
    triggerAlert (alert_) {
      this.$store.dispatch(TRIGGER_ALERT_SCENARIO, { scenario: alert_ })
    },
    simulateJSError () {
      this.test.test.test = 'test'
    },
    simulateRequestError () {
      const requestObj = {
        service: 'licenses',
        path: '/test/test/test',
        method: 'POST',
        body: null,
        options: {}
      }
      const msg = 'Test request to get error'
      const popupOptions = {
        showDialog: false
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
    }
  }
}
</script>

<style scoped>
  .test-panel {
    position: fixed; z-index: 100000; bottom: 0; background-color: white; text-align: center; width: 100%
  }
  .test-panel button {
    display: inline-block;
  }
</style>
