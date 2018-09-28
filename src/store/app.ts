import { USER_LIKE_KEY } from '@/config'
import { isType, storage } from '@/utils'
import api from '@/api'
import { AppStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_FULL_COLUMN = 'SET_FULL_COLUMN'
const SET_HISTORY = 'SET_HISTORY'
const FETCH_SETTING = 'FETCH_SETTING'
const FETCH_HOT_LIST = 'FETCH_HOT_LIST'
const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST'
const FETCH_TAG_LIST = 'FETCH_TAG_LIST'
const SET_ARTICLE_FONTSIZE = 'SET_ARTICLE_FONTSIZE'

export const state = (): AppStateTree => ({
  mobileLayout: false,
  fullColumn: false,
  history: {
    articles: [],
    comments: []
  },
  setting: null,
  categoryList: [],
  hotList: [],
  tagList: [],
  articleFontSize: 16
})

export const getters: Getters<AppStateTree, RootState> = {
  mobileLayout: state => state.mobileLayout,
  fullColumn: state => state.fullColumn,
  history: state => state.history,
  setting: state => state.setting,
  hotList: state => state.hotList,
  categoryList: state => state.categoryList,
  tagList: state => state.tagList,
  articleFontSize: state => state.articleFontSize
}

export const mutations: Mutations<AppStateTree> = {
  [SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout),
  [SET_FULL_COLUMN]: (state, fullColumn) => (state.fullColumn = fullColumn),
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
  updateHistory ({ commit, state }, history = {}) {
    commit(SET_HISTORY, history)
    storage.set(USER_LIKE_KEY, JSON.stringify(state.history))
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
