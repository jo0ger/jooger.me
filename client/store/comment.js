/**
 * @desc Comment store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 31 Oct 2017
 */

'use strict'

import Service from '~/service'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const LIKE_REQUEST = 'LIKE_REQUEST'
const LIKE_SUCCESS = 'LIKE_SUCCESS'
const LIKE_FAILURE = 'LIKE_FAILURE'
const CLEAR_LIST = 'CLEAR_LIST'

export const state = () => ({
  list: {
    fetching: false,
    data: [],
    pagination: {}
  }
})

export const getters = {
  listFetching: state => state.list.fetching,
  list: state => state.list.data,
  pagination: state => state.list.pagination
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.list.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.list.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, { list, pagination }) => {
    state.list.fetching = false
    state.list.data = list
    state.list.pagination = pagination
  },
  [CLEAR_LIST]: (state) => {
    state.list = {
      fetching: false,
      data: [],
      pagination: {}
    }
  }
}

export const actions = {
  async fetchList ({ commit, state }, articleId = '') {
    if (state.list.fetching) {
      return
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await Service.comment.fetchList({
      params: {
        article: articleId
      }
    }).catch(err => ((commit(FETCH_LIST_FAILURE, err), {})))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  },
  async like ({ commit, dispatch, state }, id) {
    commit(LIKE_REQUEST)
    const { success, data } = await Service.comment.like(id)().catch(err => ((commit(LIKE_FAILURE, err), {})))
    if (success) {
      commit(LIKE_SUCCESS, data)
      dispatch('app/updateHistory', { commentId: id }, { root: true })
    } else {
      commit(LIKE_FAILURE)
    }
    return success
  }
}
