export const urlBuildMixin = {
  methods: {
    urlBuild (url) {
      const offlineMode = true
      const apiUrl = 'http://environments.dev.harpia.io/api/v1'
      let fullUrl = ''
      let config = {}
      if (offlineMode) {
        fullUrl = '/src/offline_data' + url + '.json'
      } else {
        fullUrl = apiUrl + url
        config = {
          'Content-Type': 'application/json'
        }
      }
      return {
        url: fullUrl,
        config: config
      }
    }
  }
}
