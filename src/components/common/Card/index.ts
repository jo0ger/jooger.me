/**
 * @desc Card
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 01:26:12
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'Card',
})
export default class Card extends Base {
  @Prop({ default: '' })
  public header!: string

  @Prop({ default: null })
  public borderStyle!: any

  @Prop({ default: false })
  public bordered!: boolean
}
