/**
 * @desc 百度SEO推送
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

import { IS_PROD } from '@/config'

function push (href?: string) {
  const e = /([http|https]:\/\/[a-zA-Z0-9_.]+\.baidu\.com)/gi
  const r = href || window.location.href
  const t = document.referrer
  const curProtocol = window.location.protocol.split(':')[0]
  if (!e.test(r)) {
    let link = ''
    if (curProtocol === 'https') {
      link = 'https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif'
    } else {
      link = '//api.share.baidu.com/s.gif'
    }
    if (t) {
      link += '?r=' + encodeURIComponent(document.referrer)
      if (r) (link += '&l=' + r)
    } else {
      if (r) (link += '?l=' + r)
    }
    const i = new Image()
    i.src = link
  }
}

export default () => {
  if (process.client && IS_PROD) {
    window.addEventListener('load', () => push())
    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', to => {
        push(window.location.origin + to.fullPath)
      })
    })
  }
}
