<template>
  <div class="article-list">
    <template v-if="articleList.length">
      <div class="list">
        <CommonArticleItem
          class="flex-item"
          v-for="item in articleList"
          :key="item._id"
          :data="item">
        </CommonArticleItem>
      </div>
      <div class="navigation" v-if="hasPrev || hasNext">
        <div class="wrapper">
          <a class="prev navigation-item" :class="{ active: hasPrev }" @click.prevent.stop="handleTurnPage(-1, hasPrev)"></a>
          <a class="next navigation-item" :class="{ active: hasNext }" @click.prevent.stop="handleTurnPage(1, hasNext)"></a>
        </div>
      </div>
    </template>
    <div class="no-data" v-else>
      很遗憾，未找到您想要的东西
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CommonArticleItem from '../Item'

  export default {
    name: 'Common-Article-List',
    components: {
      CommonArticleItem
    },
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching',
        pagination: 'article/pagination'
      }),
      hasNext () {
        return this.pagination.current_page < this.pagination.total_page
      },
      hasPrev () {
        return this.pagination.current_page > 1
      }
    },
    methods: {
      async handleTurnPage (delta, ok) {
        if (!ok) {
          return
        }
        const { current_page, per_page } = this.pagination
        let nextPage = current_page + delta
        if (nextPage < 1) {
          nextPage = 1
        }
        this.$store.commit('app/SET_FETCH_LOADING', true)
        await this.$store.dispatch('article/fetchList', { page: nextPage, per_page })
        this.$store.commit('app/SET_FETCH_LOADING', false)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .article-list {
    position relative

    .list {
      flexLayout(,flex-start,,wrap)
      margin 0 -20px

      @media (max-width: 480px) {
        margin 0
      }
      
      .flex-item {
        flex 0 0 (100% / 3)
        max-width (100% / 3)
        padding 20px

        @media (max-width: 768px) {
          flex-basis 50% !important
          max-width 50%
        }

        @media (max-width: 480px) {
          flex-basis 100% !important
          max-width 100%
          padding 15px 0
        }

      }
    }
    .navigation {
      margin-top 60px
      text-align center

      @media (max-width: 479px) {
        margin-top 30px
      }

      &-item {
        position relative
        display inline-block
        width 50px
        height @width
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

    .no-data {
      text-align center
    }
  }
</style>
