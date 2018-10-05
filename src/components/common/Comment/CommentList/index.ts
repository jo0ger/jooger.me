/**
 * @desc CommentList
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:22:54
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { Card, Loading } from '@/components/common'
import CommentItem from '../ComemntItem/index.vue'
import CommentInputBox from '../CommentInputBox/index.vue'
import { namespace } from 'vuex-class'

const articleMod = namespace('article')

interface Sort {
  sortBy: 'createdAt' | 'updatedAt' | 'ups'
  order: -1 | 1
}

@Component({
  name: 'CommentList',
  components: {
    Card,
    Loading,
    CommentItem,
    CommentInputBox
  }
})
export default class CommentList extends Base {
  @Prop({ type: Array, default: () => ([]) })
  private list!: WebApi.CommentModule.Comment[]

  @Prop({ type: Object })
  private pageInfo!: WebApi.PageInfo

  @Prop({ type: Boolean, default: false })
  private loading!: boolean

  @Prop({ type: String, default: '' })
  private parent!: string

  @Prop({
    type: Object,
    validator (val) {
      return ['sortBy', 'order'].every(item => val.hasOwnProperty(item))
    },
    default () {
      return {
        sortBy: 'createdAt',
        order: -1
      }
    }
  })
  private sort!: Sort

  @Prop({ type: Boolean, default: false })
  private isChild!: boolean

  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article

  private replyTarget: any = null

  private get latestSort () {
    const { sortBy, order } = this.sort
    return sortBy === 'createdAt' && order === -1
  }

  private get hottestSort () {
    const { sortBy, order } = this.sort
    return sortBy === 'ups' && order === -1
  }

  private get hasNoMore () {
    return this.pageInfo.total > 0 && this.pageInfo.current >= this.pageInfo.pages && this.pageInfo.pages >= 1
  }

  private get listType () {
    return this.isChild ? '回复' : this.article ? '评论' : '留言'
  }

  private handleSort (sortBy, order) {
    if ((sortBy === this.sort.sortBy && order === this.sort.order) || this.loading) {
      return
    }
    this.$emit('on-sort', { sortBy, order })
  }

  private handleLoadmore () {
    if (this.loading) {
      return
    }
    this.$emit('on-loadmore', this.pageInfo.current + 1)
  }

  private handleClearReply () {
    this.replyTarget = null
  }

  private handleSetReply (index) {
    this.replyTarget = this.list[index]
    const inputBox = this.$refs.inputBox as any
    inputBox.$refs.editor.$refs.input.focus()
    this.$scrollTo(inputBox.$el, 500, {
      offset: -document.body.clientHeight / 2
    })
  }

  private handleReplyPublish (reply) {
    this.$emit('on-reply-publish', reply)
  }

  private handleSubReplyPublish (index) {
    this.$emit('on-reply')
  }
}
