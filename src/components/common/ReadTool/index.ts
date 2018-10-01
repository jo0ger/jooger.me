/**
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { Like } from '@/components/common'
import { requestFullscreen, exitFullscreen } from '@/utils'

@Component({
  name: 'ReadTool',
  components: {
    Like
  }
})
export default class ReadTool extends Base {
  @Prop({ default: null })
  private article!: WebApi.ArticleModule.Article

  @Prop({ default: false })
  private liking!: boolean

  @Prop({ type: Boolean, default: false })
  private liked!: boolean

  private like () {
    if (this.liked) return this.$message.info('你已经点过赞了')
    this.$emit('on-like')
  }

  private gotoComment () {}

  private share () {}

  private setFont (inc) {
    this.$bus.$emit('on-article-fontsize-change', inc)
  }

  private handleShare () {}

  private toggleFullScreen () {
    if (this.fullScreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }
}
