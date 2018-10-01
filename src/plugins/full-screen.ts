import { getFullscreenElement } from '@/utils'

export default ({ store }) => {
  if (process.client) {
    const handler = document.onwebkitfullscreenchange
    document.onwebkitfullscreenchange = (e) => {
      if (handler) handler.call(null, e)
      const full = getFullscreenElement() !== undefined
      console.log(full)
      store.commit('app/SET_FULL_SCREEN', full)
    }
  }
}
