<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="comment-list" :class="{ loading: commentListFetching }">
    <div class="list-header" slot="header">
      <div class="total">
        共
        <span class="count">{{ commentPagination.total }}</span>
        个评论
      </div>
      <div class="sort">
        <a class="sort-type" :class="{ active: latestSort }" @click="handleSort(0)">最新排序</a>
        <i class="seprate"></i>
        <a class="sort-type" :class="{ active: hottestSort }" @click="handleSort(1)">最热排序</a>
      </div>
    </div>
    <div class="list-content">
      <CommentItem v-for="item in commentList"
        :key="item._id"
        :comment="item">
      </CommentItem>
      <div class="indicator">
        <transition name="fade" mode="out-in">
          <Loading v-if="commentListFetching"></Loading>
          <p class="no-more-data" v-else-if="hasNoMore">暂无更多评论</p>
          <button class="loadmore" v-else-if="commentList.length" @click="handleLoadmore">来，继续翻</button>
          <p class="no-data" v-else>暂无评论</p>
        </transition>
      </div>
    </div>
  </Card>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Card from '../../Card'
  import CommentItem from '../Item'

  export default {
    name: 'CommentList',
    components: {
      Card,
      CommentItem
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        commentSort: 'comment/sort',
        commentList: 'comment/list',
        commentPagination: 'comment/pagination',
        commentListFetching: 'comment/listFetching',
        articleDetail: 'article/detail',
      }),
      latestSort () {
        const { by, order } = this.commentSort
        return by === 'createdAt' && order === -1
      },
      hottestSort () {
        const { by, order } = this.commentSort
        return by === 'ups' && order === -1
      },
      hasNoMore () {
        const { current_page, total_page, total } = this.commentPagination
        return total > 0 && current_page >= total_page && total_page >= 1
      }
    },
    methods: {
      ...mapMutations({
        changeSort: 'comment/CHANGE_SORT'
      }),
      ...mapActions({
        fetchCommentList: 'comment/fetchList'
      }),
      handleSort (type) {
        if (this.commentListFetching) {
          return
        }
        switch (type) {
          case 0:
            if (this.latestSort) {
              return
            }
            this.changeSort({
              by: 'createdAt'
            })
            break
          case 1:
            if (this.hottestSort) {
              return
            }
            this.changeSort({
              by: 'ups'
            })
            break
        }
        const params = {
          page: 1,
          type: 1
        }
        if (this.articleDetail) {
          params.type = 0
          params.article = this.articleDetail._id
        }
        this.fetchCommentList(params)
      },
      handleLoadmore () {
        this.fetchCommentList()
      }
    }
  }
</script>

