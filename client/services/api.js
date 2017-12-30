/**
 * @desc Api service
 * @author Jooger <iamjooger@gmail.com>
 * @date 20 Dec 2017
 */

'use strict'

import axios from 'axios'
import config from '@@/app.config'
import { Message } from '@/components/common'

const CodeMap = {
  FAILED: -1,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  PARAMS_ERROR: 10001
}

const logMsg = (msg = '') => {
  if (msg) {
    Message(msg)
  }
}

export const fetcher = axios.create(config.service)

fetcher.interceptors.request.use((config) => config, err => Promise.reject(err))

fetcher.interceptors.response.use(async response => {
  if (!response || !response.data) {
    return logMsg('服务器异常')
  }
  switch (response.data.code) {
    case CodeMap.UNAUTHORIZED:
    case CodeMap.FAILED:
    case CodeMap.FORBIDDEN:
    case CodeMap.SERVER_ERROR:
    case CodeMap.PARAMS_ERROR:
      logMsg(response.data.message)
      break
    case CodeMap.SUCCESS:
      // if (response.config.method.toLocaleUpperCase() !== 'GET') {
      //   logMsg(response.data.message)
      // }
      break
    default:
      break
  }
  return response.data
}, err => {
  const status = err.response ? err.response.status : err.code
  const message = err.message ? err.message : `请求错误${status ? `，code:${status}` : ''}`
  logMsg(message)
  return Promise.reject(err)
})

const wrap = (url, type = 'get') => (config = {}) => fetcher.request({ ...config, method: type, url })

export default {
  article: {
    fetchList: wrap('/articles'),
    fetchDetail: id => wrap(`/articles/${id}`),
    fetchLikes: id => wrap(`/articles/${id}/like`),
    like: id => wrap(`/articles/${id}/like`, 'post'),
    hot: wrap('/articles/hot')
  },
  category: {
    fetchList: wrap('/categories')
  },
  tag: {
    fetchList: wrap('/tags')
  },
  user: {
    fetchMe: wrap('/users/me'),
    fetchDetail: id => wrap(`/users/${id}`)
  },
  option: {
    fetchData: wrap('/options')
  },
  music: {
    fetchList: wrap('/music/songs'),
    fetchDetail: id => wrap(`/music/songs/${id}`),
    fetchUrl: id => wrap(`/music/songs/${id}/url`),
    fetchLyric: id => wrap(`/music/songs/${id}/lyric`)
  },
  auth: {
    githubLogin: wrap('/auth/github/login'),
    getInfo: wrap('/auth/info'),
    getGithubToken: wrap('/auth/github/token'),
    getGithubUser: wrap('/auth/github/user')
  },
  moment: {
    fetchList: wrap('/moments')
  },
  comment: {
    fetchList: wrap('/comments'),
    fetchDetail: id => wrap(`/comments/${id}`),
    create: wrap('/comments', 'post'),
    like: id => wrap(`/comments/${id}/like`, 'post')
  }
}
