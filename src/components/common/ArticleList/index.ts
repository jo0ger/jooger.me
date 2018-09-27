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
  @aMod.Getter('list') public articleList!: WebApi.ArticleModule.Article[]
  @aMod.Getter('listFetching') public articleListFetching!: boolean
  @aMod.Getter public pageInfo!: WebApi.PageInfo
  @aMod.Action('fetchList') public getArticleList!: () => void

  @Prop()
  private mini!: boolean

  private get hasNoMore () {
    return this.pageInfo.total > 0
      && this.pageInfo.current >= this.pageInfo.pages
      && this.pageInfo.pages >= 1
  }

  private loadmore () {
    this.getArticleList()
  }
}
