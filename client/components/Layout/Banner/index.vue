<template>
  <div class="banner">
    <div class="swiper-container" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banners" :key="item" :style="getStyle(item)">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <!-- <a class="trigger"></a> -->
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
          speed: 1500,
          setWrapperSize: true,
          loop: true,
          grabCursor: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          preloadImages: false,
          lazyLoading: true
        }
      }
    },
    mounted () {
      this._timer = setTimeout(() => {
        // HACK: 如果上一个页面有滚动条的话，那么会导致swiper没有覆盖整个可见视窗，会在右侧留下滚动条宽度的间隙
        // 只能这样hack了，500毫秒是试出来的
        const e = document.createEvent('Event')
        e.initEvent('resize', true, true)
        window.dispatchEvent(e)
      }, 500)
    },
    beforeDestroy () {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
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


    .trigger {
      position absolute
      display block
      bottom 10px
      left 50%
      width 50px
      height @width
      margin-left -(@width / 2)
      z-index 1
      animation bounce 2s infinite

      &::before
      &::after {
        content ''
        position absolute
        display block
        top 50%
        left 50%
        width 15px
        height 2px
        background $white
        transform translate(-78%, -50%) rotate(45deg)
        transform-origin center center
      }

      &::after {
        transform translate(-22%, -50%) rotate(-45deg)
      }
    }

  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform translateY(0)
    }
    40% {
      transform translateY(-10px)
    }
    60% {
      transform translateY(-5px)
    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'

  .swiper-pagination-bullet-active {
    background $base-color
  }
  
</style>
