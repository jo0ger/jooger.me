/**
 * @desc Auth store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 31 Oct 2017
 */

'use strict'

import config from '~/config'
import Service from '~/service'
import { setLocalStorageItem, removeLocalStorageItem } from '~/utils'

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
  loading: true,
  info: {},
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
    state.info = {}
    state.loading = false
  },
  [LOGOUT_REQUEST]: state => (state.loading = true),
  [LOGOUT_FAILURE]: state => (state.loading = false),
  [LOGOUT_SUCCESS]: state => (state.loading = false),
  [FETCH_INFO_REQUEST]: state => (state.loading = true),
  [FETCH_INFO_FAILURE]: state => {
    state.loading = false
    state.info = {}
    state.token = null
  },
  [FETCH_INFO_SUCCESS]: (state, info) => {
    state.loading = false
    state.info = info
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token
  }
}

export const actions = {
  async githubLogin ({ commit, state, dispatch }, code) {
    if (state.loading) {
      return
    }
    const { success, data } = await Service.auth.getGithubToken({
      params: { code }
    }).catch(err => {
      commit(LOGIN_FAILURE, err)
      return {}
    })
    if (success) {
      const token = data.access_token
      commit(LOGIN_SUCCESS, token)
      alert(token)
      setLocalStorageItem(config.auth.githubTokenKey, token)
    } else {
      commit(LOGIN_FAILURE)
    }
  },
  async fetchGithubInfo ({commit, state}, token) {
    if (!token) {
      commit(FETCH_INFO_FAILURE)
      return
    }
    const { success, data } = await Service.auth.getGithubUser({
      params: { access_token: token }
    }).catch(err => {
      commit(FETCH_INFO_FAILURE, err)
      return {}
    })
    if (success) {
      commit(FETCH_INFO_SUCCESS, data)
      commit(SET_TOKEN, token)
      setLocalStorageItem(config.auth.githubTokenKey, token)
    } else {
      commit(FETCH_INFO_FAILURE)
    }
    return success
  },
  githubLogout ({ commit, state }) {
    if (state.loading) {
      return
    }
    commit(CLEAR_INFO)
    commit(SET_TOKEN, null)
    removeLocalStorageItem(config.auth.githubTokenKey)
  }
}
