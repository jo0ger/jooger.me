import { USER_LIKE_KEY, USER_KEY, THEME_KEY, FONT_SIZE_KEY } from '@/config'
import { storage, Cookies } from '@/utils'
import api from '@/api'

export default async ({ store }) => {
  if (process.client) {
    const localUser = storage.get(USER_KEY) as WebApi.UserModule.User
    store.commit('app/SET_USER', localUser)
    store.commit('app/SET_HISTORY', storage.get(USER_LIKE_KEY) || {})
    const theme = storage.get(THEME_KEY)
    if (theme) {
      setTimeout(() => {
        store.commit('app/SET_THEME', theme)
      }, 0)
    }
    const fontSize = storage.get(FONT_SIZE_KEY)
    if (fontSize) {
      setTimeout(() => {
        store.dispatch('app/updateFontSize', fontSize)
      }, 0)
    }

    checkAdmin(localUser, store)
  }
}

// 校验当前是不是管理员账户
async function checkAdmin (user: WebApi.UserModule.User, store) {
  const cookieUserId = Cookies.get('node-server_userid')
  const cookieToken = Cookies.get('node-server_token')
  console.log(cookieUserId, cookieToken)
  if (!cookieToken || !cookieUserId || user._id !== cookieUserId) return false
  const res = await api.checkAdmin({
    userId: cookieUserId,
    token: cookieToken
  })
  store.commit('app/SET_IS_ADMIN', res.data)
}
