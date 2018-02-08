/**
 * @desc Api service
 * @author Jooger <iamjooger@gmail.com>
 * @date 20 Dec 2017
 */

'use strict'

import axios from 'axios'
import config from '@@/app.config'
import { Message } from '@/components/common'

export const fetcher = axios.create(config.service)

fetcher.interceptors.request.use(config => config, err => Promise.reject(err))

fetcher.interceptors.response.use(handleResponse, handleError)

export default {
  article: {
    list: wrap('/articles'),
    item: id => wrap(`/articles/${id}`),
    likes: id => wrap(`/articles/${id}/like`),
    like: id => wrap(`/articles/${id}/like`, 'post'),
    hot: wrap('/articles/hot'),
    archives: wrap('/articles/archives')
  },
  category: {
    list: wrap('/categories')
  },
  tag: {
    list: wrap('/tags')
  },
  user: {
    blogger: wrap('/users/blogger'),
    item: id => wrap(`/users/${id}`),
    guests: wrap('/users/guests')
  },
  option: {
    data: wrap('/options')
  },
  music: {
    list: wrap('/music/songs'),
    item: id => wrap(`/music/songs/${id}`),
    url: id => wrap(`/music/songs/${id}/url`),
    lyric: id => wrap(`/music/songs/${id}/lyric`)
  },
  auth: {
    githubLogin: wrap('/auth/github/login'),
    info: id => wrap(`/users/${id}`),
    githubToken: wrap('/auth/github/token'),
    githubUser: wrap('/auth/github/user')
  },
  moment: {
    list: wrap('/moments')
  },
  comment: {
    list: wrap('/comments'),
    item: id => wrap(`/comments/${id}`),
    publish: wrap('/comments', 'post'),
    like: id => wrap(`/comments/${id}/like`, 'post')
  }
}

function wrap (url, type = 'get') {
  return (config = {}) => fetcher.request({ ...config, method: type, url })
}

async function handleResponse (response) {
  if (!response || !response.data) {
    return Message.error('服务器异常')
  }
  switch (response.data.code) {
    case config.codeMap.UNAUTHORIZED:
    case config.codeMap.FAILED:
    case config.codeMap.FORBIDDEN:
    case config.codeMap.SERVER_ERROR:
    case config.codeMap.PARAMS_ERROR:
      Message.error(response.data.message)
      break
    case config.codeMap.SUCCESS:
      // if (response.config.method.toLocaleUpperCase() !== 'GET') {
      //   Message.success(response.data.message)
      // }
      break
    default:
      break
  }
  return response.data
}

async function handleError (err) {
  const status = err.response ? err.response.status : err.code
  let message = err.message ? err.message : `请求错误${status ? `，code:${status}` : ''}`
  if (message.indexOf('Network Error') > -1) {
    message = '网络错误'
  }
  Message.error(message)
  reportError(err)
  return Promise.reject(err)
}

// Sentry 上报接口请求错误
function reportError (err) {
  const { config, response, message, stack } = err
  const responseData = (response && response.data) || {}
  Raven.captureMessage(responseData.message || message, {
    level: 'warning',
    logger: '接口请求',
    extra: {
      type: config.method,
      url: config.url,
      data: config.data,
      status: response.status,
      error: stack || message,
      response: JSON.stringify(responseData)
    }
  })
}
