/**
 * @desc server controllers
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

import axios from 'axios'
import config from '../posts.config'

export const postController = async (ctx, next) => {
  const res = await axios.get(`https://api.github.com/repos/${config.owner}/${config.repo}/issues`, {
    params: {
      state: 'all',
      sort: 'created'
    }
  }).catch(err => console.error(err))
  ctx.status = res.status
  ctx.body = res.data
}
