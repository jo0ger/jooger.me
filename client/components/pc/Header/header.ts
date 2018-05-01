/**
 * @desc header
 * @author Jooger <iamjooger@gmail.com>
 * @since 2018-4-29
 */

import { Vue, Component } from 'vue-property-decorator'
import template from './header.vue'

@Component({
  name: 'header',
  mixins: [template]
})
export default class Header extends Vue {

}
