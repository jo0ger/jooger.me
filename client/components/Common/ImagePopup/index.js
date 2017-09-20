/**
 * @desc ImagePopup entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 20 Sep 2017
 */

import Vue from 'vue'
import popOption from './index.vue'

const PopConstructor = Vue.extend(popOption)

let instance = null

export default {
  open (elem = null) {
    if (!elem || elem.nodeType !== 1 || elem.tagName !== 'IMG') {
      return
    }
    instance = new PopConstructor({
      data: {
        src: elem.src,
        elem
      }
    }).$mount()
    instance.open()
  },
  close () {
    instance && instance.close()
    instance = null
  }
}
