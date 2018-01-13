<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="comment-item" :class="{ 'sub-comment-item': child }">
    <div class="header">
      <div class="user-info">
        <a :href="comment.author.site || 'javascript:void;'" class="author" :class="{ 'no-site': !comment.author.site }" target="_blank" rel="noopener">
          <div class="avatar">
            <img :src="avatar" alt="">
          </div>
          <span class="name">{{ comment.author.name }}</span>
        </a>
        <span class="reply" v-if="forward">
          <span class="text">回复</span>
          <a class="name" :href="forward.author.site || 'javascript:;'" target="_blank" rel="noopener">@{{ forward.author.name }}</a>
        </span>
      </div>
      <!-- <span class="meta">
        <span class="os" v-html="OSParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
        <span class="ua" v-html="UAParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
      </span> -->
    </div>
    <div class="content md-body md-mini" v-html="comment.renderedContent"></div>
    <div class="status">
      <a class="status-item like"
        :class="{ liked: isLiked, liking }"
        :title="isLiked ? '已点赞' : ''"
        @click="handleLike">
        <i class="icon" :class="[`icon-thumb-up${isLiked ? '-fill' : ''}`]"></i>
        <span class="count">{{ comment.ups }}</span>
      </a>
      <a class="status-item subcomments" @click.stop="handleToggleSubComments">
        <i class="icon icon-comment"></i>
        <span v-if="showSub">收起{{ listType }}</span>
        <span v-else>
          {{ (comment.subCount > 0 ? `${comment.subCount}个` : '') + listType }}
        </span>
      </a>
      <span class="status-item location" v-if="comment.meta.location && comment.meta.location.country && comment.meta.location.city">
        <span>{{ comment.meta.location.country }}</span>
        <span v-if="comment.meta.location.city">&nbsp;-&nbsp;</span>
        <span>{{ comment.meta.location.city }}</span>
      </span>
      <time class="status-item time" :datatitme="comment.createdAt">
        {{ comment.createdAt | getDateFromNow }}
      </time>
    </div>
    <transition name="fade">
      <div class="sub-comments-box" v-show="showSub">
        <CommentList child
          :parent="comment._id"
          :loading="fetching"
          :list="children"
          :sort="sort"
          :total="pagination.total"
          :pagination="pagination"
          @on-sort="handleSubSort"
          @on-loadmore="handleSubLoadmore"
          @on-reply-publish="handleReplyPublish">
        </CommentList>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { UAParse, OSParse } from '@/utils'
  import { api } from '@/services'
  import logo from '@/static/images/logo.svg'

  export default {
    name: 'CommentItem',
    props: {
      comment: {
        type: Object,
        default () {
          return {}
        }
      },
      index: {
        type: Number,
        required: true
      },
      child: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        avatar: logo,
        liking: false,
        showSub: false,
        fetching: false,
        children: [],
        pagination: {},
        // 默认最新评论
        sort: {
          by: 'createdAt',
          order: -1
        }
      }
    },
    computed: {
      ...mapGetters({
        historyLikes: 'app/history'
      }),
      forward () {
        if (!this.comment.forward) {
          return null
        } else if (this.comment.forward._id === this.comment.parent._id) {
          return null
        }
        return this.comment.forward
      },
      isLiked () {
        return !!this.historyLikes.comments.find(item => item === this.comment._id)
      },
      listType () {
        return this.child ? '回复' : '评论'
      }
    },
    beforeCreate () {
      this.$options.components.CommentList = require('../List').default
    },
    mounted () {
      // HACK: 去掉的话，icon-like不会fill
      this.$forceUpdate()
      this.loadAvatar()
    },
    methods: {
      UAParse,
      OSParse,
      loadAvatar () {
        if (!this.comment.author.avatar) {
          return
        }
        const avatar = this.comment.author.avatar
        return this.$loadImg(avatar, {
          success: (img) => {
            this.avatar = avatar
          }
        })
      },
      async fetchSubList (params = {}) {
        this.fetching = true
        const { success, data } = await api.comment.list({
          params: Object.assign({}, {
            article: this.comment.article,
            per_page: this.pagination.per_page || 5,
            page: (this.pagination ? this.pagination.current_page : 0) + 1,
            parent: this.comment._id
          }, params)
        }).catch(() => ({}))
        this.fetching = false
        if (success) {
          this.pagination = data.pagination
          if (this.pagination.current_page === 1) {
            this.children = data.list
          } else {
            this.children.push(...data.list)
          }
        }
      },
      async handleLike () {
        if (this.liking) {
          return
        }
        this.liking = true
        const like = !this.isLiked
        const success = await this.$store.dispatch('comment/like', {
          id: this.comment._id,
          like
        })
        this.liking = false
        if (success && this.child) {
          const parentComment = this.$parent.$parent.$parent
          const child = parentComment.children.find(child => child._id === this.comment._id)
          if (child) {
            child.ups += (like ? 1 : -1)
          }
        }
      },
      handleToggleSubComments () {
        if (!this.child) {
          // 一级评论可以展示子评论
          this.showSub = !this.showSub
          if (this.showSub) {
            this.handleSubSort({
              by: 'createdAt',
              order: -1
            })
          }
        } else {
          this.$emit('on-reply', this.index)
        }
      },
      handleSubSort ({ by, order }, params = {}) {
        this.sort = { by, order }
        const args = {
          sort_by: by,
          order
        }
        params = Object.assign({ page: 1 }, params, {
          sort_by: by,
          order
        })
        if (params.page === 1) {
          this.children = []
          this.pagination = {}
        }
        this.fetchSubList(params)
      },
      handleSubLoadmore (page) {
        this.handleSubSort(this.sort, { page })
      },
      handleReplyPublish () {
        this.handleSubSort({
          by: 'createdAt',
          order: -1
        }, {
          page: 1
        })
      }
    }
  }
</script>

