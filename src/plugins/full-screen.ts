import { getFullscreenElement } from '@/utils'

export default ({ store }) => {
  if (process.client) {
    const handler = document.onfullscreenchange
    document.onfullscreenchange = e => {
      if (handler) handler.call(null, e)
      const full = getFullscreenElement() !== undefined
      store.commit('app/SET_FULL_SCREEN', full)
    }
  }
}
