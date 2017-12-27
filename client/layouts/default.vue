<template>
  <div class="app">
    <div class="site">
      <AppHeader />
      <AppHero></AppHero>
      <main class="app-main">
        <div class="container">
          <nuxt />
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script>
  import {
    AppHeader,
    AppFooter,
    AppHero
  } from '@/components/layout'

  export default {
    name: 'Default',
    components: {
      AppHeader,
      AppFooter,
      AppHero
    }
  }
</script>

<style>
</style>
