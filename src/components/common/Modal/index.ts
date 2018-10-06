/**
 * @desc Modal
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 12:15:55
 */

import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'

@Component({
  name: 'Modal',
})
export default class Modal extends Base {
  @Prop({ type: Boolean, default: false })
  private value!: boolean

  @Prop({ type: String, default: '' })
  private title!: string

  @Prop({ type: [Number, String], default: 600 })
  private width!: number

  private get wrapperStyle () {
    return {
      width: this.width + 'px'
    }
  }

  @Watch('value')
  private watchValue (val) {
    document.body.style.overflow = val ? 'hidden' : ''
  }

  private close () {
    this.$emit('input', false)
  }
}
