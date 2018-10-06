<!--
 * @desc ArticleList
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 16:56:51
 -->
<template>
  <div class="article-list">
    <div class="list" v-if="articleList.length">
      <ArticleItem v-for="item in articleList" :key="item._id" :article="item" :mini="mini" :keyword="keyword"></ArticleItem>
    </div>
    <div class="indicator">
      <transition name="fade" mode="out-in">
        <Loading v-if="articleListFetching"></Loading>
        <p class="no-more-data" v-else-if="hasNoMore">No More</p>
        <button class="loadmore" v-else-if="articleList.length" @click="loadmore">Continue</button>
        <p class="no-data" v-else>Nothing Here</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
