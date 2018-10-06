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
        style="-webkit-background-clip: text;"
        :title="liked ? '已点赞' : ''"
        :data-count="article.meta.ups"
        @click="like">
        <div class="background"></div>
        <i class="icon icon-thumb-up-fill" v-if="liked"></i>
        <i class="icon icon-thumb-up" v-else></i>
        <span class="count" v-if="article.meta.ups">{{ article.meta.ups | countFilter }}</span>
      </a>
      <a class="tool-item comment"
        v-if="!mobileLayout"
        :data-count="article.meta.comments"
        title="文章评论"
        @click="gotoComment">
        <i class="icon icon-comment"></i>
        <span class="count" v-if="article.meta.comments">{{ article.meta.comments | countFilter }}</span>
      </a>
    </div>
    <div class="tool-action">
      <div class="share-list" v-if="mobileLayout">
        <a class="share-item"
          :class="[item.key]"
          v-for="item in config.SHARES"
          :key="item.key"
          :title="item.title"
          rel="nofollow"
          @click="share(item)">
          <i class="icon" :class="[`icon-${item.key}`]"></i>
        </a>
      </div>
      <a class="tool-item tool-item-share"
        :class="{ active: shareBoxVisible }"
        v-else
        title="文章分享"
        @click="shareBoxVisible = true">
        <i class="icon icon-share"></i>
        <Popover placement="right" v-model="shareBoxVisible">
          <div class="pop-list share-list">
            <a class="pop-item share-item"
              :class="[item.key]"
              v-for="item in config.SHARES"
              :key="item.key"
              :title="item.title"
              rel="nofollow"
              @click="share(item)">
              <i class="icon" :class="[`icon-${item.key}`]"></i>
            </a>
          </div>
        </Popover>
      </a>
      <template v-if="!mobileLayout">
        <a class="tool-item tool-item-fontsize"
          :class="{ active: fontBoxVisible }"
          title="设置字体大小"
          @click="fontBoxVisible = true">
          <i class="icon icon-font-size"></i>
          <Popover placement="right" v-model="fontBoxVisible">
            <div class="pop-list font-list">
              <a class="pop-item font-item" title="减小字号" ref="nofollow" @click="setFont(-1)">
                <i class="icon iconfont icon-font-decrease"></i>
              </a>
              <a class="pop-item font-item" title="增大字号" ref="nofollow" @click="setFont(1)">
                <i class="icon iconfont icon-font-increase"></i>
              </a>
            </div>
          </Popover>
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
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
