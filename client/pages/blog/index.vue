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
        page: store.getters['article/pagination'].current_page
      })
    },
    head () {
      return {
        title: '博客'
      }
    },
    components: {
      CommonArticleList
    }
  }
</script>
