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
  @Prop()
  private article!: any
}
