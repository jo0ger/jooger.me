<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="comment-item">
    <div class="header">
      <div class="user-info">
        <a :href="`https://github.com/${comment.author.github.login}`" class="author" target="_blank" rel="noopener">
          <div class="avatar">
            <img :src="comment.author.avatar" alt="">
          </div>
          <span class="name">{{ comment.author.name }}</span>
        </a>
        <span class="text-reply" v-if="forward">
          <span class="text">回复</span>
          <a name="user" :href="forward.author.site || 'javascript:;'" target="_blank" rel="noopener">{{ forward.author.name }}</a>
        </span>
      </div>
      <span class="meta">
        <span class="os" v-html="OSParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
        <span class="ua" v-html="UAParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
      </span>
    </div>
    <div class="content md-body md-mini" v-html="comment.renderedContent"></div>
    <div class="status">
      <a class="status-item like"
        :title="''"
        @click="handleLike">
        <i class="icon" :class="[`icon-like${false ? '-fill' : ''}`]"></i>
        <span class="count">{{ comment.ups }}</span>
      </a>
      <a class="status-item subcomments">
        <i class="icon icon-comment"></i>
        <span v-if="!showSub">
          {{ (comment.subCount > 0 ? `${comment.subCount}个` : '添加') + (child ? '回复' : '评论') }}
        </span>
        <ul class="share-list"></ul>
      </a>
    </div>
    <div class="subcomment-list"></div>
  </div>
</template>

<script>
  import { UAParse, OSParse } from '@/utils'

  export default {
    name: 'CommentItem',
    props: {
      comment: {
        type: Object,
        default () {
          return {}
        }
      },
      child: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showSub: false
      }
    },
    computed: {
      forward () {
        if (!this.comment.forward) {
          return null
        } else if (this.comment.forward._id === this.comment.parent._id) {
          return null
        }
        return this.comment.forward
      }
    },
    beforeCreate () {
      this.$options.components.CommentList = require('../List').default
    },
    methods: {
      UAParse,
      OSParse,
      handleLike () {}
    }
  }
</script>

