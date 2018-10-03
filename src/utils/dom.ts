import Vue from 'vue'
import BezierEasing from 'bezier-easing'

const isServer = Vue.prototype.$isServer
export const easing = {
  'ease': [0.25, 0.1, 0.25, 1.0],
  'linear': [0.00, 0.0, 1.00, 1.0],
  'ease-in': [0.55, 0.055, 0.675, 0.19],
  'ease-out': [0.215, 0.61, 0.355, 1],
  'ease-in-out': [0.645, 0.045, 0.355, 1]
}

export const $ = selector => document.querySelector(String(selector))

export const requestAnimationFrame = isServer
  ? callback => {
    return setTimeout(callback, 1000 / 60)
  } : (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
  )

export const cancelAnimationFrame = isServer
  ? clearTimeout
  : (
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame
  )

export const on = !isServer && document.addEventListener
  ? (element, event, handler) => {
    if (element && event && handler) {
      element.addEventListener(event, handler, false)
    }
  }
  : (element, event, handler) => {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler)
    }
  }

export const off = !isServer && document.removeEventListener
  ? (element, event, handler) => {
    if (element && event) {
      element.removeEventListener(event, handler, false)
    }
  }
  : (element, event, handler) => {
    if (element && event) {
      element.detachEvent('on' + event, handler)
    }
  }

export const once = (el, event, fn) => {
  /* tslint:disable */
  const listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

// 获取target的scroll top
export const getScroll = (target, top?: boolean) => {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[top ? 'scrollTop' : 'scrollLeft']
  }
  return ret
}

// 获取element的offset
export const getOffset = element => {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docElem = window.document.body
  const clientTop = docElem.clientTop || 0
  const clientLeft = docElem.clientLeft || 0

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export const scrollTo = (element: string | Element | null | number = null, duration = 500, options: any = {}) => {
  if (typeof element === 'string') {
    element = $(element)
  }
  if (element === undefined || element === null) {
    return
  }
  options.easing = options.easing || easing.linear
  const page = $('html, body') as Element

  let initialY = page.scrollTop
  let elementY = 0
  if (Object.is(typeof element, 'number')) {
    elementY = element as number
  } else {
    elementY = initialY + (element as Element).getBoundingClientRect().top
  }
  let targetY = page.scrollHeight - elementY < window.innerHeight
      ? page.scrollHeight - window.innerHeight
      : elementY

  if (options.offset) {
    targetY += options.offset
  }

  let diff = targetY - initialY
  let be = BezierEasing.apply(BezierEasing, options.easing)
  let start

  let done = () => {
    options.onDone && options.onDone()
  }

  if (!diff) return

  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp

    const time = timestamp - start
    let progress = Math.min(time / duration, 1)
    progress = be(progress)

    window.scrollTo(0, initialY + diff * progress)

    if (time < duration) {
      window.requestAnimationFrame(step)
    } else {
      done()
    }
  })
}

export const getFullscreenElement = () => {
  return document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullScreenElement
    || document.msFullscreenElement
}

export const requestFullscreen = () => {
  const docElm = document.documentElement
  const requestEvent = docElm.requestFullscreen
     || docElm.mozRequestFullScreen
     || docElm.webkitRequestFullScreen
     || docElm.msRequestFullscreen
  if (requestEvent) requestEvent.call(docElm)
}

export const exitFullscreen = () => {
  const exitEvent = document.exitFullscreen
    || document.webkitExitFullscreen
    || document.mozCancelFullScreen
    || document.msExitFullscreen
  if (exitEvent) exitEvent.call(document)
}
