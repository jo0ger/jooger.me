<template>
  <section class="callback-page">
    <div class="loading">
      <div class="spinner"></div>
      <p>登录中...</p>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'LoginCallback',
    layout: 'auth',
    validate ({ query }) {
      // 需要code的类型
      if (['github'].includes(query.state) && query.code) {
        return true
      }
      return false
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin'
      })
    },
    mounted () {
      if (this.isLogin) {
        return this.$message('您已登录')
      }
      this.handle()
    },
    methods: {
      handle () {
        const state = this.$route.query.state
        switch (state) {
          case 'github':
            this.githubLogin()
            break
          default:
            break
        }
      },
      async githubLogin () {
        await this.$store.dispatch('auth/githubLogin', this.$route.query.code)
        window.opener.location.reload()
        window.close()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .loading {
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)

    .spinner {
      width 48px
      height @width
    }

    & > p {
      margin-top 10px
      text-align center
    }
  }
</style>
