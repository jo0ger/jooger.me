/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import config from '../config'
import { articleController, userController, hookController, optionController } from './controllers'

export default router => {
  router.use('*', (ctx, next) => {
    const { request, response } = ctx
    const allowedOrigins = config.server.allowedOrigins
    const origin = request.get('origin') || ''
    const allowed = origin.includes('localhost') ||
      (process.env.NODE_ENV === 'development' && request.query._DEV_) ||
      allowedOrigins.find(item => origin.includes(item))
    if (allowed) {
      response.set('Access-Control-Allow-Origin', origin)
    }
    ctx.response.set('Content-Type', 'application/json;charset=utf-8')
    response.set("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS")

    if (request.method === 'OPTIONS') {
      ctx.status = 200
      ctx.body = 'ok'
      return
    }
    
    return next()
  })

  router.all('/webhook/option', hookController.option)

  router.all('article-list', '/articles', articleController.list)
  router.all('article-detail', '/article/:number', articleController.item)
  router.all('article-like', '/article/:number/like', articleController.like)

  router.all('user-me', '/user/me', userController.me)

  router.all('option', '/option', optionController)
}
