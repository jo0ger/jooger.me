/**
 * @desc Clipboard
 * @author Jooger <zzy1198258955@163.com>
 * @date 24 Oct 2017
 */

'use strict'

import Clipboard from 'clipboard'

export default ({ isClient }) => {
  if (isClient) {
    window.Clipboard = Clipboard
  }
}
