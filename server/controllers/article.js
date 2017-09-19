/**
 * @desc Article controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

import config from '../../config'
import { fetcher, handleRequest, handleSuccess, handleError } from '../utils'

const mdImageReg = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/

const articleCtrl = { list: {}, item: {} }

articleCtrl.list.GET = async (ctx, next) => {
  const { page = 1, per_page = 12, search = '', labels = '' } = ctx.query
  let res = null
  if (search) {
    const q = `${search} type:issue state:open in:title,body author:${config.server.github.owner} repo:${config.server.github.repo}`
    res = await fetcher.get('/search/issues', {
      params: {
        q,
        sort: 'created',
        order: 'asc',
        client_id: config.server.github.clientId,
        client_secret: config.server.github.clientSecret,
        page,
        per_page
      }
    }).catch(err => handleError({ ctx, err }))

    if (res) {
      const link = res.headers.link || ''
      let prev = link.includes('rel="prev"')
      let next = link.includes('rel="next"')
      const articles = res.data.items.map(item => {
        item.body = articleParser(item.body)
        return item
      })
      handleSuccess({
        ctx,
        data: {
          list: articles,
          pagination: { prev, next, page: Number(page), per_page },
          total: res.data.total_count
        }
      })
    }
  } else {
    const params = {
      filter: 'created',
      state: 'open',
      sort: 'created',
      direction: 'desc',
      client_id: config.server.github.clientId,
      client_secret: config.server.github.clientSecret,
      page,
      per_page
    }
    if (labels) {
      params.labels = labels
    }
    res = await fetcher.get(`/repos/${config.server.github.owner}/${config.server.github.repo}/issues`, { params })
      .catch(err => handleError({ ctx, err }))
    if (res) {
      const link = res.headers.link || ''
      let prev = link.includes('rel="prev"')
      let next = link.includes('rel="next"')
      const articles = res.data.map(item => {
        item.body = articleParser(item.body)
        return item
      })
      // ctx.response.set('Accept', 'application/vnd.github.squirrel-girl-preview')
      handleSuccess({
        ctx,
        data: {
          list: articles,
          pagination: { prev, next, page: Number(page), per_page }
        }
      })
    }
  }

  if (!res) {
    handleError({ ctx })
  }
}

articleCtrl.item.GET = async (ctx, next) => {
  const number = ctx.params.number
  const res = await fetcher.get(`/repos/${config.server.github.owner}/${config.server.github.repo}/issues/${number}`, {
    params: {
      client_id: config.server.github.clientId,
      client_secret: config.server.github.clientSecret
    }
  }).catch(err => handleError({ ctx, err }))
  if (res) {
    const detail = res.data
    detail.body = articleParser(detail.body)
    handleSuccess({
      ctx,
      data: detail
    })
  } else {
    handleError({ ctx })
  }
}

function articleParser (content) {
  const data = {}
  const splits = content.split('\r\n')
  const thumb = splits[0]
  let cap = mdImageReg.exec(thumb)
  if (cap) {
    data.thumb = cap[2]
    data.content = content.split(thumb)[1]
  } else {
    data.content = content
  }
  data._content = content
  return data
}

export default {
  list: async (ctx, next) => {
    await handleRequest({ ctx, next, type: articleCtrl.list })
  },
  item: async (ctx, next) => {
    await handleRequest({ ctx, next, type: articleCtrl.item })
  }
}
