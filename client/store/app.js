/**
 * @desc 一些全局数据
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import config from '@@/app.config'
import { isType, setLocalStorageItem } from '@/utils'

const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'
const SET_HISTORY = 'SET_HISTORY'

export const state = () => ({
  mobileLayout: false,
  history: {
    articles: [],
    comments: []
  }
})

export const getters = {
  mobileLayout: state => state.mobileLayout,
  history: state => state.history
}

export const mutations = {
  [SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout),
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
  }
}

export const actions = {
  updateHistory ({ commit, state }, history = {}) {
    commit(SET_HISTORY, history)
    setLocalStorageItem(config.storage.userLikeKey, JSON.stringify(state.history))
  }
}
