<template>
  <div class="banner">
    <div class="swiper-container" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banners" :key="item" :style="getStyle(item)">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Layout-Banner',
    data () {
      return {
        banners: [
          require('~/static/image/pexels-photo-169573.jpeg'),
          require('~/static/image/pexels-photo-90639.jpeg')
        ],
        swiperOption: {
          autoplay: 5000,
          initialSlide: 1,
          speed: 1000,
          loop: true,
          grabCursor: true,
          pagination: '.swiper-pagination'
        }
      }
    },
    methods: {
      getStyle (banner) {
        return {
          backgroundImage: `url(${banner})`
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .banner {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 1

    .swiper-container {
      width 100%
      height @width

      .swiper-slide {
        background-repeat no-repeat
        background-size cover
        background-position center center
        opacity .8

        img {
          display none
        }
      }

      .swiper-pagination-bullets {
        padding 0 20px
        text-align right
      }
    }

  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'

  .swiper-pagination-bullet-active {
    background $base-color
  }
  
</style>
