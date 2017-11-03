/**
 * @desc Url query
 * @author Jooger <zzy1198258955@163.com>
 * @date 2 Nov 2017
 */

'use strict'

export const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}
