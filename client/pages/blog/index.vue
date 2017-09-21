<template>
  <section class="blog-page">
    <CommonArticleList></CommonArticleList>
  </section>
</template>

<script>
  import { CommonArticleList } from '~/components/Common'

  export default {
    name: 'Blog-page',
    async fetch ({ store }) {
      await store.dispatch('article/fetchList', {
        page: store.getters['article/pagination'].page
      })
    },
    components: {
      CommonArticleList
    }
  }
</script>
