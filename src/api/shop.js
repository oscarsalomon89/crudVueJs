/**
 * Mocking client-server processing
 */
import Vue from 'vue'

export default {
  getProducts (cb) {
    Vue.http.get('api/products',
            ).then(response => {
                cb(response.data)
            }, response => {
                cb([])
            })
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}