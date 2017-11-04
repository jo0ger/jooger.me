/**
 * @desc Open a new window
 * @author Jooger <zzy1198258955@163.com>
 * @date 5 Nov 2017
 */

'use strict'

export default () => {
  if (process.browser) {
    window.openWindow = (url, title) => {
      const sw = window.screen.availWidth
      const sh = window.screen.availHeight
      const w = sw / 3
      const h = sh / 2
      const t = (sh - h) / 2
      const l = (sw - w) / 2
      const params = `top=${t}, left=${l}, width=${w}, height=${h}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`
      const win = window.open(url, title, params)
      win.focus()
    }
  }
}
