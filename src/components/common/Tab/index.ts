/**
 * @desc Tab
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 14:33:15
 */

import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'
import { isType } from '@/utils'

@Component({
  name: 'Tab',
})
export default class Tab extends Base {
  @Prop()
  list!: any[]

  @Prop()
  bordered!: boolean

  @Prop({ default: false })
  router!: boolean

  private value: number | string = -1
  private cornerStyle: any = null

  @Watch('value')
  watchValue () {
    this.setCornerStyle()
  }

  private created () {
    if (this.router) {
      const name = this.$route.name
      const index = this.list.findIndex(item => item.key === name)
      this.value = index
    }
  }

  private mounted () {
    this.setCornerStyle()
  }

  private setCornerStyle () {
    const index = isType(this.value, 'Number') ? this.value : this.list.findIndex(item => item.key === this.value)
    let el = this.$refs.tab ? this.$refs.tab[index] : null
    if (!el) {
      this.cornerStyle = null
    } else if (this.router) {
      el = el.$el
      this.cornerStyle = {
        left: el.offsetLeft + 'px',
        width: el.clientWidth + 'px'
      }
    }
  }

  private checkActive (item, index) {
    if (isType(this.value, 'Number')) {
      return this.value === index
    } else {
      return this.value === item.key
    }
  }

  private handleChangeTab (item, index) {
    const value = isType(this.value, 'Number') ? index : item.key
    this.value = value
    this.$emit('on-change', {
      index,
      value: item
    })
  }

  private clear () {
    this.value = -1
    this.cornerStyle = null
  }
}
