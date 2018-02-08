/**
 * @desc Tool
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

export const noop = function () {}

export const isEmptyObject = (obj = {}) => {
  for (let key in obj) {
    return !1
  }
  return !0
}

/**
 * 防抖函数，适用于输入框input的检索，屏幕的拖拽等
 * @param  {Function} fn                防抖回调
 * @param  {Number}   [delta=0]         回调触发时间
 * @param  {Boolean}  [immediate=false] 是否立即触发回调
 * @return {Function}                   防抖函数包装的函数
 */
export const debounce = (fn, delta = 0, immediate = false) => {
  let can = true
  let timer = null
  return function () {
    if (immediate) {
      if (can) {
        fn.call(this, ...arguments)
        can = false
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        can = true
        fn.call(this, ...arguments)
      }, parseInt(delta))
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
      }, parseInt(delta))
    }
  }
}

/* 将时间输出为统一的格式
 * @param fmt  yyyy-MM-dd hh:mm:ss:S q
 * @returns {*}
 */
export const fmtDate = (date, fmt = 'yyyy-MM-dd hh:mm') => {
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 将毫秒数转换为规定格式
 * @param  {[Number]} ms 毫秒数差值
 * @return {[String]}    规定格式结果
 */
export const fmtDateFromNow = ms => {
  const time = parseFloat(ms) / 1000
  let result = ''
  if (time) {
    if (time > 60 && time < 3600) {
      result = parseInt(time / 60.0) + '分钟前'
    } else if (time >= 3600 && time < 24 * 3600) {
      result = parseInt(time / 3600.0) + '小时前'
    } else if (time >= 24 * 3600 && time < 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0) + '天前'
    } else if (time >= 30 * 24 * 3600 && time < 12 * 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0 / 30) + '个月前'
    } else if (time >= 12 * 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0 / 30.0 / 12.0) + '年前'
    } else if (time < 10) {
      result = '刚刚'
    } else {
      result = parseInt(time / 1.0) + '秒前'
    }
  }
  return result
}

/**
 * Deep Copy
 * @param {Object | Array} out
 * @return {Object | Array} out
 * @usage deepCopy({}[, obj, obj2, ...]) | deepCopy([][, arr1, arr2, ...])
 */
export const deepCopy = function (out = {}) {
  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i]

    if (!obj) {
      continue
    }

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          out[key] = Array.isArray(obj[key]) ? [] : {}
          deepCopy(out[key], obj[key])
        } else {
          out[key] = obj[key]
        }
      }
    }
  }
  return out
}

export const fileToBase64 = (file = null) => {
  return new Promise((resolve, reject) => {
    if (!file || !(file instanceof File) || !FileReader) return ''
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onerror = err => {
      reject(err)
      reader = null
    }
    reader.onload = function (e) {
      resolve(this.result)
      reader = null
    }
  })
}
