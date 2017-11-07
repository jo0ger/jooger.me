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
          <div class="hero-content" :key="$route.name" v-if="showHeroPage">
            <h1 class="title">{{ option.title }}</h1>
            <h3 class="subtitle">{{ isAboutPage ? 'About Me' : option.subtitle }}</h3>
            <LayoutMoment class="moment"></LayoutMoment>
          </div>
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <LayoutMusic v-if="!mobileLayout"></LayoutMusic>
      <LayoutTools v-if="!showHeroPage"></LayoutTools>
      <LayoutFooter v-if="!isHomePage"></LayoutFooter>
      <LayoutShare></LayoutShare>
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
    LayoutHero,
    LayoutMoment,
    LayoutShare
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
      LayoutHero,
      LayoutMoment,
      LayoutShare
    },
    data () {
      return {
        title: ''
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        mobileSidebar: 'app/mobileSidebar',
        showMusic: 'app/showMusic',
        showOverlay: 'app/overlay',
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
    },
    mounted () {
      this.watchTab()
    },
    methods: {
      watchTab () {
        this.title = document.title
        document.addEventListener('visibilitychange', e => {
          if (e.target.hidden || e.target.webkitHidden) {
            document.title = '😱糟糕，浏览器崩溃了'
          } else {
            document.title = this.title || 'Jooger.me'
          }
        }, false)
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
      }
    }
  }

</style>
