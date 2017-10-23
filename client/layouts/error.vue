<template>
  <div class="app">
    <div class="app-main">
      <LayoutHeader></LayoutHeader>
      <keep-alive>
        <LayoutBanner></LayoutBanner>
      </keep-alive>
      <main class="container">
        <div class="wrapper">
          <div class="hero-content">
            <h1 class="title">{{ error.statusCode }}</h1>
            <h3 class="subtitle">{{ error.message }}</h3>
            <nuxt-link class="go-home" to="/">Go Home</nuxt-link>
          </div>
        </div>
      </main>
      <LayoutOverlay></LayoutOverlay>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LayoutHeader, LayoutBanner, LayoutOverlay } from '~/components/Layout'

  export default {
    name: 'Error',
    components: {
      LayoutHeader,
      LayoutBanner,
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
        padding 0 100px

        @media (max-width: 1366px) and (min-width: 769px) {
          padding 0 65px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          padding 0 40px
        }

        @media (max-width: 479px) {
          padding 0 15px
        }

        .hero-content {
          top 40vh
          max-width 80%
          text-align center

          .title {
            font-size 10vmin
          }

          .subtitle {
            text-transform initial
          }

          .go-home {
            display inline-block
            margin-top 60px
            padding 10px 20px
            color $white
            border 1px solid alpha($white, .3)
            border-radius 10px

            &:hover
            &:active {
              background alpha($white, .3)
              border-color @background
            }
          }
        }
      }
    }
  }

</style>
