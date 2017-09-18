/**
 * @desc app store module entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

const START_PAGE_LOADING = 'START_PAGE_LOADING'
const STOP_PAGE_LOADING = 'STOP_PAGE_LOADING'
const SET_OVERLAY = 'SET_OVERLAY'
const SET_SEARCH = 'SET_SEARCH'

export const state = () => ({
  pageLoading: false,
  overlay: false,
  search: false
})

export const getters = {
  pageLoading: state => state.pageLoading,
  showOverlay: state => state.overlay,
  showSearch: state => state.search
}

export const mutations = {
  [START_PAGE_LOADING]: state => {
    state.pageLoading = true
  },
  [STOP_PAGE_LOADING]: state => (state.pageLoading = false),
  [SET_OVERLAY]: (state, show = false) => (state.overlay = show),
  [SET_SEARCH]: (state, show = false) => (state.search = show)
}
