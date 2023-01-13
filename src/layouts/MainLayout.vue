<template>
  <div class="backdrop" v-if="showFirstBackDrop" @click="onDropBackClick"></div>

  <div class="main-header">
      <div class="app-block__header">
        <Navbar />
      </div>
    </div>
  <div class="main-body" v-if="showLoading">
    <loading-spinner :opacity="1" :spinnerHeight="80" :spinnerWidth="80" loader="spinner" :is-full-page="true" />
  </div>
  <div v-else class="main-body">
    <integrations-dialog
      v-if="showIntegrations"/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/NavBar'
// import Loading from '@/components/Loading'
import store from '@/store'
import { USER_REQUEST } from '@/store/actions/user'
import {
  ENV_REQUEST,
  GET_FILTERS,
  GET_UI_SETTINGS,
  TAG_FILTER_VALUES_REQUEST,
  TAG_FILTERS_REQUEST,
  AVAILABLE_ACTIONS_REQUEST,
  GET_FILTER_COLUMNS,
  GET_USERS
} from '@/store/actions/config'
import { AUTH_LOGOUT } from '@/store/actions/auth'
import { HIDE_FIRST_BACKDROP } from '@/store/actions/localActions'
import LoadingSpinner from '@/components/LoadingSpinner'
import IntegrationsDialog from '@/components/integrations/integrationsDialog'

export default {
  name: 'main-layout',
  components: {
    IntegrationsDialog,
    LoadingSpinner,
    // MainNotifications,
    Navbar
    // Sidebar,
    // Loading
  },

  beforeMount () {
    this.onPageLoad()
  },
  data: () => ({
    isOpen: true,
    showLoading: true
  }),
  computed: {
    showFirstBackDrop () {
      console.log('MainLayout. ShowFirstBackDrop')
      return store.getters.showFirstBackDrop
    },
    showIntegrations () {
      return this.$store.getters.showIntegrations
    }
  },
  methods: {
    onPageLoad () {
      try {
        this.loadConfigs()
      } catch (error) {
        console.error('MainLayout. onPageLoad. Error', error)
      }
    },
    onDropBackClick () {
      console.log('MainLayout. onDropBackClick')
      store.commit(HIDE_FIRST_BACKDROP)
    },
    // changeSideBarState () {
    //   this.showSidePanel = !this.showSidePanel
    // },
    async loadConfigs () {
      console.log('MainLayout. setup. Start loading configuration ...')
      await store.dispatch(GET_FILTERS)
      console.log('MainLayout. setup. Step done: GET_FILTERS')
      await store.dispatch(USER_REQUEST)
      console.log('MainLayout. setup. Step done: USER_REQUEST')
      await store.dispatch(ENV_REQUEST)
      console.log('MainLayout. setup. Step done: ENV_REQUEST')
      await store.dispatch(GET_UI_SETTINGS)
      console.log('MainLayout. setup. Step done: GET_UI_SETTINGS')
      await store.dispatch(TAG_FILTERS_REQUEST)
      console.log('MainLayout. setup. Step done: TAG_FILTERS_REQUEST')
      await store.dispatch(TAG_FILTER_VALUES_REQUEST)
      console.log('MainLayout. setup. Step done: TAG_FILTER_VALUES_REQUEST')
      await store.dispatch(AVAILABLE_ACTIONS_REQUEST)
      console.log('MainLayout. setup. Step done: AVAILABLE_ACTIONS_REQUEST')
      await store.dispatch(GET_FILTER_COLUMNS, { filterId: localStorage.getItem('active-tag-filter-id') })
      console.log('MainLayout. setup. Step done: GET_FILTER_COLUMNS')
      await new Promise(
        resolve => {
          setTimeout(
            () => {
              console.log('Timeout 2000. isProfileLoaded: ', store.getters.isProfileLoaded)
              resolve()
            }, 500)
        }
      ).then(() => {
        if (!store.getters.isProfileLoaded) {
          console.log('Login. logout ...')
          this.$store.dispatch(AUTH_LOGOUT)
            .then(() => {
              this.$router.push('/login?message=failedToLoadConfiguration')
            })
        }
        console.log('MainLayout. setup. Finish timeout')
      })
      await store.dispatch(GET_USERS)
      console.log('MainLayout. setup. Step done: GET_USERS')

      this.showLoading = false
      console.log('MainLayout. setup. Finish loading configuration ...')
    }
    // async loadConfiguration () {
    //   await store.dispatch(GET_FILTERS)
    //   await store.dispatch(USER_REQUEST)
    //   await store.dispatch(ENV_REQUEST)
    //   await store.dispatch(GET_UI_SETTINGS)
    // }
  }
}

</script>

<style>
.main-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.main-body {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  /*position: fixed;*/
  width: 100%;
}

.app-block__header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*padding: 5px;*/
  background: var(--c-white);
  /*position: fixed;*/
  /*top: 0;*/
}

.backdrop {
  position: fixed;
  width: 100%;
  top: 0;
  height: 100vh;
  /*background-color: black;*/
  /*opacity: 30%;*/
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  /* slightly transparent fallback */
}

  /* if backdrop support: very transparent and blurred */
@supports ((-webkit-backdrop-filter: blur(2px)) or (backdrop-filter: blur(2px))) {
  .backdrop {
    background-color: transparent;
    backdrop-filter: blur(2px) brightness(70%);
    -webkit-backdrop-filter: blur(2px) brightness(70%);
  }
}
/*.global-filter {*/
/*  margin-top: 70px;*/
/*  min-height: calc(100vh - 70px);*/
/*  position: fixed;*/
/*  width: 100%;*/
/*  filter: blur(1px);*/
/*  z-index: 5;*/
/*}*/
</style>
