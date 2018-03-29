/**
 * @desc Store entrance
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

import { isMobile } from '../utils/index'

export const actions = {
  nuxtServerInit ({ commit, state, dispatch }, { params, route, req }) {
    const ua = (process as any).server ? req.headers['user-agent'] : window.navigator.userAgent
    const mobileClient = isMobile(ua)
    if (mobileClient) {
      commit('app/SET_MOBILE_LAYOUT', true)
    }
    return Promise.resolve()
  }
}
