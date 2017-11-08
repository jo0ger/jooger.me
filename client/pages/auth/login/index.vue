<template>
  <section class="login-page">
    <div class="loading">
      <div class="spinner"></div>
      <p>登录中...</p>
    </div>
  </section>
</template>

<script>
  import config from '~/config'
  import { queryStringify } from '~/utils'
  
  export default {
    name: 'Login',
    layout: 'auth',
    validate ({ query }) {
      return !!query.state
    },
    data () {
      return {}
    },
    computed: {
      githubLoginLink: {
        get () {
          const githubOauthUrl = 'https://github.com/login/oauth/authorize'
          const clientId = config.sns.github.clientId
          const query = {
            client_id: clientId,
            redirect_uri: `${location.origin}/auth/login/callback?state=github`,
            scope: 'public_repo'
          }
          return `${githubOauthUrl}?${queryStringify(query)}`
        }
      }
    },
    mounted () {
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
      githubLogin () {
        window.location.href = this.githubLoginLink
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
      width 3rem
      height @width
    }

    & > p {
      margin-top 1.25rem
      text-align center
    }
  }
</style>
