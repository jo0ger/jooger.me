<template>
  <div class="tools">
    <div class="wrapper">
      <div class="tool-list">
        <a class="tool-item back" @click.prevent.stop="handleGoBack">
          <i class="iconfont icon-close"></i>
        </a>
        <a class="tool-item fullscreen" @click.prevent.stop="toggleFullScreen">
          <i class="iconfont" :class="{
            'icon-exit-fullscreen': fullScreen,
            'icon-fullscreen': !fullScreen
          }"></i>
        </a>
        <a href="mailto:iamjooger@gmail.com" target="_blank" rel="noopener" class="tool-item feedback">
          <i class="iconfont icon-email"></i>
        </a>
        <a class="tool-item go-to-top"
          @click.prevent.stop="handleGoToTop"
          @mouseover.prevent.stop="slowScroll(-3)"
          @mouseleave.prevent.stop="stopSlowScroll()">
          <i class="iconfont icon-arrow-up"></i>
        </a>
        <a class="tool-item go-to-bottom"
          @click.prevent.stop="handleGoToBottom"
          @mouseover.prevent.stop="slowScroll(3)"
          @mouseleave.prevent.stop="stopSlowScroll()">
          <i class="iconfont icon-arrow-down"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTo, easing, requestAnimationFrame, cancelAnimationFrame } from '~/utils'

  export default {
    name: 'Layout-Tools',
    data () {
      return {
        fullScreen: false
      }
    },
    methods: {
      toggleFullScreen () {
        this.fullScreen = !this.fullScreen
        if (this.fullScreen) {
          this.requestfullScreen()
        } else {
          this.exitFullScreen()
        }
      },
      requestfullScreen () {
        const documentElement = document.documentElement
        const requestFullScreen = documentElement.requestFullscreen
          || documentElement.webkitRequestFullscreen
          || documentElement.mozRequestFullScreen
          || documentElement.msRequestFullScreen
        if (requestFullScreen) {
          requestFullScreen.call(documentElement)
        }
      },
      exitFullScreen () {
        const documentElement = document.documentElement
        const exitFullScreen = document.exitFullscreen
          || document.webkitExitFullscreen
          || document.mozCancelFullScreen
          || document.msRequestFullScreen
        if (exitFullScreen) {
          exitFullScreen.call(document)
        }
      },
      handleGoBack () {
        this.$router.back()
      },
      slowScroll (delta = 2) {
        const step = () => {
          const scrollTop = window.scrollY
          const targetScrollTop = scrollTop + delta
          const canScroll = targetScrollTop > 0 && targetScrollTop < (document.documentElement.scrollHeight - window.innerHeight)
          if (!canScroll) {
            return false
          }
          window.scrollTo(0, targetScrollTop)
          cancelAnimationFrame(this._afid)
          this._afid = requestAnimationFrame(step)
        }
        this._afid = requestAnimationFrame(step)
      },
      stopSlowScroll () {
        cancelAnimationFrame(this._afid)
      },
      handleGoToTop () {
        scrollTo(0, 500, { easing: easing['fuck'] })
      },
      handleGoToBottom () {
        scrollTo(window.scrollY + window.innerHeight, 500, { easing: easing['fuck'] })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .tools {
    position fixed
    right 'calc((100% - %s) / 2 - 2rem)' % $content-max-width
    bottom 15rem
    transform translateY(50%)
    z-index 100

    +xxs() {
      display none
    }

    +respond-between($screen-xs-min, $screen-md-max) {
      right 0
      bottom 0
      transform translateY(0)
    }

    .wrapper {
      position relative
      box-shadow 0 0 40px -5px alpha($black, .1)
      border-radius 2px
      overflow hidden
      .tool-list {
        .tool-item {
          position relative
          display block
          width 40px
          height @width
          line-height @width
          text-align center
          background $white
          color $text-color-secondary
          border-bottom 1px solid $border-color-4

          &:last-child {
            border-bottom none
          }

          &:hover {
            background $base-color
            color $white
            border-bottom-color @background
          }

          &.fullscreen {
            &:hover {
              background $blue
              border-bottom-color @background
            }
          }

          &.back {
            &:hover {
              background $red
              border-bottom-color @background
            }
          }

          &.go-to-top
          &.go-to-bottom {
            &:hover {
              background $text-color
              border-bottom-color @background
            }
          }
        }
      }
    }
  }

</style>
