<template>
  <div class="app" :class="appClass">
    <Background></Background>
    <PCHeader></PCHeader>
    <div class="wrapper">
      <main class="main">
        <div class="content-container">
          <nuxt/>
        </div>
        <transition name="fade" mode="out-in">
          <div class="aside-container" v-if="!fullColumn">
            <PCAside></PCAside>
          </div>
        </transition>
      </main>
      <PCFooter class="footer"></PCFooter>
    </div>
  </div>
</template>

<script lang="ts">
  import Base from '@/base'
  import { Component  } from '@/utils/decorators'
  import { PCHeader, PCAside, PCFooter } from '@/components/pc'
  import { Background  } from '@/components/common'
  import { namespace } from 'vuex-class'

  const { Getter } = namespace('app')

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
    private get appClass () {
      return {
        'full-column': this.fullColumn
      }
    }
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
      width 1088px
      margin 0 auto
      padding-top (60 + $padding-md)px

      .content-container {
        flex 1 0
        transition(flex-basis)
      }

      .aside-container {
        flex 0 0 320px
        width 320px
        margin-left $padding-md
      }
    }

    .footer {
      width 100%
    }

    &.full-column {
      .content-container {
        flex 1 0 100%
      }
    }
  }
</style>

