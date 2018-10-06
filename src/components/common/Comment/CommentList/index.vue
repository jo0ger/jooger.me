<!--
 * @desc CommentList
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:22:54
 -->
<template>
  <Card class="comment-list" :class="{ 'sub-comment-list': isChild , loading, 'empty': !list.length }">
    <template v-if="!isChild || list.length">
      <div class="list-header" slot="header" v-if="!isChild">
        <div class="total">
          共
          <span class="count">{{ article.meta.comments || 0 }}</span>
          条{{ listType }}
        </div>
        <div class="sort">
          <a class="sort-type" :class="{ active: latestSort }" @click="handleSort('createdAt', -1)">最新</a>
          <i class="seprate"></i>
          <a class="sort-type" :class="{ active: hottestSort }" @click="handleSort('ups', -1)">最热</a>
        </div>
      </div>
      <div class="list-content">
        <transition-group tag="div" class="list" name="fade" mode="out-in">
          <template v-if="list.length">
            <CommentItem v-for="(item, index) in list"
              :key="item._id"
              :comment="item"
              :is-child="isChild"
              :index="index"
              @on-reply="handleSetReply"
              @on-reply-publish="handleSubReplyPublish">
            </CommentItem>
          </template>
        </transition-group>
        <transition name="fade" mode="out-in">
          <div class="indicator" v-if="loading || !hasNoMore">
            <Loading v-if="loading" no-text></Loading>
            <button class="loadmore" v-else-if="!hasNoMore && list.length" @click="handleLoadmore">来，继续翻</button>
            <p class="no-data" v-else>暂无{{ listType }}</p>
          </div>
        </transition>
      </div>
    </template>
    <CommentInputBox v-if="isChild"
      ref="inputBox"
      is-child
      :parent="parent"
      :reply="replyTarget"
      @on-publish="handleReplyPublish"
      @on-clear-reply="handleClearReply">
    </CommentInputBox>
  </Card>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
