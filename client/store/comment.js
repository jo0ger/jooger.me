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
const CREATE_REQUEST = 'CREATE_REQUEST'
const CREATE_FAILURE = 'CREATE_FAILURE'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const SET_REPLY_TARGET = 'SET_REPLY_TARGET'

export const state = () => ({
  liking: false,
  creating: false,
  list: {
    fetching: false,
    data: [],
    pagination: {}
  },
  replyTarget: '' // 子评论中相互回复
})

export const getters = {
  creating: state => state.creating,
  liking: state => state.liking,
  listFetching: state => state.list.fetching,
  list: state => state.list.data,
  pagination: state => state.list.pagination,
  replyTarget: state => state.replyTarget
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
  },
  [LIKE_REQUEST]: state => (state.liking = true),
  [LIKE_FAILURE]: state => (state.liking = false),
  [LIKE_SUCCESS]: (state, id) => {
    state.liking = false
    const index = state.list.data.findIndex(item => item._id === id)
    if (index > -1) {
      const old = state.list.data[index]
      state.list.data.splice(index, 1, {
        ...old,
        ups: old.ups + 1
      })
    }
  },
  [CREATE_REQUEST]: state => (state.creating = true),
  [CREATE_FAILURE]: state => (state.creating = false),
  [CREATE_SUCCESS]: state => {
    state.creating = false
  },
  [SET_REPLY_TARGET]: (state, targetId = '') => {
    state.replyTarget = targetId
  }
}

export const actions = {
  async fetchList ({ commit, state }, params = {}) {
    if (state.list.fetching) {
      return
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await Service.comment.fetchList({ params }).catch(err => ((commit(FETCH_LIST_FAILURE, err), {})))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  },
  async like ({ commit, dispatch, state }, id) {
    commit(LIKE_REQUEST)
    const { success } = await Service.comment.like(id)().catch(err => ((commit(LIKE_FAILURE, err), {})))
    if (success) {
      commit(LIKE_SUCCESS, id)
      dispatch('app/updateHistory', { commentId: id }, { root: true })
    } else {
      commit(LIKE_FAILURE)
    }
    return success
  },
  async create ({ commit, state }, params = {}) {
    if (state.creating) {
      return
    }
    commit(CREATE_REQUEST)
    const { success } = await Service.comment.create({ data: params }).catch(err => ((commit(CREATE_FAILURE, err), {})))
    if (success) {
      commit(CREATE_SUCCESS)
    } else {
      commit(CREATE_FAILURE)
    }
    return success
  }
}
