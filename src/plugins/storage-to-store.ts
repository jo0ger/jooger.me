import { USER_LIKE_KEY, USER_KEY, THEME_KEY } from '@/config'
import { storage } from '@/utils'

export default ({ store }) => {
  if (process.client) {
    store.commit('app/SET_USER', storage.get(USER_KEY))
    store.commit('app/SET_HISTORY', storage.get(USER_LIKE_KEY) || {})
    const theme = storage.get(THEME_KEY)
    if (theme) {
      setTimeout(() => {
        store.commit('app/SET_THEME', storage.get(THEME_KEY))
      }, 0)
    }
  }
}
