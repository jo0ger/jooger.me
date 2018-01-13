/**
 * @desc Store entrance
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import { isMobile } from '@/utils'

export const actions = {
  nuxtServerInit ({ commit, state, dispatch }, { params, route, req }) {
    const ua = process.server ? req.headers['user-agent'] : window.navigator.userAgent
    const mobileClient = isMobile(ua)
    if (mobileClient) {
      commit('app/SET_MOBILE_LAYOUT', true)
    }
    const initTask = []
    initTask.push(
      dispatch('option/fetchData'),
      dispatch('user/fetchBlogger'),
      dispatch('user/fetchGuests'),
      dispatch('article/fetchHotList'),
      dispatch('category/fetchList'),
      dispatch('tag/fetchList')
    )
    return Promise.all(initTask)
  }
}
