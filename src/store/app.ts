import { USER_LIKE_KEY, USER_KEY, THEME_KEY, FONT_SIZE_KEY } from '@/config'
import { isType, storage } from '@/utils'
import api from '@/api'
import { AppStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const SET_THEME = 'SET_THEME'
const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
const SET_FULL_COLUMN = 'SET_FULL_COLUMN'
const SET_HISTORY = 'SET_HISTORY'
const SET_USER = 'SET_USER'
const SET_IS_ADMIN = 'SET_IS_ADMIN'
const FETCH_SETTING = 'FETCH_SETTING'
const FETCH_VOICE = 'FETCH_VOICE'
const FETCH_MOMENT = 'FETCH_MOMENT'
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
  isAdmin: false,
  setting: null,
  voice: {
    text: '',
    author: '',
    source: ''
  },
  moment: [],
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
  isAdmin: state => state.isAdmin,
  setting: state => state.setting,
  voice: state => state.voice,
  moment: state => state.moment,
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
  [SET_IS_ADMIN]: (state, isAdmin) => (state.isAdmin = isAdmin),
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
  [FETCH_VOICE]: (state, voice) => (state.voice = voice),
  [FETCH_MOMENT]: (state, moment) => (state.moment = moment),
  [FETCH_HOT_LIST]: (state, list) => (state.hotList = list),
  [FETCH_CATEGORY_LIST]: (state, list) => (state.categoryList = list),
  [FETCH_TAG_LIST]: (state, list) => (state.tagList = list),
  [SET_ARTICLE_FONTSIZE]: (state, size) => (state.articleFontSize = size)
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
  updateFontSize ({ commit, state }, fontSize) {
    if (fontSize) {
      if (fontSize < 12) {
        fontSize = 12
        window.Message.info(`已经是最小${fontSize}号字体了`)
      } else if (fontSize > 18) {
        fontSize = 18
        window.Message.info(`已经是最大${fontSize}号字体了`)
      }
      commit(SET_ARTICLE_FONTSIZE, fontSize)
      storage.set(FONT_SIZE_KEY, state.articleFontSize)
    }
  },
  async getSettingData ({ commit }) {
    const { success, data } = await api.getSettingData()
    if (success) {
        commit(FETCH_SETTING, data)
    }
    return success
  },
  async getVoice ({ commit }) {
    const { success, data } = await api.getVoice()
    if (success) {
        commit(FETCH_VOICE, data)
    }
    return success
  },
  async getMoments ({ commit }) {
    const { success, data } = await api.getMoments()
    if (success) {
        commit(FETCH_MOMENT, data.list)
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
