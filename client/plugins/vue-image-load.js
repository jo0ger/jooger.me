/**
 * @desc Image Load
 * @author Jooger <zzy1198258955@163.com>
 * @date 18 Sep 2017
 */

import Vue from 'vue'
import { isType } from '~/utils'

Vue.prototype.$imgLoad = imgLoad

function imgLoad (url = '', opt = {}) {
  if (!isType(opt, 'Object')) {
    if (isType(opt, 'Function')) {
      opt = { success: opt }
    } else {
      opt = {}
    }
  }
  const { success, fail, load } = opt
  if (!url || !isType(url, 'String')) {
    return fail && fail()
  }
  const img = new Image()
  const prop = isType(img.naturalWidth, 'Undefined') ? 'width' : 'naturalWidth'
  img.src = url
  if (img.complete) {
    if (img[prop]) {
      success && success.call(img, url)
    } else {
      fail && fail.call(img, url)
    }
  } else {
    load && load()
    img.onload = success && success.bind(img, url)
    img.onerror = fail && fail.bind(img, url)
  }
}
