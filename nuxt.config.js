const path = require('path')
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
// 站点名称
const name = 'Jooger.me'
// 站点简介
const description = '吃喝玩乐，戎码一生'
// 站点标题
const title = name + ' - ' + description
// 站点关键字
const keywords = 'Jooger,jooger.me,Blog,FE,前端,Vue,Angular,React,Node.js,微服务'
// 站点主题色
const themeColor = '#302e31'
// Viewport meta
const viewport = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover'
// 项目根目录
const srcDir = 'src/'
// pwa 缓存过期时间, 30天缓存
const expires = 30 * 24 * 60 * 60

const fixUrl = url => url.replace(/\/\//g, '/').replace(':/', '://')

module.exports = {
  srcDir,
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  },
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: title,
    titleTemplate: '%s - ' + name,
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
      { name: 'viewport', content: viewport },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'renderer', content: 'webkit' },
      { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'author', content: 'zzy1198258955@163.com' },
      { name: 'theme-color', content: themeColor },
      { hid: 'keywords', name: 'keywords', content: keywords },
      { hid: 'description', name: 'description', content: description }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '//static.jooger.me/img/common/favicon/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Damion' },
      { rel: 'dns-prefetch', href: '//api.jooger.me' },
      { rel: 'dns-prefetch', href: '//static.jooger.me' }
    ]
  },
  loading: {
    color: themeColor
  },
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
  plugins: [
    { src: '@/plugins/google-tag', ssr: false },
    // { src: '@/plugins/baidu-stat', ssr: false },
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
    { src: '@/plugins/count-to', ssr: false },
    { src: '@/plugins/tab-active', ssr: false },
  ],
  modules: [
    '@nuxtjs/axios',
    '~/modules/typescript.js',
    ['@nuxtjs/pwa', {
      manifest: {
        name: name,
        short_name: name,
        display: 'standalone',
        start_url: 'https://jooger.me',
        description: description,
        theme_color: themeColor,
        background_color: '#fff',
        lang: 'zh-CN'
      },
      meta: {
        charset: 'utf-8',
        name: name,
        title: title,
        description: description,
        theme_color: themeColor,
        lang: 'zh-CN',
        viewport: viewport,
        mobileApp: true
      },
      icon: {
        iconSrc: path.resolve(srcDir, 'static/images', 'logo.png'),
        sizes: [16, 120, 144, 152, 192, 384, 512]
      },
      workbox: {
        dev: !isProd,
        runtimeCaching: [
          // route离线缓存
          {
            urlPattern: fixUrl('/.*'),
            handler: 'networkFirst',
            method: 'GET',
            strategyOptions: {
              cacheName: 'route-cache',
              cacheExpiration: {
                maxEntries: 100,
                maxAgeSeconds: expires // 30天缓存
              }
            }
          },
          // js,css等resource文件缓存，因为有hash所以可以设置cacheFirst策略
          {
            urlPattern: fixUrl('/resource/.*'),
            handler: 'cacheFirst',
            strategyOptions: {
              cacheName: 'resource-cache',
              cacheExpiration: {
                maxEntries: 100,
                maxAgeSeconds: expires
              }
            }
          },
          {
            urlPattern: fixUrl('/proxy/.*'),
            handler: 'cacheFirst',
            strategyOptions: {
              cacheName: 'proxy-cache',
              cacheExpiration: {
                maxEntries: 100,
                maxAgeSeconds: expires
              }
            }
          },
          {
            urlPattern: fixUrl('https?://api.jooger.me/.*'),
            handler: 'networkFirst',
            strategyOptions: {
              cacheName: 'api-cache',
              cacheExpiration: {
                maxEntries: 100,
                maxAgeSeconds: expires
              }
            }
          },
          // CDN 缓存
          {
            urlPattern: fixUrl('https?://static.jooger.me/.*'),
            handler: 'cacheFirst',
            strategyOptions: {
              cacheName: 'static-cache',
              cacheExpiration: {
                maxEntries: 100,
                maxAgeSeconds: expires
              }
            }
          }
        ]
      }
    }]
  ]
}
