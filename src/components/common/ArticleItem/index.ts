/**
 * @desc ArticleItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-23 23:48:48
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'ArticleItem',
})
export default class ArticleItem extends Base {
  @Prop({ type: Object })
  private article!: any

  @Prop({ type: Boolean, default: false })
  private noThumb!: boolean

  @Prop({ type: Boolean, default: false })
  private compact!: boolean

  @Prop({ type: String, default: '' })
  private keyword!: string

  private get title () {
    if (this.keyword) {
      return this.article.title.replace(new RegExp(this.keyword, 'g'), `<span class="keyword">${this.keyword}</span>`)
    }
    return this.article.title
  }

  private get thumb () {
    return this.article.thumb + '?x-oss-process=image/resize,m_fill,w_300,h_180,limit_0/auto-orient,1/quality,q_60/watermark,text_am9vZ2VyLm1l,type_ZmFuZ3poZW5naGVpdGk,size_16,t_80,shadow_100,color_f9f9f9,g_ne,y_10,x_10'
  }
}
