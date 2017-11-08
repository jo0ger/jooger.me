<template>
  <div class="comment-action-box" :class="{ 'child-input-box': isChild, mute: authInfo.mute }">
    <transition name="fade" mode="out-in">
      <div class="spinner" v-if="!isChild && authLoading"></div>
      <div class="container" v-else-if="!authLoading">
        <a class="publish-btn btn" @click="handleOpenEditor" v-if="isLogin">
          <span>{{ isChild ? '留下回复' : '留下评论' }}</span>
        </a>
        <a class="login-btn btn" v-else @click="handleLogin">
          <i class="iconfont icon-github"></i>
          <span>使用Github登录</span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Mobile-Comment-Action',
    props: {
      isChild: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin',
        authLoading: 'auth/loading',
        authInfo: 'auth/info',
        commentReplyTarget: 'comment/replyTarget'
      })
    },
    methods: {
      handleOpenEditor () {
        this.$store.commit('app/SET_MOBILE_COMMENT_EDITOR', true)
      },
      handleLogin () {
        openWindow('/auth/login?state=github', 'Login')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-action-box {
    text-align center

    .btn {
      width 100%
    }

    .login-btn {
      .iconfont {
        margin-right .5rem  
      }
    }
  }
</style>
