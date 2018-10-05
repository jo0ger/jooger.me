import Vue from 'vue'
import { scrollTo, easing, isType } from '@/utils'

Vue.prototype.$scrollTo = function (element: string | Element | null | number = null, duration: number = 500, options: any = {}) {
  if (isType(options.easing, 'String')) {
    options.easing = easing[options.easing]
  }
  scrollTo(element, duration, options)
}

Vue.prototype.$scrollToComments = function (element: null | Element) {
  this.$scrollTo(element || '.article-comments', 500, {
    offset: -76,
    easing: 'ease'
  })
}
