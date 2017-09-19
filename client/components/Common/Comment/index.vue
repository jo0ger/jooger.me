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
    name: 'Comment',
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
