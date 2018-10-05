/**
 * @desc MessageItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 14:33:59
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { Card } from '@/components/common'

@Component({
  name: 'MessageItem',
  components: {
    Card
  }
})
export default class MessageItem extends Base {
  @Prop({ type: Object, required: true })
  private message!: WebApi.CommentModule.Comment

  private liking = false

  private get isLiked () {
    return !!this.history.comments.find(item => item === this.message._id)
  }

  private async like () {
    if (this.isLiked) {
      return this.$message.info('你已经点过赞了')
    }
    if (this.liking) {
      return
    }
    this.liking = true
    await this.$store.dispatch('comment/like', this.message._id)
    this.liking = false
  }
}
