/**
 * @desc swiper封装组件
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

import { Vue, Component, Prop } from 'vue-property-decorator'

// interface SwiperList {

// }

@Component
export default class Swiper extends Vue {
  @Prop()
  options: object

  @Prop([Array])
  list: Array<any>

  swiperOptions = {
    spaceBetween: 16,
    setWrapperSize: true,
    observeParents: true,
    grabCursor: true,
    slidesPerView: 'auto'
  }

  banners = ['全部', '编码', '生活', '思考', '吐槽', '感悟']
}
