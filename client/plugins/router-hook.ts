/**
 * @desc vue router hook
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

export default ({ app }): void => {
  app.router.beforeEach((to, from, next): void => {
    next()
  })
}
