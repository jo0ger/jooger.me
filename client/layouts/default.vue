<template>
  <div class="app">
    <div class="app-main">
      <LayoutHeader></LayoutHeader>
      <LayoutBanner></LayoutBanner>
      <div class="container">
        <keep-alive>
          <nuxt></nuxt>
        </keep-alive>
      </div>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>

<script>
  import { LayoutHeader, LayoutBanner, LayoutFooter } from '~/components/Layout'

  export default {
    name: 'Default',
    components: { LayoutHeader, LayoutBanner, LayoutFooter }
  }
</script>

<style lang="stylus" scoped>
</style>
