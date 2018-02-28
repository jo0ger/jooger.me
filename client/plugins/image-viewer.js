/**
 * @desc Image viewer
 * @author Jooger <iamjooger@gmail.com>
 * @date 28 Feb 2018
 */

'use strict'

import ImageViewer from 'juejin-image-viewer/src/juejin-image-viewer'

export default () => {
  if (process.client) {
    window.ImageViewer = ImageViewer
  }
}
