<template>
  <div class="app">
    <Background></Background>
    <PCHeader></PCHeader>
    <main class="app-main">
      <div class="content-container">
        <nuxt/>
      </div>
      <div class="aside-container"></div>
    </main>
  </div>
</template>

<script lang="ts">
  import Base from "@/base"
  import { Component  } from "@/utils/decorators"
  import { PCHeader, PCSider } from "@/components/pc"
  import { Background  } from "@/components/common"

  @Component({
    name: 'LayoutDefault',
    components: {
      PCHeader,
      PCSider,
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
      display flex
      width 1088px
      margin 0 auto
      padding-top 24px

      .content-container {
        flex 1 0
      }

      .aside-container {
        flex 0 0 320px
      }
    }
  }
</style>

