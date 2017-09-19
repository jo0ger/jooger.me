<template>
  <section class="search-page">
    <header class="search-header">
      <h1 class="title">Tag</h1>
      <h3 class="keyword">{{ $route.params.name }}</h3>
    </header>
    <CommonArticleList></CommonArticleList>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonArticleList } from '~/components/Common'

  export default {
    name: 'Blog-Tag',
    components: { CommonArticleList },
    validate ({ params }) {
      return !!params.name
    },
    async fetch ({ store, params }) {
      await store.dispatch('article/fetchList', {
        labels: params.name
      })
    }
  }
</script>
