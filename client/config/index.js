/**
 * @desc App Config
 * @author Jooger <zzy1198258955@163.com>
 * @date 8 Sep 2017
 */

// const isProd = process.env.NODE_ENV === 'production'

export default {
  service: {
    url: '/',
    method: 'get',
    baseURL: '/api',
    // baseURL: isProd ? 'http://api.jooger.me/v1.0' : 'http://localhost:5000/v1.0',
    // baseURL: process.env.baseUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    timeout: 120000,
    responseType: 'json',
    proxy: {
      host: '127.0.0.1',
      port: process.env.PORT || 3000
    }
  }
}
