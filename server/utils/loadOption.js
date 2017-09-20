/**
 * @desc Load Option
 * @author Jooger <zzy1198258955@163.com>
 * @date 21 Sep 2017
 */

import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import config from '../../config'

export default () => {
  const dir = path.resolve(__dirname, '../../', config.common.github.repoLocalDir)
  const optionFile = path.join(dir, './_config.yml')

  let option = null

  if (!fs.existsSync(optionFile)) {
    logger.info('配置文件未找到')
    return option
  }

  try {
    option = yaml.safeLoad(fs.readFileSync(optionFile, 'utf8'))
  } catch (err) {
    logger.info('配置文件读取失败, err：', err)
    return option
  }

  logger.info('配置文件读取成功')
  return option
}
