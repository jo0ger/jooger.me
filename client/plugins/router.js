/**
 * @desc vue-router hook
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

export default function ({ app, isClient }) {
  app.router.beforeEach((to, from, next) => {
    app.store.commit('app/SET_SEARCH', false)
    next()
  })
}
