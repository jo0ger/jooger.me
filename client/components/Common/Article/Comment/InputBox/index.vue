<template>
  <div class="comment-input-box" :class="{ 'child-input-box': isChild }">
    <div class="spinner" v-show="!isChild && authLoading"></div>
    <div class="container" v-show="!authLoading">
      <div class="comment-box">
        <div class="avatar">
          <img :src="authInfo.avatar" alt="" v-if="authInfo && authInfo.avatar">
          <i class="iconfont icon-user" v-else></i>
        </div>
        <div class="input-box">
          <textarea class="content-input" ref="input" :disabled="!isLogin" v-model.trim="content" :placeholder="placeholder"></textarea>
        </div>
      </div>
      <div class="action-box">
        <div class="submit-box" v-if="isLogin">
          <a class="sb-btn link" @click.stop="handleSubmit">
            <span>{{ isChild ? (loading ? '回复中' : '回复') : (loading ? '评论中' : '评论') }}</span>
          </a>
        </div>
        <div class="submit-box" @click="handleLogin" v-else>
          <a class="sb-btn link">
            <span>使用Github账号登录</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from '~/config'
  import { setSessionStorageItem, getSessionStorageItem, removeSessionStorageItem } from '~/utils'

  export default {
    name: 'ArticleInputBox',
    props: {
      isChild: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '说点儿什么'
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        content: ''
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin',
        authLoading: 'auth/loading',
        authInfo: 'auth/info'
      })
    },
    mounted () {
      this.setCommentCache()
    },
    methods: {
      setCommentCache () {
        this.content = getSessionStorageItem(config.storage.commentCacheKey) || ''
        removeSessionStorageItem(config.storage.commentCacheKey)
      },
      handleLogin () {
        window.open("/auth/login?state=github", "child", "height=500, width=500, top=200,left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
      },
      handleSubmit () {
        if (this.content) {
          this.$emit('submit', {
            content: this.content,
            done: () => {
              this.content = ''
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-input-box {
    margin-bottom 30px

    .spinner {
      width 48px
      height @width
      margin 30px auto
    }
    .comment-box {
      flexLayout(, flex-start, flex-start)
      margin-top 30px
      .avatar {
        flex 0 0 42px
        width 42px
        height @width
        line-height @width
        margin-right 10px
        border-radius 50%
        color $white
        text-align center
        background $text-color-secondary
        overflow hidden

        & > img {
          width 100%
          height @width
        }

        .iconfont {
          font-size 24px
        }
      }

      .input-box {
        flex 1 0

        .content-input {
          width 100%
          min-height 6.125em
          max-height 15em
          padding .75em
          background $grey
          border 1px solid $border-color
          border-radius 2px
          resize none
          outline none
          transition all .3s $ease

          &:hover {
            background $grey2
          }
        }
      }
    }
    .action-box {
      flexLayout(, flex-end, flex-start)
      margin-top 10px

      .submit-box {
        .sb-btn {
          display inline-block
          padding .5em 2em
          border-radius 2px
          color $white
          text-align center
          -webkit-text-fill-color $white
          -webkit-background-clip padding-box

          &::after {
            display none
          }
        }
      }
    }

    +xxs() {
      .action-box {
        .submit-box {
          width 100%
          .sb-btn {
            width 100%
          }
        }
      }
    }

    +respond-below($screen-xs-max) {
      .comment-box {
        .avatar {
          display none
        }
      }
    }

    &.child-input-box {
      .avatar {
        display none
      }

      .input-box {
        .content-input {
          min-height 2em
          max-height 10em
        }
      }

      .submit-box {
        .sb-btn {
          padding .3rem 1rem
        }
      }
    }
  }
</style>
