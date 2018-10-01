/**
 * @desc Aside
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:27:56
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Affix } from '@/components/common'
import Hots from './widgets/Hots/index.vue'
import Calendar from './widgets/Calendar/index.vue'
import Tags from './widgets/Tags/index.vue'

@Component({
  name: 'Aside',
  components: {
    Affix,
    Hots,
    Calendar,
    Tags
  }
})
export default class Aside extends Base {
  private get showReadTool () {
    return this.$route.name === 'article-id'
  }
}
