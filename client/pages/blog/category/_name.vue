<template>
  <section class="search-page">
    <header class="search-header">
      <h1 class="title">Category</h1>
      <h3 class="keyword">{{ $route.params.name }}</h3>
    </header>
    <CommonArticleList></CommonArticleList>
  </section>
</template>

<script>
  import { CommonArticleList } from '~/components/Common'

  export default {
    name: 'Blog-Category',
    components: { CommonArticleList },
    validate ({ params }) {
      return !!params.name
    },
    head () {
      return {
        title: `分类[${this.$route.params.name}]`
      }
    },
    async fetch ({ store, params }) {
      await store.dispatch('article/fetchList', {
        category: params.name
      })
    }
  }
</script>
