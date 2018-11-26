import Vue from 'vue'
import { isType, noop } from '@/utils'

export default () => {
  if (process.client) {
    Vue.prototype.$loadImg = loadImg
  }
}

interface Option {
  success?: () => any
  fail?: () => any
  load?: () => any
  crossOrigin?: boolean
}

function loadImg (url = '', opt: Option = {}) {
  if (!isType(opt, 'Object')) {
    if (isType(opt, 'Function')) {
      opt = {
        success: opt as (() => any)
      }
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
      if (!!success) success.call(img, img, url)
    } else {
      _fail(opt, img, url)
    }
  } else {
    if (!!load) load()
    img.onload = success && success.bind(img, img, url)
    img.onerror = () => _fail(opt, img, url)
  }
}

function _fail (opt, img, url) {
  const fail = typeof opt.fail === 'function' ? opt.fail : noop
  fail.call(img, img, url)
}
