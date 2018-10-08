/**
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-01 18:10:43
 */

import Base from '@/base'
import { Component, Watch } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const appMod = namespace('app')
const articleMod = namespace('article')

@Component({
  name: 'Header',
})
export default class Header extends Base {
  @appMod.Getter private showArticleTitle!: boolean
  @articleMod.Getter('detail') private article

  private menuOpened = false
  private searchOpened = false
  private keyword = ''

  private get overylayVisible () {
    return this.menuOpened || this.searchOpened
  }

  @Watch('searchOpened')
  private watchSearchOpened (val) {
    this.$nextTick(() => {
      const ele = this.$refs.searchInput as any
      if (val) {
        this.menuOpened = false
        ele.focus()
      } else {
        this.keyword = ''
      }
    })
  }

  @Watch('overylayVisible')
  private watchOverlay (val) {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  private search () {
    if (!this.keyword) return
    this.$router.push(`/search/${this.keyword}`)
    if (this.$refs.menu) (this.$refs.menu as any).clear()
    this.keyword = ''
    this.searchOpened = false
    window.gtagEvent('article_search', {
      event_category: 'article_search',
      event_label: '文章搜索',
      value: 1
    })
  }

  private closeOverlay () {
    this.menuOpened = false
    this.searchOpened = false
  }
}
