<template>
  <footer class="footer">
    <div class="wrapper"></div>
  </footer>
</template>

<script>
  export default {
    name: 'Layout-Footer',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .footer {
    width 100%
    padding 20px 0
    padding-bottom 125px

    .wrapper {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto

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
