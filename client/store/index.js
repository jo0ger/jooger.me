/**
 * @desc store entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import { hasMobileUA } from '~/utils'

export const actions = {
  nuxtServerInit ({ commit, state, dispatch }, { params, route, isServer, req }) {
    const ua = isServer ? req.headers['user-agent'] : window.navigator.userAgent
    const isMobile = hasMobileUA(ua)
    if (isMobile) {
      commit('app/SET_MOBILE_LAYOUT', true)
    }
    const initTask = []
    initTask.push(...[
      dispatch('option/fetchData'),
      dispatch('me/fetchData')
    ])
    const ps = Promise.all(initTask).then(() => {
      const musicId = state.option.data.musicId
      if (musicId) {
        return dispatch('music/fetchList', musicId)
      }
      return new Promise()
    })
    return ps
  }
}
