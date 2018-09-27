/**
 * @desc Like
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 02:27:42
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'Like',
})
export default class Like extends Base {
  @Prop({ default: true })
  private showText!: boolean

  @Prop({ default: '喜欢' })
  private text!: string

  @Prop({ default: false })
  private liked!: boolean

  private click () {
    this.$emit('on-click')
  }
}
