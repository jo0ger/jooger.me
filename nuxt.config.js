const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  srcDir: 'client/',
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: 'Jooger.me - Jooger jooger, chicken dinner',
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
      { hid: 'keywords', name: 'keywords', content: 'Jooger,Jooger.me,Blog,FE,前端技术开发' },
      { hid: 'description', name: 'description', content: 'Jooger jooger, chicken dinner' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_268993_tu4k21igcspgmn29.css' }
    ]
  },
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css',
    'gitalk/dist/gitalk.css',
    { src: '~assets/stylus/index.styl', lang: 'stylus' }
  ],
  loading: '~/components/Common/PageLoading',
  // loading: { color: '#2196f3' },
  build: {
    vendor: [
      'axios',
      'bezier-easing',
      'highlight.js',
      'marked'
    ]
  },
  plugins: [
    { src: '~plugins/option.js' },
    { src: '~plugins/router.js' },
    { src: '~plugins/filter.js' },
    { src: '~plugins/swiper.js', ssr: false },
    { src: '~plugins/image-load.js', ssr: false },
    { src: '~plugins/image-popup.js', ssr: false }
  ],
  router: {
    linkActiveClass: 'active'
  }
  // transition: {
  //   name: 'fade',
  //   mode: 'out-in'
  // }
}
