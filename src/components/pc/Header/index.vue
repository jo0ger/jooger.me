<!--
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-21 00:46:22
 -->
<template>
  <div class="header">
    <div class="wrap">
      <router-link to="/" class="logo">
        <img src="https://static.jooger.me/img/common/logo.png" alt="" srcset="">
        <span class="logo-text">{{ setting.personal.user.name }}</span>
      </router-link>
      <Tab class="menus" :list="config.MENUS" :router="true" ref="menu"></Tab>
      <div class="search">
        <input type="text"
          autocomplete="off"
          :autofocus="false"
          placeholder="搜索文章"
          v-model.trim="keyword"
          @keyup.enter="search">
        <div class="search-btn">
          <i class="icon icon-search" @click="search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
