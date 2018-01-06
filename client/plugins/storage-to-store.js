/**
 * @desc 初始化本地store中的数据到vuex
 * @author Jooger <iamjooger@gmail.com>
 * @date 6 Jan 2018
 */

'use strict'

import config from '@@/app.config'
import { getLocalStorageItem } from '@/utils'

const isProd = process.env.NODE_ENV === 'production'

export default ({ store, isClient }) => {
  if (isClient) {
    return Promise.all([
      setHistory(store),
      setUserInfo(store)
    ])
  }
}

function setHistory (store) {
  const key = config.storage.userLikeKey
  let history = getLocalStorageItem(key)
  if (history) {
    try {
      history = { ...JSON.parse(history) }
    } catch (error) {
      if (!isProd) {
        console.warn('用户点赞历史记录初始化失败，err：', error)
      }
      return
    }
  }
  return store.dispatch('app/updateHistory', history || {})
}

function setUserInfo (store) {
  const key = config.storage.userKey
  let user = getLocalStorageItem(key)
  if (user) {
    try {
      user = { ...JSON.parse(user) }
    } catch (error) {
      if (!isProd) {
        console.warn('用户信息初始化失败，err：', error)
      }
      return
    }
  }
  return store.dispatch('auth/fetchUserInfo', user && user._id)
}
