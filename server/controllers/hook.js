/**
 * @desc Github Webhook controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 20 Sep 2017
 */

import path from 'path'
import fs from 'fs'
import config from '../../config'
import { handleRequest, handleSuccess, handleError, exec, loadOption } from '../utils'

const isProd = process.env.NODE_ENV === 'production'
const { github, command } = config.common
const { repoLocalDir } = github
const hookCtrl = {
  option: {}
}

hookCtrl.option.POST = async (ctx, next) => {
  logger.info('----------------------option hook push start----------------------------')

  await pullRepo(path.resolve(__dirname, '../../', repoLocalDir))

  let option = global.option
  if (isProd) {
    option = await loadOption()
  }

  if (option) {
    global.option = option
    handleSuccess({ ctx, message: '配置更新成功' })
  } else {
    handleError({ ctx, message: '配置更新失败' })
  }

  logger.info('----------------------option hook push end----------------------------')
}

// 拉取仓库
async function pullRepo (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const { PULL } = command
  logger.info('正在拉取仓库...')
  await exec(PULL, { cwd: dir }).catch(err => console.error(err))
  logger.info('拉取仓库完成')
}

export default {
  option: async (ctx, next) => {
    await handleRequest({ ctx, next, type: hookCtrl.option })
  }
}
