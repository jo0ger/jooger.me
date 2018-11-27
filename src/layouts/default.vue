<template>
  <div class="app" :class="appClass">
    <transition name="fade">
      <Background v-if="config.IS_PROD && $route.name !== 'music'"></Background>
    </transition>
    <PCHeader></PCHeader>
    <div class="wrapper">
      <main class="main">
        <div class="content-container">
          <nuxt></nuxt>
        </div>
        <transition name="fade" mode="out-in">
          <div class="aside-container" v-if="!fullColumn">
            <PCAside></PCAside>
          </div>
        </transition>
      </main>
      <PCFooter></PCFooter>
    </div>
    <Voice></Voice>
    <PCTool></PCTool>
  </div>
</template>

<script lang="ts">
  import Base from '@/base'
  import { Component  } from '@/utils/decorators'
  import { PCHeader, PCAside, PCFooter, PCTool } from '@/components/pc'
  import { Background, Voice } from '@/components/common'
  import { namespace } from 'vuex-class'

  const { Getter } = namespace('app')

  @Component({
    name: 'LayoutDefault',
    components: {
      PCHeader,
      PCAside,
      PCFooter,
      PCTool,
      Background,
      Voice
    },
    head () {
      return {
        bodyAttrs: {
          class: this.theme ? ('theme-' + this.theme) : ''
        }
      }
    }
  })
  export default class LayoutDefault extends Base {
    private get appClass () {
      return {
        'full-column': this.fullColumn
      }
    }

    private mounted () {
      this.$bus.$emit('on-app-mounted')
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
        width 'calc(1088px - 320px - %s)' % $padding-md
        flex 1 0 @width
        transition(flex-basis)
      }

      .aside-container {
        flex 0 0 320px
        width 320px
        margin-left $padding-md
      }
    }

    &.full-column {
      .content-container {
        flex 1 0 100%
      }
    }
  }
</style>

