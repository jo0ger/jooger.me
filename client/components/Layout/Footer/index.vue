<style lang="stylus">
  @import 'index'
</style>

<template>
  <footer class="app-footer">
    <div class="wrapper">
      <div class="menu-list">
        <nuxt-link v-for="menu in menus"
          ref="menu"
          class="menu-item"
          :key="menu.key"
          :to="{ name: menu.key }"
          exact>
          {{ menu.title }}
        </nuxt-link>
      </div>
      <div class="social-list">
        <a :href="social.url" class="social-item" target="_blank" rel="noopener"
          :class="[`social-${social.icon}`]"
          v-for="social in socials"
          :key="social.icon"
          :title="social.title">
          <i class="icon" :class="[`icon-${social.icon}`]"></i>
        </a>
      </div>
      <div class="copyright">
        <span>版权所有 © 2017 <nuxt-link to="/about">{{ me.name }}</nuxt-link>. 保留所有权利</span>
        <a v-if="!mobileLayout" href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener" class="record">
          豫ICP备17040457号
        </a>
      </div>
      <div class="power-by">
        Powered by 
        <a class="link" target="_blank" rel="noopener" href="https://github.com/nuxt/nuxt.js">nuxt.js</a>、
        Design by 
        <a class="link" target="_blank" rel="noopener" :href="'https://github.com/jo0ger'">{{ me.name }}</a>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from '@@/app.config'

  export default {
    name: 'AppFooter',
    data () {
      return {
        menus: config.menus,
        socials: config.socials
      }
    },
    computed: {
      ...mapGetters({
        me: 'me/me',
        mobileLayout: 'app/mobileLayout'
      })
    }
  }
</script>
