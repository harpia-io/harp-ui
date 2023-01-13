/* eslint-disable promise/param-names */
import {
  TRIGGER_ERROR,
  REPORT_ERROR,
  SHOW_ERROR,
  CLOSE_ERROR,
  GET_CLIENT_INFO,
  UPDATE_CLIENT_INFO
} from '@/store/actions/errorHandler'

const state = {
  showError: false,
  message: '',
  browser: 'unknown',
  browserVersion: '0'
}

const getters = {
}

const actions = {
  [TRIGGER_ERROR]: ({ commit, getters, state }, { errorObj, eventName, eventType, showError, message }) => {
    const body = {
      severity: eventType,
      event_name: eventName,
      message: {
        error_message: String(errorObj)
      },
      tags: {
        browser: state.browser,
        browser_version: state.browserVersion
      }
    }
    const requestObj = {
      service: 'clientevents',
      path: '/clientevents/logs',
      method: 'POST',
      body: JSON.stringify(body),
      options: {}
    }
    const [url, params] = getters.generateUrl(requestObj.service, requestObj.path, requestObj.method, requestObj.body)
    fetch(url, params).then(resp => {
      console.log('errorHandler. TRIGGER_ERROR. resp:', resp.ok, resp.status, resp)
    }).catch((error) => {
      console.log('errorHandler. TRIGGER_ERROR. error:', error)
    })
    console.log('errorHandler. action. TRIGGER_ERROR. message', message)
    if (showError) {
      commit(SHOW_ERROR, message)
    }
  },
  [REPORT_ERROR]: ({ commit }) => {
    commit()
  },
  [GET_CLIENT_INFO]: ({ commit }) => {
    try {
      const navUserAgent = navigator.userAgent
      let browser = 'unknown'
      let browserVersion = 'unknown'
      if (navUserAgent.includes('Firefox/')) {
        browser = 'Firefox'
        browserVersion = navUserAgent.split('Firefox/')[1]
      } else if (navUserAgent.includes('Edg/')) {
        browser = 'Edge (Chromium)'
        browserVersion = navUserAgent.split('Edg/')[1]
      } else if (navUserAgent.includes('Chrome/')) {
        browser = 'Chrome'
        browserVersion = navUserAgent.split('Chrome/')[1]
      } else if (navUserAgent.includes('Safari/')) {
        browser = 'Safari'
        browserVersion = navUserAgent.split('Safari/')[1]
      } else {
        browser = navUserAgent
        browserVersion = '-1'
      }
      commit(UPDATE_CLIENT_INFO, { browser, browserVersion })
    } catch (error) {
    }
  }
}

const mutations = {
  [SHOW_ERROR] (state, message) {
    state.message = message
    state.show = true
    console.log('errorHandler. mutation. SHOW_ERROR. message', message)
  },
  [CLOSE_ERROR] (state) {
    state.message = ''
    state.show = false
    console.log('errorHandler. mutation. CLOSE_ERROR.')
  },
  [UPDATE_CLIENT_INFO] (state, { browser, browserVersion }) {
    state.browser = browser
    state.browserVersion = browserVersion
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
