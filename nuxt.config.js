/**
 * @desc Nuxt config
 * @author Jooger <iamjooger@gmail.com>
 * @date 20 Dec 2017
 */

'use strict'

const isProd = process.env.NODE_ENV === 'production'
const description = 'On the road'
const themeColor = '#302e31'

module.exports = {
  srcDir: 'client/',
  offline: true,
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: 'Jooger.me - ' + description,
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=2' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'renderer', content: 'webkit' },
      { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'apple-mobile-web-app-title', content: 'Jooger.me - ' + description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'author', content: 'zzy1198258955@163.com' },
      { name: 'theme-color', content: themeColor },
      { hid: 'keywords', name: 'keywords', content: 'Jooger,Jooger.me,Blog,FE,前端' },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css',
    { src: '@/assets/stylus/index.styl', lang: 'stylus' }
  ],
  loading: {
    color: themeColor
  },
  build: {
    analyze: false,
    publicPath: '/resource/',
    vendor: [
      'axios',
      'swiper',
      'howler',
      'vue-awesome-swiper',
      'particles.js',
      'validator',
      'vue-affix',
      'bezier-easing'
    ]
  },
  plugins: [
    { src: '@/plugins/router.js' },
    { src: '@/plugins/filter.js' },
    { src: '@/plugins/mixin.js' },
    { src: '@/plugins/google-analytics.js', ssr: false },
    { src: '@/plugins/baidu-statistics.js', ssr: false },
    { src: '@/plugins/baidu-seo-push.js', ssr: false },
    { src: '@/plugins/click-outside.js', ssr: false },
    { src: '@/plugins/message.js', ssr: false },
    { src: '@/plugins/swiper.js', ssr: false },
    { src: '@/plugins/image-load.js', ssr: false },
    { src: '@/plugins/storage-to-store.js', ssr: false },
    { src: '@/plugins/event-bus.js', ssr: false },
    { src: '@/plugins/particles.js', ssr: false },
    { src: '@/plugins/console-say-hi.js', ssr: false },
    { src: '@/plugins/share.js', ssr: false }
  ],
  router: {
    linkActiveClass: 'active'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
