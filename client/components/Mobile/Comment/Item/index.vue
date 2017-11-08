<template>
  <li class="comment-item" :class="{ 'child-item': isChild }">
    <div class="header">
      <a :href="comment.author.github.blog || 'javascript:;'" target="_blank" rel="noopener" class="avatar">
        <img :src="avatar" alt="" v-if="avatar">
        <i class="iconfont icon-logo" v-else></i>
      </a>
      <div class="info">
        <div class="user-info">
          <a :href="comment.author.github.blog || 'javascript:;'" target="_blank" rel="noopener">{{ comment.author.name }}</a>
          <span class="text-reply" v-if="forward">
            <span class="text">回复</span>
            <a :href="forward.author.github.blog || 'javascript:;'" target="_blank" rel="noopener">{{ forward.author.name }}</a>
          </span>
        </div>
        <div class="meta">
          <span class="os" v-html="OSParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
          <span class="ua" v-html="UAParse(comment.meta.ua)" v-if="comment.meta.ua"></span>
        </div>
      </div>
    </div>
    <div class="content md-body-mini" v-html="comment.renderedContent"></div>
    <div class="footer">
      <a class="like-btn" :class="{ 'is-liked': checkLiked(comment._id) }" @click.stop="handleLike(comment._id)">
        <i class="iconfont icon-thumb-up"></i>
        <span>{{ comment.ups }}</span>
      </a>
      <time class="time" :datatitme="comment.createdAt">{{ comment.createdAt | getDateFromNow }}</time>
      <a class="reply-btn" @click.stop="handleSelectReplyTarget(comment)" v-if="isChild && isLogin">
        <i class="iconfont icon-reply" v-if="!mobileLayout"></i>
        <span>回复</span>
      </a>
      <a class="sub-comment-btn" v-else-if="!isChild" @click.stop="handleShowChildComments">
        <i class="iconfont icon-comment"></i>
        <span>{{ comment.subCount }} 条{{ isChild ? '回复' : '评论' }}</span>
      </a>
    </div>
  </li>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { UAParse, OSParse } from '~/utils'
  import Service from '~/service'

  export default {
    name: 'Mobile-Comment-Item',
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
        avatar: ''
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin',
        likeHistory: 'app/history',
        mobileLayout: 'app/mobileLayout',
        mobileCommentChildList: 'app/mobileCommentChildList',
        authInfo: 'auth/info',
        commentReplyTarget: 'comment/replyTarget'
      }),
      inputPlaceholder () {
        return this.commentReplyTarget ? `回复 ${this.commentReplyTarget.author.name}：` : '想回复点儿什么'
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
    mounted () {
      this.$imgLoad(this.comment.author.avatar, {
        success: url => {
          this.avatar = url
        }
      })
    },
    methods: {
      UAParse,
      OSParse,
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
            const index = this.$parent.$parent.list.findIndex(child => child._id === this.comment._id)
            if (index > -1) {
              const item = this.$parent.$parent.list[index]
              this.$parent.$parent.list.splice(index, 1, {
                ...item,
                ups: item.ups + 1
              })
            }
          }
        }
        this.liking = false
      },
      handleSelectReplyTarget (target) {
        if (this.isLogin) {
          this.$store.commit('comment/SET_REPLY_TARGET', target)
          this.$store.commit('app/SET_MOBILE_COMMENT_EDITOR', true)
        } else {
          this.$message('请先登录')
        }
      },
      handleShowChildComments () {
        this.$store.commit('app/SET_MOBILE_COMMENT_CHILD_LIST', !this.mobileCommentChildList)
        if (this.$parent.$parent.$options.name === 'Mobile-Comment') {
          this.$parent.$parent.currentParentCommentId = this.mobileCommentChildList ? this.comment._id : ''
        }
        if (this.mobileCommentChildList) {
          // TODO:
        } else {
          this.$store.commit('comment/SET_REPLY_TARGET', null)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-item {
    flexLayout(column, flex-start, flex-start)
    position relative
    margin-bottom 1rem
    padding-bottom 1rem

    &::after {
      content ''
      position absolute
      right 0
      bottom 0
      left 0
      width 100%
      border-bottom 1px solid $grey
    }

    .header
    .content
    .footer {
      width 100%  
    }

    .header {
      flexLayout(, flex-start, flex-start)
      .avatar {
        flex 0 0
        flex-basis 2.5rem
        width @flex-basis
        height @width
        line-height @width
        text-align center
        border-radius 4px
        background $grey

        img {
          width 100%
          height @width
          border-radius 4px
        }

        .iconfont {
          color alpha($black, .3)  
        }
      }

      .info {
        flex 1 0
        margin-left .75rem  
      }

      .user-info {
        color $dark
        font-weight 600
        font-size .875rem
        line-height 1.5
        textOverflow()
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
      }
      .meta {
        display inline-block
        color alpha($black, .25)
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
        display inline-block
        text-align center
        &:hover {
          color $text-color
        }
      }

      .like-btn {
        margin-right 1rem
        width 2.5rem
        height 1.5rem
        line-height @height
        background $grey
        border-radius 4px

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

      .location {
        float right
        color alpha($black, .25)
      }
    }

    &.child-item {
      padding 1rem
      margin 0
    }
  }
</style>
