/**
 * @desc 校验
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

import validator from 'validator'

export * from 'validator'

export const isType = (obj: object = {}, type: string | Array<string> = 'Object'): boolean => {
  if (!Array.isArray(type)) {
    type = [type]
  }
  return type.some(t => Object.prototype.toString.call(obj) === `[object ${t}]`)
}

export const isMobile = (ua: string = ''): boolean => {
  if (!ua && window) {
    ua = window.navigator.userAgent
  }
  if (ua) {
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(ua)
  }
  return false
}

/**
 * 校验是否是常用视频类型
 * @param {String} type
 */
export const isVideo = (type: string = ''): boolean => /\w+(.flv|.rvmb|.mp4|.avi|.wmv)$/.test(type)

export const isSiteUrl = (site: string = ''): boolean => validator.isURL(site, {
  protocols: ['http', 'https'],
  require_protocol: true
})

export const isEmptyObject = (obj: object = {}): boolean => {
  for (let key in obj) {
    return !1
  }
  return !0
}
