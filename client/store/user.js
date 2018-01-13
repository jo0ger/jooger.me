/**
 * @desc User store module
 * @author Jooger <iamjooger@gmail.com>
 * @date 13 Jan 2018
 */

'use strict'

import { api } from '@/services'

const FETCH_GUESTS_REQUEST = 'FETCH_GUESTS_REQUEST'
const FETCH_GUESTS_SUCCESS = 'FETCH_GUESTS_SUCCESS'
const FETCH_GUESTS_FAILURE = 'FETCH_GUESTS_FAILURE'
const FETCH_BLOGGER_REQUEST = 'FETCH_BLOGGER_REQUEST'
const FETCH_BLOGGER_SUCCESS = 'FETCH_BLOGGER_SUCCESS'
const FETCH_BLOGGER_FAILURE = 'FETCH_BLOGGER_FAILURE'

export const state = () => ({
  blogger: {
    fetching: false,
    data: null
  },
  guests: {
    fetching: false,
    data: [],
    count: 0
  }
})

export const getters = {
  blogger: state => state.blogger.data || {},
  guests: state => state.guests.data,
  guestsFetching: state => state.guests.fetching,
  guestsCount: state => state.guests.count
}

export const mutations = {
  [FETCH_BLOGGER_REQUEST]: state => (state.blogger.fetching = true),
  [FETCH_BLOGGER_FAILURE]: state => (state.blogger.fetching = false),
  [FETCH_BLOGGER_SUCCESS]: (state, data) => {
    state.blogger.fetching = false
    state.blogger.data = data
  },
  [FETCH_GUESTS_REQUEST]: state => (state.guests.fetching = true),
  [FETCH_GUESTS_FAILURE]: state => (state.guests.fetching = false),
  [FETCH_GUESTS_SUCCESS]: (state, { list, total }) => {
    state.guests.fetching = false
    state.guests.data = list
    state.guests.count = total
  }
}

export const actions = {
  async fetchBlogger ({ state, commit }) {
    if (state.blogger.fetching) {
      return
    }
    commit(FETCH_BLOGGER_REQUEST)
    const { success, data } = await api.user.blogger().catch(err => ((commit(FETCH_BLOGGER_FAILURE, err), {})))
    if (success) {
      commit(FETCH_BLOGGER_SUCCESS, data)
    } else {
      commit(FETCH_BLOGGER_FAILURE)
    }
    return success
  },
  async fetchGuests ({ state, commit }) {
    console.log(state.guests.fetching)
    if (state.guests.fetching) {
      return
    }
    commit(FETCH_GUESTS_REQUEST)
    const { success, data } = await api.user.guests().catch(err => ((commit(FETCH_GUESTS_FAILURE, err), {})))
    if (success) {
      commit(FETCH_GUESTS_SUCCESS, data)
    } else {
      commit(FETCH_GUESTS_FAILURE)
    }
    return success
  }
}
