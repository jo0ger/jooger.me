/**
 * @desc Article store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 18 Sep 2017
 */

import Service from '~/service'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'

export const state = () => ({
  fetching: false,
  data: [],
  pagination: {}
})

export const getters = {
  list: state => state.data,
  fetching: state => state.fetching,
  pagination: state => state.pagination
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, { list, pagination }) => {
    state.fetching = false
    state.data = list
    state.pagination = pagination
  }
}

export const actions = {
  async fetchList ({ commit, state }, params = {}) {
    if (state.fetching) {
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
  }
}
