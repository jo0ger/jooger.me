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
  public list!: any[]

  @Prop({ default: false })
  public router!: boolean

  private value: number | string = -1
  private cornerStyle: any = null

  @Watch('value')
  public watchValue () {
    this.setCornerStyle()
  }

  @Watch('$route.name')
  public watchRoute (val) {
    if (this.$router) {
      if (!this.config.MENUS.find(item => item.key === val)) {
        this.value = -1
      } else {
        this.init()
        this.setCornerStyle()
      }
    }
  }

  private created () {
    this.init()
  }

  private mounted () {
    this.setCornerStyle()
  }

  private init () {
    if (this.router) {
      const name = this.$route.name
      const index = this.list.findIndex(item => item.key === name)
      this.value = index
    }
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
