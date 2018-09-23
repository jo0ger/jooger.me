import { USER_LIKE_KEY } from '@/config'
import { isType, storage } from '@/utils'
import api from '@/api'
import { AppStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_HISTORY = 'SET_HISTORY'
const FETCH_SETTING = 'FETCH_SETTING'
const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST'

export const state = (): AppStateTree => ({
  mobileLayout: false,
  history: {
    articles: [],
    comments: []
  },
  setting: null,
  categoryList: []
})

export const getters: Getters<AppStateTree, RootState> = {
  mobileLayout: state => state.mobileLayout,
  history: state => state.history,
  setting: state => state.setting,
  categoryList: state => state.categoryList
}

export const mutations: Mutations<AppStateTree> = {
  [SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout),
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
  [FETCH_CATEGORY_LIST]: (state, list) => (state.categoryList = list)
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
  async getCategoryList ({ commit }) {
    const { success, data } = await api.getCategoryList()
    if (success) {
        commit(FETCH_CATEGORY_LIST, data)
    }
    return success
  }
}
