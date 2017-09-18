<template>
  <div class="app">
    <div class="app-main">
      <LayoutHeader></LayoutHeader>
      <LayoutBanner v-show="showBannerPage"></LayoutBanner>
      <main class="container" :style="containerStyle">
        <div class="wrapper">
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <PageLoading></PageLoading>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>

<script>
  import { LayoutHeader, LayoutBanner, LayoutFooter } from '~/components/Layout'
  import { PageLoading } from '~/components/Common'

  export default {
    name: 'Default',
    components: { LayoutHeader, LayoutBanner, LayoutFooter, PageLoading },
    data () {
      return {
        pageLoading: false
      }
    },
    head () {
      return {
        bodyAttrs: {
          class: this.$route.name
        }
      }
    },
    computed: {
      showBannerPage () {
        return ['index'].includes(this.$route.name)
      },
      containerStyle () {
        return {
          marginTop: this.showBannerPage ? '60vh' : 0
          // padding: this.showBannerPage
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .app {
    &-main {
      padding-top 80px
    }

    .container {
      position relative
      width 100%
      max-width 1440px
      margin 0 auto
      z-index 1

      .wrapper {
        width 100%

        @media (max-width: 1640px) {
          padding 0 100px
        }

        @media (max-width: 1366px) and (min-width: 769px) {
          padding 0 65px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          padding 0 40px
        }

        @media (max-width: 479px) {
          padding 0 30px
        }
      }
    }
  }

</style>
