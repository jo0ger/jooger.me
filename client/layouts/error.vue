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
          max-width 80%
          text-align center

          .subtitle {
            text-transform initial
          }

          .go-home {
            display inline-block
            margin-top 60px
            padding 15px 30px
            color $white
            border 1px solid alpha($white, .3)

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
