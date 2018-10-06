import { USER_LIKE_KEY, USER_KEY, THEME_KEY } from '@/config'
import { isType, storage } from '@/utils'
import api from '@/api'
import { AppStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const SET_THEME = 'SET_THEME'
const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
const SET_FULL_COLUMN = 'SET_FULL_COLUMN'
const SET_HISTORY = 'SET_HISTORY'
const SET_USER = 'SET_USER'
const FETCH_SETTING = 'FETCH_SETTING'
const FETCH_HOT_LIST = 'FETCH_HOT_LIST'
const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST'
const FETCH_TAG_LIST = 'FETCH_TAG_LIST'
const SET_ARTICLE_FONTSIZE = 'SET_ARTICLE_FONTSIZE'
const SET_ARTICLE_TITLE_VISIBLE = 'SET_ARTICLE_TITLE_VISIBLE'

export const state = (): AppStateTree => ({
  theme: 'light',
  mobileLayout: false,
  fullScreen: false,
  fullColumn: false,
  history: {
    articles: [],
    comments: []
  },
  user: null,
  setting: null,
  categoryList: [],
  hotList: [],
  tagList: [],
  articleFontSize: 16,
  showArticleTitle: false
})

export const getters: Getters<AppStateTree, RootState> = {
  theme: state => state.theme,
  mobileLayout: state => state.mobileLayout,
  fullScreen: state => state.fullScreen,
  fullColumn: state => state.fullColumn,
  history: state => state.history,
  user: state => state.user,
  setting: state => state.setting,
  hotList: state => state.hotList,
  categoryList: state => state.categoryList,
  tagList: state => state.tagList,
  articleFontSize: state => state.articleFontSize,
  showArticleTitle: state => state.showArticleTitle
}

export const mutations: Mutations<AppStateTree> = {
  [SET_THEME]: (state, theme) => (state.theme = theme),
  [SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout),
  [SET_FULL_COLUMN]: (state, fullColumn) => (state.fullColumn = fullColumn),
  [SET_FULL_SCREEN]: (state, fullScreen) => (state.fullScreen = fullScreen),
  [SET_USER]: (state, user) => (state.user = user),
  [SET_ARTICLE_TITLE_VISIBLE]: (state, visible) => (state.showArticleTitle = visible),
  [SET_HISTORY]: (state, history: any = {}) => {
    const { articles, comments, articleId, commentId } = history
    if (articles && isType(articles, 'Array')) {
      state.history.articles = articles
    }
    if (comments && isType(comments, 'Array')) {
      state.history.comments = comments
    }
    if (articleId) state.history.articles.push(articleId)
    if (commentId) state.history.comments.push(commentId)
  },
  [FETCH_SETTING]: (state, data) => (state.setting = data),
  [FETCH_HOT_LIST]: (state, list) => (state.hotList = list),
  [FETCH_CATEGORY_LIST]: (state, list) => (state.categoryList = list),
  [FETCH_TAG_LIST]: (state, list) => (state.tagList = list),
  [SET_ARTICLE_FONTSIZE]: (state, diff) => {
    let size = state.articleFontSize + diff
    if (size < 12) size = 12
    if (size > 18) size = 18
    state.articleFontSize = size
  }
}

export const actions: Actions<AppStateTree, RootState> = {
  updateTheme ({ commit, state }, theme) {
    if (theme) {
      commit(SET_THEME, theme)
      storage.set(THEME_KEY, state.theme)
    }
  },
  updateHistory ({ commit, state }, history = {}) {
    commit(SET_HISTORY, history)
    storage.set(USER_LIKE_KEY, state.history)
  },
  updateUser ({ commit, state }, user = {}) {
    commit(SET_USER, user || null)
    if (user) {
      storage.set(USER_KEY, state.user)
    } else {
      storage.remove(USER_KEY)
    }
  },
  async getSettingData ({ commit }) {
    const { success, data } = await api.getSettingData()
    if (success) {
        commit(FETCH_SETTING, data)
    }
    return success
  },
  async getHotList ({ commit }) {
    const { success, data } = await api.getHotArticleList()
    if (success) {
        commit(FETCH_HOT_LIST, data)
    }
    return success
  },
  async getCategoryList ({ commit }) {
    const { success, data } = await api.getCategoryList()
    if (success) {
        commit(FETCH_CATEGORY_LIST, data)
    }
    return success
  },
  async getTagList ({ commit }) {
    const { success, data } = await api.getTagList()
    if (success) {
        commit(FETCH_TAG_LIST, data)
    }
    return success
  }
}
