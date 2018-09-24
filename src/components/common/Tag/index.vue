<!--
 * @desc Tag
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:51:33
 -->
<template>
  <nuxt-link
    class="tag"
    :to="`/tag/${name}`"
    v-if="link">
    <i class="icon" :class="[`icon-${icon}`]"></i>
    <span class="name">{{ name }}</span>
    <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
  </nuxt-link>
  <span
    class="tag"
    v-else>
    <i class="icon" :class="[`icon-${icon}`]"></i>
    <span class="name">{{ name }}</span>
    <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
  </span>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
