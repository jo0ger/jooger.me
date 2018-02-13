<style lang="stylus">
	@import 'index'
</style>

<template>
  <header class="app-header">
    <div class="container">
      <nuxt-link class="logo" to="/">
        <img :src="logo" alt="">
      </nuxt-link>
      <div class="search">
        <form class="search-form" role="search" @submit.stop.prevent="search">
          <input name="search" class="search-input"
            ref="searchInput"
            type="search"
            autocomplete="off"
            :autofocus="false"
            placeholder="搜索..."
            maxlength="200"
            v-model.trim="keyword"
            @keyup.enter="search">
          <i class="icon icon-search" @click="search"></i>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  import logo from '@/static/images/logo.svg'

  export default {
    name: 'AppHeader',
    data () {
      return {
        logo,
        keyword: ''
      }
    },
    methods: {
      search () {}
    }
  }
</script>
