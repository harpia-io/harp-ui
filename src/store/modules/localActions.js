/* eslint-disable promise/param-names */
import {
  TOGGLE_ORG_SETTINGS,
  TOGGLE_USER_PROFILE,
  UPDATE_ORG_SETTING_FLAG,
  UPDATE_USER_PROFILE_FLAG,
  CLOSE_ALL_POPUPS,
  SHOW_FIRST_BACKDROP,
  HIDE_FIRST_BACKDROP,
  SHOW_SECOND_BACKDROP,
  HIDE_SECOND_BACKDROP,
  SHOW_NOTIFICATION_DETAILS,
  HIDE_NOTIFICATION_DETAILS,
  SHOW_SETTINGS,
  HIDE_SETTINGS,
  SHOW_INTEGRATIONS,
  HIDE_INTEGRATIONS,
  SHOW_BOTS,
  HIDE_BOTS
} from '../actions/localActions'

const state = {
  showOrgSettings: false,
  // showUserProfile: false,
  showFirstBackDrop: false,
  showSecondBackDrop: false,
  showNotificationDetails: false,
  showSettings: false,
  showIntegrations: false,
  showBots: false
}

const getters = {
  showFirstBackDrop: state => state.showFirstBackDrop,
  showSecondBackDrop: state => state.showSecondBackDrop,
  showNotificationDetails: state => state.showNotificationDetails,
  showSettings: state => state.showSettings,
  showIntegrations: state => state.showIntegrations,
  showBots: state => state.showBots
}

const actions = {
  [TOGGLE_ORG_SETTINGS]: ({ commit, getters }) => {
    commit(UPDATE_ORG_SETTING_FLAG)
  },
  [TOGGLE_USER_PROFILE]: ({ commit, getters }) => {
    commit(UPDATE_USER_PROFILE_FLAG)
  }
}

const mutations = {
  [UPDATE_ORG_SETTING_FLAG] (state) {
    // state.showUserProfile = false
    state.showOrgSettings = !state.showOrgSettings
  },
  [UPDATE_USER_PROFILE_FLAG] (state) {
    state.showOrgSettings = false
    // state.showUserProfile = !state.showUserProfile
  },
  [CLOSE_ALL_POPUPS] (state) {
    console.log('localActions. CLOSE_ALL_POPUPS')
    // state.showUserProfile = false
    state.showOrgSettings = false
  },
  [SHOW_FIRST_BACKDROP] (state) {
    console.log('localActions. SHOW_FIRST_BACKDROP')
    state.showFirstBackDrop = true
  },
  [HIDE_FIRST_BACKDROP] (state) {
    console.log('localActions. HIDE_FIRST_BACKDROP')
    state.showFirstBackDrop = false
    state.showSecondBackDrop = false
    state.showNotificationDetails = false
    state.showSettings = false
    state.showIntegrations = false
    state.showBots = false
  },
  [SHOW_SECOND_BACKDROP] (state) {
    console.log('localActions. SHOW_SECOND_BACKDROP')
    state.showSecondBackDrop = true
  },
  [HIDE_SECOND_BACKDROP] (state) {
    console.log('localActions. HIDE_SECOND_BACKDROP')
    state.showSecondBackDrop = false
  },
  [SHOW_NOTIFICATION_DETAILS] (state) {
    console.log('localActions. SHOW_NOTIFICATION_DETAILS')
    state.showFirstBackDrop = true
    state.showNotificationDetails = true
  },
  [HIDE_NOTIFICATION_DETAILS] (state) {
    console.log('localActions. HIDE_NOTIFICATION_DETAILS')
    state.showFirstBackDrop = false
    state.showNotificationDetails = false
  },
  [SHOW_SETTINGS] (state) {
    console.log('localActions. SHOW_SETTINGS')
    state.showFirstBackDrop = true
    state.showSettings = true
  },
  [HIDE_SETTINGS] (state) {
    console.log('localActions. HIDE_SETTINGS')
    state.showFirstBackDrop = false
    state.showSettings = false
  },
  [SHOW_INTEGRATIONS] (state) {
    console.log('localActions. SHOW_INTEGRATIONS')
    state.showFirstBackDrop = true
    state.showIntegrations = true
  },
  [HIDE_INTEGRATIONS] (state) {
    console.log('localActions. HIDE_INTEGRATIONS')
    state.showFirstBackDrop = false
    state.showIntegrations = false
  },
  [SHOW_BOTS] (state) {
    console.log('localActions. SHOW_BOTS')
    state.showFirstBackDrop = true
    state.showBots = true
  },
  [HIDE_BOTS] (state) {
    console.log('localActions. HIDE_BOTS')
    state.showFirstBackDrop = false
    state.showBots = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
