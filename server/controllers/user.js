/**
 * @desc User controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

import config from '../../config'
import { fetcher, handleRequest, handleSuccess, handleError } from '../utils'
const { owner, clientId, clientSecret } = config.common.github
const userCtrl = { me: {} }

userCtrl.me.GET = async (ctx, next) => {
  const res = await fetcher.get(`/users/${owner}`, {
    params: {
      client_id: clientId,
      client_secret: clientSecret
    }
  }).catch(err => handleError({ ctx, err }))

  if (res && res.data) {
    handleSuccess({
      ctx,
      data: res.data
    })
  } else {
    handleError({ ctx })
  }
}

export default {
  me: async (ctx, next) => {
    await handleRequest({ ctx, next, type: userCtrl.me })
  }
}
