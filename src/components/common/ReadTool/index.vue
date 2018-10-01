<!--
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 -->
<template>
  <div class="read-tool">
    <div class="tool-meta">
      <a class="tool-item like"
        :class="{ liked, 'liking': liking }"
        :title="liked ? '已点赞' : ''"
        :data-count="article.meta.ups"
        @click="like">
        <div class="background"></div>
        <i class="icon icon-thumb-up"></i>
        <span class="count" v-if="article.meta.ups">{{ article.meta.ups | countFilter }}</span>
      </a>
      <a class="tool-item comment"
        :data-count="article.meta.comments"
        @click="gotoComment">
        <i class="icon icon-comment"></i>
        <span class="count" v-if="article.meta.comments">{{ article.meta.comments | countFilter }}</span>
      </a>
    </div>
    <div class="tool-action">
      <a class="tool-item tool-item-share">
        <i class="icon icon-share"></i>
      </a>
      <a class="tool-item tool-item-fontsize">
        <i class="icon icon-font-size"></i>
      </a>
      <a class="tool-item tool-item-fullcolumn"
        :title="fullColumn ? '退出通栏' : '通栏阅读'"
        @click="setFullColumn(!fullColumn)">
        <i class="icon" :class="[fullColumn ? 'icon-fullcolumn-shrink' : 'icon-fullcolumn']"></i>
      </a>
      <a class="tool-item tool-item-fullscreen"
        :title="fullScreen ? '退出全屏' : '全屏阅读'"
        @click="toggleFullScreen">
        <i class="icon" :class="[fullScreen ? 'icon-fullscreen-exit' : 'icon-fullscreen']"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
