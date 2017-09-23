/**
 * @desc Google Analytics
 * @author Jooger <zzy1198258955@163.com>
 * @date 23 Sep 2017
 */

export default ({
  app,
  isClient
}) => {
  if (process.env.NODE_ENV === 'production' && isClient) {
    // Google 统计分析脚本
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }
      i[r].l = 1 * new Date()
      a = s.createElement(o)
      m = s.getElementsByTagName(o)[0]
      a.async = 1
      a.src = g
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

    window.ga('create', 'UA-106909754-1', 'auto')
    window.ga('send', 'pageview')

    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        if (window.ga) {
          window.ga('set', 'page', to.fullPath)
          window.ga('send', 'pageview')
        }
      })
    })
  }
}
