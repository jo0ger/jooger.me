/**
 * @desc Moment
 * @author jo0ger <iamjooger@gmail.com>
 * @date 2018-12-04 17:48:19
 */

import Base from '@/base'
import { Component } from '@/utils/decorators'
import Card from '../Card/index.vue'

@Component({
  name: 'Moment',
  components: {
    Card,
  },
})
export default class Moment extends Base {
  private swiperOption = {
    direction: 'vertical',
    allowTouchMove: false,
    setWrapperSize: true,
    mousewheel: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    observeParents: true,
    grabCursor: false,
    slidesPerView: 1
  }
}
