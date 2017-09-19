<template>
  <section class="blog-page">
    <div class="article-list">
      <CommonArticleItem
        class="flex-item"
        v-for="item in articleList"
        :key="item.id"
        :data="item">
      </CommonArticleItem>
    </div>
    <div class="article-navigation" v-if="pagination.prev || pagination.next">
      <div class="wrapper">
        <a class="prev navigation-item" :class="{ active: pagination.prev }" @click.prevent.stop="handleTurnPage(-1, pagination.prev)"></a>
        <a class="next navigation-item" :class="{ active: pagination.next }" @click.prevent.stop="handleTurnPage(1, pagination.next)"></a>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonArticleItem } from '~/components/Common'

  export default {
    name: 'Blog-page',
    async fetch ({ store }) {
      await store.dispatch('article/fetchList', {
        page: store.getters['article/pagination'].page
      })
    },
    components: {
      CommonArticleItem
    },
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching',
        pagination: 'article/pagination'
      })
    },
    beforeDestroy () {
      // this.$store.commit('article/CLEAR_LIST')
    },
    methods: {
      handleTurnPage (delta, ok) {
        if (!ok) {
          return
        }
        const { page, per_page } = this.pagination
        let nextPage = page + delta
        if (nextPage < 1) {
          nextPage = 1
        }
        this.$store.dispatch('article/fetchList', { page: nextPage, per_page })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .blog-page {
    .article-list {
      flexLayout(,flex-start,,wrap)
      margin 0 -20px
      
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

    .article-navigation {
      margin-top 60px
      text-align center
      .navigation-item {
        position relative
        display inline-block
        width 50px
        height @width
        border-radius 100%
        background $white
        opacity .6
        cursor not-allowed
        &::after {
          content ''
          position absolute
          top 50%
          left 50%
          display block
          width 10px
          height @width
          border 2px solid $text-color
          border-width 2px 2px 0 0
          transform translate(-7px, -50%) rotate(45deg)
          transform-origin center center
        }

        &.prev {
          margin-right 60px
          &::after {
            transform translate(-3px, -50%) rotate(225deg)
          }
        }

        &.next {
          margin-left 60px
        }

        &.active {
          opacity 1
          cursor pointer
          transition all .3s $ease

          &:hover {
            transform scale(.9)
          }
        }
      }
    }
  }
</style>
