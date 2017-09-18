/**
 * @desc app store module entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

const START_PAGE_LOADING = 'START_PAGE_LOADING'
const STOP_PAGE_LOADING = 'STOP_PAGE_LOADING'
const PAGE_LOADED = 'PAGE_LOADED'
const SET_OVERLAY = 'SET_OVERLAY'

export const state = () => ({
  page: {
    loading: false,
    loaded: false
  },
  overlay: false
})

export const getters = {
  page: state => state.page,
  showOverlay: state => state.overlay
}

export const mutations = {
  [START_PAGE_LOADING]: state => {
    state.page.loading = true
    state.page.loaded = false
  },
  [STOP_PAGE_LOADING]: state => (state.page.loading = false),
  [PAGE_LOADED]: state => (state.page.loaded = true),
  [SET_OVERLAY]: (state, show = false) => (state.overlay = show)
}
