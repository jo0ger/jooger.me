<template>
  <div class="list-container" :class="{ 'child-list': isChild }">
    <div class="list-header">
      <div class="total-count">{{ total || pagination.total || 0 }}条评论</div>
      <div class="sort-list">
        <a class="sort-item" :class="{ active: sort === 0 }" @click="handleSort(0)">最新</a>
        <a class="sort-item" :class="{ active: sort === 1 }" @click="handleSort(1)">最热</a>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="spinner" v-if="loading"></div>
      <ul class="comment-list" v-else-if="list.length">
        <CommentItem class="comment-item"
          v-for="comment in list"
          :key="comment._id"
          :comment="comment"
          :is-child="isChild">
        </CommentItem>
      </ul>
      <div class="no-data" v-else>
        {{
          isChild ? '快来回复他吧！' : '来做第一个留言的人吧！'
        }}
      </div>
    </transition>
    <Pagination
      class="comment-pagination"
      :total-page="pagination.total_page"
      :current-page="pagination.current_page"
      prev-text="上一页"
      next-text="下一页"
      @change="handlePageChange">
    </Pagination>
  </div>
</template>

<script>
  import CommentItem from '../Item'
  import Pagination from '../../../Pagination'

  export default {
    name: 'ArticleCommentList',
    components: {
      CommentItem,
      Pagination
    },
    props: {
      sort: {
        type: Number,
        default: 1  // 0 最新 | 1 最热
      },
      isChild: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      handleSort (sort) {
        this.$emit('sort', sort)
      },
      handlePageChange (page) {
        this.$emit('page-change', page)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .list-container {
    .list-header {
      flexLayout(, space-between)
      margin-bottom 1rem
      padding-bottom .5rem
      border-bottom 1px solid $grey

      .total-count {
        font-weight 700
      }

      .sort-list {
        .sort-item {
          margin-left 1rem

          &.active {
            color $dark
            font-weight 700
          }
        }
      }
    }

    .spinner {
      width 2rem
      height @width
      margin 3rem auto
    }

    .no-data {
      padding 1rem 0
      text-align center
      color $text-color-secondary
    }

    .comment-pagination {
      margin 2rem 0
      padding .5rem 0
    }
  }
</style>
