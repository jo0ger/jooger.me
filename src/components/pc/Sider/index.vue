<!--
 * @desc Sider
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-21 00:46:47
 -->
<template>
  <div class="app-sider">
    <div class="menu">
      <router-link to="/" class="menu-item">
        <span>首页</span>
      </router-link>
      <a class="menu-item" :class="{ active: !index }" v-for="(category, index) in categoryList" :key="category._id">
        <span>{{ category.name }}</span>
      </a>
      <a class="menu-item">
        <span>归档</span>
      </a>
      <a class="menu-item">
        <span>关于</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
