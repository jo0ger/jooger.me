/**
 * @desc Auth store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 31 Oct 2017
 */

'use strict'

import config from '~/config'
import Service from '~/service'
import { setLocalStorageItem } from '~/utils'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const CLEAR_INFO = 'CLEAR_INFO'
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const FETCH_INFO_REQUEST = 'FETCH_INFO_REQUEST'
const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE'
const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS'
const SET_TOKEN = 'SET_TOKEN'

export const state = () => ({
  loading: false,
  info: null,
  token: null
})

export const getters = {
  loading: state => state.loading,
  info: state => state.info,
  token: state => state.token,
  isLogin: state => !!state.token
}

export const mutations = {
  [LOGIN_REQUEST]: state => (state.loading = true),
  [LOGIN_FAILURE]: state => (state.loading = false),
  [LOGIN_SUCCESS]: (state, token) => {
    state.loading = false
    state.token = token
  },
  [CLEAR_INFO]: state => {
    state.info = null
    state.token = ''
    state.loading = false
  },
  [LOGOUT_REQUEST]: state => (state.loading = true),
  [LOGOUT_FAILURE]: state => (state.loading = false),
  [LOGOUT_SUCCESS]: state => (state.loading = false),
  [FETCH_INFO_REQUEST]: state => (state.loading = true),
  [FETCH_INFO_FAILURE]: state => {
    state.loading = false
    state.token = ''
    state.info = null
  },
  [FETCH_INFO_SUCCESS]: (state, { token, info }) => {
    state.loading = false
    state.info = info
    state.token = token
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token
  }
}

export const actions = {
  async login ({ commit, state }) {
    if (state.loading) {
      return
    }
    let url = `${config.service.baseURL}/auth/github/login?redirectUrl=${window.encodeURIComponent(window.location.href)}`
    window.location.href = url
  },
  async fetchInfo ({commit, state}, token) {
    if (state.loading || !token) {
      return
    }
    const { success, data } = await Service.auth.getInfo({
      params: { token }
    }).catch(err => {
      commit(FETCH_INFO_FAILURE, err)
      return {}
    })
    if (success) {
      commit(FETCH_INFO_SUCCESS, data)
    } else {
      commit(FETCH_INFO_FAILURE)
    }
    return success
  }
}
