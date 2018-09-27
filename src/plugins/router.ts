export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        if (from.name === 'article-id') {
            store.commit('app/SET_FULL_COLUMN', false)
        }
        next()
    })
}