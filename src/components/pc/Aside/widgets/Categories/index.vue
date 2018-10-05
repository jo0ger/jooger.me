<!--
 * @desc Categories
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 16:24:15
 -->
<template>
  <Card class="widget-categories">
    <div class="title" slot="header">
      <i class="icon icon-category"></i>
      分类
    </div>
    <div class="category-list" v-if="categoryList.length">
      <nuxt-link :to="`/category/${item.name}`" class="category" v-for="item in categoryList" :key="item._id">
        <i class="icon" :class="['icon-' + findExtendsItem(item.extends, 'icon')]"></i>
        <span class="name">{{ item.name }}</span>
        <span class="count">共 {{ item.count }} 篇文章</span>
      </nuxt-link>
    </div>
    <p class="no-data" v-else>暂无标签</p>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
