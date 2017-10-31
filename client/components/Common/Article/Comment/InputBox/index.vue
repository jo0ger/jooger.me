<template>
  <div class="comment-input-box">
    <div class="comment-box">
      <div class="avatar">
        <i class="iconfont icon-user"></i>
      </div>
      <div class="input-box">
        <textarea class="content-input" placeholder="说点儿什么"></textarea>
      </div>
    </div>
    <div class="action-box">
      <div class="submit-box">
        <a class="sb-btn link">
          <span>评论</span>
        </a>
      </div>
      <div class="submit-box" style="margin-left: 15px" @click="handleLogin">
        <a class="sb-btn link">
          <span>登录</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleInputBox',
    props: {

    },
    data () {
      return {}
    },
    methods: {
      handleLogin () {
        this.$store.dispatch('auth/login')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-input-box {
    .comment-box {
      flexLayout(, flex-start, flex-start)
      margin-top 30px
      .avatar {
        flex 0 0 42px
        width 42px
        height @width
        line-height @width
        border-radius 2px
        color $white
        text-align center
        background $text-color-secondary

        .iconfont {
          font-size 24px
        }
      }

      .input-box {
        flex 1 0
        margin-left 10px

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
          padding .5em 1em
          border-radius 2px
          color $white
          -webkit-text-fill-color $white
          -webkit-background-clip padding-box

          &::after {
            display none
          }
        }
      }
    }
  }
</style>
