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

fetcher.interceptors.request.use((config) => config, err => Promise.reject(err))

fetcher.interceptors.response.use(async response => {
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
}, err => {
  const status = err.response ? err.response.status : err.code
  let message = err.message ? err.message : `请求错误${status ? `，code:${status}` : ''}`
  if (message.indexOf('Network Error') > -1) {
    message = '网络错误'
  }
  Message.error(message)
  return Promise.reject(err)
})

const wrap = (url, type = 'get') => (config = {}) => fetcher.request({ ...config, method: type, url })

export default {
  article: {
    fetchList: wrap('/articles'),
    fetchDetail: id => wrap(`/articles/${id}`),
    fetchLikes: id => wrap(`/articles/${id}/like`),
    like: id => wrap(`/articles/${id}/like`, 'post'),
    hot: wrap('/articles/hot'),
    archives: wrap('/articles/archives')
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
    getInfo: id => wrap(`/users/${id}`),
    getGithubToken: wrap('/auth/github/token'),
    getGithubUser: wrap('/auth/github/user')
  },
  moment: {
    fetchList: wrap('/moments')
  },
  comment: {
    fetchList: wrap('/comments'),
    fetchDetail: id => wrap(`/comments/${id}`),
    publish: wrap('/comments', 'post'),
    like: id => wrap(`/comments/${id}/like`, 'post')
  }
}
