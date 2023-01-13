import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import { TRIGGER_ALERT_SCENARIO, USER_NETWORK_CONNECTION } from '@/store/actions/clientStatus'

export default {
  data () {
    return {
      lastComponent: null
    }
  },
  mounted () {
    // this.wrapConsoleLog()
    window.addEventListener('error', (event) => {
      try {
        this.logClientEvent(event.error.stack.replace(/(\r\n|\n|\r)/gm, ''), 'error')
      } catch {
        this.logClientEvent(JSON.stringify(event.error), 'error')
      }
    })
    window.addEventListener('offline', () => this.notifyUserOffline())
    window.addEventListener('online', () => this.notifyUserOnline())
    // window.onerror = function (message, source, lineno, colno, error) {
    // console.log(message)
    // console.log(source)
    // console.log(error)
    // }
  },
  // errorCaptured (err, vm, info) {
  //   this.logVueEvent(err, 'error')
  // },
  methods: {
    notifyUserOffline () {
      this.$store.commit(TRIGGER_ALERT_SCENARIO, 'offline')
      this.$store.commit(USER_NETWORK_CONNECTION)
    },
    notifyUserOnline () {
      this.$store.commit(TRIGGER_ALERT_SCENARIO, 'online')
      this.$store.commit(USER_NETWORK_CONNECTION)
    },
    wrapConsoleLog () {
      const _warn = console.warn
      const _debug = console.debug
      const _error = console.error
      const logEvent = (log, logType) => { this.logClientEvent(log, logType) }
      console.warn = function (text) {
        logEvent(Array.from(arguments).join(''), 'warning')
        return _warn.apply(console, arguments)
      }
      console.debug = function (text) {
        logEvent(Array.from(arguments).join(''), 'error')
        return _debug.apply(console, arguments)
      }
      console.error = function (text) {
        logEvent(Array.from(arguments).join(''), 'error')
        return _error.apply(console, arguments)
      }
    },
    // logVueEvent (log, errorType) {
    //   let eventName = ''
    //   if (log.stack) {
    //     console.log(log.stack.toString().replace(/(\r\n|\n|\r)/gm, ''))
    //     const components = log.stack.toString().match(/(?=\().*?(?=\.vue)/g)
    //     console.log('regex', components)
    //     if (components.length > 0) {
    //       eventName = 'Component:' + ' ' + components[0]
    //     } else {
    //       eventName = 'Path:' + ' ' + this.$route.fullPath
    //     }
    //   } else {
    //     eventName = 'Path:' + ' ' + this.$route.fullPath
    //   }
    //   const errorDescription = {
    //     errorObj: log,
    //     eventName: eventName,
    //     eventType: errorType,
    //     showError: false,
    //     message: 'Vue error catch'
    //   }
    //   console.log(errorDescription)
    //   this.$store.dispatch(TRIGGER_ERROR, errorDescription)
    //   } catch {
    //     return console.log('Vue error not caught')
    //   }
    // },
    logClientEvent (log, errorType) {
      if (log.includes('remoteActions. REMOTE_REQUEST.')) {
        return false
      }
      let components = []
      let eventName = ''
      if (errorType === 'warning') {
        this.lastErrorType = 'warning'
        components = log.match(/(?:<)(.*?)(?=>)/g)
        if (components.length > 0) {
          this.lastComponent = components[0]
          this.lastErrorType = 'warning'
          eventName = 'Component:' + ' ' + components[0]
        } else {
          this.lastComponent = null
          eventName = 'Path:' + ' ' + this.$route.fullPath
        }
      } else {
        this.lastErrorType = 'error'
        if (this.lastComponent && this.lastErrorType === 'warning') {
          eventName = 'Component:' + this.lastComponent
        } else {
          eventName = 'Path:' + ' ' + this.$route.fullPath
        }
      }
      const errorDescription = {
        errorObj: log.replace(/\s+/g, ' '),
        eventName: eventName,
        eventType: errorType,
        showError: false,
        message: 'Console error catch'
      }
      this.$store.dispatch(TRIGGER_ERROR, errorDescription)
    }
  }
}
