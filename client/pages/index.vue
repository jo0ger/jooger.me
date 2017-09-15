<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Universal Vue.js Application Framework
    </h1>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    mounted () {
      axios.get('/api/articles').then(data => {
        console.log(data)
      })
      axios.request({
        url: 'https://api.github.com/repos/jo0ger/git-hook-test/issues',
        params: {
          state: 'all',
          sort: 'created'
        }
      }).then(data => {
        console.log(data)
      })
    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
