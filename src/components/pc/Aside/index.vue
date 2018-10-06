<!--
 * @desc Aside
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:27:56
 -->
<template>
  <div class="aside">
    <transition name="fade" mode="out-in">
      <Hots></Hots>
    </transition>
    <Affix offset-top="76">
      <transition name="fade" mode="out-in">
        <Categories v-if="['archive', 'article-id', 'category-name', 'tag-name'].includes($route.name)"></Categories>
      </transition>
      <Tags></Tags>
    </Affix>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
