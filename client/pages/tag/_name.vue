<template>
  <div class="page-tag">
    <Card>
      <div slot="header" class="title">
        <i class="icon icon-tag"></i>
        标签
      </div>
      <div class="list-content">
        <div class="result">
          <span>
            标签
            <span class="keyword">{{ $route.params.name }}</span>
            相关的文章，
          </span>
          <span class="count">
            共找到
            <em class="num">{{ articlePagination.total || 0 }}</em>
            篇
          </span>
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
      return !!params.name
    },
    head () {
      return {
        title: `${this.$route.params.name} | Tag`
      }
    },
    async fetch ({ store, params }) {
      store.commit('article/CLEAR_LIST')
      await store.dispatch('article/fetchList', {
        tag: params.name,
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

