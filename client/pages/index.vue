<template>
  <section class="home-page">
    <div class="banner-content">
      <h1 class="title">离人回首，灯火阑珊</h1>
      <h3 class="subtitle">欢迎访问我的个人网站</h3>
    </div>
    <div class="page-content">
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Home',
    async fetch () {
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500)
      })
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
