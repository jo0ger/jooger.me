/**
 * @desc Header组件
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

import {
  Vue,
  Component
} from 'vue-property-decorator'

export default class Header extends Vue {
  data () {
    return {
      name: 'Jooger'
    }
  }
}
