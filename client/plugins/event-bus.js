/**
 * @desc Event Bus
 * @author Jooger <iamjooger@gmail.com>
 * @date 2 Jan 2018
 */

'use strict'

import Vue from 'vue'
import { musicPlayerMixin } from '@/mixins'

export default () => {
  Vue.prototype.$eventBus = new Vue({
    mixins: [musicPlayerMixin]
  })
}
