/**
 * @desc Article store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 18 Sep 2017
 */

import Service from '~/service'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const FETCH_DETAIL_REQUEST = 'FETCH_DETAIL_REQUEST'
const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS'
const FETCH_DETAIL_FAILURE = 'FETCH_DETAIL_FAILURE'
const CLEAR_DETAIL = 'CLEAR_DETAIL'

export const state = () => ({
  list: {
    fetching: false,
    data: [],
    pagination: {}
  },
  detail: {
    fetching: false,
    data: null
  }
})

export const getters = {
  list: state => state.list.data,
  listFetching: state => state.list.fetching,
  pagination: state => state.list.pagination,
  detail: state => state.detail.data,
  detailFetching: state => state.detail.fetching
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.list.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.list.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, { list, pagination }) => {
    state.list.fetching = false
    state.list.data = list
    state.list.pagination = pagination
  },
  [FETCH_DETAIL_REQUEST]: state => (state.detail.fetching = true),
  [FETCH_DETAIL_FAILURE]: state => (state.detail.fetching = false),
  [FETCH_DETAIL_SUCCESS]: (state, data) => {
    state.detail.fetching = false
    state.detail.data = data
  },
  [CLEAR_DETAIL]: state => {
    state.detail.fetching = false
    state.detail.data = null
  }
}

export const actions = {
  async fetchList ({ commit, state }, params = {}) {
    if (state.list.fetching) {
      return
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await Service.article.fetchList({ params }).catch(err => commit(FETCH_LIST_FAILURE, err))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  },
  async fetchDetail ({ commit, state }, id) {
    if (state.detail.fetching) {
      return
    }
    commit(FETCH_DETAIL_REQUEST)
    const { success, data } = await Service.article.fetchDetail(id)().catch(err => commit(FETCH_DETAIL_FAILURE, err))
    if (success) {
      commit(FETCH_DETAIL_SUCCESS, data)
    } else {
      commit(FETCH_DETAIL_FAILURE)
    }
    return success
  }
}
