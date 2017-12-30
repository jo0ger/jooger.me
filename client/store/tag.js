/**
 * @desc 标签数据
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Dec 2017
 */

'use strict'

import { api } from '@/services'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'

export const state = () => ({
  data: [],
  fetching: false
})

export const getters = {
  list: state => state.data,
  fetching: state => state.fetching
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, data) => {
    state.fetching = false
    state.data = data
  }
}

export const actions = {
  async fetchList ({ state, commit }) {
    if (state.fetching) {
      return
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await api.tag.fetchList().catch(err => ((commit(FETCH_LIST_FAILURE, err), {})))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  }
}
