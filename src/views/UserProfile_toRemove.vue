<template>
  <div class="settings-page__background-filter"></div>
  <div class="settings-page">
  <!-- center box -->
    <!-- popup code -->
    <div class="popup__box settings">
      <div class="popup__box-header">
        <h4 class="popup__box-title">User profile</h4>
        <button class="popup__box-close" @click="toggleUserProfile">
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
              fill="#3C3C3C" />
          </svg>
        </button>
      </div>

      <div class="popup__box-main">

        <!-- tabs -->
        <div class="tabs">
          <div class="tabs__bar">
            <button class="info"
                    :class="{active: show === 'info'}"
                    @click.prevent="show = 'info'">Info</button>
            <button class="env"
                    :class="{active: show === 'userSettings'}"
                    @click.prevent="show = 'userSettings'">Environments</button>
<!--            <button class="env"-->
<!--                    :class="{active: show === 'Columns'}"-->
<!--                    @click.prevent="show = 'Columns'">Columns</button>-->
          </div>
<!--          <div v-if="error">{{ error }}</div>-->
          <div class="tabs__content">
            <info v-show="show === 'info'"/>
            <userSettings v-show="show === 'userSettings'"/>
<!--            <columns v-show="show === 'Columns'"/>-->
          </div>
        </div>
        <!-- end tabs -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Info from '@/components/orgSettings/userProfile'
import UserSettings from '@/components/popups/settingsUserEnvironments'
// import Columns from '@/components/popups/settingsColumns'
import store from '@/store/index'
// import { USER_REQUEST } from '@/store/actions/user'
// import { ENV_REQUEST } from '@/store/actions/config'
import { TOGGLE_USER_PROFILE } from '@/store/actions/localActions'

export default defineComponent({
  components: {
    info: Info,
    userSettings: UserSettings
    // columns: Columns
  },
  computed: {
  },
  beforeMount () {
    this.onLoad()
  },
  data () {
    return {
      show: 'info',
      profile: null
    }
  },
  // async setup () {
  //   console.log('settingsMain. setup. Start loading configuration ...')
  //   await store.dispatch(USER_REQUEST)
  //   await store.dispatch(ENV_REQUEST)
  //   await new Promise(
  //     resolve => {
  //       setTimeout(
  //         () => {
  //           console.log('Timeout 2000. isProfileLoaded: ', store.getters.isProfileLoaded)
  //           resolve()
  //         }, 2000)
  //     }
  //   ).then(() => {
  //     console.log('settingsMain. setup. Finish timeout')
  //   })
  //   console.log('settingsMain. setup. Finish loading configuration ...')
  // },
  methods: {
    onLoad () {
      this.profile = store.getters.getProfile
      console.log('settingsMain. onLoad. profile:', this.profile)
    },
    toggleUserProfile () {
      this.$store.dispatch(TOGGLE_USER_PROFILE)
    }
  }
})
</script>
