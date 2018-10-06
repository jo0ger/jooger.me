/**
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { Popover } from '@/components/common'
import { requestFullscreen, exitFullscreen } from '@/utils'

@Component({
  name: 'ReadTool',
  components: {
    Popover
  }
})
export default class ReadTool extends Base {
  @Prop({ default: null })
  private article!: WebApi.ArticleModule.Article

  @Prop({ default: false })
  private liking!: boolean

  @Prop({ type: Boolean, default: false })
  private liked!: boolean

  private shareBoxVisible = false
  private fontBoxVisible = false

  private mounted () {
    this.$forceUpdate()
  }

  private like () {
    if (this.liking) return
    if (this.liked) return this.$message.info('你已经点过赞了')
    this.$emit('on-like')
  }

  private gotoComment () {
    this.$scrollToComments()
  }

  private share ({ key }) {
    this.$share.share(key)
    this.$nextTick(() => {
      this.shareBoxVisible = false
    })
  }

  private setFont (inc) {
    this.$bus.$emit('on-article-fontsize-change', inc)
  }

  private toggleFullScreen () {
    if (this.fullScreen) {
      exitFullscreen()
    } else {
      requestFullscreen()
      this.setFullColumn(true)
    }
  }
}
