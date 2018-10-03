/**
 * @desc MarkdownEditor 命令
 * @author Jooger
 * @date 12 Aug 2017
 */

import {
  makeCommandByInsertBefore,
  makeCommandByInsertBeforeAndAfter,
  makeCode,
} from '@/components/common/MDEditor/lib/commandsHelper'

export interface Command {
  key: string
  title: string
  execute?: (text: string, selection: any) => any
}

const defaultCommands: Command[] = [
  {
    key: 'emoji',
    title: '表情'
  },
  {
    key: 'code',
    title: '代码',
    execute: (text, selection) => makeCode(text, selection, 'js')
  },
  {
    key: 'image',
    title: '图片',
    execute: (text, selection) => makeCommandByInsertBeforeAndAfter(text, selection, '![', '](imgUrl)')
  },
  {
    key: 'link',
    title: '链接',
    execute: (text, selection) => makeCommandByInsertBeforeAndAfter(text, selection, '[', '](url)')
  }
]

export default {
  getDefaultCommands () {
    return defaultCommands
  },
  extend (commands = []) {
    if (!Array.isArray(commands)) {
      throw new Error('扩展Commands必须是数组类型')
    }
    return defaultCommands.concat(commands)
  },
}
