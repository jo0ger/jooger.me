/**
 * @desc App Config
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const baseService = {
  url: '/',
  method: 'get',
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  },
  timeout: 120000,
  responseType: 'json'
}

export default {
  common: {
    code: {
      FAILED: -1,
      SUCCESS: 0,
      UNAUTHORIZED: 401
    },
    github: {
      owner: 'jo0ger',
      repo: 'jooger.me-source',
      clientId: 'b4983366c4c7549a09f1',
      clientSecret: '76fd8c26a21659d7eb925af0ed3498eabed49277',
      // source目录相对于根目录的路径
      repoLocalDir: path.resolve(isProd ? '../../' : '../', 'jooger.me-source')
    },
    command: {
      PULL: 'git pull ',
      ADD: 'git add . ',
      COMMIT: 'git commit -m "update" ',
      PUSH: 'git push '
    }
  },
  client: {
    service: Object.assign({}, baseService, {
      baseURL: isProd ? 'http://api.jooger.me/api' : 'http://127.0.0.1:3001/api'
    })
  },
  server: {
    allowedOrigins: [
      'jooger.me',
      'www.jooger.me',
      'blog.jooger.me'
    ],
    service: Object.assign({}, baseService, {
      baseURL: 'https://api.github.com/'
    })
  }
}
