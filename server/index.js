import Koa from 'koa'
import Router from 'koa-router'
import respond from 'koa-respond'
import { Nuxt, Builder } from 'nuxt'
import routes from './routes'
import config from '../config'
import nuxtConfig from '../nuxt.config'
import { logger } from './utils'

global.logger = logger

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Set Nuxt.js options
nuxtConfig.dev = !(app.env === 'production')

// Instantiate nuxt.js
const nuxt = new Nuxt(nuxtConfig)

// Build in development
if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  })
}

app.use(respond({
  methods: {
    success: (ctx, body) => {
      body = Object.assign({}, {
        code: config.common.code.SUCCESS
      }, body)
      ctx.send(200, body)
    },
    failed: (ctx, body) => {
      body = Object.assign({}, {
        code: config.common.code.FAILED
      }, body)
      ctx.send(200, body)
    }
  }
}))
app.use((ctx, next) => {
  if (ctx.url.includes('/api')) {
    return next()
  }
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

const router = new Router({
  prefix: '/api'
})
routes(router)
app.use(router.routes(), router.allowedMethods())

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
