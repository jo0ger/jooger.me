/**
 * @desc Utils
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

import axios from 'axios'
import simpleNodeLogger from 'simple-node-logger'
import config from '../config'

const timestampFormat = 'YYYY-MM-DD HH:mm:ss'

export const fetcher = axios.create(config.server.service)

export const logger = (process.env.NODE_ENV === 'production' && process.env.log)
  ? simpleNodeLogger.createRollingFileLogger({
    timestampFormat,
    logDirectory: './logs',
    fileNamePattern: '<DATE>.log'
  })
  : new simpleNodeLogger.createSimpleLogger({
    timestampFormat,
  })

export async function handleRequest ({ ctx, type, next }) {
  const method = ctx.method
  const support = !!type[method]
  if (support) {
    await type[method](ctx, next)
  } else {
    handleError({ ctx, message: `${ctx.path}不支持${method}请求类型` })
  }
}

export function handleSuccess ({ ctx, message = '请求成功', data = {} }) {
  logger.info(`接口：${ctx.path}，结果： ${message}`)
  ctx.success({
    message,
    data: data || {}
  })
}

export function handleError ({ ctx, message = '请求失败', err = {} }, end = false) {
  logger.error(`接口：${ctx.path}，结果： ${message}`)
  Object.keys(err).length && console.error(err)
  !end && ctx.failed({
    message,
    error: err || {}
  })
}
