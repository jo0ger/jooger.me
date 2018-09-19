import { USER_LIKE_KEY } from '@/config'
import { isType, storage } from '@/utils'
import { StateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_HISTORY = 'SET_HISTORY'

interface State extends StateTree {
  mobileLayout: boolean
  history: {
    articles: string[]
    comments: string[]
  }
}

export const state = (): State => ({
  mobileLayout: false,
  history: {
    articles: [],
    comments: []
  }
})

export const getters: Getters<State, RootState> = {
  mobileLayout: state => state.mobileLayout,
  history: state => state.history
}

export const mutations: Mutations<State> = {
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
  }
}

export const actions: Actions<State, RootState> = {
  updateHistory ({ commit, state }, history = {}) {
    commit(SET_HISTORY, history)
    storage.set(USER_LIKE_KEY, JSON.stringify(state.history))
  }
}
