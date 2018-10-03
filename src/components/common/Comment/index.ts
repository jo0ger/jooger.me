/**
 * @desc Comment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:21:14
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import CommentList from './CommentList/index.vue'
import CommentInputBox from './CommentInputBox/index.vue'
import { namespace } from 'vuex-class'
import { CommentStateTree } from '@/utils/interfaces'

const { Getter, Mutation, Action } = namespace('comment')
const articleMod = namespace('article')

@Component({
  name: 'Comment',
  components: {
    CommentList,
    CommentInputBox
  }
})
export default class Comment extends Base {
  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article
  @Getter('sort') private commentSort!: CommentStateTree['sort']
  @Getter('list') private commentList!: WebApi.CommentModule.Comment[]
  @Getter('listFetching') private commentListFetching!: boolean
  @Getter private pageInfo!: WebApi.PageInfo
  @Mutation('CHANGE_SORT') private changeSort
  @Mutation('CLEAR_LIST') private clearList
  @Action('fetchList') private fetchCommentList

  private handleSort ({ sortBy, order }, params: any = {}) {
    this.changeSort({ sortBy, order })
    params = Object.assign({
      page: 1,
      type: 1
    }, params)
    if (this.article) {
      params.type = 0
      params.article = this.article._id
    }
    if (params.page === 1) {
      this.clearList()
    }
    this.fetchCommentList(params)
  }

  private handleLoadmore (page) {
    this.handleSort(this.commentSort, { page })
  }

  private handleReply () {
    this.$emit('on-publish')
  }

  private handlePublish (comment) {
    this.$emit('on-publish', comment)
    this.handleSort({
      sortBy: 'createdAt',
      order: -1
    }, {
      page: 1
    })
  }
}
