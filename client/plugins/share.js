/**
 * @desc 分享
 * @author Jooger <iamjooger@gmail.com>
 * @date 13 Jan 2018
 */

'use strict'

import Vue from 'vue'

const isProd = process.env.NODE_ENV === 'production'

export default ({ route }) => {
  if (process.client) {
    Vue.prototype.$share = new Share(route)
  }
}

class Share {
  constructor (route) {
    this.route = route
  }

  get url () {
    return !isProd ? document.URL : `https://jooger.me${this.route.fullPath}`
  }

  get title () {
    try {
      if (document) {
        return document.title
      }
    } catch (err) {
      if (!isProd) {
        console.error(err)
      }
      return 'Jooger.me'
    }
  }

  get description () {
    try {
      if (document) {
        return document.getElementsByName('description')[0].getAttribute('content')
      }
    } catch (err) {
      if (!isProd) {
        console.error(err)
      }
      return ''
    }
  }

  openWindow (link, title) {
    const sw = window.screen.availWidth
    const sh = window.screen.availHeight
    const w = sw / 3
    const h = sh / 2
    const t = (sh - h) / 2
    const l = (sw - w) / 2
    const params = `top=${t}, left=${l}, width=${w}, height=${h}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`
    const win = window.open(link, title, params)
    win.focus()
  }

  share (type = 'link') {
    let link = ''
    const url = this.url
    const title = this.title
    const description = this.description
    switch (type) {
      case 'wechat':
        link = `http://qr.topscan.com/api.php?text=${url}&w=300&el=h&m=10`
        break
      case 'weibo':
        link = `http://service.weibo.com/share/share.php?url=${url}&title=${title}&source=${url}&sourceUrl=${url}&content=${description}`
        break
      case 'qzone':
        link = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&summary=${description}&site=${url}`
        break
      case 'douban':
        link = `https://www.douban.com/recommend/?url=${url}&title=${title}`
        break
      case 'evernote':
        link = `https://www.evernote.com/clip.action?url=${url}&title=${title}`
        break
      case 'twitter':
        link = `http://twitter.com/share?text=${title}&url=${url}`
        break
      case 'facebook':
        link = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'mail':
        link = `mailto:?subject=${title}&body=${url}`
        break
      case 'link':
        const input = document.createElement('input')
        input.type = 'text'
        input.value = url
        input.style.height = '0px'
        input.style.opacity = 0
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        Vue.prototype.$message.success('链接复制成功')
        return
      default:
        break
    }
    if (link.includes('mailto:')) {
      link = link.replace(/\s|\||Jooger.me/g, '')
    } else {
      link = encodeURI(link)
    }
    this.openWindow(link, title)
  }
}
