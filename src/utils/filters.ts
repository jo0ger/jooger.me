import * as constant from './constant'
import { Constant } from './constant'
import { findExtendsItem, moment } from './share'

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
