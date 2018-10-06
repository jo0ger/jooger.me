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

  @Prop({ type: Boolean, default: false })
  private noMargin!: boolean

  @Prop({ type: Boolean, default: false })
  private noPadding!: boolean

  private get style () {
    const style: {
      [key: string]: any
    } = {}
    if (this.noMargin) {
      style.margin = 0
    }
    return style
  }
}
