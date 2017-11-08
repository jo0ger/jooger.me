<template>
  <div class="app">
    <div class="app-main">
      <keep-alive>
        <LayoutHero type="error"></LayoutHero>
      </keep-alive>
      <main class="container">
        <div class="wrapper">
          <div class="hero-content">
            <h1 class="title">{{ error.statusCode }}</h1>
            <h3 class="subtitle">{{ error.message }}</h3>
            <nuxt-link class="go-home btn normal-btn" to="/">Go Home</nuxt-link>
          </div>
        </div>
      </main>
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
            margin-top 4rem

            &:hover
            &:active {
              font-weight normal
            }
          }
        }
      }
    }
  }

</style>
