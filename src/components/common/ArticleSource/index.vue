<!--
 * @desc ArticleSource
 * @author Jooger <zzy1198258955@163.com>
 * @date 2018-11-27 23:09:36
 -->
<template>
  <nuxt-link class="article-source"
    :class="[getConstantItem('ARTICLE_SOURCE', data, 'code')]"
    :to="`/source/${filtConstant(data, 'ARTICLE_SOURCE')}`">
    {{ data | constantFilter('ARTICLE_SOURCE') }}
  </nuxt-link>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
