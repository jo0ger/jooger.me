/**
 * @desc Auth token
 * @author Jooger <zzy1198258955@163.com>
 * @date 1 Nov 2017
 */

'use strict'

import Cookie from 'js-cookie'
import config from '~/config'
// import { setLocalStorageItem } from '~/utils'

export default ({ store, isClient }) => {
  if (isClient) {
    const token = Cookie.get(config.auth.authGithubTokenKey)
    // if (token) {
      // setLocalStorageItem(config.storage.userKey, token)
      // store.commit('auth/SET_TOKEN', token)
    store.dispatch('auth/fetchInfo', token)
    // }
  }
}
