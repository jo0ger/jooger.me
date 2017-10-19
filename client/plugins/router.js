/**
 * @desc vue-router hook
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

export default function ({ app, isClient }) {
  app.router.beforeEach((to, from, next) => {
    app.store.commit('app/SET_SEARCH', false)
    app.store.commit('app/SET_OVERLAY', false)
    app.store.commit('app/SET_MENU', false)
    app.store.commit('app/SET_MUSIC', false)
    next()
  })
}
