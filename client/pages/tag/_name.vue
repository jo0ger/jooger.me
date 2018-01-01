<template>
  <div class="page-tag">
    <Card>
      <div slot="header" class="search-header">
        <i class="icon" :class="[`icon-${getExtendsItemByKey('icon', tag.extends)}`]"></i>
        <div class="search">
          <span class="keyword">{{ $route.params.name }}</span>
        </div>
        <div class="count" v-if="!articleListFetching">
          共找到
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
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching',
        articlePagination: 'article/pagination',
        tagList: 'tag/list'
      }),
      tag () {
        return this.tagList.find(item => item.name === this.$route.params.name)
      }
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

