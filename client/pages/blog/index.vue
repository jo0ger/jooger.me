<template>
  <section class="blog-page">
    <div class="article-list">
      <CommonArticleItem
        class="flex-item"
        v-for="item in articleList"
        :key="item._id"
        :data="item">
      </CommonArticleItem>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonArticleItem } from '~/components/Common'

  export default {
    name: 'Blog-page',
    async fetch ({ store}) {
      await store.dispatch('article/fetchList', {
        per_page: 2
      })
    },
    components: {
      CommonArticleItem
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .blog-page {
    .article-list {
      flexLayout(,flex-start,,wrap)
      .flex-item {
        flex 0 0 (100% / 3)
        max-width (100% / 3)

        @media (max-width: 768px) {
          flex-basis 50% !important
          max-width 50%
        }

        @media (max-width: 480px) {
          flex-basis 100% !important
          max-width 100%
        }

      }
    }
  }
</style>
