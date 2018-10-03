<!--
 * @desc Comment
 * @author Jooger <iamjooger@gmail.com>
 * @date 2018-10-03 14:21:14
 -->
<template>
  <div class="comment">
    <CommentList
      :sort="commentSort"
      :list="commentList"
      :pageInfo="pageInfo"
      :loading="commentListFetching"
      @on-sort="handleSort"
      @on-loadmore="handleLoadmore"
      @on-reply="handleReply">
    </CommentList>
    <CommentInputBox @on-publish="handlePublish"></CommentInputBox>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="stylus" scoped src="./index.styl"></style>
