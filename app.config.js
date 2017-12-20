/**
 * @desc App Config
 * @author Jooger <iamjooger@gmail.com>
 * @date 20 Dec 2017
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
    timeout: 12000,
    responseType: 'json'
  },
  storage: {
    userKey: isProd ? 'jooger.me.user' : 'jooger.me.user_dev',
    userLikeKey: isProd ? 'jooger.me.user.like_history' : 'jooger.me.user.like_history_dev'
  },
  auth: {
    githubTokenKey: 'jooger.me.github.token'
  },
  sns: {
    github: {
      // TODO: FIX:
      clientId: isProd ? 'cc9133ad08a5fbc3b7bd' : '5b4d4a7945347d0fd2e2'
    }
  }
}
