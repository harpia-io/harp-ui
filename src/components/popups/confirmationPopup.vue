<template>
  <div ref="dialog" class="popup-alert-mask">
    <section v-if="show">
      <div class="popup-alert-wrapper"></div>
      <div class="popup__box popup__small">
        <div class="popup__box-header">
          <h4 class="popup__box-title">
            {{ popup.title }}
          </h4>
          <button class="popup__box-close" @click="onCancelButtonClick">
            <icon-popup-close></icon-popup-close>
          </button>
        </div>

        <div class="popup__box-main popup-alert__box-main">
          <div class="alert">
            <img :src="requireIcon(popup.icon)" />
            <div class="alert__title" v-if="show">
              {{ popup.message }}
            </div>
            <div class="alert__title"
                 style="font-size: small"
                 v-if="show && popup.shortDetails">
              {{ popup.shortDetails }}
            </div>
          </div>
          <div class="popup__box-buttons" style="justify-content: center;">
            <button v-if="popup.cancel" @click="onCancelButtonClick" class="button__large button__default submit" style="width: 100%;">
              {{ popup.cancel }}
            </button>
            <button @click="onOkButtonClick" class="button__large button__accent submit" style="width: 100%;" type="submit">
              {{ popup.confirmation }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import IconPopupClose from '@/components/icons/iconPopupClose'
export default {
  components: { IconPopupClose },
  computed: {
    popup () {
      return this.custom ? this.customScenario : this.scenarios[this.scenario]
    }
  },
  methods: {
    async showScenario (scenario) {
      return new Promise(resolve => {
        this.scenario = scenario
        this.resolve = resolve
        this.show = true
      })
    },
    async showCustom (custom) {
      return new Promise(resolve => {
        this.customScenario = custom
        this.custom = true
        this.resolve = resolve
        this.show = true
      })
    },
    requireIcon (icon) {
      return require(`../../assets/images/icons/${icon}.svg`).default
    },
    onOkButtonClick () {
      this.show = false
      this.resolve && this.resolve(true)
    },
    onCancelButtonClick () {
      this.show = false
      this.resolve && this.resolve(false)
    }
  },
  data () {
    return {
      scenarios: {
        delete: {
          title: 'Delete',
          message: 'Are you sure?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_delete'
        },
        block: {
          title: 'Block',
          message: 'Are you sure?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_block'
        },
        reset: {
          title: 'Reset user password',
          message: 'Are you sure?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_block'
        },
        orgRegistration: {
          title: 'User registration',
          message: 'Invite has been sent to user mailbox',
          confirmation: 'OK',
          cancel: null,
          icon: 'popup_email'
        },
        restorePassword: {
          title: 'Restore password',
          message: 'Find instructions to restore password in you mailbox',
          confirmation: 'Yes',
          cancel: null,
          icon: 'popup_block'
        },
        deleteFilter: {
          title: 'Delete filter',
          message: 'Delete current filter?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_block'
        },
        updatePublicFilter: {
          title: 'Update public filter',
          message: 'You are updating public filter. Changes might affect other customers. Proceed with update?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_block'
        },
        wrongTimeFormat: {
          title: 'Wrong time format',
          message: 'The format should be: Number + Time unit.',
          shortDetails: 'Examples: 30s, 10m, 4h, 2d. Possible time units: s - seconds, m - minutes, h - hours, d - days',
          confirmation: 'OK',
          cancel: null,
          icon: 'popup_block'
        },
        cancelHandle: {
          title: 'Cancel alert handling',
          message: 'You are about to cancel the alert handling. Proceed with action?',
          confirmation: 'OK',
          cancel: 'No',
          icon: 'popup_block'
        },
        cancelSnooze: {
          title: 'Cancel alert snooze',
          message: 'You are about to cancel the alert snooze. Proceed with action?',
          confirmation: 'OK',
          cancel: 'No',
          icon: 'popup_block'
        },
        cancelAcknowledge: {
          title: 'Cancel alert acknowledgement',
          message: 'You are about to cancel the alert acknowledge. Proceed with action?',
          confirmation: 'OK',
          cancel: 'No',
          icon: 'popup_block'
        },
        updateBotConfig: {
          title: 'Update Bot config',
          message: 'You are updating bot config. Proceed with update?',
          confirmation: 'Yes',
          cancel: 'No',
          icon: 'popup_block'
        },
      },
      scenario: '',
      customScenario: '',
      custom: false,
      show: false,
      resolve: null
    }
  }
}
</script>

<style lang="css">
.popup-alert-mask {
  position: fixed;
  width: 100vw;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popup-alert__box-main {
  height: fit-content !important;
}
.popup-alert-wrapper {
  height: 100vh;
  background-color: rgba(50, 50, 50, 0.4);
}
</style>
