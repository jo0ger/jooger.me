/**
 * @desc ArticleList
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 16:56:51
 */

import Base from '@/base'
import { namespace } from 'vuex-class'
import { Component, Prop } from '@/utils/decorators'
import Loading from '../Loading/index.vue'
import ArticleItem from '../ArticleItem/index.vue'

const aMod = namespace('article')

@Component({
  name: 'ArticleList',
  components: {
    ArticleItem,
    Loading
  }
})
export default class ArticleList extends Base {
  @Prop()
  private list!: WebApi.ArticleModule.Article[]

  @Prop()
  private pageInfo!: WebApi.PageInfo

  @Prop()
  private loading!: boolean

  @Prop()
  private mini!: boolean

  private get hasNoMore () {
    return this.pageInfo.total > 0
      && this.pageInfo.current >= this.pageInfo.pages
      && this.pageInfo.pages >= 1
  }

  private loadmore () {
    this.$emit('on-loadmore', this.pageInfo)
  }
}
