import { USER_LIKE_KEY, USER_KEY } from '@/config'
import { isMobile, storage } from '@/utils'

export const actions = {
  async nuxtServerInit ({ commit, state, dispatch }, { params, route, req }) {
    const ua = process.server ? req.headers['user-agent'] : window.navigator.userAgent
    const mobileClient = isMobile(ua)
    if (mobileClient) {
      commit('app/SET_MOBILE_LAYOUT', true)
      commit('app/SET_ARTICLE_FONTSIZE', -2)
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
