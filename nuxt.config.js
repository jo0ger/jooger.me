const pkg = require('./package')
const isProd = process.env.NODE_ENV === 'production'
const theme = '#444'

module.exports = {
  mode: 'universal',

  srcDir: 'client/',

  buildDir: 'build/client',

  cache: {
    max: 20,
    maxAge: 600000
  },

  dev: !isProd,

  /*
  ** Headers of the page
  */
  head: {
    title: 'Jooger.me',
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=2' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'renderer', content: 'webkit' },
      { name: 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'screen-orientation', content: 'portrait' },
      { name: 'x5-orientation', content: 'portrait' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'apple-mobile-web-app-title', content: 'Jooger.me' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'author', content: 'zzy1198258955@163.com' },
      { name: 'theme-color', content: theme },
      { hid: 'keywords', name: 'keywords', content: 'Jooger,jooger.me,Blog,FE,前端,朱志洋,Vue,Angular,React,Node.js' },
      { hid: 'description', name: 'description', content: 'Jooger.me' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: '//api.jooger.me' },
      { rel: 'dns-prefetch', href: '//static.jooger.me' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: theme },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    'swiper/dist/css/swiper.css',
    "ionicons/dist/css/ionicons.css",
    "simple-line-icons/css/simple-line-icons.css",
    { src: '@/assets/stylus/index.styl', lang: 'stylus' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/router-hook.ts' },
    { src: '@/plugins/axios-interceptor.ts' },
    { src: '@/plugins/vue-addons.ts', ssr: false }
  ],

  router: {
    linkActiveClass: 'active'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '~/modules/typescript'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: isProd ? 'https://api.jooger.me' : 'http://localhost:3001',
    prefix: '/',
    https: isProd,
    debug: false,
    withCredentials: true,
    retry: { retries: 3 }
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    // publicPath: '/resource/',
    vendor: [
      'axios',
      'swiper',
      'vue-awesome-swiper',
      'bezier-easing',
      'nuxt-class-component',
      'vue-class-component',
      'vue-property-decorator',
      'vuex-class'
    ],
    // /*
    // ** You can extend webpack config here
    // */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
