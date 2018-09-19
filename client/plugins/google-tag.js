'use strict'

import config from '@@/app.config'

function gtag () {
  window.dataLayer.push(arguments)
}

export default ({ app }) => {
  if (process.env.NODE_ENV === 'production' && process.client) {
    // Google tag分析脚本
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.gaTrackingId
    script.async = !0
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(script, s)

    window.dataLayer = window.dataLayer || []
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', config.gaTrackingId)

    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to, from) => {
        gtag('event', 'page_view', {
          send_to: config.gaTrackingId
        })
      })
    })
  }
}
