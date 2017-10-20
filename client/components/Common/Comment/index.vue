<template>
  <section class="comments">
    <a @click="handleLogin">login</a>
  </section>
</template>

<script>
  import config from '~/config'

  export default {
    name: 'Comment',
    data () {
      return {}
    },
    methods: {
      handleLogin () {
        let url = `${config.service.baseURL}/auth/github/login?redirectUrl=${window.encodeURIComponent(window.location.href)}`
        window.location.href = url
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
