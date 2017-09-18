<template>
  <div class="tools">
    <div class="wrapper">
      <div class="tool-list">
        <a class="tool-item go-to-top" :class="{ active: showGoToTop }" @click.prevent.stop="handleGoToTop"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import { scrollTo, easing } from '~/utils'

  export default {
    name: 'Layout-Tools',
    data () {
      return {
        goToTopThreshold: 200,
        showGoToTop: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (!this._goToTopScrollHandler) {
          this._goToTopScrollHandler = e => {
            this.showGoToTop = window.pageYOffset > this.goToTopThreshold
          }
        }
        window.addEventListener('scroll', this._goToTopScrollHandler, false)
        this._goToTopScrollHandler()
      },
      handleGoToTop () {
        scrollTo(0, 500, { easing: easing['ease-in-out'] })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .tools {
    position fixed
    right 30px
    bottom 50px
    z-index 100

    .wrapper {
      position relative
      .tool-list {
        .tool-item {
          position relative
          display block
          width 50px
          height @width
          line-height @width
          border-radius 100%
          text-align center
          background alpha($white, .8)
          color $text-color-secondary

          &:hover {
            color $blue
          }

          &.go-to-top {
            box-shadow 0 20px 40px -15px alpha($black, .1)
            transform translateX(300%)

            &::after {
              content ''
              position absolute
              top 50%
              left 50%
              display block
              width 12px
              height @width
              border 2px solid $text-color-secondary
              border-width 2px 2px 0 0
              transform translate(-50%, -3px) rotate(-45deg)
              transform-origin center center
            }

            &.active {
              transform translateX(0)

              &:hover {
                transform translateX(0) scale(.9)
              }
            }
          }
          
        }
      }
    }
  }

</style>
