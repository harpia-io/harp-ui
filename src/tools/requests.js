import store from '@/store'

export async function request (params, message = '') {
  const path = params[0]
  const options = params[1]
  let status = 0
  const remoteResource = path
  let body = null
  await fetch(path, options)
    .then(result => {
        status = result.status
        return result.json()
      }
    )
    .then(data => {
      // console.log('request: ', data)
      body = data
    })
    .catch((error) => {
      console.log(path, ' - http_request result: Error: ', error)
      status = 'error'
      body = error
    })
  return {
    status: status,
    body: body
  }
}



// export async function request (params) {
//   const path = params[0]
//   const options = params[1]
//   let status = 'unknown'
//   let body = null
//   await fetch(path, options)
//     .then(result => {
//       status = result.status
//       return result.json()
//     }
//     )
//     .then(data => {
//       // console.log('request: ', data)
//       body = data
//     })
//     .catch((error) => {
//       console.log(path, ' - http_request result: Error: ', error)
//       status = 'error'
//       body = error
//     })
//   return {
//     status: status,
//     body: body
//   }
// }

export async function fetchWithTimeout (resource, options) {
  console.log('requests. fetchWithTimeout: ', resource, options)
  const { timeout = 25000 } = options
  const controller = new AbortController()

  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  })
  clearTimeout(id)
  return response
}
