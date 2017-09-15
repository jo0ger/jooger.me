<template>
  <header class="header">
    <div class="wrapper">
      <router-link class="logo" to="/">
        <span>JOOGER</span>
      </router-link>
      <nav class="navigation">
        <a class="search">
          <span class="icon"></span>
        </a>
        <a class="trigger">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Layout-Header',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .header {
    position fixed
    z-index 9999
    top 0
    width 100%
    padding 20px 0

    .wrapper {
      flexLayout(, space-between)
      width 100%
      max-width 1440px
      margin 0 auto
      padding 0 100px

      .navigation {
        flexLayout(, space-between)
        .search
        .trigger {
          width 26px
          height @width
          margin-left 20px
          padding 2px
        }

        .search {
          flexLayout()
          .icon {
            position relative
            display block
            width 16px
            height @width
            border 2px solid $blue
            border-radius 100%
            transform rotate(-45deg)

            &::after {
              content ''
              position absolute
              top 12px
              left 5px
              width 2px
              height 7px
              background $blue
            }
          }
        }

        .trigger {
          flexLayout(column, space-around, flex-start)
          .line {
            display block
            height 2px
            margin 2px 0
            background $blue
            transition all .3s $ease

            &:nth-of-type(1) {
              width 24px
            }
            &:nth-of-type(2) {
              width 12px
            }
            &:nth-of-type(3) {
              width 18px
            }
          }

          &:hover {
            .line {
              &:nth-of-type(1) {
                width 24px
                transform translateY(7px) rotate(45deg)
              }
              &:nth-of-type(2) {
                opacity 0
              }
              &:nth-of-type(3) {
                width 24px
                transform translateY(-7px) rotate(-45deg)
              }
            }
          }
        }
      }
    }
  }

</style>
