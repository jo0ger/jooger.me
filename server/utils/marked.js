/**
 *  渲染markdown
 */

import highlight from 'highlight.js'
import marked from 'marked'

const languages = ['xml', 'bash', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'makefile', 'nginx', 'python', 'scss', 'sql', 'stylus']
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'))
highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
highlight.registerLanguage('http', require('highlight.js/lib/languages/http'))
highlight.registerLanguage('java', require('highlight.js/lib/languages/java'))
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'))
highlight.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
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

renderer.link = function (href, title, text) {
  const isOrigin = href.indexOf('jooger.me') > -1
  const isImage = /(<img.*?)>/gi.test(text)
  return `
    <a href=${href}
    target="_blank"
    class="${isImage ? 'img-link' : 'link'}"
    ${isImage && 'onclick=""'}
    title="${title || ''}"
    ${isOrigin ? '' : 'rel="external nofollow"'}>${text}</a>
  `.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.image = function (href, title, text) {
  return `
    <img class="image-view"
      src="${href}"
      title="${title || text || 'jooger.me'}"
      alt="${text || title || href}"
    ${this.options.xhtml ? '/' : ''}>
  `.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  // const codeLine = '<ul class="code-line">' +
  const lineCode = code.split('\n')
  const codeWrapper = lineCode.map((line, index) => `<span class="line" data-index="${index + 1}">${line}</span>${index !== lineCode.length - 1 ? '<br>' : ''}`.replace(/\s+/g, ' ')).join('')
    // code.split('\n').map((line, index) => `<li class="line">${index + 1}</li>`.replace(/\s+/g, ' ')).join('') +
    // '</ul>'

  if (!lang) {
    // return '<pre>' + codeLine + '<code>' +
    //   (escaped ? code : escape(code, true)) +
    //   '\n</code></pre>'
    return '<pre>' + '<code>' +
    codeWrapper +
      '\n</code></pre>'
  }

  return '<pre>' + '<code class="' +
    this.options.langPrefix +
    escape(lang, true) +
    '">' +
    codeWrapper +
    '\n</code></pre>\n'
  // return '<pre>' + codeLine + '<code class="' +
  //   this.options.langPrefix +
  //   escape(lang, true) +
  //   '">' +
  //   (escaped ? code : escape(code, true)) +
  //   '\n</code></pre>\n'
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
