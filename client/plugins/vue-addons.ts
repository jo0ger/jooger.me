/**
 * @desc vue插件集合
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

export default () => {
  if ((process as any).client) {
    Vue.use(VueAwesomeSwiper)
  }
}
