<template>
  <div v-if="alert">
    <div :class="['status-popup', `status-popup-${alert.alertType}`]">
      <div class="status-popup__icon">
        <icon-check btn-color="#FFFFFF"
                    v-if="alert.alertType === 'success'"></icon-check>
        <icon-alert btn-color="#FFFFFF"
                    :btn-secondary-color="alert.alertType === 'error' ? '#E23E34' : '#F5A623'"
                    v-if="['error', 'warning'].includes(alert.alertType)"></icon-alert>
      </div>
      <div class="status-popup__message">
        {{ error ? errorCodes[error.status] : alert.alertMessage }}
      </div>
      <div class="status-popup__hide">
        <icon-close v-if="alert.dismissible" @click.stop="hideAlert()" btn-color="#FFFFFF"></icon-close>
      </div>
    </div>
  </div>
</template>

<script>

import IconCheck from '@/components/icons/iconCheck'
import IconAlert from '@/components/icons/iconAlert'
import IconClose from '@/components/icons/iconClose'
import { HIDE_ALERT } from '@/store/actions/clientStatus'

export default {
  components: { IconClose, IconAlert, IconCheck },
  computed: {
    dismissAfterTimeout () {
      return this.$store.getters.dismissAfterTimeoutConfig
    },
    alertTimeStamp () {
      return this.$store.state.clientStatus.alertTimeStamp
    },
    custom () {
      return this.$store.getters.getAlert
    },
    scenario () {
      return this.$store.state.clientStatus.scenario
    },
    error () {
      return this.$store.state.clientStatus.error
    },
    alert () {
      return this.scenario ? this.scenarios[this.scenario] : this.custom
    }
  },
  watch: {
    alertTimeStamp (val) {
      if (this.disappearTimeout) { clearTimeout(this.disappearTimeout) }
      try {
        if (val ? this.alert.dismissAfterTimeout : false) {
          this.disappearTimeout = setTimeout(this.hideAlert, this.dismissAfterTimeout)
        }
      } catch {
        console.log('No active popup')
      }
    }
  },
  methods: {
    hideAlert () {
      this.$store.commit(HIDE_ALERT)
    }
  },
  data () {
    return {
      disappearTimeout: null,
      // Long Loading Time - Connection to the service is taking longer than usual, please hold on.
      // WebSocket Long Loading Time - Connection to the service is taking longer than usual, please hold on.
      // WebSocket Not Responding - Couldn’t connect to the service. Please reload the page or try again
      errorCodes: {
        999: 'Unexpected error occurred. Please try again later.',
        400: 'Unexpected error occurred. Please try again later.',
        401: 'You are not authorised. Please log in.',
        402: 'You are not authorised. Please log in.',
        403: 'You are not authorised or have the right permission.',
        404: 'Unexpected error occurred. Please try again later.',
        405: 'Unexpected error occurred. Please try again later.',
        406: 'Unexpected error occurred. Please try again later.',
        407: 'Unexpected error occurred. Please try again later.',
        408: 'Unexpected error occurred. Please try again later.',
        409: 'Unexpected error occurred. Please try again later.',
        500: 'Unexpected error occurred. Please try again later.',
        502: 'Couldn\'t connect to the service. Please reload the page or try again later.',
        503: 'Couldn\'t connect to the service. Please reload the page or try again later.',
        504: 'Couldn\'t connect to the service. Please reload the page or try again later.'
      },
      scenarios: {
        // For all actions with notification - handle, snooze, acknowledge, resolve
        notification_resolve: {
          alertType: 'success',
          alertMessage: 'The notification was successfully resolved',
          dismissible: true,
          dismissAfterTimeout: true
        },
        notification_acknowledge: {
          alertType: 'success',
          alertMessage: 'The notification was successfully acknowledged',
          dismissible: true,
          dismissAfterTimeout: true
        },
        notification_handle: {
          alertType: 'success',
          alertMessage: 'The notification was successfully handled',
          dismissible: true,
          dismissAfterTimeout: true
        },
        bot_voice_test: {
          alertType: 'success',
          alertMessage: 'The test notification was successfully sent',
          dismissible: true,
          dismissAfterTimeout: true
        },
        notification_snooze: {
          alertType: 'success',
          alertMessage: 'The notification was successfully snoozed',
          dismissible: true,
          dismissAfterTimeout: true
        },
        user_save: {
          alertType: 'success',
          alertMessage: 'Your profile was successfully updated.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        bot_save: {
          alertType: 'success',
          alertMessage: 'Bot settings was successfully updated.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        member_add: {
          alertType: 'success',
          alertMessage: 'A new member was successfully invited.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        member_update: {
          alertType: 'success',
          alertMessage: 'The member was successfully updated.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        environment_add: {
          alertType: 'success',
          alertMessage: 'A new environment was successfully added',
          dismissible: true,
          dismissAfterTimeout: true
        },
        environment_update: {
          alertType: 'success',
          alertMessage: 'Environment was successfully updated',
          dismissible: true,
          dismissAfterTimeout: true
        },
        environment_delete: {
          alertType: 'success',
          alertMessage: 'The environment was successfully delete',
          dismissible: true,
          dismissAfterTimeout: true
        },
        socket_ping: {
          alertType: 'warning',
          alertMessage: 'Connection to the service is taking longer than usual, please hold on.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        socket_connection: {
          alertType: 'error',
          alertMessage: 'Couldn\'t connect to the service. Please reload the page or try again later.',
          dismissible: true,
          dismissAfterTimeout: false
        },
        slow_request: {
          alertType: 'warning',
          alertMessage: 'Connection to the service is taking longer than usual, please hold on.',
          dismissible: true,
          dismissAfterTimeout: true
        },
        offline: {
          alertType: 'error',
          alertMessage: 'You are not connected to the internet. Please check your connection.',
          dismissible: true,
          dismissAfterTimeout: false
        },
        online: {
          alertType: 'success',
          alertMessage: 'You have successfully connected to the service.',
          dismissible: true,
          dismissAfterTimeout: false
        },
        backend: {
          alertType: 'error',
          alertMessage: 'Unexpected error occurred. Please try again later.',
          dismissible: true,
          dismissAfterTimeout: true
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .status-popup {
    position: fixed;
    top: 20px;
    width: 650px;
    margin: 0 auto;
    align-items: center;
    left: 0;
    right: 0;
    border-radius: var(--r-radius);
    display: flex;
    height: 50px;
    z-index: 99999;
  }
  .status-popup__icon {
    flex: 0 0 50px;
    text-align: center;
    svg {
      width: 22px !important;
      height: 20px !important;
      vertical-align: middle;
    }
  }
  .status-popup__message {
    flex: 1 0;
    color: white;
    font-weight: bold;
  }
  .status-popup__hide {
    flex: 0 0 50px;
    text-align: center;
    line-height: 0;
    cursor: pointer;
    svg {
      vertical-align: middle;
    }
  }
  .status-popup.status-popup-error {
    background-color: #E23E34;
  }
  .status-popup.status-popup-warning {
    background-color: #F5A623;
  }
  .status-popup.status-popup-success {
    background-color: #00C284;
  }
</style>
