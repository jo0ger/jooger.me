/**
 * @desc ArticleSource
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-11-27 23:09:36
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'ArticleSource',
})
export default class ArticleSource extends Base {
  @Prop({ type: Number })
  private data!: number
}
