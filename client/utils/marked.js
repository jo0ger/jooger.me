/**
 *  渲染markdown
 */

import highlight from 'highlight.js'
import marked from 'marked'

const languages = ['cpp', 'xml', 'bash', 'coffeescript', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'makefile', 'nginx', 'php', 'python', 'scss', 'sql', 'stylus']
highlight.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highlight.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'))
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
highlight.registerLanguage('http', require('highlight.js/lib/languages/http'))
highlight.registerLanguage('java', require('highlight.js/lib/languages/java'))
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('less', require('highlight.js/lib/languages/less'))
highlight.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
highlight.registerLanguage('php', require('highlight.js/lib/languages/php'))
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'))
highlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
highlight.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
highlight.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))
highlight.configure({
  classPrefix: ''     // don't append class prefix
})

const renderer = new marked.Renderer()

renderer.heading = function (text, level) {
  return `<h${level} id="${generateId()}">${text}</h${level}>`
}

renderer.link = (href, title, text) => {
  const isOrigin = href.indexOf('jooger.me') > -1
  const textIsImage = /(<img.*?)>/gi.test(text)
  return `
    <a href=${href}
    target="_blank"
    class="${textIsImage ? 'img-link' : 'link'}"
    title="${title || ''}"
    ${isOrigin ? '' : 'rel="external nofollow"'}>${text}</a>
  `
}

renderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  const codeLine = '<ul class="code-line">' +
    code.split('\n').map((line, index) => `<li class="line">${index + 1}</li>`.replace(/\s+/g, ' ')).join('') +
    '</ul>'

  if (!lang) {
    return '<pre>' + codeLine + '<code>' +
      (escaped ? code : escape(code, true)) +
      '\n</code></pre>'
  }

  return '<pre>' + codeLine + '<code class="' +
    this.options.langPrefix +
    escape(lang, true) +
    '">' +
    (escaped ? code : escape(code, true)) +
    '\n</code></pre>\n'
}

marked.setOptions({
  renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight (code, lang) {
    if (!~languages.indexOf(lang)) {
      return highlight.highlightAuto(code).value
    }
    return highlight.highlight(lang, code).value
  }
})

// 生成文章中的title id
function generateId (len) {
  const chars = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz`
  len = len | 8
  let id = ''
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

function escape (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default marked
