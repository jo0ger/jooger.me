<template>
  <transition name="slide-down">
    <div class="comment-editor" v-if="mobileCommentEditor">
      <div class="header">
        <h3 class="title">{{ parent && parent._id ? '写回复' : '写评论' }}</h3>
      </div>
      <div class="input-box">
        <textarea class="content-input" ref="input" :disabled="!isLogin" v-model.trim="content" :placeholder="placeholder"></textarea>
      </div>
      <div class="action">
        <a class="cancel-btn btn" @click="handleCancel">取消</a>
        <a class="publish-btn btn" @click="handleSubmit">{{ parent && parent._id ? '回复' : '评论' }}</a>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Mobile-Comment-Editor',
    props: {
      parent: {
        type: Object,
        default () {
          return {}
        }
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
        authInfo: 'auth/info',
        mobileCommentEditor: 'app/mobileCommentEditor',
        mobileCommentChildList: 'app/mobileCommentChildList',
        commentReplyTarget: 'comment/replyTarget',
        articleDetail: 'article/detail'
      }),
      placeholder () {
        return this.commentReplyTarget
          ? `回复 ${this.commentReplyTarget.author.name}：`
            : this.mobileCommentChildList
              ? '想回复点儿什么'
              : '想评论点儿什么'
      }
    },
    watch: {
      mobileCommentEditor (val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        } else {
          this.$refs.input.blur()
        }
      }
    },
    methods: {
      ...mapActions({
        createComment: 'comment/create'
      }),
      handleCancel () {
        this.$store.commit('app/SET_MOBILE_COMMENT_EDITOR', false)
        this.$store.commit('comment/SET_REPLY_TARGET', null)
      },
      handleSubmit () {
        if (this.content) {
          this.$emit('submit', {
            content: this.content,
            done: () => {
              this.content = ''
              this.$store.commit('article/COMMENT_SUCCESS')
              this.$store.commit('app/SET_MOBILE_COMMENT_EDITOR', false)
              this.$message(this.mobileCommentChildList ? '回复成功' : '评论成功')
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
  
  .comment-editor {
    position fixed
    top 0
    right 0
    left 0
    width 100%
    margin 0 auto
    overflow hidden
    z-index 10000
    background $white
    border-top-left-radius 4px
    border-top-right-radius @border-top-left-radius
    transform translate3d(0, 0, 0)
    
    .header {
      text-align center
      border-bottom 1px solid $border-color-4
      .title {
        height 3rem
        line-height @height
        font-size 1rem
      }
    }

    .input-box {
      .content-input {
        width 100%
        min-height 25vh
        padding .75rem
        resize none
        outline none
        transition all .3s $ease
      }
    }

    .action {
      flexLayout()
      border-top 1px solid $border-color-4
      
      .btn {
        flex 1 0 50%
        height 3rem
        border-radius 0
      }

      .cancel-btn {
        background $white
        color $dark

        &:hover {
          background alpha($dark, .1)
        }
      }
    }

  }
</style>
