<template>
  <status-popup v-show="showStatus"></status-popup>
<!--  <div class="error-global-block" v-if="showError">-->
<!--    <error-message :message="errorMessage"/>-->
<!--  </div>-->
  <component :is="layout" />
<!--  <div class="loading-msg-block"-->
<!--       :style="{height: 87 * loadingListLength}"-->
<!--       v-if="loadingListLength > 0">-->
<!--  <update-message-popup-->
<!--    v-show="debugMode"-->
<!--    v-for="(loadingObj, loadingId, index) in resourceLoading" :key="index"-->
<!--    :loadingObj="loadingObj"-->
<!--    :loadingId="loadingId"-->
<!--  />-->
<!--  </div>-->
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import Loading from '@/components/Loading'
import updateMessagePopup from '@/components/popups/updateMessagePopup'
import errorMessage from '@/components/popups/errorMessage'
import clientEventsReporting from '@/mixins/clientEventsReporting'
import store from '@/store'
import { GET_CLIENT_INFO } from '@/store/actions/errorHandler'
import StatusPopup from '@/components/popups/statusPopup'
import TestErrors from '@/components/utilities/TestErrors'

export default {
  mixins: [clientEventsReporting],
  computed: {
    layout () {
      console.log('Router layout name:', this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    resourceLoading () {
      // console.log('App. computed. resourceLoading', store.state.remoteActions.counter)
      return store.state.remoteActions.loadingList
      // return store.getters.loadingList2
    },
    loadingListLength () {
      return Object.keys(this.resourceLoading).length
    },
    // showError () {
    //   return store.state.errorHandler.show
    // },
    showStatus () {
      return store.state.clientStatus.show
    },
    // errorMessage () {
    //   return store.state.errorHandler.message
    // },
    debugMode () {
      return store.getters.debugMode
    }
  },
  components: {
    StatusPopup,
    TestErrors,
    Loading,
    EmptyLayout,
    MainLayout,
    updateMessagePopup,
    errorMessage
  },
  methods: {},
  beforeMount () {
    this.$store.dispatch(GET_CLIENT_INFO)
  }
}
</script>

<style>
.loading-msg-block {
  position: fixed;
  bottom: 60px;
  right: 60px;
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-end;
  z-index: 5;
}
.error-global-block {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 200px;
  width: 400px;
  z-index: 6;
}
</style>
