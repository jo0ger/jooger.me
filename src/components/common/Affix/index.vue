<!--
 * @desc Affix
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 15:30:44
 -->
<template>
  <div class="affix" :class="{'is-fixed': fixed}" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
