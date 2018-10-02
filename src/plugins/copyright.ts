import Vue from 'vue'

export default () => {
  if (process.client) {
    const ctx = '_copyListener'
    Vue.directive('copyright', {
      bind (el: HTMLElement) {
        el[ctx] = e => {
          if (!window.getSelection) return
          const content = window.getSelection().toString()
          e.clipboardData.setData('text/plain', copyText(content))
          e.clipboardData.setData('text/html', copyText(content))
          e.preventDefault()
        }
      },
      inserted (el: HTMLElement) {
        el.addEventListener('copy', el[ctx])
      },
      unbind (el: HTMLElement) {
        el.removeEventListener('copy', el[ctx])
      }
    })
  }
}

function copyText (content = '') {
  return [
    content,
    '',
    '著作权归作者所有。',
    '商业转载请联系作者获得授权，非商业转载请注明出处。',
    '作者：Jooger',
    '链接：' + location.href,
    '来源：Jooger.me',
    ''
  ].join('\n')
}
