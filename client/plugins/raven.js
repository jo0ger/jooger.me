/**
 * @desc 分享
 * @author Jooger <iamjooger@gmail.com>
 * @date 13 Jan 2018
 */

'use strict'

import Vue from 'vue'

const isProd = process.env.NODE_ENV === 'production'

export default ({ route }) => {
  if (process.client && isProd) {
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
