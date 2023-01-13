<template>
    <!-- popup code -->
    <div id="handle-notification" class="notification-action-popup__box notification-action-popup">
      <div class="popup__box-header">
        <h4 class="popup__box-title">Handle alert</h4>
        <button @click="close" class="popup__box-close">
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
              fill="#3C3C3C" />
          </svg>
        </button>
      </div>
      <div class="popup__box-main" style="height: unset">

        <div class="handle__buttons">
          <button class="button__light" @click="timer = 5" :class="{'active': timer === 5}">5 min</button>
          <button class="button__light" @click="timer = 10" :class="{'active': timer === 10}">10 min</button>
          <button class="button__light" @click="timer = 15" :class="{'active': timer === 15}">15 min</button>
          <button class="button__light" @click="timer = 30" :class="{'active': timer === 30}">30 min</button>
          <button class="button__light" @click="timer = 60" :class="{'active': timer === 60}">1 hour</button>
          <button class="button__light" @click="timer = 2 * 60" :class="{'active': timer === 2 * 60}">2 hours</button>
          <button class="button__light" @click="timer = 4 * 60" :class="{'active': timer === 4 * 60}">4 hours</button>
          <button class="button__light" @click="timer = 8 * 60" :class="{'active': timer === 8 * 60}">8 hours</button>
        </div>
        <!-- Handled by block -->
        <div style="display:flex; align-items: center">
          <span style="padding: 0 15px 0 0">Assign to:</span>
          <div class="handle-notification-dialog__select" id="select-user"></div>
        </div>

        <!-- popup buttons -->
        <div class="popup__box-buttons">
          <button class="button__large button__default close" @click="close">Close</button>
          <button class="button__large button__accent handle" @click="submit">Handle</button>
        </div>

      </div>
    </div>
</template>

<script>
import { HIDE_HANDLE_DIALOG, HANDLE_NOTIFICATION } from '@/store/actions/notificationActions'
import { Select } from '@/tools/select-plugin-simple/select'
import '@/tools/select-plugin-simple/select.scss'
const { DateTime } = require('luxon')

export default {
  components: {
  },
  data () {
    return {
      timer: 15,
      loading: true,
      select: null,
      visible_only: [],
      visibleOnlyOptions: {},
      handleUserId: String(this.$store.getters.userId),
      options: [],
      usersDict: this.$store.getters.usersDict
    }
  },
  computed: {
    dateTime () {
      return DateTime.utc().plus({ minutes: this.timer }).toISO()
    }
  },
  mounted () {
    this.createSelect()
  },
  watch: {

  },
  methods: {
    close () {
      this.$store.commit(HIDE_HANDLE_DIALOG)
    },
    submit () {
      const body = {
        action_ts: this.dateTime,
        assign_to: this.handleUserId
      }
      this.$store.dispatch(HANDLE_NOTIFICATION, body)
    },
    onUpdateVisibleOnly (id) {
      // console.log('addEnvironment. onUpdateVisibleOnly. id:', id)
      // console.log('hidden:', this.hidden)
      // console.log('visible_only:', this.visible_only)
      if (this.hidden.includes(String(id))) {
        // console.log('addEnvironment. onUpdateVisibleOnly. removing env with id:', id)
        const index = this.hidden.findIndex(String(id))
        this.hidden.slice(index, 1)
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    updateVisibleOnlyOptions () {
      const visibleOnlyOptionsDict = {}
      // console.log('addEnvironment. updateVisibleOnlyOptions', this.options)
      // console.log('hidden', this.hidden)
      // console.log('visible_only', this.visible_only)
      for (const [envId, envName] of Object.entries(this.options)) {
        visibleOnlyOptionsDict[envId] = envName
      }
      // console.log('addEnvironment. computed. visibleOnlyOptions', visibleOnlyOptionsDict)
      this.visibleOnlyOptions = visibleOnlyOptionsDict
    },
    changeHandleUserId (userObj) {
      console.log('handleNotification. changeHandleUserId', userObj)
      this.handleUserId = userObj.id
    },
    createSelect () {
      const switchFunc = this.changeHandleUserId
      // this.select.destroy()
      console.log(this.$store.getters.usersList)
      this.select = new Select('#select-user', {
        placeholder: 'Choose user',
        data: this.$store.getters.usersList,
        selectedId: this.handleUserId,
        onSelect (item) {
          // console.log('Selected Item', item)
          switchFunc(item)
        }
      })
      // this.select.select(this.handleUserId)
    }
  }
}
</script>

<style scoped>
#handle-notification {
  max-width: 750px;
}
.notification-action-popup {
  background: var(--c-white);
  /*padding: 20px;*/
  /*border-radius: var(--r-radius);*/
  margin: 20px;
}
.notification-action-popup__box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-background);
  width: 100%;
  max-height: 100vh;
  z-index: 6;
}
.handle-notification-dialog__select {
  width: auto;
  min-width: 200px;
}
</style>
