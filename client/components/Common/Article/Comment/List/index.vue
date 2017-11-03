<template>
  <div class="list-container" :class="{ 'child-list': isChild }">
    <div class="list-header">
      <div class="total-count">{{ total }}条评论</div>
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
      <div class="no-data" v-else>暂无评论</div>
    </transition>
  </div>
</template>

<script>
  import CommentItem from '../Item'

  export default {
    name: 'ArticleCommentList',
    components: {
      CommentItem
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
    data () {
      return {
      }
    },
    methods: {
      handleSort (sort) {
        this.$emit('sort', sort)
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
      padding-bottom 1rem
      border-bottom 1px solid $grey

      .sort-list {
        .sort-item {
          margin-left 1rem

          &.active {
            color $base-color
          }
        }
      }
    }

    .spinner {
      margin-top 30px
    }

    .no-data {
      text-align center
    }

    +respond-below($screen-xs-max) {
      .list-header {
        margin-bottom .5rem !important
        padding-bottom .5rem !important
      }
    }
  }
</style>
