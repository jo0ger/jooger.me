<template>
  <li class="comment-item" :class="{ 'child-item': isChild }">
    <a :href="comment.author.github.blog || 'javascript:;'" target="_blank" rel="noopener">
      <img :src="comment.author.avatar" alt="" class="avatar">
    </a>
    <div class="content-box">
      <div class="header">
        <div class="info">
          <div class="user-info">
            <a :href="comment.author.github.blog || 'javascript:;'" target="_blank" rel="noopener">{{ comment.author.name }}</a>
            <span class="text-reply" v-if="forward">
              <span class="text">回复</span>
              <a :href="forward.author.github.blog || 'javascript:;'">{{ forward.author.name }}</a>
            </span>
          </div>
          <div class="meta">
            <span class="os" v-html="OSParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
            <span class="ua" v-html="UAParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
          </div>
        </div>
      </div>
      <div class="content md-body md-mini" v-html="comment.renderedContent"></div>
      <div class="footer">
        <a class="like-btn" :class="{ 'is-liked': checkLiked(comment._id) }" @click.stop="handleLike(comment._id)">
          <i class="iconfont icon-up"></i>
          <span>{{ comment.ups }}</span>
        </a>
        <time class="time" :datatitme="comment.createdAt">{{ comment.createdAt | getDateFromNow }}</time>
        <a class="reply-btn" @click.stop="handleSelectReplyTarget(comment._id)" v-if="isChild">
          <i class="iconfont icon-reply"></i>
          <span>回复</span>
        </a>
        <a class="sub-comment-btn" v-else @click.stop="handleToggleSubComments">
          <i class="iconfont icon-comment"></i>
          <span v-if="!showSub">{{ comment.subCount }} 条{{ isChild ? '回复' : '评论' }}</span>
          <span v-else>收起评论</span>
        </a>
        <span class="location" v-if="comment.meta.location && comment.meta.location.country && comment.meta.location.city">
          <span>{{ comment.meta.location.country }}</span>
          <span v-if="comment.meta.location.city">&nbsp;-&nbsp;</span>
          <span>{{ comment.meta.location.city }}</span>
        </span>
      </div>
      <transition name="fade">
        <div class="sub-comment-box" v-if="showSub">
          <div class="top-bar"></div>
          <div class="list">
            <ArticleCommentList
              :loading="fetching"
              :list="children"
              :sort="subSort"
              :total="pagination.total"
              :pagination="pagination"
              is-child
              @sort="handleSort"
              @page-change="handlePageChange">
            </ArticleCommentList>
          </div>
          <div class="action">
            <InputBox
              ref="reply"
              :placeholder="inputPlaceholder"
              :loading="replying"
              is-child
              @submit="handleReply"></InputBox>
          </div>
        </div>
      </transition>
    </div>
  </li>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Service from '~/service'
  import { UAParse, OSParse } from '~/utils'
  import InputBox from '../InputBox'

  export default {
    name: 'ArticleCommentItem',
    components: {
      InputBox
    },
    props: {
      comment: {
        type: Object,
        default () {
          return {}
        }
      },
      isChild: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        subSort: 1, // 0 最新 | 1 最热
        showSub: false,
        fetching: false,
        liking: false,
        replying: false,
        children: [],
        pagination: {}
      }
    },
    computed: {
      ...mapGetters({
        likeHistory: 'app/history',
        authInfo: 'auth/info',
        replyTarget: 'comment/replyTarget'
      }),
      replyTargetComment () {
        return this.children.find(child => child._id === this.replyTarget)
      },
      inputPlaceholder () {
        return this.replyTargetComment ? `回复 ${this.replyTargetComment.author.name}：` : '想回复点儿什么'
      },
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
      this.$options.components.ArticleCommentList = require('../List/index.vue').default
    },
    methods: {
      UAParse,
      OSParse,
      async fetchSubList (params = {}) {
        this.fetching = true
        const { success, data } = await Service.comment.fetchList({
          params: Object.assign({}, {
            article: this.comment.article,
            per_page: this.pagination.per_page || 5,
            page: (this.pagination ? this.pagination.current_page : 0) + 1,
            parent: this.comment._id
          }, params)
        }).catch(() => ({}))
        this.fetching = false
        if (success) {
          this.children = data.list
          this.pagination = data.pagination
        }
      },
      checkLiked (commentId = '') {
        return !!this.likeHistory.comments.find(id => commentId === id)
      },
      async handleLike (commentId = '') {
        const isLiked = this.checkLiked(commentId)
        if (isLiked || this.liking) {
          return
        }
        this.liking = true
        if (!this.isChild) {
          await this.$store.dispatch('comment/like', commentId)
        } else {
          const { success } = await Service.comment.like(this.comment._id)().catch(() => ({}))
          if (success) {
            this.$store.dispatch('app/updateHistory', { commentId: this.comment._id })
            const index = this.$parent.$parent.children.findIndex(child => child._id === this.comment._id)
            if (index > -1) {
              const item = this.$parent.$parent.children[index]
              this.$parent.$parent.children.splice(index, 1, {
                ...item,
                ups: item.ups + 1
              })
            }
          }
        }
        this.liking = false
      },
      handleToggleSubComments () {
        this.showSub = !this.showSub
        if (this.showSub) {
          this.handleSort(1)
        } else {
          this.$store.commit('comment/SET_REPLY_TARGET', '')
        }
      },
      handleSort (sort, params = {}) {
        this.subSort = sort
        const s = {}
        s.order = -1
        s.sort_by = sort ? 'ups' : 'createdAt'
        this.fetchSubList({
          page: 1,
          ...params,
          ...s
        })
      },
      handlePageChange (page) {
        this.handleSort(this.subSort, { page })
      },
      handleSelectReplyTarget (targetId) {
        this.$store.commit('comment/SET_REPLY_TARGET', targetId)
        this.$nextTick(() => {
          this.$parent.$parent.$refs.reply.$refs.input.focus()
        })
      },
      async handleReply ({ content = '', done }) {
        if (this.replying) {
          return
        }
        this.replying = true
        const { success } = await Service.comment.create({
          data: {
            content,
            author: this.authInfo._id,
            type: 0,
            article: this.comment.article,
            parent: this.comment._id,
            forward: this.replyTarget || this.comment._id
          }
        }).catch(() => ({}))
        this.replying = false
        if (success) {
          done && done()
          this.$store.commit('comment/REPLY_SUCCESS', {
            parentId: this.comment._id,
            articleId: this.comment.article
          })
          this.handleSort(0)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-item {
    flexLayout(, flex-start, flex-start)
    position relative
    margin-bottom 1rem
    padding-bottom 1rem

    &::after {
      content ''
      position absolute
      right 0
      bottom 0
      left 3.125rem
      border-bottom 1px solid $grey
    }

    .avatar {
      flex 0 0
      flex-basis 2.5rem
      width @flex-basis
      height @width
      border-radius 50%
    }

    .content-box {
      flex 1 0
      margin-left .625rem
      overflow hidden

      .info {
        flexLayout(, space-between)

        .user-info {
          flex 1 0
          color #333
          font-weight 600
          font-size 1rem
          textOverflow()

        }
        .text-reply {
          margin-left 10px
          color alpha($base-color, .6)
          font-size 1rem
          .text {
            margin-right .5rem
            font-size .75rem
            color $text-color-secondary
          }
        }
        .meta {
          display inline-block
          margin-left 1rem
          color alpha($black, 25%)
          font-size .75rem
          & > span {
            margin-right .5rem
          }
        }
      }


      .content {
        margin .5rem 0 .8rem
      }

      .footer {
        color $text-color-secondary
        font-size .75rem

        & > a {
          &:hover {
            color $text-color
          }
        }

        .like-btn {
          margin-right 1rem
          padding .2rem .4rem
          background $grey

          .iconfont {
            margin-right .25rem
            font-size .75rem
          }

          &.is-liked {
            color $base-color
            background alpha($base-color, .05)
          }
        }

        .time {
          margin-right 1rem
        }

        .reply-btn
        .sub-comment-btn {
          .iconfont {
            margin-right .25rem
            font-size .75rem
          }
        }

        .reply-btn {
          opacity 0
        }

        .location {
          float right
        }
      }

      .sub-comment-box {
        margin-top 1rem
        padding 1rem
        border 1px solid $grey
      }
    }
    +respond-below($screen-xs-max) {
      .avatar {
        flex-basis 2rem
        width @flex-basis
        height @width
      }

      .sub-comment-box {
        padding .5rem !important
      }
    }

    +xxs() {
      .avatar {
        flex-basis 1.5rem
        width @flex-basis
        height @width
      }
    }

    &.child-item {
      &:hover {
        .content-box {
          .footer {
            .reply-btn {
              opacity 1
            }
          }
        }
      }
    }

    +xxs() {
      .meta {
        display none !important
      }
    }
  }
</style>

<style lang="stylus">
  .comment-item {
    .meta {
      .iconfont {
        margin-right .25rem
        font-size .75rem
      }
    }
  }
</style>
