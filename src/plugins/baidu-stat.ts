/**
 * @desc 百度统计
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 * @deprecated 已弃用
 */

import { IS_PROD } from '@/config'

export default () => {
  if (process.client && IS_PROD) {
    const hm = document.createElement('script')
    hm.src = '//hm.baidu.com/hm.js?cb9683e3a9b2dbea389ab751f46873fc'
    hm.async = !0
    const script = document.getElementsByTagName('script')[0]
    if (script && script.parentNode) {
      script.parentNode.insertBefore(hm, script)
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
