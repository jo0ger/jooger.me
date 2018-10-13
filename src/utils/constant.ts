/**
 * 一些常量
 */

export type ConstantItem = Array<{
  [key: string]: any,
  label: string,
  value: string | number,
}>

export interface Constant {
  [type: string]: ConstantItem
}

export const ARTICLE_SOURCE: ConstantItem = [
  {
    label: '原创',
    value: 0,
    code: 'original'
  },
  {
    label: '转载',
    value: 1,
    code: 'reprint'
  },
  {
    label: '混撰',
    value: 2,
    code: 'hybrid'
  },
  {
    label: '翻译',
    value: 3,
    code: 'translate'
  },
]
