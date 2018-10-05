<!--
 * @desc MessageItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-05 14:33:59
 -->
<template>
  <Card class="message-item" :class="{ 'identified': user && message.author._id === user._id }">
    <no-ssr>
      <transition name="fade">
        <span class="tag" v-if="user && message.author._id === user._id">我</span>
      </transition>
    </no-ssr>
    <a class="user" :href="message.author.site || 'javascript:;'" target="_blank">
      <img :src="message.author.avatar" :alt="message.author.name" class="avatar">
      <span class="name">{{ message.author.name }}</span>
    </a>
    <div class="content markdown-body" style="font-size: 14px;" v-html="message.renderedContent"></div>
    <div class="meta">
      <a class="like"
        :class="{ 'liked': isLiked, liking }"
        style="-webkit-background-clip: text;"
        :title="isLiked ? '已点赞' : ''"
        @click="like(message)">
        <i class="icon icon-like-fill"></i>
        <span class="count" v-if="message.ups">{{ message.ups | countFilter }}</span>
      </a>
      <time class="time" :datatitme="message.createdAt">
        {{ message.createdAt | dateFormat }}
      </time>
    </div>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
