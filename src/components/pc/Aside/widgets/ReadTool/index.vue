<!--
 * @desc ReadTool
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-09-28 01:14:12
 -->
<template>
  <Card class="read-tool">
    <div class="tools">
      <div class="tool-item tool-item-share" v-popover:share @click="share">
        <i class="icon iconfont icon-share"></i>
        <span class="title">文章分享</span>
        <no-ssr>
          <popover name="share">
            <div class="pop-list share-list">
              <a class="pop-item share-item"
                :class="[item.key]"
                v-for="item in config.SHARES"
                :key="item.key"
                :title="item.title"
                rel="nofollow"
                @click="handleShare(item)">
                <i class="icon" :class="[`icon-${item.key}`]"></i>
              </a>
            </div>
          </popover>
        </no-ssr>
      </div>
      <div class="tool-item tool-item-font" v-popover:font>
        <i class="icon iconfont icon-font"></i>
        <span class="title">文字大小</span>
        <no-ssr>
          <popover name="font" :width="100">
            <div class="pop-list font-list">
              <a class="pop-item font-item" title="减小字号" ref="nofollow" @click="setFont(-1)">
                <i class="icon iconfont icon-font-decrease"></i>
              </a>
              <a class="pop-item font-item" title="增大字号" ref="nofollow" @click="setFont(1)">
                <i class="icon iconfont icon-font-increase"></i>
              </a>
            </div>
          </popover>
        </no-ssr>
      </div>
      <div class="tool-item" v-for="tool in tools" :key="tool.key" @click="toolClick(tool)">
        <i class="icon iconfont" :class="['icon-' + tool.key]"></i>
        <span class="title">{{ tool.title }}</span>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
