<template>
  <section class="home-page">
    <div class="page-content">
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Home',
    head: {
      bodyAttrs: {
        class: 'dark-page'
      }
    },
    async fetch () {
      await new Promise((resolve) => setTimeout(() => resolve(), 500))
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .home-page {
    color $white
    
    .banner-content {
      .title
      .subtitle {
        color $white
        text-transform uppercase
        font-weight bold
        letter-spacing 5px
        text-align center
      }

      .title {
        font-size 6vmin
      }

      .subtitle {
        font-size 3vmin
      }
    }
  }

</style>
