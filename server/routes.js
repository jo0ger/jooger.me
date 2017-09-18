/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import constrollers from './controllers'

export default router => {
  router.use('*', (ctx, next) => {
    ctx.response.set('Content-Type', 'application/json;charset=utf-8')
    return next()
  })
  router.get('article-list', '/articles', constrollers.postController.list)
  router.get('article-detail', '/article/:number', constrollers.postController.item)
}
