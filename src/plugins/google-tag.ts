import { GA_TRACK_ID, IS_PROD } from '@/config'
import { noop } from '@/utils'

function gtag (...args: any[]) {
  window.dataLayer.push(arguments)
}

function gtagEvent (...args: any[]) {
  const config = args[1] || {}
  config.send_to = GA_TRACK_ID
  args.splice(1, 1, config)
  gtag.call(window, 'event', ...args)
}

export default () => {
  if (process.client && IS_PROD) {
    // Google tag分析脚本
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_TRACK_ID
    script.async = !0
    const s = document.getElementsByTagName('script')[0]
    if (s.parentNode) s.parentNode.insertBefore(script, s)

    window.dataLayer = window.dataLayer || []
    window.gtag = gtag
    window.gtagEvent = gtagEvent
    gtag('js', new Date())
    gtag('config', GA_TRACK_ID)

    window.onNuxtReady(app => {
      app.$nuxt.$on('routeChanged', (to) => {
        gtagEvent('page_view')
        gtag('config', GA_TRACK_ID, {
          page_path: to.fullPath
        })
      })
    })
  } else {
    window.gtag = window.gtagEvent = noop
  }
}
