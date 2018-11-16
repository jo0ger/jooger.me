<!--
 * @desc ComemntItem
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:23:07
 -->
<template>
  <div class="comment-item" :class="{ 'sub-comment-item': isChild }">
    <div class="header">
      <div class="user-info">
        <a :href="comment.author.site || 'javascript:void;'" class="author" :class="{ 'no-site': !comment.author.site }" target="_blank" rel="noopener">
          <div class="avatar">
            <img :src="comment.author.avatar" alt="">
          </div>
          <span class="name">
            {{ comment.author.name }}
            <i class="icon icon-crown admin-tag"></i>
          </span>
        </a>
        <span class="reply" v-if="forward">
          <span class="text">回复</span>
          <a class="name" :href="forward.author.site || 'javascript:;'" target="_blank" rel="noopener">@{{ forward.author.name }}</a>
          <i class="icon icon-crown admin-tag"></i>
        </span>
      </div>
      <span class="meta">
        <span class="location" v-if="comment.meta.location && comment.meta.location.country && comment.meta.location.city">
          <span>{{ comment.meta.location.country }}</span>
          <span v-if="comment.meta.location.city">&nbsp;-&nbsp;</span>
          <span>{{ comment.meta.location.city }}</span>
        </span>
        <template v-if="!mobileLayout">
          <span class="os" v-html="OSParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
          <span class="ua" v-html="UAParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
        </template>
      </span>
    </div>
    <div class="content markdown-body" style="font-size: 14px;" v-html="comment.renderedContent"></div>
    <div class="status">
      <a class="status-item like"
        :class="{ liked: isLiked, liking }"
        style="-webkit-background-clip: text;"
        :title="isLiked ? '已点赞' : ''"
        @click="handleLike">
        <i class="icon" :class="[`icon-thumb-up${isLiked ? '-fill' : ''}`]"></i>
        <span class="count">{{ comment.ups }}</span>
      </a>
      <a class="status-item subcomments" @click.stop="handleToggleSubComments">
        <i class="icon icon-comment"></i>
        <span v-if="showSub">收起回复</span>
        <span v-else>
          {{ (comment.subCount > 0 ? `${comment.subCount}条` : '') + '回复' }}
        </span>
      </a>
      <time class="status-item time" :datatitme="comment.createdAt">
        {{ comment.createdAt | getDateFromNow }}
      </time>
    </div>
    <transition name="fade">
      <div class="sub-comments-box" v-if="showSub">
        <CommentList
          is-child
          :parent="comment._id"
          :loading="fetching"
          :list="children"
          :sort="sort"
          :total="pageInfo.total"
          :page-info="pageInfo"
          @on-sort="handleSubSort"
          @on-loadmore="handleSubLoadmore"
          @on-reply-publish="handleReplyPublish">
        </CommentList>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" src="./index.styl"></style>
