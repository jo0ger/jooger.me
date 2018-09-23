<!--
 * @desc ArticleItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-23 23:48:48
 -->
<template>
  <article class="article-item" :class="{ 'no-desc': !article.description }" :title="article.title">
    <nuxt-link class="article-link"
      :to="`/article/${article._id}`">
      <h2 class="title">{{ article.title }}</h2>
      <div class="summary">
        <div class="thumb" v-if="article.thumb">
          <img v-lazy="article.thumb" alt="">
        </div>
        <p class="description">{{ article.description }}</p>
      </div>
    </nuxt-link>
    <div class="status">
      <div class="meta">
        <div class="meta-item category">
          <i class="icon" v-if="article.category" :class="[`icon-${findExtendsItem(article.category.extends, 'icon') || 'category'}`]"></i>
          {{ article.category ? article.category.name : '暂未分类' }}
        </div>
        <div class="meta-item pvs">
          {{ article.meta.pvs }} 次阅读
        </div>
        <div class="meta-item ups">
          {{ article.meta.ups }} 人喜欢
        </div>
        <div class="meta-item comments">
          {{ article.meta.comments }} 条评论
        </div>
      </div>
      <time class="time" :datatitme="article.createdAt">
        <i class="icon icon-time"></i>
        {{ article.createdAt | dateFormat('YYYY-MM-DD') }}
      </time>
    </div>
  </article>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
