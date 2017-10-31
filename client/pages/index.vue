<template>
  <section class="home-page">
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
  }

</style>
