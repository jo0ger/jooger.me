<!--
 * @desc Tool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 17:12:13
 -->
<template>
  <Card class="tool site-tool" no-padding>
    <div class="wrapper">
      <transition-group tag="div" name="fade" class="tool-list">
        <nuxt-link class="tool-item music" :class="{ playing: $bus.control.playing }" key="music" to="/music">
          <transition name="fade" mode="out-in">
            <Loading v-if="$bus.control.loading" size="small" no-text></Loading>
            <div class="col" v-else>
              <i class="line" v-for="item in 4" :key="item"></i>
            </div>
          </transition>
        </nuxt-link>
        <a class="tool-item feedback" key="feedback"
          :href="'mailto:' + setting.personal.user.email">
          <i class="icon icon-feedback"></i>
        </a>
        <a class="tool-item theme"
          key="theme"
          @click="updateTheme(
            theme === 'light' ? 'dark' : 'light'
          )">
          <i class="icon" :class="['icon-' + (theme === 'light' ? 'dark' : 'light')]"></i>
        </a>
        <a class="tool-item up" key="up" v-if="showScrollTop" @click="goTop">
          <i class="icon icon-arrow-up"></i>
        </a>
      </transition-group>
    </div>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
