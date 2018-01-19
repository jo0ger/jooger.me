<template>
  <div class="app">
    <AppBackground />
    <AppHeader />
    <main class="app-main" :style="mainStyle">
      <div class="container">
        <nuxt class="page-main-widget" />
        <transition name="fade" mode="out-in">
          <AppAside class="page-aside-widget" v-if="!noAsidePage" />
        </transition>
      </div>
    </main>
    <AppTool />
    <AppFooter ref="footer" />
  </div>
</template>

<script>
  import {
    AppHeader,
    AppFooter,
    AppAside,
    AppBackground,
    AppTool
  } from '@/components/layout'

  export default {
    name: 'Default',
    components: {
      AppHeader,
      AppFooter,
      AppAside,
      AppBackground,
      AppTool
    },
    data () {
      return {
        mainStyle: null
      }
    },
    computed: {
      noAsidePage () {
        return ['music', 'archive', 'guestbook', 'about'].includes(this.$route.name)
      }
    },
    mounted () {
      // 音乐初始化
      this.$eventBus.initMusic()
      this.mainStyle = {
        minHeight: `calc(100vh - ${this.$refs.footer.$el.clientHeight}px)`
      }
    }
  }
</script>

<style lang="stylus">
  @import '~@/assets/stylus/var/index'
  @import '~@/assets/stylus/mixin/index'
  
  .app {
    min-width 1170px

    &-main {
      width $main-width
      border-top 60px solid transparent
      margin 0 auto
      padding 20px 0 80px

      .container {
        flexLayout(, flex-start, flex-start)

        .page-main-widget {
          flex 1 0
        }

        .page-aside-widget {
          flex 0 0 320px
          width 320px
          margin-left 12px
        }
      }
    }
  }

  body.full-page {
    .app-main {
      width 100%
      padding 0 0 80px
    }
  }
</style>