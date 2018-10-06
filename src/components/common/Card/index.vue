<!--
 * @desc Card
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 01:26:12
 -->
<template>
  <div class="card" :class="{
    'card-bordered': bordered,
    'card-no-padding': noPadding
  }"
  :style="style">
    <div class="card-header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="card-body" :style="borderStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
