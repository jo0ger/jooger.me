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
import fetcher from './fetcher'

const isProd = process.env.NODE_ENV === 'production'

export default async () => {
  const dir = path.resolve(__dirname, '../../', config.common.github.repoLocalDir)
  const optionFile = path.join(dir, './_config.yml')

  let option = null

  if (!fs.existsSync(optionFile)) {
    logger.info('配置文件未找到')
    return option
  }

  option = await loadYml(optionFile)

  if (!isProd) {
    watchYml(optionFile)
  }

  global.option = option

  return option
}

async function loadYml (path) {
  let data = null
  try {
    data = yaml.safeLoad(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    logger.info('配置文件读取失败, err：', err)
    return data
  }
  logger.info('配置文件读取成功')

  if (data.links) {
    logger.info('开始抓取友链信息....')
    data.links = await fetchLinks(data.links)
    logger.info('抓取友链信息成功....')
  }

  logger.info('配置更新成功')

  return data
}

function watchYml (path) {
  watch(path, { recursive: true }, async (evt, name) => {
    logger.info('配置文件有更新')
    const data = await loadYml(path)
    global.option = data
  })
  logger.info('正在监控配置文件变动...')
}

// 抓取github友链
function fetchLinks (links) {
  return Promise.all(
    links.map(({ name, github, site }) => {
      if (github) {
        return fetcher.get(`/users/${github}`, {
          params: {
            client_id: config.common.github.clientId,
            client_secret: config.common.github.clientSecret
          }
        }).then(res => {
          if (res && res.status === 200) {
            return {
              name,
              avatar: res.data.avatar_url,
              slogan: res.data.bio,
              link: site || res.data.blog
            }
          }
          return {
            name,
            link: site
          }
        }).catch(() => ({
          name,
          link: site
        }))
      } else {
        return new Promise((resolve, reject) => {
          resolve({
            name,
            site
          })
        })
      }
    })
  )
}
