<template>
  <div class="comments">
    <div class="wrapper">
      <div class="comment-content" ref="comments"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from '~~/config'

  export default {
    name: 'Common-Comment',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail'
      })
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        if (!this.articleDetail) {
          return
        }
        if (!this._gitalk) {
          const github = config.common.github
          const Gitalk = require('gitalk')
          this._gitalk = new Gitalk({
            clientID: github.clientId,
            clientSecret: github.clientSecret,
            repo: github.repo,
            owner: github.owner,
            admin: [github.owner],
            num: this.$route.params.id,
            id: this.articleDetail.title,
            title: this.articleDetail.title,
            body: this.articleDetail.body._content,
            labels: ['blog'],
            perPage: 20
          })
        }
        this._gitalk.render(this.$refs.comments)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

<style lang="stylus">
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .gt-container {

    .gt-avatar {
      border-radius 3px
      overflow hidden

      img {
        transition all .5s $ease
        &:hover {
          transform scale(1.2)
        }
      }
    }

    .gt-comment-content {
      background-color $grey2 !important

      .markdown-body {
        -webkit-text-size-adjust 100%
        text-size-adjust 100%
        font-family $font-family-markdown
        font-weight 300
        word-wrap break-word
      }
    }

    .gt-btn {
      background $blue
    }

    .gt-svg {
      svg {
        fill $blue
      }
    }
  }

</style>
