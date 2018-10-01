<template>
  <div class="app-error">
    <Background v-if="!mobileLayout"></Background>
    <div class="error-content">
      <h1 class="error-code">{{ statusCode }}</h1>
      <div class="error-wrapper-message">
        <h3 class="error-message">{{ message }}</h3>
      </div>
      <nuxt-link class="error-link" to="/">返回首页</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
  import { Background  } from '@/components/common'

  export default {
    name: 'nuxt-error',
    layout: 'empty',
    components: {
      Background
    },
    props: ['error'],
    head () {
      return {
        title: this.message,
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
          }
        ]
      }
    },
    computed: {
      statusCode () {
        return (this.error && this.error.statusCode) || 500
      },
      message () {
        return this.error.message || 'Page not found'
      },
      mobileLayout () {
        return this.$store.getters['app/mobileLayout']
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/style/init'

  .app-error {
    full()
    padding 32px 0
    overflow hidden
    text-align center

    .error-content {
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      text-shadow 0 1px 10px $text-color-secondary

      .error-code {
        font-size 9rem
      }

      .error-message {
        margin 50px 0
      }

      .error-link {
        padding 6px 32px
        border-radius 2px
        border 1px solid $text-color-secondary
        text-shadow none
        transition()

        &:hover {
          padding 6px 48px
          background $base-color
          color $white
          border-color @background
          font-weight 700
        }
      }
    }
  }
</style>

