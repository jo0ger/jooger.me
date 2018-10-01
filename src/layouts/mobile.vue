<template>
  <div class="app mobile-layout">
    <MobileHeader></MobileHeader>
    <div class="wrapper">
      <main class="main content-container">
        <nuxt></nuxt>
      </main>
      <MobileFooter class="footer"></MobileFooter>
    </div>
  </div>
</template>

<script lang="ts">
  import Base from '@/base'
  import { Component  } from '@/utils/decorators'
  import { PCHeader, PCAside, PCFooter } from '@/components/pc'
  import { MobileHeader, MobileFooter } from '@/components/mobile'
  import { namespace } from 'vuex-class'

  const { Getter } = namespace('app')

  @Component({
    name: 'LayoutDefault',
    components: {
      MobileHeader,
      MobileFooter
    }
  })
  export default class LayoutDefault extends Base {
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/style/init'
  .app {
    width 100vw
    height 100vh

    .wrapper {
      flexLayout(column, flex-start, flex-start)
      width 100%
      height 100%
    }

    .main {
      flex 1 0 auto
      flexLayout(, flex-start, flex-start)
      width 100%
      padding-top 48px
    }
  }
</style>

