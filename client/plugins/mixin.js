/**
 * @desc Vue Global mixins
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Dec 2017
 */

'use strict'

import Vue from 'vue'
import { getExtendsItemMixin } from '@/mixins'

const mixins = [
  // 过滤数据extends的mixin
  getExtendsItemMixin
]

export default () => {
  for (const i in mixins) {
    Vue.mixin(mixins[i])
  }
}
