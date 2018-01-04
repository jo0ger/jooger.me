/**
 * @desc 评论数据
 * @author Jooger <iamjooger@gmail.com>
 * @date 5 Jan 2018
 */

'use strict'

import { api } from '@/services'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const CHANGE_SORT = 'CHANGE_SORT'
const CLEAR_LIST = 'CLEAR_LIST'

export const state = () => ({
  // 默认最新评论
  sort: {
    by: 'createdAt',
    order: -1
  },
  list: {
    fetching: false,
    data: [],
    pagination: {}
  }
})

export const getters = {
  sort: state => state.sort,
  list: state => state.list.data,
  listFetching: state => state.list.fetching,
  pagination: state => state.list.pagination
}

export const mutations = {
  [FETCH_LIST_REQUEST]: state => (state.list.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.list.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, { list = [], pagination }) => {
    state.list.fetching = false
    if (pagination.current_page === 1) {
      state.list.data = list
    } else {
      state.list.data.push(...list)
    }
    state.list.pagination = pagination
  },
  [CLEAR_LIST]: state => {
    state.list = {
      fetching: false,
      data: [],
      pagination: {}
    }
  },
  [CHANGE_SORT]: (state, sort = {}) => {
    if (sort.by) {
      state.sort.by = sort.by
    }
    if (sort.order) {
      state.sort.order = sort.order
    }
  }
}

export const actions = {
  async fetchList ({ commit, state }, params = {}) {
    if (state.list.fetching) {
      return
    }
    const args = {
      page: params.page
    }
    if (args.page === undefined) {
      args.page = ~~state.list.pagination.current_page + 1
    }
    args.sort_by = state.sort.by
    args.order = state.sort.order
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await api.comment.fetchList({ params: Object.assign({}, params, args) }).catch(err => ((commit(FETCH_LIST_FAILURE, err), {})))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  }
}
