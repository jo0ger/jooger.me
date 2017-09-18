<template>
  <section class="home-page">
    <div class="banner-content">
      <h1 class="title">一见如故，再见陌路</h1>
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
    },
    mounted () {
      // axios.get('/api/articles').then(data => {
      //   console.log(data)
      // })
      // axios.request({
      //   url: 'https://api.github.com/repos/jo0ger/git-hook-test/issues',
      //   params: {
      //     state: 'all',
      //     sort: 'created'
      //   }
      // }).then(data => {
      //   console.log(data)
      // })
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
