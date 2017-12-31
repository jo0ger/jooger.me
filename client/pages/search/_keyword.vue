<template>
  <div class="page-search">
    <Card>
      <div slot="header" class="title">
        <i class="icon icon-article"></i>
        <span>
          和
          <span class="keyword">{{ $route.params.keyword }}</span>
          相关的文章
        </span>
      </div>
      <div class="list-content">
        <div class="count">
          共搜索到
          <em class="num">{{ articlePagination.total }}</em>
          篇文章
        </div>
        <ArticleList
          mini
          :list="articleList"
          :pagination="articlePagination"
          :loading="articleListFetching"
          @on-loadmore="handleLoadmore">
        </ArticleList>
      </div>
    </Card>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Card, Tab, ArticleList, Loading } from '@/components/common'

  export default {
    name: 'Search',
    components: {
      Card,
      Tab,
      ArticleList,
      Loading
    },
    validate ({ params }) {
      return !!params.keyword
    },
    head () {
      return {
        title: `${this.$route.params.keyword} | Search`
      }
    },
    async fetch ({ store, params }) {
      await store.dispatch('article/fetchList', {
        keyword: params.keyword,
        page: 1
      })
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching',
        articlePagination: 'article/pagination'
      })
    },
    watch: {
      tab () {
        this.clearArticleList()
        this.fetchArticleListWrapper()
      }
    },
    methods: {
      ...mapMutations({
        clearArticleList: 'article/CLEAR_LIST'
      }),
      ...mapActions({
        fetchArticleList: 'article/fetchList'
      }),
      async fetchData () {
        const tab = this.tabs[this.tab]
        switch (tab.key) {
          case 'article':
            await this.fetchArticleListWrapper()
            break
          case 'category':
            break
          case 'tag':
            break
          case 'project':
            break
          default:
            break
        }
      },
      async fetchArticleListWrapper (params = {}) {
        await this.fetchArticleList({
          ...params,
          keyword: this.$route.params.keyword
        })
      },
      handleLoadmore () {
        this.fetchArticleListWrapper()
      }
    }
  }
</script>

