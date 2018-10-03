/**
 * @desc Message
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 17:45:40
 */

import Base from '@/base'
import { Component, Watch } from '@/utils/decorators'
import { isType, noop } from '@/utils'

export interface MessageOption {
  type?: 'success' | 'error' | 'warn' | 'info'
  visible?: boolean
  message: string
  duration?: number
  onClose?: (args: any) => any
}

@Component({
  name: 'Message',
})
export default class Message extends Base {
  private type: MessageOption['type'] = 'info'
  private visible = false
  private message = ''
  private duration = 2000
  private closed = false
  private onClose: ((args: any) => any) = noop
  private timer: null | NodeJS.Timer = null

  @Watch('closed')
  private watchClosed (val) {
    if (val) {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroy, { passive: true })
    }
  }

  private mounted () {
    this.startTimer()
  }

  private startTimer () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
  }

  private close () {
    this.closed = true
    if (isType(this.onClose, 'Function')) {
      this.onClose(this)
    }
  }

  private destroy () {
    this.$el.removeEventListener('transitionend', this.destroy)
    this.$destroy()
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
