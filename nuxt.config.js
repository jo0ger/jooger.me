const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  srcDir: 'client/',
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: 'Jooger.me - 凡心所向，一往无前',
    titleTemplate: '%s - Jooger.me',
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
      { hid: 'keywords', name: 'keywords', content: 'Jooger,Jooger.me,Blog,FE,前端' },
      { hid: 'description', name: 'description', content: '凡心所向，一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css',
    'gitalk/dist/gitalk.css',
    { src: '~assets/stylus/index.styl', lang: 'stylus' }
  ],
  loading: '~/components/Common/PageLoading',
  build: {
    analyze: false,
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
    { src: '~plugins/swiper.js', ssr: false },
    { src: '~plugins/image-load.js', ssr: false },
    { src: '~plugins/image-popup.js', ssr: false }
  ],
  router: {
    linkActiveClass: 'active'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
