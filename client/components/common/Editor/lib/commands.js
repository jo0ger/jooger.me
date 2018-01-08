/**
 * @desc MarkdownEditor 命令
 * @author Jooger
 * @date 12 Aug 2017
 */

import {
  // makeCommandByInsertBefore,
  makeCommandByInsertBeforeAndAfter,
  makeCode
} from './commandsHelper'

const defaultCommands = [
  // {
  //   key: 'bold',
  //   title: '加粗',
  //   execute: (text, selection) => makeCommandByInsertBeforeAndAfter(text, selection, '**', '**')
  // },
  // {
  //   key: 'italic',
  //   title: '斜体',
  //   execute: (text, selection) => makeCommandByInsertBeforeAndAfter(text, selection, '_', '_')
  // },
  // {
  //   key: 'strikethrough',
  //   title: '删除线',
  //   execute: (text, selection) => makeCommandByInsertBeforeAndAfter(text, selection, '~~', '~~')
  // },
  // {
  //   key: 'h1',
  //   title: 'H1',
  //   execute: (text, selection) => makeCommandByInsertBefore(text, selection, '# ')
  // },
  // {
  //   key: 'h2',
  //   title: 'H2',
  //   execute: (text, selection) => makeCommandByInsertBefore(text, selection, '## ')
  // },
  // {
  //   key: 'h3',
  //   title: 'H3',
  //   execute: (text, selection) => makeCommandByInsertBefore(text, selection, '## ')
  // },
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
  }
}
