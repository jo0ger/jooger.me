import { isMobile } from '@/utils'

export const actions = {
  async nuxtServerInit ({ commit, state, dispatch }, { params, route, req }) {
    const ua = process.server ? req.headers['user-agent'] : window.navigator.userAgent
    const mobileClient = isMobile(ua)
    if (mobileClient) {
      commit('app/SET_MOBILE_LAYOUT', true)
    }
    await dispatch('app/getSettingData')
    const initTask = [
      dispatch('app/getHotList'),
      dispatch('app/getCategoryList'),
      dispatch('app/getTagList'),
    ]
    return Promise.all(initTask)
  }
}
