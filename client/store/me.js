/**
 * @desc It's Me, my github info
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

import Service from '~/service'

const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST'
const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS'
const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE'

export const state = () => ({
  fetching: false,
  data: null
})

export const getters = {
  me: state => state.data || {}
}

export const mutations = {
  [FETCH_ME_REQUEST]: state => (state.fetching = true),
  [FETCH_ME_FAILURE]: state => (state.fetching = false),
  [FETCH_ME_SUCCESS]: (state, data) => {
    state.fetching = false
    state.data = data
  }
}

export const actions = {
  async fetchData ({ state, commit }) {
    if (state.fetching) {
      return
    }
    commit(FETCH_ME_REQUEST)
    const { success, data } = await Service.user.fetchMe().catch(err => ((commit(FETCH_ME_FAILURE, err), {})))
    if (success) {
      commit(FETCH_ME_SUCCESS, data)
    } else {
      commit(FETCH_ME_FAILURE)
    }
    return success
  }
}
