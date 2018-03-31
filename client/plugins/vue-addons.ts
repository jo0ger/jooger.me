/**
 * @desc vue插件集合
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

const isProd = process.env.NODE_ENV === 'production'

export default () => {
  if ((process as any).client) {
    Vue.use(VueAwesomeSwiper)

    if (isProd) {
      const packageInfo = require('../../package.json')
      const Raven = require('raven-js')
      const RavenVue = require('raven-js/plugins/vue')
      Raven
        .config('https://b228741114824473baaeb21095102abf@sentry.io/285079', {
          release: packageInfo.version
        })
        .addPlugin(RavenVue, Vue)
        .install()
      window.Raven = Raven
    }
  }
}
