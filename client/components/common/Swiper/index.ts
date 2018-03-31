/**
 * @desc swiper封装组件
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

import { Vue, Component, Prop } from 'vue-property-decorator'

interface Options {
  spaceBetween?: number
  setWrapperSize?: boolean
  observeParents?: boolean
  grabCursor?: boolean
  slidesPerView?: number | string
}

@Component
export default class Swiper extends Vue {
  @Prop()
  options: object

  @Prop([Array])
  list: Array<any>

  swiperOptions: Options = {
    spaceBetween: 16,
    setWrapperSize: true,
    observeParents: true,
    grabCursor: true
  }

  maxPreview = 4

  created () {
    this.updateSwiper()
  }

  destroy () {
    this.swiper && this.swiper.destroy()
  }

  updateSwiper () {
    const defaultSlot = this.$slots.default
    const childCount = defaultSlot && defaultSlot.length || 0
    if (childCount <= this.maxPreview) {
      this.swiperOptions.slidesPerView = childCount
    } else {
      this.swiperOptions.slidesPerView = this.maxPreview
    }
    Object.assign(this.swiperOptions, this.options)
  }
}
