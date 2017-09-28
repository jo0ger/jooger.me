<template>
  <div class="app">
    <div class="app-main">
      <CommonFetchLoading></CommonFetchLoading>
      <LayoutHeader></LayoutHeader>
      <keep-alive>
        <LayoutBanner v-if="showBannerPage"></LayoutBanner>
      </keep-alive>
      <main class="container" :style="containerStyle">
        <div class="wrapper">
          <div class="banner-content" :style="bannerContentStyle" v-if="showBannerPage">
            <h1 class="title">{{ option.title }}</h1>
            <h3 class="subtitle">{{ isAboutPage ? 'About Me' : option.subtitle }}</h3>
          </div>
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <LayoutTools v-if="!showBannerPage"></LayoutTools>
      <LayoutOverlay></LayoutOverlay>
      <LayoutFooter v-if="!isHomePage"></LayoutFooter>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LayoutHeader, LayoutBanner, LayoutFooter, LayoutTools, LayoutOverlay } from '~/components/Layout'
  import { CommonFetchLoading } from '~/components/Common'

  export default {
    name: 'Default',
    components: {
      LayoutHeader,
      LayoutBanner,
      LayoutFooter,
      LayoutTools,
      LayoutOverlay,
      CommonFetchLoading
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
        option: 'option/option',
        musicList: 'music/list'
      }),
      isHomePage () {
        return this.$route.name === 'index'
      },
      isAboutPage () {
        return this.$route.name === 'about'
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
      bannerContentStyle () {
        return {
          top: this.isAboutPage ? '60vh' : 0
        }
      }
    },
    mounted () {
      this.$music.play()
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
