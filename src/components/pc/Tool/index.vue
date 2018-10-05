<!--
 * @desc Tool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 17:12:13
 -->
<template>
  <div class="tool">
    <div class="wrapper">
      <transition-group tag="div" name="fade" class="tool-list">
        <a class="tool-item feedback" key="feedback"
          :href="'mailto:' + setting.personal.user.email">
          <i class="icon icon-feedback"></i>
        </a>
        <a class="tool-item theme" key="theme">
          <i class="icon icon-dark"></i>
        </a>
        <a class="tool-item up" key="up" v-if="showScrollTop" @click="goTop">
          <i class="icon icon-arrow-up"></i>
        </a>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
