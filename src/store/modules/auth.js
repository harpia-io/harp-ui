/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/auth'
// import { timeout, signal, controller } from '@/tools/timeout'
// import { fetchWithTimeout } from '@/tools/requests'
import { USER_REQUEST } from '../actions/user'
import store from '@/store/index'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      // const [url, params] = store.getters.generateUrl('users', '/auth/login', 'POST')
      // params.body = JSON.stringify(user)
      // params.signal = signal
      // console.log('Module.Auth. AUTH_REQUEST. Url:', url, 'Params:', params)
      const msg = 'Auth request'
      const popupOptions = {
        showDialog: true
      }
      const requestObj = {
        service: 'users',
        path: '/auth/login',
        method: 'POST',
        body: JSON.stringify(user),
        options: {}
      }
      store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          localStorage.setItem('user-token', response.access_token)
          localStorage.setItem('user-refresh-token', response.refresh_token)
          commit(AUTH_SUCCESS, response)
          dispatch(USER_REQUEST)
          resolve(response)
        })
        .catch((error) => {
          console.error('Router.Modules.auth. AUTH_REQUEST Error: ', error)
          commit(AUTH_ERROR, error)
          localStorage.removeItem('user-token')
          localStorage.removeItem('user-refresh-token')
          reject(error)
        })
      // fetchWithTimeout(url, params)
      //   .then(resp => {
      //     if (resp.status === 200) {
      //       return resp.json()
      //     }
      //     // console.log('Store.auth. AUTH_REQUEST. Response:', resp)
      //     reject(Error('Auth response is not OK'))
      //   })
      //   .then(resp => {
      //     // console.log('Module.Auth. AUTH_REQUEST. Resp: ', resp)
      //     localStorage.setItem('user-token', resp.access_token)
      //     localStorage.setItem('user-refresh-token', resp.refresh_token)
      //     // Here set the header of your ajax library to the token value.
      //     // example with axios
      //     // axios.defaults.headers.common['Authorization'] = resp.token
      //     commit(AUTH_SUCCESS, resp)
      //     dispatch(USER_REQUEST)
      //     resolve(resp)
      //   })
      //   .catch(err => {
      //     console.error('Router.Modules.auth. AUTH_REQUEST Error: ', err)
      //     commit(AUTH_ERROR, err)
      //     localStorage.removeItem('user-token')
      //     localStorage.removeItem('user-refresh-token')
      //     // controller.abort()
      //     reject(err)
      //   })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      // TODO Consider to move it to the server side
      // localStorage.removeItem('env-filter')
      localStorage.removeItem('state-filter')
      localStorage.removeItem('dst-filter')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
    // console.log('Store.modules.auth.js: Mutation. AUTH_REQUEST. status: ', state.status)
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.access_token
    state.hasLoadedOnce = true
    // console.log('Store.modules.auth.js: Mutation. AUTH_SUCCESS. status: ', state.status, 'token: ', state.token)
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
    console.log('Store.modules.auth.js: Mutation. AUTH_ERROR. status: ', state.status)
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
    // console.log('Store.modules.auth.js: Mutation. AUTH_LOGOUT. token: ', state.token)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
