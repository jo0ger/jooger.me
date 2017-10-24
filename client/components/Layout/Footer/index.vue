<template>
  <footer class="footer" :style="footerStyle">
    <div class="wrapper">
      <p>版权所有 © 2017 {{ me.name }}. 保留所有权利
        <a href="http://www.miitbeian.gov.cn" target="_blank" class="record">
          豫ICP备17040457号
        </a>
      </p>
      <p>
        Powered by 
        <a class="link" target="_blank" href="https://github.com/nuxt/nuxt.js">nuxt.js</a>、
        <br v-if="mobileLayout">
        Developed by 
        <a class="link" target="_blank" :href="'https://github.com/jo0ger'">{{ me.name }}</a>
      </p>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout-Footer',
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        me: 'me/me'
      }),
      isAboutPage () {
        return this.$route.name === 'about'
      },
      footerStyle () {
        return this.isAboutPage ? {
          paddingBottom: '125px'
        } : null
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .footer {
    width 100%
    margin-top 100px
    padding 40px 0 120px
    color $text-color-secondary

    .wrapper {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto
      text-align center
      font-size 12px

      @media (max-width: 1640px) {
        padding 0 100px
      }

      @media (max-width: 1366px) and (min-width: 769px) {
        padding 0 65px
      }

      @media (max-width: 768px) and (min-width: 480px) {
        padding 0 40px
      }

      @media (max-width: 479px) {
        padding 0 30px
      }

      p {
        margin-bottom 10px
      }

      .record {
        margin-left 10px
      }

    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'
  
  .dark-page {
    .footer {
      color $text-color-secondary-dark

      .link {
        color $text-color-secondary-dark
        border-color $text-color-secondary-dark
      }
    }
  }
</style>
