<template>
  <div class="app">
    <div class="app-main">
      <keep-alive>
        <LayoutHero v-if="showHeroPage"></LayoutHero>
      </keep-alive>
      <CommonFetchLoading></CommonFetchLoading>
      <LayoutHeader></LayoutHeader>
      <main class="container" :style="containerStyle">
        <div class="wrapper">
          <div class="hero-content" v-if="showHeroPage">
            <h1 class="title">{{ option.title }}</h1>
            <h3 class="subtitle">{{ isAboutPage ? 'About Me' : option.subtitle }}</h3>
          </div>
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <LayoutMusic v-if="!mobileLayout"></LayoutMusic>
      <LayoutTools v-if="!showHeroPage"></LayoutTools>
      <LayoutFooter v-if="!isHomePage"></LayoutFooter>
      <LayoutOverlay></LayoutOverlay>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    LayoutHeader,
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
      LayoutFooter,
      LayoutTools,
      LayoutOverlay,
      CommonFetchLoading,
      LayoutMusic,
      LayoutHero
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
      showHeroPage () {
        return ['index', 'about'].includes(this.$route.name)
      },
      containerStyle () {
        return {
          marginTop: this.showHeroPage ? '100vh' : (this.mobileLayout ? '100px' : '150px')
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
      width 100%
      max-width $content-max-width
      margin 0 auto
      z-index 1

      .wrapper {
        width 100%
        layout-wrapper()

        .page-content {
          position relative
        }
      }
    }
  }

</style>
