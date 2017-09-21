<template>
  <footer class="footer" :style="footerStyle">
    <div class="wrapper">
      Powered by 
      <a class="link" target="_blank" href="https://github.com/nuxt/nuxt.js">nuxt.js</a>、
      <br v-if="mobileLayout">
      Developed by 
      <a class="link" target="_blank" :href="`https://github.com/${me.login}`">{{ me.name }}</a>
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
    padding 40px 0

    .wrapper {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto
      text-align center

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

    }
  }
</style>
