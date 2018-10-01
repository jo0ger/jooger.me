<!--
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-01 18:10:43
 -->
<template>
  <div class="header" :class="{ 'menu-opened': menuOpened }">
    <div class="wrapper">
      <a class="menu-trigger" @click="menuOpened = !menuOpened">
        <div class="menu-lines">
          <span class="line"></span>
          <span class="line"></span>
        </div>
      </a>
      <router-link to="/" class="logo">
        <img :src="setting.site.logo" alt="" srcset="">
        <span class="logo-text" v-if="setting.personal.user">{{ setting.personal.user.name }}</span>
      </router-link>
      <a class="search-trigger" @click="searchOpened = true">
        <i class="icon icon-search"></i>
      </a>
    </div>
    <transition name="fade" mode="out-in">
      <div class="overylay" v-if="overylayVisible" @click="closeOverlay"></div>
    </transition>
    <div class="menu-field">
      <transition name="slide-menu" mode="out-in">
        <div class="menu" v-if="menuOpened">
          <nuxt-link class="menu-item"
            v-for="menu in config.MENUS"
            :key="menu.key"
            :to="{ name: menu.key }"
            @click.native="menuOpened = false"
            exact>
            <div class="menu-icon">
              <i class="icon" :class="['icon-' + menu.key]"></i>
            </div>
            <div class="title">{{ menu.title }}</div>
          </nuxt-link>
        </div>
      </transition>
    </div>
    <transition name="slide-search" mode="out-in">
      <div class="search-field" v-if="searchOpened">
        <input type="text"
          ref="searchInput"
          autocomplete="off"
          autofocus
          placeholder="搜索文章"
          v-model.trim="keyword"
          @keyup.enter="search">
        <div class="close-btn" @click="searchOpened = false">
          <i class="icon icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
