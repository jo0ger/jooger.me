/**
 * @desc Music store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 28 Sep 2017
 */

'use strict'

import Service from '~/service'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const state = () => ({
  list: {
    fetching: false,
    data: []
  }
})

export const getters = {
  listFetching: state => state.list.fetching,
  list: state => state.list.data
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.list.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.list.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, data) => {
    state.list.data = data
    state.list.fetching = false
  },
  [REMOVE_ITEM]: (state, index = 0) => {
    state.list.splice(index, 1)
  }
}

export const actions = {
  async fetchList ({ commit, state }) {
    if (state.list.fetching) {
      return
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await Service.music.fetchList().catch(err => ((commit(FETCH_LIST_FAILURE, err), {})))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  }
}
