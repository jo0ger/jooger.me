/**
 * @desc Image loader
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import Vue from 'vue'
import { isType, noop } from '@/utils'

export default () => {
  if (process.client) {
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
      _fail(opt, img, url)
    }
  } else {
    load && load()
    img.onload = success && success.bind(img, img, url)
    img.onerror = () => _fail(opt, img, url)
  }
}

function _fail (opt, img, url, err) {
  const fail = typeof opt.fail === 'function' ? opt.fail : noop
  fail.call(img, img, url)
  reportError(`图片加载失败 ${url}`, url)
}

function reportError (msg, url) {
  window.Raven && Raven && Raven.captureMessage(msg, {
    level: 'warning',
    logger: '图片加载',
    extra: {
      type: 'get',
      url
    }
  })
}
