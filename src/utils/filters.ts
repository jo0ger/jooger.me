import * as constant from './constant'
import { Constant } from './constant'
import { findExtendsItem, moment, fmtDateFromNow } from './share'

/**
 * 常量的filter
 * @example
 *  {{ value | constantFilter('AOI_STATUS') }}
 */
export const constantFilter = (value: any, key: string) => {
    const match = (constant as Constant)[key]
    let hit: any = null
    if (match) {
        hit = match.find((item) => item.value === value)
    }
    return hit && hit.label || value
}

export const extendsFilter = findExtendsItem

export const dateFormat = (val: any, format: string = 'YYYY-MM-DD HH:mm') => {
    return moment(val).format(format)
}

/**
 * filter 获取根据规定格式获取time到当前时刻的时间
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export const getDateFromNow = (time = new Date()) => fmtDateFromNow(new Date().valueOf() - new Date(time).valueOf())

export const countFilter = (num: number = 0, limit: number = 999) => {
  if (num > limit) {
    return limit + '+'
  }
  return num + ''
}
