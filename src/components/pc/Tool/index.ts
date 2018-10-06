/**
 * @desc Tool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 17:12:13
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { getScroll } from '@/utils'
import { namespace } from 'vuex-class'

const { Action } = namespace('app')

@Component({
  name: 'Tool',
})
export default class Tool extends Base {
  @Action private updateTheme

  private showScrollTop = false

  private mounted () {
    this.init()
  }

  private beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  private init () {
    window.addEventListener('scroll', this.handleScroll)
  }

  private handleScroll () {
    const scrollTop = getScroll(document.body, true)
    this.showScrollTop = scrollTop * 2 > window.screen.availHeight
  }

  private goTop () {
    this.$scrollTo(0, 500, {
      easing: 'ease'
    })
  }
}
