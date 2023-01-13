import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_PROFILE_UPDATE } from '../actions/user'
import { AUTH_LOGOUT } from '../actions/auth'
import store from '@/store/index'

const state = {
  status: '',
  profile: {}
}

const getters = {
  getProfile: state => state.profile,
  getProfileForForm: state => {
    return {
      firstName: state.profile.firstName,
      secondName: state.profile.secondName,
      username: state.profile.username,
      email: state.profile.email,
      role: state.profile.role,
      phone: state.profile.phone,
      status: state.profile.status,
      userId: state.profile.userId
    }
  },
  isProfileLoaded: state => !!state.profile.username,
  userId: state => state.profile.userId
}

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      const [url, params] = store.getters.generateUrl(
        'users', '/users/info')
      // console.log('Module.user. USER_REQUEST. Url:', url, 'Params', params)
      fetch(url, params)
        .then(resp => {
          if (resp.status) {
            if (resp.status === 401) {
              console.log('Module.user. USER_REQUEST. Unauthorized. Logout...')
              throw Error('User unauthorized')
            }
            console.log('Module.user. USER_REQUEST. Resp.status', resp.status)
          }
          return resp.json()
        })
        .then(resp => {
          // console.log('Module.user. USER_REQUEST. Resp', resp)
          const userProfile = {
            userId: resp.user_id,
            firstName: resp.first_name,
            secondName: resp.second_name,
            username: resp.username,
            email: resp.email,
            role: resp.role,
            phone: resp.phone,
            activeEnvironmentIds: resp.active_environment_ids,
            status: resp.status
          }
          commit(USER_SUCCESS, userProfile)
          resolve()
        })
        .catch((err) => {
          console.error('Module.user. USER_REQUEST. Error', err)
          commit(USER_ERROR)
          // if resp is unauthorized, logout, to
          dispatch(AUTH_LOGOUT)
          reject(err)
        })
    })
  }
}

const mutations = {
  [USER_REQUEST]: state => {
    state.status = 'loading'
    // console.log('Store.modules.user.js: Mutation. USER_REQUEST. status: ', state.status)
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    // console.log('Store.modules.user.js: Mutation. USER_SUCCESS. status: ', state.status)
    state.profile = resp
    // console.log('Store.modules.user.js: Mutation. USER_SUCCESS. profile: ', state.profile)
  },
  [USER_ERROR]: state => {
    state.status = 'error'
    // console.log('Store.modules.user.js: Mutation. USER_ERROR. status: ', state.status)
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {}
    // console.log('Store.modules.user.js: Mutation. USER_LOGOUT. profile: ', state.profile)
  },
  [USER_PROFILE_UPDATE]: (state, updateProfile) => {
    // console.log('Store.modules.user.js: Mutation. USER_PROFILE_UPDATE. Before update. profile:', updateProfile)
    state.profile = { ...state.profile, ...updateProfile }
    // Vue.set(state.profile, 'userName', profile.userName)
    // state.profile.secondName = profile.secondName
    // state.profile.email = profile.email
    // state.profile.phone = profile.phone
    // console.log('Store.modules.user.js: Mutation. USER_PROFILE_UPDATE. After update.profile: ', state.profile)
  }
  // [USER_ACTIVE_ENVIRONMENTS_UPDATE]: (state, activeEnvironmentIds) => {
  //   state.profile.activeEnvironmentIds = activeEnvironmentIds
  //   console.log('Store.modules.user.js: Mutation. USER_ACTIVE_ENVIRONMENTS_UPDATE. activeEnvironmentIds: ', activeEnvironmentIds)
  // }

}

export default {
  state,
  getters,
  actions,
  mutations
}
