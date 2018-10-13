<!--
 * @desc Voice
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-09 01:37:54
 -->
<template>
  <transition name="fade" mode="out-in">
    <div class="voice" v-if="data && data.text" :key="data.text">
      <p class="text">{{ data.text }}</p>
      <p class="source" v-if="data.source || data.author">
        —— {{ data.author}}
        <template v-if="data.source">
          《{{ data.source }}》
        </template>
      </p>
    </div>
  </transition>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
