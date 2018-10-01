<!--
 * @desc Popover
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-01 01:31:01
 -->
<template>
  <transition :name="transitionName" mode="out-in">
    <div
      v-if="value"
      class="popover"
      :class="[`popover-` + placement]"
      :style="style"
      v-clickoutside="close">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
