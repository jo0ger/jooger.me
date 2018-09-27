<template>
  <div class="app">
    <Background></Background>
    <div class="wrapper">
      <PCHeader></PCHeader>
      <main class="app-main">
        <div class="content-container">
          <nuxt/>
        </div>
        <div class="aside-container">
          <PCAside></PCAside>
        </div>
      </main>
      <PCFooter></PCFooter>
    </div>
  </div>
</template>

<script lang="ts">
  import Base from '@/base'
  import { Component  } from '@/utils/decorators'
  import { PCHeader, PCAside, PCFooter } from '@/components/pc'
  import { Background  } from '@/components/common'

  @Component({
    name: 'LayoutDefault',
    components: {
      PCHeader,
      PCAside,
      PCFooter,
      Background
    }
  })
  export default class LayoutDefault extends Base {

  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/style/init'
  .app {
    .app-main {
      flexLayout(, flex-start, flex-start)
      width 1088px
      margin 0 auto
      padding-top (60 + $padding-md)px

      .content-container {
        flex 1 0
        overflow hidden
      }

      .aside-container {
        flex 0 0 320px
        width 320px
        margin-left $padding-md
      }
    }
  }
</style>

