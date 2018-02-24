/**
 * @desc Local storage
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import { isType } from './validate'

function checkValue (value) {
  return isType(value, 'String') ? value : JSON.stringify(value || {})
}

export const setSessionStorageItem = (key = '', value = '') => {
  key && window.sessionStorage.setItem(key, checkValue(value))
}

export const getSessionStorageItem = (key = '', format = false) => {
  let res = window.sessionStorage.getItem(key)
  if (format) {
    try {
      res = JSON.parse(res)
    } catch (err) {
      console.error(err)
    }
  }
  return res
}

export const removeSessionStorageItem = (key = '') => {
  key && window.sessionStorage.removeItem(key)
}

export const setLocalStorageItem = (key = '', value = '') => {
  key && window.localStorage.setItem(key, checkValue(value))
}

export const getLocalStorageItem = (key = '', format = false) => {
  let res = window.localStorage.getItem(key)
  if (format) {
    try {
      res = JSON.parse(res)
    } catch (err) {
      console.error(err)
    }
  }
  return res
}

export const removeLocalStorageItem = (key = '') => {
  key && window.localStorage.removeItem(key)
}
