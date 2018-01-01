<template>
  <div class="app">
    <AppHeader />
    <main class="app-main">
      <div class="container">
        <nuxt class="page-main-widget" />
        <AppAside class="page-aside-widget" v-if="!noAsidePage" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
  import {
    AppHeader,
    AppFooter,
    AppAside
  } from '@/components/layout'

  export default {
    name: 'Default',
    components: {
      AppHeader,
      AppFooter,
      AppAside
    },
    computed: {
      noAsidePage () {
        return ['music', 'guestbook', 'about'].includes(this.$route.name)
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
          flex 0 0 286px
          width 286px
          margin-left 12px
        }
      }
    }
  }
</style>