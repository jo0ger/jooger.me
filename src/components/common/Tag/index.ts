/**
 * @desc Tag
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:51:33
 */

import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'

@Component({
  name: 'Tag',
})
export default class Tag extends Base {
  @Prop() private name!: string
  @Prop() private icon!: string
  @Prop() private count!: number
  @Prop() private link!: boolean
}
