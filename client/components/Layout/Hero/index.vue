<template>
  <div class="layout-hero">
    <div class="wrapper" :style="bannerStyle">
      <!-- Swiper -->
      <div class="hero-swiper" v-if="type === 'swiper'">
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
      <div class="hero-life" v-else-if="type === 'life'">
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
      <div class="hero-error" v-else></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { scrollTo, easing, isVideoType } from '~/utils'

  export default {
    name: 'Layout-Hero',
    props: {
      type: {
        type: String,
        validator (val) {
          return ['swiper', 'life', 'error'].includes(val)
        }
      }
    },
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          speed: 500,
          setWrapperSize: true,
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
      bannerStyle () {
        return {
          opacity: this.showContent ? 0.3 : .6,
          filter: this.showContent ? 'blur(4px)' : null
        }
      }
    },
    beforeDestroy () {
      if (this._scrollerHandler) {
        window.removeEventListener('scroll', this._scrollerHandler)
        this._scrollerHandler = null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      isVideoType,
      init () {
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
      handleGoToContent () {
        scrollTo(window.innerHeight, 800, { easing: easing['fuck'] })
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
      opacity .6
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

  .swiper-pagination-bullet {
    width 20px
    height 2px
    border-radius 1px
    background alpha($white, .9)
    opacity .4
    &-active {
      opacity 1
    }
  }
  
</style>
