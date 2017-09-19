<template>
  <div class="app">
    <div class="app-main">
      <LayoutHeader></LayoutHeader>
      <keep-alive>
        <LayoutBanner v-if="showBannerPage"></LayoutBanner>
      </keep-alive>
      <main class="container" :style="containerStyle">
        <div class="wrapper">
          <div class="banner-content" v-if="showBannerPage">
            <h1 class="title">{{ option.title }}</h1>
            <h3 class="subtitle">{{ option.subtitle }}</h3>
          </div>
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <LayoutTools></LayoutTools>
      <LayoutOverlay></LayoutOverlay>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LayoutHeader, LayoutBanner, LayoutFooter, LayoutTools, LayoutOverlay } from '~/components/Layout'

  export default {
    name: 'Default',
    components: { LayoutHeader, LayoutBanner, LayoutFooter, LayoutTools, LayoutOverlay },
    head () {
      let classes = ''
      if (this.mobileLayout) {
        classes += 'is-mobile'
        if (this.mobileSidebar) {
          classes += ' show-sidebar'
        }
      }
      const lightPage = ['blog'].find(item => this.$route.name.includes(item))
      return {
        bodyAttrs: {
          class: classes + lightPage || ''
        }
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        mobileSidebar: 'app/mobileSidebar'
      }),
      showBannerPage () {
        return ['index', 'about'].includes(this.$route.name)
      },
      containerStyle () {
        return {
          marginTop: this.showBannerPage ? '60vh' : 0
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
      padding-top 70px
    }

    .container {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto
      z-index 1

      .wrapper {
        width 100%

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
