<!--
 * @desc Aside
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:27:56
 -->
<template>
  <Affix class="aside" offsetTop="76">
    <transition name="fade" mode="out-in">
      <ReadTool v-if="showReadTool"></ReadTool>
    </transition>
    <Hots></Hots>
    <Tags></Tags>
  </Affix>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
