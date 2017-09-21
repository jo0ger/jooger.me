<template>
  <div class="banner">
    <div class="banner-swiper" v-if="showSwiper && option.banners">
      <div class="swiper-container" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in option.banners" :key="item" :style="getSwiperStyle(item)">
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
    </div>
    <div class="banner-bg" :style="bannerBgStyle" v-else-if="option.aboutBanner"></div>
    <transition name="fade">
      <a class="trigger" v-if="showTrigger" @click.prevent.stop="handleGoToContent"></a>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { scrollTo, easing } from '~/utils'

  export default {
    name: 'Layout-Banner',
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 1,
          speed: 500,
          setWrapperSize: true,
          loop: true,
          grabCursor: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          preloadImages: false,
          lazyLoading: true
        },
        showContent: false,
        contentDelta: 80
      }
    },
    computed: {
      ...mapGetters({
        option: 'option/option'
      }),
      isAboutPage () {
        return this.$route.name === 'about'
      },
      showSwiper () {
        return !this.isAboutPage
      },
      showTrigger () {
        return !this.showContent && this.isAboutPage
      },
      bannerBgStyle () {
        return this.isAboutPage ? {
          backgroundImage: `url(${this.option.aboutBanner})`,
          opacity: this.showContent ? 0.3 : 0.6,
          filter: this.showContent ? 'blur(10px)' : null
        } : null
      }
    },
    watch: {
      showSwiper (val) {
        if (val) {
          this.triggerResize()
        }
      }
    },
    mounted () {
      this.init()
    },
    updated () {
      this.triggerResize()
    },
    beforeDestroy () {
      if (this._timer) {
        clearTimeout(this._timer)
        this._timer = null
      }
      if (this._scrollerHandler) {
        window.removeEventListener('scroll', this._scrollerHandler)
        this._scrollerHandler = null
      }
    },
    methods: {
      init () {
        this.triggerResize()
        if (!this._scrollerHandler) {
          this._scrollerHandler = e => {
            this.showContent = window.pageYOffset >= this.contentDelta
          }
        }
        window.addEventListener('scroll', this._scrollerHandler, false)
        this._scrollerHandler()
      },
      getSwiperStyle (banner) {
        return {
          backgroundImage: `url(${banner})`
        }
      },
      triggerResize () {
        if (this._timer) {
          clearTimeout(this._timer)
        }
        this._timer = setTimeout(() => {
          // HACK: 如果上一个页面有滚动条的话，那么会导致swiper没有覆盖整个可见视窗，会在右侧留下滚动条宽度的间隙
          // 只能这样hack了，500毫秒是试出来的
          const e = document.createEvent('HTMLEvents')
          e.initEvent('resize', true, true)
          window.dispatchEvent(e)
          console.log('trigger window resize')
        }, 1000)
      },
      handleGoToContent () {
        scrollTo(window.innerHeight, 800, { easing: easing['fuck'] })
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
    z-index 0

    .banner-swiper
    .banner-bg {
      width 100%
      height @width
    }

    .swiper-container {
      width 100%
      height @width

      .swiper-slide {
        background-repeat no-repeat
        background-size cover
        background-position center center
        opacity .6

        img {
          display none
        }
      }

      .swiper-pagination-bullets {
        padding 0 20px
      }
    }

    .banner-bg {
      background-repeat no-repeat
      background-size cover
      background-position center center
      opacity .8
      transition all .5s $ease-out
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
      animation bounce2 2s infinite

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

  @keyframes bounce2 {
    0%, 100% {
      transform translateY(15px)
    }

    50% {
      transform translateY(0)
    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'

  .swiper-pagination-bullet {
    width 20px
    height 2px
    border-radius 1px
    background alpha($white, .5)
    &-active {
      background alpha($white, .8)
    }
  }
  
</style>
