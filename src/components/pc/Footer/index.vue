<!--
 * @desc Footer
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 14:56:16
 -->
<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="menu-list">
        <nuxt-link v-for="menu in config.MENUS"
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
          v-for="social in config.SOCIALS"
          :key="social.icon"
          :title="social.title">
          <i class="icon" :class="[`icon-${social.icon}`]"></i>
        </a>
      </div>
      <div class="copyright">
        <span>版权所有 © 2017 <nuxt-link to="/about" v-if="setting.personal.user">{{ setting.personal.user.name }}</nuxt-link>. 保留所有权利</span>
        <a v-if="!mobileLayout" href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener" class="record">
          豫ICP备17040457号
        </a>
      </div>
      <div class="power-by">
        Powered by
        <a class="link" target="_blank" rel="noopener" href="https://github.com/nuxt/nuxt.js">nuxt.js</a>、
        Design by
        <a class="link" target="_blank" rel="noopener" :href="'https://github.com/jo0ger'" v-if="setting.personal.user">{{ setting.personal.user.name }}</a>
      </div>
      <div class="logo">
        <nuxt-link to="/">
          <i class="icon icon-logo"></i>
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
