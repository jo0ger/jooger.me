<!--
 * @desc Header
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-21 00:46:22
 -->
<template>
  <div class="header">
    <div class="wrapper">
      <router-link to="/" class="logo">
        <span class="logo-text" v-if="setting.personal.user">{{ setting.personal.user.name }}.me</span>
      </router-link>
      <transition name="slide-down" mode="out-in">
        <Tab class="menus" :list="config.MENUS" :router="true" ref="menu" v-if="!showArticleTitle"></Tab>
        <div class="article-title" v-else>{{ article.title }}</div>
      </transition>
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
