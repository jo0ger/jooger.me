<template>
  <section class="comments">
    <div class="title">评论</div>
    <section class="box">
      <InputBox
        :loading="commentCreating"
        @submit="handleCreateComment">
      </InputBox>
    </section>
    <section class="list">
      <CommentList
        :sort="sort"
        :list="commentList"
        :total="commentPagination.total"
        :pagination="commentPagination"
        :loading="commentListFetching"
        @sort="handleSort"></CommentList>
    </section>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import config from '~/config'
  import InputBox from './InputBox'
  import CommentList from './List'

  export default {
    name: 'ArticleComment',
    components: {
      InputBox,
      CommentList
    },
    computed: {
      ...mapGetters({
        authLoading: 'auth/loading',
        isLogin: 'auth/isLogin',
        authInfo: 'auth/info',
        historyLikes: 'app/history',
        commentCreating: 'comment/creating',
        commentListFetching: 'comment/listFetching',
        commentList: 'comment/list',
        commentPagination: 'comment/pagination',
        articleDetail: 'article/detail',
      })
    },
    data () {
      return {
        sort: 1 // 0 最新 | 1 最热
      }
    },
    methods: {
      ...mapActions({
        fetchCommentList: 'comment/fetchList',
        createComment: 'comment/create'
      }),
      async handleCreateComment ({ content = '', done }) {
        const success = await this.createComment({
          content,
          author: this.authInfo._id,
          type: 0,
          article: this.articleDetail._id
        })
        if (success) {
          done && done()
          this.handleSort(0)
        }
      },
      handleSort (sort) {
        this.sort = sort
        const s = {}
        s.order = -1
        s.sort_by = this.sort ? 'ups' : 'createdAt'
        this.fetchCommentList({
          article: this.articleDetail._id,
          ...s
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comments {
    .title {
      position relative
      margin 1rem 0
      text-align center
      color $text-color-secondary
      font-size 1rem
      font-weight 500

      // &::after {
      //   content ''
      //   position absolute
      //   bottom -10px
      //   left 50%
      //   width 40px
      //   height 2px
      //   background $grey
      //   transform translate(-50%, -50%)
      // }
    }
  }
</style>
