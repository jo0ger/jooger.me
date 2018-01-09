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
  codeMap: {
    FAILED: -1,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    PARAMS_ERROR: 10001
  },
  storage: {
    userKey: isProd ? 'jooger.me.user' : 'jooger.me.user_dev',
    userLikeKey: isProd ? 'jooger.me.user.like_history' : 'jooger.me.user.like_history_dev'
  },
  auth: {
    githubTokenKey: 'jooger.me.github.token',
    roleMap: ['管理员', '普通用户', 'GitHub用户']
  },
  sns: {
    github: {
      // TODO: FIX:
      clientId: isProd ? 'cc9133ad08a5fbc3b7bd' : '5b4d4a7945347d0fd2e2'
    }
  }
}
