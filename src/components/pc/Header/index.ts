/**
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-21 00:46:22
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Tab } from '@/components/common'
import { namespace } from 'vuex-class'

const appMod = namespace('app')
const articleMod = namespace('article')
@Component({
  name: 'Header',
  components: {
    Tab
  }
})
export default class Header extends Base {
  @appMod.Getter private showArticleTitle!: boolean
  @articleMod.Getter('detail') private article

  private keyword: string = ''

  private search () {
    if (!this.keyword) return
    this.$router.push(`/search/${this.keyword}`)
    if (this.$refs.menu) (this.$refs.menu as any).clear()
    this.keyword = ''
    window.gtagEvent('article_search', {
      event_category: 'article_search',
      event_label: '文章搜索',
      value: 1
    })
  }
}
