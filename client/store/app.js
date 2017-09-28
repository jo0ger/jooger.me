/**
 * @desc app store module entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_MOBILE_SIDEBAR = 'SET_MOBILE_SIDEBAR'
const SET_FETCH_LOADING = 'SET_FETCH_LOADING'
const SET_MENU = 'SET_MENU'
const SET_OVERLAY = 'SET_OVERLAY'
const SET_SEARCH = 'SET_SEARCH'
const SET_MUSIC = 'SET_MUSIC'
const SET_SEARCH_HEADER = 'SET_SEARCH_HEADER'

export const state = () => ({
  mobileLayout: false,
  mobileSidebar: false,
  fetchLoading: false,
  overlay: false,
  music: true,
  search: false,
  menu: false,
  searchHeader: {
    title: '',
    keyword: ''
  }
})

export const getters = {
  mobileLayout: state => state.mobileLayout,
  mobileSidebar: state => state.mobileSidebar,
  fetchLoading: state => state.fetchLoading,
  showMenu: state => state.menu,
  showOverlay: state => state.overlay,
  showSearch: state => state.search,
  showMusic: state => state.music,
  searchHeader: state => state.searchHeader
}

export const mutations = {
  [SET_MOBILE_LAYOUT]: (state, isMobile) => (state.mobileLayout = isMobile),
  [SET_MOBILE_SIDEBAR]: (state, show) => (state.mobileSidebar = show),
  [SET_FETCH_LOADING]: (state, loading) => (state.fetchLoading = loading),
  [SET_MENU]: (state, show = false) => (state.menu = show),
  [SET_OVERLAY]: (state, show = false) => (state.overlay = show),
  [SET_SEARCH]: (state, show = false) => (state.search = show),
  [SET_MUSIC]: (state, show = false) => (state.music = show),
  [SET_SEARCH_HEADER]: (state, { title = '', keyword = '' }) => {
    state.searchHeader.title = title
    state.searchHeader.keyword = keyword
  }
}
