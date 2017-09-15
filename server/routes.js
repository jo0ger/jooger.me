/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import { postController } from './controllers'

export default router => {
  router.use('*', (ctx, next) => {
    ctx.response.set('Content-Type', 'application/json;charset=utf-8')
    return next()
  })
  router.get('articles', '/api/articles', postController)
}
