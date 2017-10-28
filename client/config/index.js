/**
 * @desc App Config
 * @author Jooger <zzy1198258955@163.com>
 * @date 27 Sep 2017
 */

'use strict'

const isProd = process.env.NODE_ENV === 'production'

const baseApiUrl = isProd ? 'https://api.jooger.me' : 'http://127.0.0.1:3001'

export default {
  service: {
    url: '/',
    method: 'get',
    baseURL: baseApiUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    },
    timeout: 120000,
    responseType: 'json'
  },
  storage: {
    userKey: isProd ? 'JOOGER_USER' : 'JOOGER_USER_DEV',
    userLikeKey: isProd ? 'JOOGER_USER_LIKE_HISTORY' : 'JOOGER_USER_LIKE_HISTORY_DEV'
  }
}
