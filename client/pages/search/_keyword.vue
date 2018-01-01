<template>
  <div class="page-search">
    <Card>
      <div slot="header" class="search-header">
        <i class="icon icon-search"></i>
        <div class="search">与
          <span class="keyword">{{ $route.params.keyword }}</span>
          有关的文章
        </div>
        <div class="count" v-if="!articleListFetching">
          共搜索到
          <em class="num">{{ articlePagination.total || 0 }}</em>
          篇文章
        </div>
      </div>
      <div class="list-content">
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
  import { mapGetters, mapActions } from 'vuex'
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
      store.commit('article/CLEAR_LIST')
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
    methods: {
      ...mapActions({
        fetchArticleList: 'article/fetchList'
      }),
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

