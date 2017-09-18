/**
 * @desc tool
 * @author Jooger <zzy1198258955@163.com>
 * @date 8 Sep 2017
 */

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

export const getExtendItem = (obj = {}, key = '') => {
  if (typeof key === 'string') {
    key = [key]
  }
  const _extends = obj.extends
  if (_extends) {
    const extend = _extends.find(item => key.includes(item.key))
    return extend ? extend.value : ''
  }
  return ''
}

// 获取target的scroll top
export const getScroll = (target, top) => {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[top ? 'scrollTop' : 'scrollLeft']
  }
  return ret
}

// 获取element的offset
export const getOffset = element => {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docElem = window.document.body
  const clientTop = docElem.clientTop || 0
  const clientLeft = docElem.clientLeft || 0

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}
