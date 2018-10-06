<!--
 * @desc Modal
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 12:15:55
 -->
<template>
  <transition name="slide-down" mode="out-in">
    <div class="modal" v-if="value">
      <div class="overlay" @click="close"></div>
      <div class="wrapper" :style="wrapperStyle">
        <h3 class="title" v-if="title">{{ title }}</h3>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
