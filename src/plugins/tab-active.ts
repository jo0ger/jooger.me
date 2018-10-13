export default () => {
  if (process.client) {
    let title = ''
    document.addEventListener('visibilitychange', e => {
      const target = e.target as {
        hidden: boolean
        webkitHidden: boolean
      } & EventTarget
      if (target.hidden || target.webkitHidden) {
        title = document.title
        document.title = '💕 死鬼，快回来'
      } else {
        document.title = title
      }
    })
  }
}
