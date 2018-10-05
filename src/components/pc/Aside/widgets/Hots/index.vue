<!--
 * @desc Hots
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:29:18
 -->
<template>
  <Card class="widget-hots">
    <div class="title" slot="header">
      <i class="icon icon-article"></i>
      热门文章
    </div>
    <ul class="hot-list" v-if="hotList.length">
      <li class="hot-item"
        v-for="(item, index) in hotList"
        :key="item._id"
        :title="item.title">
        <span class="index">{{ index + 1 }}</span>
        <nuxt-link
          class="title"
          :to="`/article/${item._id}`"
          :title="item.title">{{ item.title }}</nuxt-link>
      </li>
    </ul>
    <p class="no-data" v-else>暂无热门文章</p>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
