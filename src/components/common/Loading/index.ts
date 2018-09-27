/**
 * @desc Loading
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 13:32:09
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'Loading',
})
export default class Loading extends Base {
  @Prop({ default: '加载中...' })
  public text!: string

  @Prop({
    default: 'small',
    validator (val) {
      return ['large', 'default', 'small'].includes(val)
    }
  })
  public size!: string

  @Prop({ default: false })
  public dark!: boolean
}
