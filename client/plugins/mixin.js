/**
 * @desc Vue Global mixins
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Dec 2017
 */

'use strict'

import Vue from 'vue'
import {
  isType
} from '@/utils'

const mixins = [
  // 过滤extends的mixin
  {
    methods: {
      findExtendItemByKey (key = '', extend = []) {
        if (!key || !isType(key, 'String') || !isType(extend, 'Array') || !extend.length) {
          return null
        }
        const item = extend.find(item => item.key === key)
        return item ? item.value : null
      }
    }
  }
]

export default () => {
  for (const i in mixins) {
    Vue.mixin(mixins[i])
  }
}
