/**
 * @desc 一些校验
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import validator from 'validator'

export * from 'validator'

/**
 * 类型检测
 * @param {*} obj 检测对象
 * @param {String | Array[String]} type 类型（数组）
 */
export const isType = (obj = {}, type = 'Object') => {
  if (!Array.isArray(type)) {
    type = [type]
  }
  return type.some(t => Object.prototype.toString.call(obj) === `[object ${t}]`)
}

export const isMobile = (ua = '') => {
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
export const isVideo = (type = '') => /\w+(.flv|.rvmb|.mp4|.avi|.wmv)$/.test(type)

export const isSiteUrl = (site = '') => validator.isURL(site, {
  protocols: ['http', 'https'],
  require_protocol: true
})
