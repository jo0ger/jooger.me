/**
 * 公共配置
 */

// 生产环境
export const IS_PROD = process.env.NODE_ENV === 'production'

// 表格默认size
export const DEFAULT_PAGE_SIZE = 10

// 接口白名单，不全局报错
export const WHITE_API_LIST = []

export const GA_TRACK_ID = 'UA-106909754-1'

// axios默认配置
export const AXIOS_DEFAULT_CONFIG = {
  baseURL: IS_PROD ? 'https://api.jooger.me/v2' : 'http://127.0.0.1:7001/v2',
  url: '/',
  method: 'get',
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 100000,
  responseType: 'json'
}

export const USER_KEY = IS_PROD ? 'jooger.me.user' : 'jooger.me.user_dev'

export const USER_LIKE_KEY = IS_PROD ? 'jooger.me.user.like_history' : 'jooger.me.user.like_history_dev'

export const THEME_KEY = IS_PROD ? 'jooger.me.theme' : 'jooger.me.theme_dev'

export const SITE = 'https://jooger.me'

export const CDN = 'https://static.jooger.me'

export const MENUS = [
  { key: 'index', title: '首页' },
  { key: 'archive', title: '归档' },
  { key: 'about', title: '关于' },
  { key: 'guestbook', title: '留言墙' }
]

export const SOCIALS = [
  { title: 'Email', icon: 'email', url: 'mailto:iamjooger@gmail.com' },
  { title: 'GitHub', icon: 'github', url: 'https://github.com/jo0ger' },
  { title: '知乎', icon: 'zhihu', url: 'https://www.zhihu.com/people/bubblypoker' },
  { title: '网易云音乐', icon: 'netease-music', url: 'http://music.163.com/#/user/home?id=36877861' }
]

export const SHARES = [
  { key: 'link', title: '复制链接' },
  { key: 'wechat', title: '微信' },
  { key: 'weibo', title: '微博' },
  { key: 'qzone', title: 'QQ空间' }
]
