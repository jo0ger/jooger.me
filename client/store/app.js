/**
 * @desc app store module entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import config from '~/config'
import { setLocalStorageItem, isType } from '~/utils'

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_FETCH_LOADING = 'SET_FETCH_LOADING'
const SET_MENU = 'SET_MENU'
const SET_OVERLAY = 'SET_OVERLAY'
const SET_SEARCH = 'SET_SEARCH'
const SET_SEARCH_HEADER = 'SET_SEARCH_HEADER'
const SET_MUSIC = 'SET_MUSIC'
const SET_MUSIC_PLAY = 'SET_MUSIC_PLAY'
const SET_HISTORY = 'SET_HISTORY'
const SET_SHARE_BOX = 'SET_SHARE_BOX'
const SET_MOBILE_COMMENT_EDITOR = 'SET_MOBILE_COMMENT_EDITOR'
const SET_MOBILE_COMMENT_CHILD_LIST = 'SET_MOBILE_COMMENT_CHILD_LIST'

export const state = () => ({
  mobileLayout: false,
  fetchLoading: false,
  overlay: false,
  search: false,
  menu: false,
  searchHeader: {
    title: '',
    keyword: ''
  },
  music: {
    show: false,
    playing: false
  },
  history: {
    articles: [],
    comments: []
  },
  sharebox: false,
  mobileCommentEditor: false,
  mobileCommentChildList: false
})

export const getters = {
  mobileLayout: state => state.mobileLayout,
  fetchLoading: state => state.fetchLoading,
  searchHeader: state => state.searchHeader,
  showMenu: state => state.menu,
  showOverlay: state => state.overlay,
  showSearch: state => state.search,
  showMusic: state => state.music.show,
  musicPlaying: state => state.music.playing,
  history: state => state.history,
  sharebox: state => state.sharebox,
  mobileCommentEditor: state => state.mobileCommentEditor,
  mobileCommentChildList: state => state.mobileCommentChildList
}

export const mutations = {
  [SET_MOBILE_LAYOUT]: (state, isMobile) => (state.mobileLayout = isMobile),
  [SET_FETCH_LOADING]: (state, loading) => (state.fetchLoading = loading),
  [SET_MENU]: (state, show = false) => {
    state.menu = show
    state.overlay = false
    if (show) {
      state.search = false
      state.sharebox = false
      state.music.show = false
    }
  },
  [SET_OVERLAY]: (state, show = false) => (state.overlay = show),
  [SET_SEARCH]: (state, show = false) => {
    state.search = state.overlay = show
    if (show) {
      state.menu = false
      state.sharebox = false
      state.music.show = false
    }
  },
  [SET_SEARCH_HEADER]: (state, { title = '', keyword = '' }) => {
    state.searchHeader.title = title
    state.searchHeader.keyword = keyword
  },
  [SET_MUSIC]: (state, show = false) => {
    state.music.show = show
    if (show) {
      state.overlay = false
      state.menu = false
      state.sharebox = false
      state.search = false
    }
  },
  [SET_MUSIC_PLAY]: (state, playing = false) => (state.music.playing = playing),
  [SET_HISTORY]: (state, history = {}) => {
    const { articles, comments, articleId, commentId } = history
    if (articles && isType(articles, 'Array')) {
      state.history.articles = articles
    }
    if (comments && isType(comments, 'Array')) {
      state.history.comments = comments
    }
    articleId && (state.history.articles.push(articleId))
    commentId && (state.history.comments.push(commentId))
  },
  [SET_SHARE_BOX]: (state, show = false) => {
    state.sharebox = state.overlay = show
    if (show) {
      state.menu = false
      state.search = false
      state.music.show = false
    }
  },
  [SET_MOBILE_COMMENT_EDITOR]: (state, show = false) => {
    state.mobileCommentEditor = show
    if (show) {
      state.overlay = false
      state.menu = false
      state.search = false
      state.sharebox = false
    }
  },
  [SET_MOBILE_COMMENT_CHILD_LIST]: (state, show = false) => {
    state.mobileCommentChildList = show
    if (show) {
      state.menu = false
      state.search = false
      state.sharebox = false
    }
  }
}

export const actions = {
  updateHistory ({ commit, state }, history = {}) {
    commit(SET_HISTORY, history)
    setLocalStorageItem(config.storage.userLikeKey, JSON.stringify(state.history))
  }
}
