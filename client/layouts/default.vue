<template>
  <div class="app">
    <div class="app-main">
      <keep-alive>
        <LayoutHero :type="heroType"></LayoutHero>
      </keep-alive>
      <CommonFetchLoading></CommonFetchLoading>
      <LayoutHeader></LayoutHeader>
      <main class="container" :style="containerStyle">
        <div class="wrapper">
          <!-- <div class="hero-content" :style="heroContentStyle" v-if="showBannerPage">
            <h1 class="title">{{ option.title }}</h1>
            <h3 class="subtitle">{{ isAboutPage ? 'About Me' : option.subtitle }}</h3>
          </div> -->
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <!-- <LayoutMusic v-if="!mobileLayout"></LayoutMusic> -->
      <LayoutTools v-if="!showBannerPage"></LayoutTools>
      <LayoutOverlay></LayoutOverlay>
      <LayoutFooter v-if="!isHomePage"></LayoutFooter>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    LayoutHeader,
    LayoutBanner,
    LayoutFooter,
    LayoutTools,
    LayoutOverlay,
    LayoutMusic,
    LayoutHero
  } from '~/components/Layout'
  import { CommonFetchLoading } from '~/components/Common'

  export default {
    name: 'Default',
    components: {
      LayoutHeader,
      LayoutBanner,
      LayoutFooter,
      LayoutTools,
      LayoutOverlay,
      CommonFetchLoading,
      LayoutMusic,
      LayoutHero
    },
    head () {
      let classes = ''
      if (this.mobileLayout) {
        classes += 'is-mobile'
        if (this.mobileSidebar) {
          classes += ' show-sidebar'
        }
      }
      const darkPage = ['index', 'about'].find(item => this.$route.name.includes(item))
      if (darkPage) {
        classes += ' dark-page'
      }
      return {
        bodyAttrs: {
          class: classes
        }
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        mobileSidebar: 'app/mobileSidebar',
        showMusic: 'app/showMusic',
        option: 'option/option'
      }),
      isHomePage () {
        return this.$route.name === 'index'
      },
      isAboutPage () {
        return this.$route.name === 'about'
      },
      heroType () {
        switch (this.$route.name) {
          case 'index':
            return 'swiper'
          case 'about':
            return 'life'
          default:
            return 'error'
        }
      },
      showBannerPage () {
        return ['index', 'about'].includes(this.$route.name)
      },
      containerStyle () {
        return {
          position: this.isAboutPage ? 'static' : 'relative',
          marginTop: this.isHomePage ? '60vh' : 0,
          paddingTop: this.isAboutPage ? '100vh' : (this.mobileLayout ? '70px' : '100px')
        }
      },
      heroContentStyle () {
        return {
          top: this.isAboutPage ? '60vh' : 0
        }
      }
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

        .page-content {
          position relative
        }
      }
    }
  }

</style>
