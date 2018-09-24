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
    },
    {
        label: '转载',
        value: 1,
    },
]
