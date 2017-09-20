/**
 * @desc Option
 * @author Jooger <zzy1198258955@163.com>
 * @date 20 Sep 2017
 */

import { handleRequest, handleSuccess } from '../utils'
const optionCtrl = {}

optionCtrl.GET = async (ctx, next) => {
  handleSuccess({
    ctx,
    data: global.option || {}
  })
}

export default async (ctx, next) => {
  await handleRequest({ ctx, next, type: optionCtrl })
}
