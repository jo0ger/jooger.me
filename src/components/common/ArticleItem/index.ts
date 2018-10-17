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
    return this.article.thumb + '?x-oss-process=style/watermark'
  }
}
