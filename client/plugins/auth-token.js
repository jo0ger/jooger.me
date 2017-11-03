/**
 * @desc Auth token
 * @author Jooger <zzy1198258955@163.com>
 * @date 1 Nov 2017
 */

'use strict'

import config from '~/config'
import { getLocalStorageItem } from '~/utils'

export default ({ store, isClient }) => {
  if (isClient) {
    const token = getLocalStorageItem(config.auth.githubTokenKey) || ''
    store.commit('auth/SET_TOKEN', token)
    store.dispatch('auth/fetchGithubInfo', token)
  }
}
