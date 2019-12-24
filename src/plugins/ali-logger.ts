/*
 * Summary: 阿里前端实时监控
 * File: /src/plugins/ali-logger.ts
 * -----
 * File Created: 2019-12-24 12:36:48, Tue
 * Author: zhuzhiyang (zhuzhiyang@meituan.com)
 * -----
 * Last Modified: 2019-12-24 12:36:54, Tue
 * Modified By: zhuzhiyang (zhuzhiyang@meituan.com>)
 */

import BrowerLogger from 'alife-logger'

export default () => {
  if (process.client) {
    BrowerLogger.singleton({
      pid: 'imvqlnwuad@99e6e9cf1dbf150',
      appType: 'web',
      imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
      sendResource: true,
      enableLinkTrace: true,
      behavior: true,
      enableSPA: true,
      useFmp: true
    })
  }
}
