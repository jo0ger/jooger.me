<!--
 * @desc ArticleItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-23 23:48:48
 -->
<template>
  <article class="article-item" :class="{ 'no-desc': !article.description }" :title="article.title">
    <nuxt-link class="article-link"
      :to="`/article/${article._id}`">
      <h3 class="title" v-html="title">{{ article.title }}</h3>
      <div class="summary" v-if="!compact">
        <div class="thumb" v-if="article.thumb && !noThumb && !mobileLayout">
          <img v-lazy="thumb" alt="">
        </div>
        <p class="description">{{ article.description }}</p>
      </div>
    </nuxt-link>
    <div class="status">
      <div class="meta" v-if="!mobileLayout">
        <div class="meta-item category">
          <i class="icon" v-if="article.category" :class="[`icon-${findExtendsItem(article.category.extends, 'icon') || 'category'}`]"></i>
          {{ article.category ? article.category.name : '暂未分类' }}
        </div>
        <template v-if="!compact">
          <div class="meta-item pvs">
            {{ article.meta.pvs }} 次阅读
          </div>
          <div class="meta-item ups">
            {{ article.meta.ups }} 人喜欢
          </div>
          <div class="meta-item comments">
            {{ article.meta.comments }} 条评论
          </div>
        </template>
      </div>
      <div class="meta" v-else>
        <div class="meta-item pvs">
          <i class="icon icon-eye"></i>
          {{ article.meta.pvs }}
        </div>
        <div class="meta-item ups">
          <i class="icon icon-thumb-up-fill"></i>
          {{ article.meta.ups }}
        </div>
        <div class="meta-item comments">
          <i class="icon icon-comment"></i>
          {{ article.meta.comments }}
        </div>
      </div>
      <time class="time" :datatitme="article.createdAt">
        <i class="icon icon-time" v-if="!mobileLayout"></i>
        {{ article.createdAt | dateFormat('YYYY-MM-DD') }}
      </time>
      <div class="source" :class="[getConstantItem('ARTICLE_SOURCE', article.source, 'code')]">{{ article.source | constantFilter('ARTICLE_SOURCE') }}</div>
    </div>
  </article>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
