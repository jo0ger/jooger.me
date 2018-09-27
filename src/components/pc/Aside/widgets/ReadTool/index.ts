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
    { key: 'share', title: '文章分享' },
    { key: 'font', title: '文字大小' },
    { key: 'fullcolumn', title: '通栏阅读' },
    { key: 'fullscreen', title: '全屏阅读' }
  ]

  private toolClick (tool) {
    switch (tool.key) {
      case 'fullcolumn':
        this.setFullColumn(true)
        break
    }
  }
}
