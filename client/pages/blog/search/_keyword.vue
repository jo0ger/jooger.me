<template>
  <section class="search-page">
    <header class="search-header">
      <h1 class="title">Search</h1>
      <h3 class="keyword">{{ $route.params.keyword }}</h3>
    </header>
    <CommonArticleList></CommonArticleList>
  </section>
</template>

<script>
  import { CommonArticleList } from '~/components/Common'

  export default {
    name: 'Blog-Search',
    components: { CommonArticleList },
    validate ({ params }) {
      return !!params.keyword
    },
    head () {
      return {
        title: `搜索[${this.$route.params.keyword}]`
      }
    },
    async fetch ({ store, params }) {
      await store.dispatch('article/fetchList', {
        keyword: params.keyword
      })
    }
  }
</script>
