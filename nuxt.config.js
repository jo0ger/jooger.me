const parseArgs = require('minimist')
const argv = parseArgs(process.argv.slice(2), {
    alias: {
        H: 'hostname',
        p: 'port'
    },
    string: ['H'],
    unknown: parameter => false
})

const port =
    argv.port ||
    process.env.PORT ||
    process.env.npm_package_config_nuxt_port ||
    '3000'
const host =
    argv.hostname ||
    process.env.HOST ||
    process.env.npm_package_config_nuxt_host ||
    'localhost'

const isProd = process.env.NODE_ENV === 'production'
const description = 'On the way to life'
const themeColor = '#302e31'

module.exports = {
  srcDir: 'src/',
  buildDir: 'dist',
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  },
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
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' },
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
      { hid: 'keywords', name: 'keywords', content: 'Jooger,jooger.me,Blog,FE,前端,朱志洋,Vue,Angular,React,Node.js' },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Damion|Source+Code+Pro' },
      { rel: 'dns-prefetch', href: '//api.jooger.me' },
      { rel: 'dns-prefetch', href: '//static.jooger.me' }
    ]
  },
  /*
    ** Customize the progress-bar color
    */
  loading: {
    color: '#3B8070'
  },
  /*
    ** Build configuration
    */
  css: [
    'normalize.css',
    'viewerjs/dist/viewer.css',
    { src: '@/assets/style/index.styl', lang: 'stylus' }
  ],
  router: {
    linkActiveClass: 'active'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  build: {
    analyze: false,
    publicPath: '/resource/'
  },
  modules: [
    '@nuxtjs/axios',
    '~/modules/typescript.js'
  ],
  plugins: [
    { src: '@/plugins/google-tag', ssr: false },
    { src: '@/plugins/baidu-stat', ssr: false },
    { src: '@/plugins/baidu-seo-push', ssr: false },
    { src: '@/plugins/sentry', ssr: false },
    { src: '@/plugins/console-say-hi', ssr: false },
    { src: '@/plugins/particles', ssr: false },
    { src: '@/plugins/lazyload', ssr: false },
    { src: '@/plugins/router', ssr: false },
    { src: '@/plugins/bus', ssr: false },
    { src: '@/plugins/message', ssr: false },
    { src: '@/plugins/click-outside', ssr: false },
    { src: '@/plugins/storage-to-store', ssr: false },
    { src: '@/plugins/full-screen', ssr: false },
    { src: '@/plugins/share', ssr: false },
    { src: '@/plugins/swiper', ssr: false },
    { src: '@/plugins/viewer', ssr: false },
    { src: '@/plugins/copyright', ssr: false },
    { src: '@/plugins/scroll-to', ssr: false },
  ],
  axios: {}
}
