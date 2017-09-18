<template>
  <div class="blog-article-page" :style="style">
    <article class="detail" v-if="articleDetail">
      <header class="header">
        <div class="meta">
          <time class="time" :datatitme="articleDetail.created_at">{{ articleDetail.created_at | fmtDate('yyyy-MM-dd') }}</time>
        </div>
        <h1 class="title">{{ articleDetail.title }}</h1>
      </header>
      <div class="content markdown-body" v-html="marked(articleDetail.body._content)"></div>
    </article>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { marked, debounce } from '~/utils'

  export default {
    name: 'Blog-Article',
    validate ({ params }) {
      return Number(params.id) > 0
    },
    async fetch ({ params, store }) {
      await store.dispatch('article/fetchDetail', params.id)
    },
    data () {
      return {
        headerHeight: 0
      }
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        articleDetailFetching: 'article/detailFetching'
      }),
      style () {
        return {
          marginTop: this.headerHeight + 'px'
        }
      }
    },
    beforeDestroy () {
      this.$store.commit('article/CLEAR_DETAIL')
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler)
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      marked,
      init () {
        const pageHeader = document.querySelector('.app-main > header.header')
        if (pageHeader) {
          if (!this._resizeHandler) {
            this._resizeHandler = debounce(e => {
              this.headerHeight = parseInt(window.getComputedStyle(pageHeader).marginBottom) || 0
            }, 200, true)
          }
          window.addEventListener('resize', this._resizeHandler, false)
          this._resizeHandler()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .blog-article-page {
    margin 0 5% 5% 5%
    padding 65px
    border-radius 10px
    background $white
    box-shadow 0 10px 40px -15px alpha($black, .05)

    .detail {
      .header {
        margin-bottom 30px
        text-align center

        .meta {
          margin-bottom 15px
        }

        .title {
          font-size 1.2rem
        }
      }
    }
  }
</style>
