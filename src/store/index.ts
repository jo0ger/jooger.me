import { isMobile } from '@/utils'

export const actions = {
  nuxtServerInit ({ commit, state, dispatch }, { params, route, req }) {
    const ua = process.server ? req.headers['user-agent'] : window.navigator.userAgent
    const mobileClient = isMobile(ua)
    if (mobileClient) {
      commit('app/SET_MOBILE_LAYOUT', true)
    }
    const initTask = []
    initTask.push()
    return Promise.all(initTask)
  }
}