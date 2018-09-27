<!--
 * @desc Like
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 02:27:42
 -->
<template>
  <div class="like-btn" :class="{ liked }">
    <div class="overlay" @click="click"></div>
    <span class="text" v-if="showText">{{ text }}</span>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
