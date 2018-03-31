/**
 * @desc Axios拦截
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

const codeMap = {
  FAILED: -1,
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  PARAMS_ERROR: 10001
}

export default function ({ $axios, redirect, store }) {
  const mobileClient = store.getters['app/mobileLayout']
  $axios.onRequest(config => config)
  $axios.onRequestError(err => Promise.reject(err))

  $axios.onResponse(res => {
    if (!res || !res.data) {
      return showErrorMsg('服务器异常')
    }
    switch (res.data.code) {
      case codeMap.UNAUTHORIZED:
      case codeMap.FAILED:
      case codeMap.FORBIDDEN:
      case codeMap.SERVER_ERROR:
      case codeMap.PARAMS_ERROR:
        showErrorMsg(res.data.message)
        break
      default:
        break
    }
    return res
  })

  $axios.onError(err => {
    const status = err.response ? err.response.status : err.code
    let message = err.message ? err.message : `请求错误${status ? `，code:${status}` : ''}`
    if (message.indexOf('Network Error') > -1) {
      message = '网络错误'
    }
    showErrorMsg(message)
    // reportError(err)
    return Promise.reject(err)
  })

  function showErrorMsg (msg: string) {
    return msg
  }
}
