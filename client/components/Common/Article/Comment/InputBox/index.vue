<template>
  <div class="comment-input-box" :class="{ 'child-input-box': isChild, mute: authInfo.mute }">
    <transition name="fade" mode="out-in">
      <div class="spinner" v-if="!isChild && authLoading"></div>
      <div class="container" v-else-if="!authLoading">
        <div class="comment-box">
          <a :href="authInfo.github && authInfo.github.blog || 'javascript:;'" target="_blank" class="avatar">
            <img :src="authInfo.avatar" alt="" v-if="authInfo && authInfo.avatar">
            <i class="iconfont icon-user" v-else></i>
          </a>
          <div class="input-box">
            <textarea class="content-input" ref="input" :disabled="!isLogin" v-model.trim="content" :placeholder="placeholder"></textarea>
            <div class="overlay" v-if="!isLogin || authInfo.mute">
              <a class="link login-btn" v-if="!isLogin" @click="handleLogin">
                <span>使用Github账号登录</span>
              </a>
              <a class="mute-btn" v-else-if="authInfo.mute">
                <span>您已被禁言，请联系管理员解除</span>
                <p>{{ authInfo.github.email }}</p>
              </a>
            </div>
          </div>
        </div>
        <div class="action-box">
          <div class="submit-box" v-if="isLogin">
            <a class="logout-btn link" v-if="!isChild" @click="handleLogout">
              <span>退出</span>
            </a>
            <a class="sb-btn link" @click.stop="handleSubmit" v-if="authInfo && !authInfo.mute">
              <span>{{ isChild ? (loading ? '回复中' : '回复') : (loading ? '评论中' : '评论') }}</span>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from '~/config'
  import { getSessionStorageItem, removeSessionStorageItem } from '~/utils'

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
      if (this.isChild) {
        this.$refs.input && this.$refs.input.focus()
      }
    },
    methods: {
      setCommentCache () {
        this.content = getSessionStorageItem(config.storage.commentCacheKey) || ''
        removeSessionStorageItem(config.storage.commentCacheKey)
      },
      handleLogin () {
        window.open('/auth/login?state=github', 'child', 'height=500, width=500, top=200,left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no')
      },
      handleLogout () {
        this.$store.dispatch('auth/githubLogout')
        this.$message('退出成功')
      },
      handleSubmit () {
        if (this.content) {
          this.$emit('submit', {
            content: this.content,
            done: () => {
              this.content = ''
              this.$store.commit('article/COMMENT_SUCCESS')
            }
          })
        } else {
          this.$message('请填写内容')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-input-box {
    margin 1rem 0

    .spinner {
      width 3rem
      height @width
      margin 2rem auto
    }
    .comment-box {
      flexLayout(, flex-start, flex-start)
      .avatar {
        flex 0 0 3rem
        width 3rem
        height @width
        line-height @width
        margin-right .5rem
        border-radius 50%
        color $white
        text-align center
        background $text-color-secondary
        overflow hidden

        img {
          width 100%
          height @width
        }

        .iconfont {
          font-size 1.5rem
        }
      }

      .input-box {
        flex 1 0
        position relative

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

        .overlay {
          flexLayout()
          position absolute
          top 0
          right 0
          bottom 0
          left 0
          background alpha($white, .6)

          .login-btn {
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

          .mute-btn {
            padding .5em 2em
            border-radius 2px
            color $text-color-secondary
            text-align center
            cursor not-allowed
          }
        }
      }
    }
    .action-box {
      flexLayout(, flex-end, flex-start)
      margin-top 10px
      font-size .75rem

      .submit-box {
        .logout-btn {
          display inline-block
          padding .5em 0

          &::after {
            display none
          }
        }
        .sb-btn {
          display inline-block
          margin-left 1rem
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
        .logout-btn {
          display none !important
        }
        .submit-box {
          width 100%
          .sb-btn {
            width 100%
            margin-left 0
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
      margin-bottom 0
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

    &.mute {
      .input-box {
        cursor not-allowed
      }
    }
  }
</style>
