/* eslint-disable promise/param-names */
import {
  UPDATE_LOAD_STATE,
  REMOTE_REQUEST,
  UPDATE_LOADING_STATUS,
  ADD_LOADING_ITEM,
  REMOVE_LOADING_ITEM,
  INCREMENT_LOADING_ID
} from '../actions/remoteActions'
import store from '@/store/index'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import { TRIGGER_ALERT, TRIGGER_ALERT_SCENARIO } from '@/store/actions/clientStatus'

const state = {
  loadingState: {
    loading: false,
    status: 0,
    message: '',
    remoteResource: ''
  },
  loadingList: {},
  counter: 0
}

const getters = {
  loadingId: state => state.counter
  // loadingList2: state => state.loadingList
}

const actions = {
  [REMOTE_REQUEST]: ({ commit, getters }, { requestObj, message, popupOptions }) => {
    console.log('Remote serviceConnectionTimeoutConfig', store.getters.serviceConnectionTimeoutConfig)
    const requestTakesLong = setTimeout(() => {
      store.dispatch(TRIGGER_ALERT_SCENARIO, {
        scenario: 'slow_request',
        error: null
      }).then()
    }, store.getters.serviceConnectionTimeoutConfig)
    return new Promise((resolve, reject) => {
      // console.log('remoteActions. REMOTE_REQUEST. ', requestObj, message)
      const loadingId = String(getters.loadingId)
      commit(INCREMENT_LOADING_ID)
      const [url, params] = getters.generateUrl(requestObj.service, requestObj.path, requestObj.method, requestObj.body)

      commit(ADD_LOADING_ITEM, {
        loadingId: loadingId,
        loading: true,
        status: 0,
        message: message,
        remoteResource: requestObj.path
      })
      // console.log('remoteActions. REMOTE_REQUEST. loadingId:', loadingId)
      // console.log('remoteActions. REMOTE_REQUEST. request params:', params)
      fetch(url, params).then(resp => {
        // console.log('remoteActions. REMOTE_REQUEST. resp:', resp.ok, resp.status, resp)
        // console.log(resp)
        clearTimeout(requestTakesLong)
        if (resp.ok) {
          commit(REMOVE_LOADING_ITEM, loadingId)
          // console.log(popupOptions)
          if (popupOptions.alert) {
            if (popupOptions.alert.scenario) {
              store.dispatch(TRIGGER_ALERT_SCENARIO, { scenario: popupOptions.alert.scenario }).then(()=>{})
            } else {
              store.dispatch(TRIGGER_ALERT, popupOptions.alert).then(() => {})
            }
          }
        } else {
          console.error('remoteActions. REMOTE_REQUEST. not 200', resp)
          const loadState = {
            loadingId: loadingId,
            loading: true,
            status: 1,
            message: resp.status + ': "' + resp.statusText + '"',
            remoteResource: requestObj.path
          }
          commit(UPDATE_LOAD_STATE, loadState)
          if (popupOptions.reportError) {
            const errorDescription = {
              errorObj: 'Can\'t handle event: "' + message + '"',
              eventName: popupOptions.eventName,
              eventType: 'error',
              showError: true,
              message: 'Can\'t handle event: "' + message + '"'
            }
            popupOptions.self.$store.dispatch(TRIGGER_ERROR, errorDescription)
          }
          // eslint-disable-next-line no-throw-literal
          throw { status: resp.status, message: resp.status + ': "' + resp.statusText + '"' }
        }
        resolve(resp.json())
      }).catch(e => {
        console.error('remoteActions. REMOTE_REQUEST. error:', e)
        const statusCode = e.status ? e.status : 999
        const message = e.message ? e.message : e
        store.dispatch(TRIGGER_ALERT_SCENARIO, {
          scenario: 'backend',
          error: { status: statusCode, message: message }
        }).then()
        const loadState = {
          loadingId: loadingId,
          loading: true,
          status: 1,
          message: message,
          remoteResource: requestObj.path
        }
        commit(UPDATE_LOAD_STATE, loadState)
        reject(message)
      })
    })
  }
}

const mutations = {
  [ADD_LOADING_ITEM] (state, loadingItem) {
    state.loadingList[loadingItem.loadingId] = loadingItem
    // console.log('remoteActions. ADD_LOADING_ITEM. loadingItem', loadingItem)
  },
  [REMOVE_LOADING_ITEM] (state, loadingId) {
    // console.log('remoteActions. REMOVE_LOADING_ITEM. loadingId', loadingId)
    if (loadingId in state.loadingList) {
      // console.log('remoteActions. REMOVE_LOADING_ITEM. Deleting loadingId object:', loadingId)
      delete state.loadingList[loadingId]
    }
  },
  [UPDATE_LOADING_STATUS] (state, status) {
    state.loadingState.loading = status
    // console.log('Store.modules.remoteActions.js. Mutation. UPDATE_LOADING_STATUS. Rest: ', state.loadingState.loading)
    // console.log('Store.modules.remoteActions.js. Mutation. UPDATE_LOADING_STATUS. state.loadingList: ', state.loadingList
  },
  [UPDATE_LOAD_STATE] (state, loadingState) {
    state.loadingList[loadingState.loadingId] = loadingState
    // console.log('Store.modules.remoteActions.js. Mutation. UPDATE_LOAD_STATE. Rest: ', loadingState)
    // console.log('Store.modules.remoteActions.js. Mutation. UPDATE_LOAD_STATE. state.loadingList: ', state.loadingList)
  },
  [INCREMENT_LOADING_ID] (state) {
    state.counter += 1
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
