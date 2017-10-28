/**
 * @desc ImagePopup entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 20 Sep 2017
 */

import Vue from 'vue'
import popOption from './index.vue'
import { isType } from '@/utils'

const PopConstructor = Vue.extend(popOption)

let instance = null

export default {
  open (url = '') {
    if (!url || !isType(url, 'String')) {
      return
    }
    instance = new PopConstructor({
      data: {
        src: url
      }
    }).$mount()
    instance.open()
  },
  close () {
    instance && instance.close()
    instance = null
  }
}
