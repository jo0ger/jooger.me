<!--
 * @desc Aside
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:27:56
 -->
<template>
  <div class="aside">
    <Hots v-if="$route.name !== 'archive'"></Hots>
    <Affix offset-top="76">
      <Categories v-if="['archive', 'article-id'].includes($route.name)"></Categories>
      <Tags></Tags>
    </Affix>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
