<!--
 * @desc Tab
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-24 14:33:15
 -->
<template>
  <div class="tab" :class="{
    'tab-bordered': bordered
  }">
    <div class="wrapper">
      <template v-if="!router">
        <a v-for="(item, index) in list"
          :key="index"
          class="tab-item"
          :class="{ actived: checkActive(item, index) }"
          ref="tab"
          @click="handleChangeTab(item, index)">
          <i class="icon" :class="[`icon-${item.icon}`]" v-if="item.icon"></i>
          <span class="title">{{ item.title }}</span>
        </a>
      </template>
      <template v-else>
        <nuxt-link v-for="(item, index) in list"
          :key="index"
          class="tab-item"
          :to="{ name: item.key }"
          :class="{ actived: checkActive(item, index) }"
          ref="tab"
          exact
          @click.native="handleChangeTab(item, index)">
          <i class="icon" :class="[`icon-${item.icon}`]" v-if="item.icon"></i>
          <span class="title">{{ item.title }}</span>
        </nuxt-link>
      </template>
    </div>
    <i class="corner" :style="cornerStyle"></i>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
