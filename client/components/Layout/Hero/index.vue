<template>
  <div class="layout-hero">
    <div class="wrapper" :style="heroStyle">
      <!-- Swiper -->
      <div class="hero-swiper" key="swiper" v-if="heroType === 'swiper' && option.banners">
        <div class="swiper-container" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <template v-for="item in option.banners">
              <div class="swiper-slide" :key="item" :style="getSwiperStyle(item)" v-if="!isVideoType(item)"></div>
              <video class="swiper-slide" :src="item" :key="item" autoplay v-else></video>
            </template>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets" v-if="option.banners.length > 1"></div>
        </div>
      </div>
      <!-- fly bird -->
      <div class="hero-life" key="life" v-else-if="heroType === 'life'">
        <div class="fly-me">
          <div class="sky">
            <div class="wind" v-for="n in 20" :key="n"></div>
            <div class="body">
              <div class="head"></div>
              <div class="wing-left">
                <div class="wing-left-top"></div>
              </div>
              <div class="wing-right">
                <div class="wing-right-top"></div>
              </div>
              <div class="tail-left"></div>
              <div class="tail-right"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- error -->
      <div class="hero-error" key="error" v-else></div>
      <transition name="fade">
        <a class="trigger" v-if="showTrigger" @click.prevent.stop="handleGoToContent"></a>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { scrollTo, easing, isVideoType } from '~/utils'

  export default {
    name: 'Layout-Hero',
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          speed: 1500,
          setWrapperSize: true,
          grabCursor: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          preloadImages: false,
          lazyLoading: true,
          effect: 'fade',
          fade: {
            crossFade: true
          }
        },
        showContent: false,
        contentDelta: 80
      }
    },
    computed: {
      ...mapGetters({
        option: 'option/option'
      }),
      heroType () {
        switch (this.$route.name) {
          case 'index':
            return 'swiper'
          case 'about':
            return 'life'
          case 'blog-article-id':
            return 'article'
          default:
            return 'error'
        }
      },
      heroStyle () {
        return {
          opacity: this.showContent ? 0.3 : 0.6,
          filter: this.showContent ? 'blur(4px)' : null
        }
      },
      showTrigger () {
        return !this.showContent && ['about'].includes(this.$route.name)
      }
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
    mounted () {
      this.init()
    },
    updated () {
      this.triggerResize()
    },
    methods: {
      isVideoType,
      init () {
        if (!this._scrollerHandler) {
          this._scrollerHandler = e => {
            this.showContent = window.pageYOffset >= this.contentDelta
          }
        }
        window.addEventListener('scroll', this._scrollerHandler, { passive: true })
        this._scrollerHandler()
      },
      getSwiperStyle (banner) {
        return {
          backgroundImage: `url(${banner})`
        }
      },
      handleGoToContent () {
        scrollTo(window.innerHeight, 800, { easing: easing['fuck'] })
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
          if (process.env.NODE_ENV !== 'production') {
            console.log('trigger window resize')
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .layout-hero {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 0

    .wrapper {
      width 100%
      height 100%
      opacity 1
      transition all .5s $ease-out
    }

    .hero {
      &-swiper
      &-life
      &-error {
        width 100%
        height 100%
      }

      &-swiper {
        .swiper {
          &-container {
            height 100%
          }
          &-slide {
            background-repeat no-repeat
            background-size cover
            background-position center center

            img {
              display none
            }
          }

          &-pagination-bullets {
            padding 0 20px
          }
        }
      }

      &-life {
        flexLayout()
      }

      &-error {
        background url('~/static/image/error-page-banner.jpg') no-repeat center center
        background-size auto
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
        transform translate(-80%, -50%) rotate(45deg)
        transform-origin center center
      }

      &::after {
        transform translate(-20%, -50%) rotate(-45deg)
      }
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform translateY(15px)
    }

    50% {
      transform translateY(0)
    }
  }
</style>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .fly-me {
    perspective 400px

    .sky {
      will-change auto
      transform-style preserve-3d
      animation fly 10000ms linear infinite

      .wind {
        position absolute
        left 50%
        width 10px
        height 200px
        margin-left -2px
        border-radius 9999px
        overflow hidden
        will-change auto

        for n in 1..20 {
          &:nth-child({n}) {
            transform translate3d(
              random(-400, 400) - 0px,
              random(-300, 300) - 150px,
              random(-200, 200) - 100px
            ) rotateY(90deg)

            &::before {
              content ''
              position absolute
              width 10px
              height 300px
              background rgba(red($base-color), green($base-color), random(,255), .3)
              border-radius 999px
              transform translateY(-300px)
              animation wind (random(,2000) + 1000ms) (random(,4000) + 1000ms) linear infinite
            }
          }
        }
      }

      .body {
        position relative
        width 30px
        height 40px
        background alpha($base-color, .8)

        .head {
          position absolute
          top -30px
          border-right 15px solid transparent
          border-bottom 30px solid alpha($base-color, .8)
          border-left 15px solid transparent
          transform-origin 50% 100%
          transform rotateX(-20deg)
        }

        .wing-left {
          position absolute
          left -30px
          height 100%
          border-right 30px solid alpha($base-color, .8)
          border-bottom 10px solid transparent
          transform-origin 100% 0
          animation wing-left 1000ms cubic-bezier(.36, .10, .16, 1) infinite alternate

          &-top {
            position absolute
            left -30px
            border-right 30px solid alpha($base-color, .8)
            border-bottom 30px solid transparent
            transform-origin 100% 0
            animation wing-left 1000ms cubic-bezier(.545, .08, .52, .975) infinite alternate
          }
        }

        .wing-right {
          position absolute
          left 30px
          height 100%
          border-left 30px solid alpha($base-color, .8)
          border-bottom 10px solid transparent
          transform-origin 0 0
          animation wing-right 1000ms cubic-bezier(.36, .10, .16, 1) infinite alternate

          &-top {
            position absolute
            border-left 30px solid alpha($base-color, .8)
            border-bottom 30px solid transparent
            transform-origin 0 0
            animation wing-right 1000ms cubic-bezier(.545, .08, .52, .975) infinite alternate
          }
        }

        .tail-left {
          position absolute
          top 40px
          border-right 30px solid transparent
          border-top 40px solid alpha($base-color, .8)
          transform-origin 50% 0
          transform rotateX(-20deg)
        }

        .tail-right {
          position absolute
          top 40px
          border-left 30px solid transparent
          border-top 40px solid alpha($base-color, .8)
          transform-origin 50% 0
          transform rotateX(-20deg)
        }
      }
    }
  }

  @keyframes fly {
    0% {
      transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
    }
    100% {
      transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
    }
  }
  @keyframes wing-left {
    0% {
      transform: rotateY(-40deg);
    }
    100% {
      transform: rotateY(40deg);
    }
  }
  @keyframes wing-right {
    0% {
      transform: rotateY(40deg);
    }
    100% {
      transform: rotateY(-40deg);
    }
  }
  @keyframes wind {
    0% {
      transform: translateY(-300px);
    }
    100% {
      transform: translateY(200px);
    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'

  .swiper-pagination {
    text-align center
    &-bullet {
      width 20px
      height 2px
      border-radius 1px
      background alpha($white, .9)
      opacity .4
      transition opacity .3s $ease
      &-active {
        opacity 1
      }
    }
  }
</style>
