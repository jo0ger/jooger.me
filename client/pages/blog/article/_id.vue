<template>
  <div class="blog-article-page" :style="style">
    <div class="article-pane">
      <article class="detail" v-if="articleDetail">
        <header class="header">
          <div class="meta">
            <time class="time" :datatitme="articleDetail.created_at">{{ articleDetail.created_at | fmtDate('yyyy-MM-dd') }}</time>
          </div>
          <h1 class="title">{{ articleDetail.title }}</h1>
        </header>
        <div class="content md-body" v-html="marked(articleDetail.body._content)"></div>
        <div class="tags" v-if="articleDetail.labels && articleDetail.labels.length">
          <router-link class="tag-item"
            v-for="item in articleDetail.labels"
            :key="item.id"
            :to="`/blog/tag/${item.name}`">
            <span class="text">{{ item.name }}</span>
          </router-link>
        </div>
      </article>
    </div>
    <div class="comments-pane">
      <CommonComment></CommonComment>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonComment } from '~/components/Common'
  import { marked, debounce } from '~/utils'

  export default {
    name: 'Blog-Article',
    components: {
      CommonComment
    },
    validate ({ params }) {
      return Number(params.id) > 0
    },
    async fetch ({ params, store }) {
      await store.dispatch('article/fetchDetail', params.id)
    },
    head () {
      const data = this.articleDetail || {}
      return {
        title: data.title || 'Article Not Found',
        meta: [
          { hid: 'keywords', name: 'keywords', content: data.keywords ? data.keywords.join(',') : data.title },
          { hid: 'description', name: 'description', content: data.description || data.title }
        ]
      }
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
            }, 200, false)
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
    transition all .3s $ease

    .article-pane
    .comments-pane {
      padding 65px
      border-radius 10px
      background $white
      box-shadow 0 10px 40px -15px alpha($black, .05)
    }

    .article-pane {
      margin-bottom 30px
      
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

        .content {
          padding-bottom 30px
          border-bottom 1px solid $grey
        }

        .tags {
          margin-top 10px

          .tag-item {
            display inline-block
            margin 5px 10px 0 0
            padding 5px 10px
            background $grey
            border-radius 4px
            font-size .8rem
            transition all .3s $ease

            &:hover {
              background alpha($base-color, .8)
              color $white
            }
          }
        }
      }
    }

    .comments-pane {
      padding-top 15px
    }

  }
</style>
