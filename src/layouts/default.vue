<template>
  <div class="app">
    <Background></Background>
    <PCHeader></PCHeader>
    <main class="app-main">
      <PCSider></PCSider>
      <div class="content-container">
        <nuxt/>
      </div>
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
      width 1088px
      margin 0 auto
      padding-top 24px

      .content-container {
        margin-left 132px
      }
    }
  }
</style>

