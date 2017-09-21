/**
 * @desc Load Option
 * @author Jooger <zzy1198258955@163.com>
 * @date 21 Sep 2017
 */

import path from 'path'
import fs from 'fs'
import watch from 'node-watch'
import yaml from 'js-yaml'
import config from '../../config'

const isProd = process.env.NODE_ENV === 'production'

export default () => {
  const dir = path.resolve(__dirname, '../../', config.common.github.repoLocalDir)
  const optionFile = path.join(dir, './_config.yml')

  let option = null

  if (!fs.existsSync(optionFile)) {
    logger.info('配置文件未找到')
    return option
  }

  option = loadYml(optionFile)

  if (!isProd) {
    watchYml(optionFile)
  }

  return option
}

function loadYml (path) {
  let data = null
  try {
    data = yaml.safeLoad(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    logger.info('配置文件读取失败, err：', err)
    return data
  }
  logger.info('配置文件读取成功')
  return data
}

function watchYml (path) {
  watch(path, { recursive: true }, (evt, name) => {
    logger.info('配置文件有更新')
    const data = loadYml(path)
    global.option = data
  })
  logger.info('正在监控配置文件变动...')
}
