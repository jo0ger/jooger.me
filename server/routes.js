/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import { articleController } from './controllers'

export default router => {
  router.use('*', (ctx, next) => {
    ctx.response.set('Content-Type', 'application/json;charset=utf-8')
    return next()
  })
  router.get('article-list', '/articles', articleController.list)
  router.get('article-detail', '/article/:number', articleController.item)
}
