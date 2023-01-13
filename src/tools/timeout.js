/**
 * Timeout function
 * @param {Integer} time (miliseconds)
 * @param {Promise} promise
 */
export function timeout (time, promise) {
  return new Promise(function(resolve, reject) {
    console.log('Before timeout. Timeout: ', time)
    setTimeout(() => {
      reject(new Error('Request timed out.'))
    }, time);
    promise.then(resolve, reject);
  });
}
export const controller = new AbortController();
export const signal = controller.signal;
