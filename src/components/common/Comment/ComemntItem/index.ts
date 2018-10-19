/**
 * @desc ComemntItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:23:07
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { CommentStateTree } from 'utils/interfaces'
import { UAParse, OSParse } from '@/utils'

@Component({
  name: 'ComemntItem',
})
export default class ComemntItem extends Base {
  @Prop({ type: Object, default: () => ({}) })
  private comment!: WebApi.CommentModule.Comment

  @Prop({ type: Number, required: true })
  private index!: number

  @Prop({ type: Boolean, default: false })
  private isChild!: boolean

  private fetching = false
  private liking = false
  private showSub = false
  private children: WebApi.CommentModule.Comment[] = []
  private pageInfo: any = {}
  private sort: CommentStateTree['sort'] = {
    sortBy: 'createdAt',
    order: -1
  }
  private UAParse = UAParse
  private OSParse = OSParse

  private get forward () {
    if (!this.comment.forward) {
      return null
    } else if (this.comment.forward._id === this.comment.parent._id) {
      return null
    }
    return this.comment.forward
  }

  private get isLiked () {
    return !!this.history.comments.find(item => item === this.comment._id)
  }

  private beforeCreate () {
    (this.$options as any).components.CommentList = require('../CommentList/index.vue').default
  }

  private mounted () {
    // HACK: 去掉的话，icon-like不会fill
    this.$forceUpdate()
  }

  private async fetchSubList (params = {}) {
    this.fetching = true
    const { success, data } = await this.api.getCommentList(Object.assign({}, {
      article: this.comment.article as string,
      limit: this.pageInfo.limit || 5,
      page: (this.pageInfo ? this.pageInfo.current : 0) + 1,
      parent: this.comment._id
    }, params))
    this.fetching = false
    if (success) {
      this.pageInfo = data.pageInfo
      if (this.pageInfo.current === 1) {
        this.children = data.list
      } else {
        this.children.push(...data.list)
      }
    }
  }

  private async handleLike () {
    if (this.isLiked) {
      return this.$message.info('你已经点过赞了')
    }
    if (this.liking) {
      return
    }
    this.liking = true
    const like = !this.isLiked
    const success = await this.$store.dispatch('comment/like', this.comment._id)
    this.liking = false
    if (success && this.isChild) {
      const parentComment = this.$parent.$parent.$parent.$parent
      const child = (parentComment as any).children.find(child => child._id === this.comment._id)
      if (child) {
        child.ups += (like ? 1 : -1)
      }
    }
    window.gtagEvent('article_comment_like', {
      event_category: 'article_comment_like',
      event_label: '文章评论点赞',
      value: 1
    })
  }

  private handleToggleSubComments () {
    if (!this.isChild) {
      // 一级评论可以展示子评论
      this.showSub = !this.showSub
      if (this.showSub) {
        this.handleSubSort({
          sortBy: 'createdAt',
          order: 1
        })
      }
    } else {
      this.$emit('on-reply', this.index)
    }
  }

  private handleSubSort ({ sortBy, order }, params: any = {}) {
    this.sort = { sortBy, order }
    params = Object.assign({ page: 1 }, params, {
      sortBy,
      order
    })
    if (params.page === 1) {
      this.children = []
      this.pageInfo = {}
    }
    this.fetchSubList(params)
  }

  private handleSubLoadmore (page) {
    this.handleSubSort(this.sort, { page })
  }

  private handleReplyPublish () {
    this.$emit('on-reply-publish')
    this.handleSubSort({
      sortBy: 'createdAt',
      order: 1
    }, {
      page: 1
    })
  }
}
