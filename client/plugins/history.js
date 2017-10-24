/**
 * @desc 初始化文章及评论的本地点赞历史
 * @author Jooger <zzy1198258955@163.com>
 * @date 24 Oct 2017
 */

'use strict'

import config from '~/config'
import { getLocalStorageItem } from '~/utils'

export default ({ store, isClient }) => {
  if (isClient) {
    const key = config.storage.userLikeKey
    let history = getLocalStorageItem(key)
    if (history) {
      try {
        history = { ...JSON.parse(history) }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('用户点赞历史记录初始化失败，err：', error)
        }
        return
      }
    }
    store.dispatch('app/updateHistory', history || {})
  }
}
