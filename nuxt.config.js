/**
 * @desc Nuxt config
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

'use strict'

const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  srcDir: 'client/',
  offline: true,
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: 'Jooger.me - 修人、修身，修性、修心',
    titleTemplate: '%s - Jooger.me',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { 'http-equiv': 'Cache-Control', content: 'no-transform' },
      { 'http-equiv': 'Cache-Control', content: 'no-siteapp' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'author', content: 'zzy1198258955@163.com' },
      { name: 'theme-color', content: '#ed0a75' },
      { hid: 'keywords', name: 'keywords', content: 'Jooger,Jooger.me,Blog,FE,前端' },
      { hid: 'description', name: 'description', content: '修人、修身，修性、修心' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://static.jooger.me/img/common/favicon.ico' }
    ]
  },
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css',
    { src: '~assets/stylus/index.styl', lang: 'stylus' }
  ],
  loading: '~/components/Common/PageLoading',
  build: {
    analyze: false,
    publicPath: '/resource/',
    vendor: [
      'axios',
      'swiper',
      'bezier-easing',
      'highlight.js',
      'marked'
    ]
  },
  plugins: [
    { src: '~plugins/router.js' },
    { src: '~plugins/filter.js' },
    { src: '~plugins/google-analytics.js', ssr: false },
    { src: '~plugins/baidu-statistics.js', ssr: false },
    { src: '~plugins/baidu-seo-push.js', ssr: false },
    { src: '~plugins/vue-swiper.js', ssr: false },
    { src: '~plugins/vue-image-load.js', ssr: false },
    { src: '~plugins/vue-image-popup.js', ssr: false },
    { src: '~plugins/vue-message.js', ssr: false },
    { src: '~plugins/clipboard.js', ssr: false },
    { src: '~plugins/history.js', ssr: false },
    { src: '~plugins/auth-token.js', ssr: false }
  ],
  modules: [
    ['@nuxtjs/pwa', {
      manifest: {
        name: 'Jooger.me',
        short_name: 'Jooger.me',
        display: 'standalone',
        start_url: 'https://jooger.me',
        description: '修人、修身，修性、修心',
        theme_color: '#ed0a75',
        background_color: '#fff',
        lang: 'zh-CN'
      },
      meta: {
        charset: 'utf-8',
        title: 'Jooger.me - 修人、修身，修性、修心',
        description: '修人、修身，修性、修心',
        'theme-color': '#ed0a75',
        lang: 'zh-CN',
        viewport: 'width=device-width, initial-scale=1.0, user-scalable=no'
      },
      workbox: {
        globIgnores: ['**/*.{mp3,wav,ogg}']
      },
      icon: {
        iconSrc: path.resolve(__dirname, 'static/image', 'logo-pwa.png')
      }
    }]
  ],
  router: {
    linkActiveClass: 'active'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
