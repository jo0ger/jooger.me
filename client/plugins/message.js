/**
 * @desc Vue message
 * @author Jooger <iamjooger@gmail.com>
 * @date 7 Jan 2018
 */

'use strict'

import Vue from 'vue'
import { Message } from '@/components/common'

export default () => {
  if (process.client) {
    Vue.prototype.$message = Message
  }
}
