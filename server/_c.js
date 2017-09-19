/**
 * @desc server controllers
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import axios from 'axios'
// import fm from 'front-matter'
import config from '../config'
const imageReg = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/
const fetcher = axios.create(config.server.service)
const postController = { list: {}, item: {} }

postController.list = async (ctx, next) => {
  const { page = 1, per_page = 12, search = '' } = ctx.query
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
    })

    if (res) {
      const link = res.headers.link || ''
      let prev = link.includes('rel="prev"')
      let next = link.includes('rel="next"')
      const articles = res.data.items.map(item => {
        item.body = articleParser(item.body)
        return item
      })
      ctx.status = res.status
      ctx.body = {
        code: config.common.code.SUCCESS,
        data: {
          list: articles,
          pagination: { prev, next, page: Number(page), per_page },
          total: res.data.total_count,
        }
      }
    }
  } else {
    res = await fetcher.get(`/repos/${config.server.github.owner}/${config.server.github.repo}/issues`, {
      params: {
        filter: 'created',
        state: 'open',
        sort: 'created',
        direction: 'desc',
        client_id: config.server.github.clientId,
        client_secret: config.server.github.clientSecret,
        page,
        per_page
      }
    }).catch(err => console.error(err))
    if (res) {
      const link = res.headers.link || ''
      let prev = link.includes('rel="prev"')
      let next = link.includes('rel="next"')
      const articles = res.data.map(item => {
        item.body = articleParser(item.body)
        return item
      })
      // ctx.response.set('Accept', 'application/vnd.github.squirrel-girl-preview')
      ctx.status = res.status
      ctx.body = {
        code: config.common.code.SUCCESS,
        data: {
          list: articles,
          pagination: { prev, next, page: Number(page), per_page }
        }
      }
    }
  }

  if (!res) {
    ctx.status = 200
    ctx.body = { code: config.common.code.FAILED }
  }
}

postController.item = async (ctx, next) => {
  const number = ctx.params.number
  const res = await fetcher.get(`/repos/${config.server.github.owner}/${config.server.github.repo}/issues/${number}`, {
    params: {
      client_id: config.server.github.clientId,
      client_secret: config.server.github.clientSecret
    }
  }).catch(err => console.error(err))
  if (res) {
    const detail = res.data
    detail.body = articleParser(detail.body)
    ctx.status = res.status
    ctx.body = {
      code: config.common.code.SUCCESS,
      data: detail
    }
  } else {
    ctx.status = 200
    ctx.body = { code: config.common.code.FAILED }
  }
}

function articleParser (content) {
  const data = {}
  const splits = content.split('\r\n')
  const thumb = splits[0]
  let cap = imageReg.exec(thumb)
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
  postController
}
