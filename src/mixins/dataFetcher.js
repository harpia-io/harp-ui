export const dataFetcher = {
  methods: {
    async request (path, options) {
      let status = null
      let results = null
      await fetch(path, options)
        .then(result => {
            status = result.status
            return result.json()
          }
          // [result.status, result.json()]
        )
        .then(data => {
          // console.log(data)
          results = data
        })
        .catch((error) => {
          console.log(path, ' - http_request result: Error: ', error)
          if (this.$store.state.debug_mode) {
            alert("Can't collect remote data from: " + path)
          } else {
            alert("Can't fetch data")

          }
      })
      if (this.$store.state.debug_mode) {
        console.log('Debug: ', path, ' - http_request result: ', status, ' Value: ', results)
      }
      return [status, results]
    },

    fetchData (service, url) {
      const params = this.$store.getters.generateUrl(service, url)
      if (this.$store.state.debug_mode) {
        console.log("Debug: FetchData params: ", params)
      }
      return this.request(params[0], params[1])
    }
  }
}
