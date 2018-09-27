/**
 * @desc Affix
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:30:44
 */

import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'
import { getScroll, getOffset } from '@/utils'

@Component({
  name: 'Affix',
})
export default class Affix extends Base {
  @Prop({ default: 0 })
  private offsetTop!: number

  @Prop()
  private offsetBottom!: number

  private fixed: boolean = false
  private style: any = {}
  private initialOffset: any = 0
  private resizeHandler: any = null

  private get offsetType () {
    return this.offsetBottom !== undefined && this.offsetBottom !== null ? 'bottom' : 'top'
  }

  @Watch('offsetTop')
  public watchOffsetTop (newVal, oldVal) {
    if (newVal !== null && oldVal !== undefined && typeof newVal === 'number') {
      this.handleScroll()
      if (!this.resizeHandler) {
        // 只绑定一次
        this.bindEvent()
      }
    }
  }

  private mounted () {
    this.init()
  }

  private beforeDestroy () {
    this.unbindEvent()
  }

  private activated () {
    this.init()
  }

  // keep-alive动态组件缓存的话，不会销毁组件实例
  // 必须在这里解绑event
  // 缓存组件每次mounted时，都是不同的组件了
  private deactivated () {
    this.unbindEvent()
  }

  private init () {
    this.initialOffset = getOffset(this.$el)
    this.handleScroll()
    if (!this.resizeHandler) {
      this.bindEvent()
    }
  }

  private bindEvent () {
    if (this.offsetTop === null) {
      return
    }
    window.addEventListener('scroll', this.handleScroll, false)
    // 这里得套一层，不然用bind的话，在unbindEvent中获取不到
    this.resizeHandler = e => this.handleScroll(e, true)
    window.addEventListener('resize', this.resizeHandler, false)
  }

  private unbindEvent () {
    window.removeEventListener('scroll', this.handleScroll, false)
    window.removeEventListener('resize', this.resizeHandler, false)
    this.resizeHandler = null
    this.fixed = false
  }

  // isResize判定是否是window resize触发
  // window resize触发的话需要获取父元素的width和offsetLeft
  private handleScroll (e?: Event, isResize = false) {
    const fixed = this.fixed
    const scrollTop = getScroll(window, true)
    const elOffset = getOffset(this.$el)
    const windowHeight = window.innerHeight
    const elHeight = this.$el.offsetHeight
    let parent: Node | null = null
    let parentOffset: any = null
    // Fixed Top
    if (((this.offsetType === 'top' && (elOffset.top - this.offsetTop) < scrollTop && !fixed) || (isResize && fixed))) {
      this.fixed = true
      if ((isResize && fixed)) {
        parent = this.$el.parentNode
        parentOffset = getOffset(parent)
      }
      this.style = {
        top: `${this.offsetTop}px`,
        left: `${(isResize && fixed) ? parentOffset.left : elOffset.left}px`,
        width: `${(isResize && fixed) ? (parent as any).offsetWidth : this.$el.offsetWidth}px`
      }
      this.$emit('on-change', true)
    } else if ((this.initialOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && fixed) {
      this.fixed = false
      this.style = null
      this.$emit('on-change', false)
    }
    // Fixed Bottom
    if (this.offsetType === 'bottom' && (((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && !fixed) || (isResize && fixed))) {
      this.fixed = true
      if ((isResize && fixed)) {
        parent = this.$el.parentNode
        parentOffset = getOffset(parent)
      }
      this.style = {
        bottom: `${this.offsetBottom}px`,
        left: `${(isResize && fixed) ? parentOffset.left : elOffset.left}px`,
        width: `${(isResize && fixed) ? (parent as any).offsetWidth : this.$el.offsetWidth}px`
      }
      this.$emit('on-change', true)
    } else if ((this.initialOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && fixed) {
      this.fixed = false
      this.style = null
      this.$emit('on-change', false)
    }
  }
}
