/**
 * @desc 百度统计
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

import { IS_PROD } from '@/config'

export default () => {
  if (process.client && IS_PROD) {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?cb9683e3a9b2dbea389ab751f46873fc'
    const s = document.getElementsByTagName('script')[0]
    if (s && s.parentNode) {
      s.parentNode.insertBefore(hm, s)
    }

    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        if (window._hmt) {
          window._hmt.push(['_trackPageview', to.fullPath])
        }
      })
    })
  }
}
