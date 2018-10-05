/**
 * @desc Modal
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 12:15:55
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'Modal',
})
export default class Modal extends Base {
  @Prop({ type: Boolean, default: false })
  private value!: boolean

  @Prop({ type: [Number, String], default: 600 })
  private width!: number

  private get wrapperStyle () {
    return {
      width: this.width + 'px'
    }
  }

  private close () {
    this.$emit('input', false)
  }
}
