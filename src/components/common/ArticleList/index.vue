<!--
 * @desc ArticleList
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 16:56:51
 -->
<template>
  <div class="article-list">
    <ArticleItem v-for="item in list" :key="item._id" :article="item"></ArticleItem>
    <div class="indicator">
      <transition name="fade" mode="out-in">
        <Loading v-if="loading"></Loading>
        <p class="no-more-data" v-else-if="hasNoMore">No More</p>
        <button class="loadmore" v-else-if="list.length" @click="loadmore">Continue</button>
        <p class="no-data" v-else>Nothing here</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
