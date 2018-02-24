/**
 * @desc vue-router hook
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // TODO: some handler
    next()
  })
}
