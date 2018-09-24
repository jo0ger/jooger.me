/**
 * @desc Tags
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:29:30
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Card, Tag } from '@/components/common'

@Component({
  name: 'Tags',
  components: {
    Card,
    Tag
  }
})
export default class Tags extends Base {
}
