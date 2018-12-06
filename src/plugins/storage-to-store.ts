import { USER_LIKE_KEY, USER_KEY, THEME_KEY, FONT_SIZE_KEY } from '@/config'
import { storage, Cookies } from '@/utils'
import api from '@/api'

export default async ({ store }) => {
  if (process.client) {
    // 设置用户
    setUser(storage.get(USER_KEY) as WebApi.UserModule.User, store)
    // 设置本地历史数据缓存（文章点赞，评论点赞，留言点赞）
    store.commit('app/SET_HISTORY', storage.get(USER_LIKE_KEY) || {})
    // 设置主题缓存
    const theme = storage.get(THEME_KEY)
    if (theme) {
      setTimeout(() => {
        store.commit('app/SET_THEME', theme)
      }, 0)
    }
    // 设置字体大小缓存
    const fontSize = storage.get(FONT_SIZE_KEY)
    if (fontSize) {
      setTimeout(() => {
        store.dispatch('app/updateFontSize', fontSize)
      }, 0)
    }
  }
}

// 获取用户数据，并且校验当前是不是管理员账户
async function setUser (user: WebApi.UserModule.User, store) {
  const cookieUserId: string = Cookies.get('node-server_userid')
  const cookieToken: string = Cookies.get('node-server_token')
  let isAdmin = false
  if (!user) {
    if (cookieUserId) {
      const res = await api.getUser(cookieUserId)
      user = res.data
    }
  }
  if (cookieToken && cookieUserId && user._id === cookieUserId) {
    const res = await api.checkAdmin({
      userId: cookieUserId,
      token: cookieToken
    })
    isAdmin = res.data
  }
  store.commit('app/SET_USER', user)
  store.commit('app/SET_IS_ADMIN', isAdmin)
}
