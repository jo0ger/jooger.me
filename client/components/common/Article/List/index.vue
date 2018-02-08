<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="article-list">
    <template v-if="list.length">
      <ArticleItem v-for="item in list"
        :mini="mini"
        :key="item._id"
        :article="item">
      </ArticleItem>
    </template>
    <div class="indicator">
      <transition name="fade" mode="out-in">
        <Loading v-if="loading"></Loading>
        <p class="no-more-data" v-else-if="hasNoMore">暂无更多文章</p>
        <button class="loadmore" v-else-if="list.length" @click="handleLoadmore">来，继续翻</button>
        <p class="no-data" v-else>没有文章</p>
      </transition>
    </div>
  </div>
</template>

<script>
  import ArticleItem from '../Item'
  import Loading from '../../Loading'

  export default {
    name: 'ArticleList',
    components: {
      ArticleItem,
      Loading
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      pagination: {
        type: Object,
        default () {
          return {}
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      mini: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      hasNoMore () {
        const { cur_page, total_page, total } = this.pagination
        return total > 0 && cur_page >= total_page && total_page >= 1
      }
    },
    methods: {
      handleLoadmore () {
        this.$emit('on-loadmore', this.pagination)
      }
    }
  }
</script>

