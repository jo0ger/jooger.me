/**
 * @desc Sentry
 */

import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import { IS_PROD } from '@/config'

export default () => {
  if (process.client && IS_PROD) {
    const packageInfo = require('../../package.json')
    Raven
      .config('https://b228741114824473baaeb21095102abf@sentry.io/285079', {
        release: packageInfo.version
      })
      .addPlugin(RavenVue, Vue)
      .install()
  }
}
