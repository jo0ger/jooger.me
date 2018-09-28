<!--
 * @desc Message
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 17:45:40
 -->
<template>
  <transition name="slide-up-message" mode="out-in">
    <div class="message" v-if="visible">
      <div class="wrapper">
        <i class="icon" :class="[`icon-${type}`]" v-if="type"></i>
        <span class="content">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
