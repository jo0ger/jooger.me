/**
 * @desc Vue-swiper
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

export default ({ isClient }) => {
  if (isClient) {
    Vue.use(VueAwesomeSwiper)
  }
}
