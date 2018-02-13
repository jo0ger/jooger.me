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
  },
  constant: {
    socials: [
      { title: 'Email', icon: 'email', url: 'mailto:iamjooger@gmail.com' },
      { title: 'GitHub', icon: 'github', url: 'https://github.com/jo0ger' },
      { title: '知乎', icon: 'zhihu', url: 'https://www.zhihu.com/people/bubblypoker' },
      { title: '微博', icon: 'weibo', url: 'http://weibo.com/jo0ger' },
      { title: '网易云音乐', icon: 'netease-music', url: 'http://music.163.com/#/user/home?id=36877861' }
    ],
    menus: [
      { key: 'index', title: '首页', icon: 'home' },
      { key: 'archive', title: '归档', icon: 'archive' },
      { key: 'guestbook', title: '留言墙', icon: 'guestbook' },
      { key: 'about', title: '关于', icon: 'about' }
    ],
    shares: [
      { key: 'link', title: '复制链接' },
      { key: 'wechat', title: '微信' },
      { key: 'weibo', title: '微博' },
      { key: 'qzone', title: 'QQ空间' },
      { key: 'douban', title: '豆瓣' },
      { key: 'evernote', title: '映象笔记' },
      { key: 'twitter', title: 'Twitter' },
      { key: 'facebook', title: 'Facebook' },
      { key: 'mail', title: '邮箱' }
    ]
  }
}
