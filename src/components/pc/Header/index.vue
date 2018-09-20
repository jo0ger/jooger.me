<!--
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-21 00:46:22
 -->
<template>
  <div class="app-header">
    <div class="wrap">
      <router-link to="/" class="logo">
        <img src="https://static.jooger.me/img/common/logo.png" alt="" srcset="">
        <span class="logo-text">{{ setting.personal.user.name }}</span>
      </router-link>
      <div class="search">
        <input type="text" placeholder="搜索文章">
        <div class="search-btn">
          <i class="icon icon-search" @click="handleToggleSearch"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
