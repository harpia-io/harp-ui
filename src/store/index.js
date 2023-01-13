import { createStore } from 'vuex'
import user from './modules/user'
import auth from './modules/auth'
import config from './modules/config'
import remoteActions from '@/store/modules/remoteActions'
import localActions from '@/store/modules/localActions'
import errorHandler from '@/store/modules/errorHandler'
import notificationActions from '@/store/modules/notificationActions'
import clientStatus from '@/store/modules/clientStatus'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  devtools: true,
  modules: {
    user,
    auth,
    config,
    remoteActions,
    localActions,
    errorHandler,
    notificationActions,
    clientStatus
  },
  namespaced: true,
  strict: debug,
  state: {
    local_mode: false,
    debug_mode: true,
    logedIn: false,
    token: null,
    status: null,
    harpUrl: window.Config.domain,
    // harpUIUrl: window.Config.domain,
    prefix: '/api/v1',
    urls: {},
    return: {}
  },
  mutations: {
    updateUserObject (state, payload) {
      console.log('Store. Before profile update: ', state.profile, ' Payload: ', payload)
      if (payload.status !== 'error') {
        state.profile = payload.body
      } else {
        console.log('Store. updateUserObject. Error: ', payload.body)
        alert("Can't update profile. Error: " + payload.body)
      }
      console.log('Store. Update user object: ', payload.body)
      console.log('Store. After profile update: ', state.profile)
    }
  },
  actions: {
  },
  getters: {
    generateUrl: (state, getters) => (service, url, method = 'GET', body = null) => {
      if (state.local_mode) {
        const path = 'src/assets/offline_data' + url + '.json'
        const config = {
        }
        // console.log('Store. Getter. TestModePath: ', path)
        return [path, config]
      } else {
        const path = state.harpUrl + '/harp-' + service + state.prefix + url
        const config = {
          headers: {
            'Content-Type': 'application/json'
          },
          method: method
        }
        if (getters.isAuthenticated) {
          config.headers.AuthToken = state.auth.token
        }
        if (body) {
          config.body = body
        }
        console.log('Store. Getter. ProdModePath: ', path)
        return [path, config]
      }
    },
    userEnvList: state => {
      const userEnv = []
      // console.log('Store. Getter. userEnvList: State: state: ', state)
      // console.log('Store. Getter. userEnvList: State: user.profile.activeEnvironmentIds:',
      //   state.user.profile.activeEnvironmentIds)
      // console.log('Store. Getter. userEnvList: State: config.environments: ',
      //
      if (state.user.profile.activeEnvironmentIds) {
        state.user.profile.activeEnvironmentIds.forEach(environmentId => {
          if (environmentId.toString() in state.config.environments) {
            userEnv.push({
              id: environmentId.toString(),
              name: state.config.environments[environmentId.toString()]
            })
          }
        })
      }
      // console.log('Store getter. userEnvList: ', userEnv)
      return userEnv
    },
    userEnvAvailable: (state, getters) => {
      const userEnvAvailable = []
      // console.log('Store. Getter. userEnvAvailable: State: state: ', state)
      console.log('Store. Getter. activeEnvironmentIds: State: user.profile.activeEnvironmentIds:',
        state.user.profile.activeEnvironmentIds)
      console.log('Store. Getter. userEnvAvailable: State: config.environments: ',
        state.config.environments)
      for (const [environmentId, environmentName] of Object.entries(state.config.environments)) {
        if (!state.user.profile.activeEnvironmentIds.includes(environmentId)) {
          userEnvAvailable.push({
            id: environmentId,
            name: environmentName
          })
        }
      }
      console.log('Store getter. userEnvAvailable: ', userEnvAvailable)
      return userEnvAvailable
    },
    userAlertFielsList: state => {
      let userAlertFields = []
      // console.log('Store. Getter. userEnvList: State: user.profile.environments: ', state.user.profile)
      // console.log('Store. Getter. userEnvList: State: environments: ', state.config.environments)
      if (!state.user.profile.fields) {
        console.log('Store. Getter. userAlertFielsList. user.profile.fields ' +
        'is empty. Default values is used')
        userAlertFields = [
          'monitoring_system',
          'name',
          'description',
          'source'
        ]
      } else {
        userAlertFields = state.user.profile.fields
      }
      console.log('Store getter. userAlertFields: ', userAlertFields)
      return userAlertFields
    }
  }
})
