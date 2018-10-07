
/**
 * @desc Say hi in console
 * @author Jooger <iamjooger@gmail.com>
 * @date 4 Jan 2018
 */

import { IS_PROD, SOCIALS } from '@/config'

export default () => {
  if (process.client && IS_PROD) {
    console.clear()
    console.info([
      '_____ _                   _                             ',
      '|_   _( )                | |                            ',
      '  | | |/ _ __ ___        | | ___   ___   __ _  ___ _ __ ',
      '  | |   | \'_ ` _ \\   _   | |/ _ \\ / _ \\ / _` |/ _ \\ \'__|',
      ' _| |_  | | | | | | | |__| | (_) | (_) | (_| |  __/ |   ',
      '|_____| |_| |_| |_|  \\____/ \\___/ \\___/ \\__, |\\___|_|   ',
      '                                         __/ |          ',
      '                                        |___/           ',
      `联系我：`,
      SOCIALS.map(social => {
        return `${social.title}: ${social.url}`
      }).join('\n')
    ].join('\n')
    )
  }
}
