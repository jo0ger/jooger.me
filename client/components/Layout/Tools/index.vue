<template>
  <div class="tools">
    <div class="wrapper">
      <div class="tool-list">
        <a class="tool-item back" @click="handleGoBack" v-if="showBack"></a>
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
    computed: {
      showBack () {
        return ['blog-article-id'].includes(this.$route.name)
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
      handleGoBack () {
        this.$router.back()
      },
      handleGoToTop () {
        scrollTo(0, 500, { easing: easing['fuck'] })
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

    @media (max-width: 1366px) {
      display none
    }

    .wrapper {
      position relative
      .tool-list {
        .tool-item {
          position relative
          display block
          width 50px
          height @width
          line-height @width
          margin-top 10px
          border-radius 100%
          text-align center
          background $white
          color $text-color-secondary
          box-shadow 0 0 40px -5px alpha($black, .2)

          &::before
          &::after {
            border-radius 2px
          }

          &.back {
            &::before
            &::after {
              content ''
              position absolute
              top 50%
              left 50%
              display block
              width 16px
              height 2px
              background $text-color-secondary
              opacity .6
              transform-origin center center
              transform translate(-50%, -50%) rotate(45deg)
              transition opacity .3s $ease 
            }

            &::after {
              transform translate(-50%, -50%) rotate(-45deg)
            }

            &:hover {
              transform scale(.9)
              &::before
              &::after {
                opacity 1
              }
            }
          }

          &.go-to-top {
            transform translateX(300%)
            transition-timing-function $fuck

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
              opacity .6
              transform translate(-50%, -3px) rotate(-45deg)
              transform-origin center center
              transition opacity .3s $ease
            }

            &.active {
              transform translateX(0)

              &:hover {
                transform translateX(0) scale(.9)
                &::after {
                  opacity 1
                }
              }
            }
          }

        }
      }
    }
  }

</style>
