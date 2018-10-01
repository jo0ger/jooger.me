/**
 * @desc Popover
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-01 01:31:01
 */

import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'

@Component({
  name: 'Popover',
})
export default class Popover extends Base {
  @Prop({ type: String, default: 'top' })
  private placement!: 'top' | 'right' | 'bottom' | 'left'

  @Prop({ type: Boolean, default: false })
  private value!: boolean

  private style: any = {}

  @Watch('value')
  private watchValue (val) {
    if (val) {
      this.$nextTick(() => {
        this.setPopoverStyle()
      })
    }
  }

  private get transitionName () {
    return {
      top: 'slide-up',
      right: 'slide-right',
      bottom: 'slide-down',
      left: 'slide-left'
    }[this.placement] || 'fade'
  }

  private setPopoverStyle () {
    const style: any = {}
    const el = this.$el
    if (el && el.nodeType === 1) {
      const rect = el.getBoundingClientRect()
      if (this.placement === 'bottom') {
        style.bottom = `-${rect.height}px`
      } else if (this.placement === 'top') {
        style.top = `-${rect.height}px`
      } else if (this.placement === 'left') {
        style.left = `-${rect.width}px`
      } else if (this.placement === 'right') {
        style.right = `-${rect.width}px`
      }
    }
    this.style = style
  }

  private close () {
    this.$emit('input', false)
  }
}
