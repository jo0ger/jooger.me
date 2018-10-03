import dayjs from 'dayjs'
import {
  isType
} from './validate'

export const moment = dayjs

/* tslint:disable:no-empty */
export const noop = () => {}

export const capitalize = cached((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

export const isEmptyObject = (obj?: object) => {
  if (typeof obj !== 'object') {
    return false
  }
  /* eslint-disable */
  /* tslint:disable */
  for (let key in obj) {
    return false
  }
  return true
}

// 获取分辨率
export const detectResolution = (blobURL: string) => {
  return new Promise(resolve => {
    let img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.src = blobURL
  })
}

/**
 * 数据缓存
 * @param  {Function} fn
 * @example
 *  const match = cached((args) => { ... })
 *  match(args)
 */
export function cached(fn: Function) {
  const cache = Object.create(null)
  return function cachedFn(str: string, ...rest: any[]) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str, ...rest))
  }
}

/**
 * 过滤掉无效值，接口提交的时候可以用来过滤掉无效值
 * @param  {Array | Object} query={}
 */
export const processModel = (query: any = {}) => {
  const isArr = Array.isArray(query)
  if (isArr) {
    return query.filter(item => !['', undefined].includes(item))
  }
  return Object.keys(query).reduce((m, key) => {
    let val = query[key]
    // undefined和''不传入
    if (!['', undefined].includes(val)) {
      if (isType(val, 'Date')) {
        val = moment(val).format('YYYY-MM-DD HH:mm:ss')
      } else if (Array.isArray(val) || isType(val, 'Object')) {
        val = processModel(val)
      }
      m[key] = val
    }
    return m
  }, {})
}

export const findExtendsItem = (ext, key) => {
  if (!ext) return ''
  const hit = ext.find(item => item.key === key)
  return hit && hit.value || ''
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
      result = parseInt(time / 60.0 + '') + '分钟前'
    } else if (time >= 3600 && time < 24 * 3600) {
      result = parseInt(time / 3600.0 + '') + '小时前'
    } else if (time >= 24 * 3600 && time < 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0 + '') + '天前'
    } else if (time >= 30 * 24 * 3600 && time < 12 * 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0 / 30 + '') + '个月前'
    } else if (time >= 12 * 30 * 24 * 3600) {
      result = parseInt(time / 3600.0 / 24.0 / 30.0 / 12.0 + '') + '年前'
    } else if (time < 10) {
      result = '刚刚'
    } else {
      result = parseInt(time / 1.0 + '') + '秒前'
    }
  }
  return result
}
