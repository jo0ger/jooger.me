<template>
  <section class="about-page">
    <div class="page-content">
    </div>
  </section>
</template>

<script>
  export default {
    name: 'About',
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

  .about-page {
    color $white
  }

</style>
