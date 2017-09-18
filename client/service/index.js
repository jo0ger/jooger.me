/**
 * @desc Api service
 * @author Jooger <zzy1198258955@163.com>
 * @date 8 Sep 2017
 */

import Axios from 'axios'
import config from '../config'

const logMsg = (msg = '', type = 'success') => {
  if (msg) {
    console.info(msg)
  }
}

export const fetcher = Axios.create(config.service)

export const CODE = {
  FAILED: -1,
  SUCCESS: 0,
  UNAUTHORIZED: 401
}

fetcher.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

fetcher.interceptors.response.use(response => {
  if (!response || !response.data) {
    return logMsg('服务器异常', 'error')
  }
  switch (response.data.code) {
    case CODE.UNAUTHORIZED:
      logMsg(response.data.message, 'error')
      break
    case CODE.FAILED:
      logMsg(response.data.message, 'error')
      break
    case CODE.SUCCESS:
      if (response.config.method.toLocaleUpperCase() !== 'GET') {
        logMsg(response.data.message)
      }
      break
    default:
      break
  }
  return {
    success: response.data && response.data.code === CODE.SUCCESS,
    ...response.data
  }
}, error => {
  const status = error.response && error.response.status || error.code
  const message = error.message ? error.message : `请求错误${status ? `，code:${status}` : ''}`
  logMsg(message, 'error')
  return error.response || {
    code: CODE.FAILED,
    message
  }
})

const wrap = (url, type = 'get') => (config = {}) => fetcher.request({ ...config, method: type, url })

export default {
  article: {
    fetchList: wrap('/articles')
  }
}
