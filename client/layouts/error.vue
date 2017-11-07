<template>
  <div class="app">
    <div class="app-main">
      <LayoutHeader></LayoutHeader>
      <keep-alive>
        <LayoutHero type="error"></LayoutHero>
      </keep-alive>
      <main class="container">
        <div class="wrapper">
          <div class="hero-content">
            <h1 class="title">{{ error.statusCode }}</h1>
            <h3 class="subtitle">{{ error.message }}</h3>
            <nuxt-link class="go-home link" to="/">Go Home</nuxt-link>
          </div>
        </div>
      </main>
      <LayoutOverlay></LayoutOverlay>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LayoutHeader, LayoutHero, LayoutOverlay } from '~/components/Layout'

  export default {
    name: 'Error',
    components: {
      LayoutHeader,
      LayoutHero,
      LayoutOverlay
    },
    props: ['error'],
    head () {
      let classes = ''
      if (this.mobileLayout) {
        classes += 'is-mobile'
        if (this.mobileSidebar) {
          classes += ' show-sidebar'
        }
      }
      return {
        bodyAttrs: {
          class: classes + ' dark-page'
        }
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        mobileSidebar: 'app/mobileSidebar'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .app {

    .container {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto
      padding-bottom 100px
      z-index 1

      .wrapper {
        width 100%
        layout-wrapper()

        .hero-content {
          top 50vh
          text-align center

          .subtitle {
            text-transform initial
          }

          .go-home {
            display inline-block
            height 3rem
            line-height @height
            margin-top 4rem
            padding 0 1.8rem
            color $white
            border-radius 1.5rem
            -webkit-text-fill-color $white
            -webkit-background-clip padding-box

            &::after {
              display none
            }

            &:hover
            &:active {
              font-weight normal
              transform scale(.93)
            }
          }
        }
      }
    }
  }

</style>
