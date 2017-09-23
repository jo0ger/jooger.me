/**
 * @desc 百度统计
 * @author Jooger <zzy1198258955@163.com>
 * @date 23 Sep 2017
 */

export default ({
  app,
  isClient
}) => {
  if (process.env.NODE_ENV === 'production' && isClient) {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?cb9683e3a9b2dbea389ab751f46873fc'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)

    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        if (window._hmt) {
          window._hmt.push(['_trackPageview', to.fullPath])
        }
      })
    })
  }
}