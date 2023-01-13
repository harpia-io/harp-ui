import {
  TRIGGER_ALERT,
  TRIGGER_ALERT_SCENARIO,
  HIDE_ALERT,
  USER_NETWORK_CONNECTION
} from '../actions/clientStatus'

const state = {
  show: false, // show alert
  error: null, // error info
  scenario: null, // pre-defined scenario for alert, e.g. online, offline, back-end
  alertType: null, // alert|warning|success
  alertMessage: null, // message fo alert
  alertTimeStamp: null, // to make alerts unique
  dismissible: true, // true|false close with icon
  dismissAfterTimeout: true, // true|false close after delay
  userOnline: true, // user network status
  dismissAfterTimeoutConfig: 15000,
  serviceConnectionTimeoutConfig: 30000
}

const getters = {
  dismissAfterTimeoutConfig: state => {
    return state.dismissAfterTimeoutConfig
  },
  serviceConnectionTimeoutConfig: state => {
    return state.serviceConnectionTimeoutConfig
  },
  getAlert: state => {
    return {
      error: state.error,
      alertType: state.alertType,
      alertMessage: state.alertMessage,
      dismissible: state.dismissible,
      dismissAfterTimeout: state.dismissAfterTimeout
    }
  }
}

const actions = {
  [TRIGGER_ALERT]: ({ commit, dispatch, state }, alertObject) => {
    if (state.userOnline) {
      commit(TRIGGER_ALERT, alertObject)
    } else {
      commit(TRIGGER_ALERT_SCENARIO, { scenario: 'offline' })
    }
  },
  [TRIGGER_ALERT_SCENARIO]: ({ commit, dispatch, state }, payload) => {
    if (state.userOnline) {
      commit(TRIGGER_ALERT_SCENARIO, payload)
    } else {
      commit(TRIGGER_ALERT_SCENARIO, { scenario: 'offline' })
    }
  },
  [USER_NETWORK_CONNECTION]: ({ commit }) => {
    commit(USER_NETWORK_CONNECTION)
  },
  [HIDE_ALERT]: ({ commit }) => {
    commit(HIDE_ALERT)
  }
}

const mutations = {
  [TRIGGER_ALERT]: (state, alertObject) => {
    state.error = alertObject.error
    state.alertTimeStamp = new Date().toISOString()
    state.alertType = alertObject.alertType
    state.alertMessage = alertObject.alertMessage
    state.dismissible = alertObject.dismissible
    state.dismissAfterTimeout = alertObject.dismissAfterTimeout
    state.show = true
  },
  [TRIGGER_ALERT_SCENARIO]: (state, payload) => {
    state.alertTimeStamp = new Date().toISOString()
    state.scenario = payload.scenario
    state.error = payload.error
    state.show = true
  },
  [USER_NETWORK_CONNECTION]: (state) => {
    state.userOnline = !state.userOnline
  },
  [HIDE_ALERT]: (state) => {
    state.show = false
    state.error = null
    state.scenario = false
    state.alertTimeStamp = null
    state.alertType = null
    state.alertMessage = null
    state.dismissible = true
    state.dismissAfterTimeout = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// [TRIGGER_ALERT_DISAPPEAR]: (state, disappearTimeout) => {
//   state.disappearTimeout = disappearTimeout
//   // state.disappearTimeout = setTimeout(() => { dispatch(HIDE_ALERT) }, window.Config.dissmissAlertTimeout * 1000)
// },
// [TRIGGER_ALERT_DISAPPEAR]: ({ commit, dispatch, state }) => {
//   clearTimeout(state.disappearTimeout)
//   const disappearTimeout = setTimeout(() => { dispatch(HIDE_ALERT) }, window.Config.dissmissAlertTimeout * 1000)
//   commit(TRIGGER_ALERT_DISAPPEAR, disappearTimeout)
// },
// disappearTimeout: null
