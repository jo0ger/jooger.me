/**
 * @desc server controllers
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import axios from 'axios'
// import fm from 'front-matter'
import config from '../posts.config'
import { CODE } from '../client/service'
const imageReg = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/

const postController = { list: {}, item: {} }

postController.list = async (ctx, next) => {
  const { page = 1, per_page = 12 } = ctx.query
  const res = await axios.get(`https://api.github.com/repos/${config.owner}/${config.repo}/issues`, {
    params: {
      filter: 'created',
      state: 'open',
      sort: 'created',
      direction: 'desc',
      client_id: config.clientId,
      client_secret: config.clientSecret,
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
      code: CODE.SUCCESS,
      data: {
        list: articles,
        pagination: { prev, next, page: Number(page), per_page }
      }
    }
  } else {
    ctx.status = 200
    ctx.body = { code: CODE.FAILED }
  }
}

postController.item = async (ctx, next) => {
  const number = ctx.params.number
  const res = await axios.get(`https://api.github.com/repos/${config.owner}/${config.repo}/issues/${number}`, {
    params: {
      client_id: config.clientId,
      client_secret: config.clientSecret
    }
  }).catch(err => console.error(err))
  if (res) {
    const detail = res.data
    detail.body = articleParser(detail.body)
    ctx.status = res.status
    ctx.body = {
      code: CODE.SUCCESS,
      data: detail
    }
  } else {
    ctx.status = 200
    ctx.body = { code: CODE.FAILED }
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
