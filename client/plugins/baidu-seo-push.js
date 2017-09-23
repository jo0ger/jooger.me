/**
 * @desc 百度SEO推送
 * @author Jooger <zzy1198258955@163.com>
 * @date 23 Sep 2017
 */

function push (href) {
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
      r && (link += '&l=' + r)
    } else {
      r && (link += '?l=' + r)
    }
    const i = new Image()
    i.src = link
  }
}

export default ({app, isClient}) => {
  if (process.env.NODE_ENV === 'production' && isClient) {
    push()
    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        push(window.location.origin + to.fullPath)
      })
    })
  }
}
