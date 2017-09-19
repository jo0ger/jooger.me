/**
 * @desc Option mixin
 * @author Jooger <zzy1198258955@163.com>
 * @date 18 Sep 2017
 */

import Vue from 'vue'
import config from '~~/config'

const { client } = config

Vue.mixin({
  data () {
    return {
      option: client
    }
  }
})
