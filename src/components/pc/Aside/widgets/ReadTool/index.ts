/**
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Card } from '@/components/common'
import { namespace } from 'vuex-class'

const { Mutation } = namespace('app')

@Component({
  name: 'ReadTool',
  components: {
    Card
  }
})
export default class ReadTool extends Base {
  @Mutation('SET_FULL_COLUMN') private setFullColumn

  private tools = [
    { key: 'fullcolumn', title: '通栏阅读' },
    { key: 'fullscreen', title: '全屏阅读' }
  ]

  private toolClick (tool) {
    switch (tool.key) {
      case 'fullcolumn':
        this.setFullColumn(true)
        break
      case 'share':
        this.$message.info('123')
        break
    }
  }

  private share () {}

  private setFont (inc) {
    this.$bus.$emit('on-article-fontsize-change', inc)
  }

  private handleShare () {}
}
