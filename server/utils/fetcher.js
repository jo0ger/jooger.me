/**
 * @desc Axios fetcher
 * @author Jooger <zzy1198258955@163.com>
 * @date 21 Sep 2017
 */

import axios from 'axios'
import config from '../../config'

const fetcher = axios.create(config.server.service)

export default fetcher
