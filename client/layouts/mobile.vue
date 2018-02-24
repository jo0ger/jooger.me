<template>
  <div class="app">
    <AppHeader />
    <main class="app-main">
      <div class="container">
        <nuxt class="page-main-widget" />
      </div>
    </main>
    <AppNav />
  </div>
</template>

<script>
  import {
    AppHeader,
    AppNav
  } from '@/components/mobile'

  export default {
    name: 'Mobile',
    components: {
      AppHeader,
      AppNav
    },
    head () {
      return {
        htmlAttrs: {
          class: 'mobile'
        }
      }
    },
    computed: {
      noAsidePage () {
        return ['music', 'archive', 'guestbook', 'about'].includes(this.$route.name)
      }
    },
    mounted () {
    }
  }
</script>

<style lang="stylus">
  @import '~@/assets/stylus/var/index'
  @import '~@/assets/stylus/mixin/index'
  
  .app {
    width 100%

    &-main {
      width 100%
      border-top $header-height-mobile solid transparent
      margin 0 auto
      padding 20px 0 80px

      html.mobile & {
        padding-top 0
      }
      
    }
  }
</style>
