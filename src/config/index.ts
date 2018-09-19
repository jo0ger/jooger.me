/**
 * 公共配置
 */

// 生产环境
export const IS_PROD = process.env.NODE_ENV === 'production'

// 表格默认size
export const DEFAULT_PAGE_SIZE = 10

// 接口白名单，不全局报错
export const WHITE_API_LIST = []

// axios默认配置
export const AXIOS_DEFAULT_CONFIG = {
  baseURL: IS_PROD ? 'https://api.jooger.me/v2/backend' : 'http://127.0.0.1:7001/v2/backend',
  url: '/',
  method: 'get',
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  timeout: 100000,
  responseType: 'json'
}

export const USER_KEY = IS_PROD ? 'jooger.me.user' : 'jooger.me.user_dev'

export const USER_LIKE_KEY = IS_PROD ? 'jooger.me.user.like_history' : 'jooger.me.user.like_history_dev'

export const CDN = 'https://static.jooger.me'
