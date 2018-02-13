<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="app-nav">
    <div class="container">
      <nuxt-link v-for="menu in menuSchema"
        ref="nav"
        class="nav-item"
        :key="menu.key"
        :to="{ name: menu.key }"
        exact>
        <i class="icon" :class="[`icon-${menu.icon}${$route.name === menu.key ? '-fill' : ''}`]"></i>
        <div class="title">
          {{ menu.title }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import config from '@@/app.config'
  
  export default {
    name: 'AppNav',
    data () {
      return {
        menuSchema: config.constant.menus
      }
    }
  }
</script>
