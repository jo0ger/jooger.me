/**
 * @desc Image loader
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import Vue from 'vue'
import { isType } from '@/utils'

export default ({ isClient }) => {
  if (isClient) {
    Vue.prototype.$loadImg = loadImg
  }
}

function loadImg (url = '', opt = {}) {
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
  if (opt.crossOrigin) {
    img.setAttribute('crossOrigin', 'Anonymous')
  }
  img.src = url
  if (img.complete) {
    if (img[prop]) {
      success && success.call(img, img, url)
    } else {
      fail && fail.call(img, img, url)
    }
  } else {
    load && load()
    img.onload = success && success.bind(img, img, url)
    img.onerror = fail && fail.bind(img, new Error('Image load error'))
  }
}
