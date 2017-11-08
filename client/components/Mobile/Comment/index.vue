<template>
  <section class="mobile-comments">
    <div class="title">评论</div>
    <CommentAction
      class="box"
      @submit="handleCreateComment">
    </CommentAction>
    <CommentList
      :sort="sort"
      :list="commentList"
      :total="total"
      :pagination="commentPagination"
      :loading="commentListFetching"
      @sort="handleSort"
      @page-change="handlePageChange">
    </CommentList>
    <CommentChildList
      ref="childList"
      :parent="currentParentComment">
    </CommentChildList>
    <CommentEditor
      :parent="currentParentComment"
      @submit="handleCreateComment">
    </CommentEditor>
    <transition name="fade-overlay">
      <div class="overlay" v-if="showOverlay"></div>
    </transition>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentAction from './Action'
  import CommentList from './List'
  import CommentChildList from './ChildList'
  import CommentEditor from './Editor'
  import Service from '~/service'

  export default {
    name: 'Mobile-Comment',
    components: {
      CommentAction,
      CommentList,
      CommentChildList,
      CommentEditor
    },
    props: {
      total: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        sort: 1, // 0 最新 | 1 最热
        currentParentCommentId: '',
        replying: false, // 是否正在进行评论回复
      }
    },
    computed: {
      ...mapGetters({
        authLoading: 'auth/loading',
        isLogin: 'auth/isLogin',
        authInfo: 'auth/info',
        historyLikes: 'app/history',
        mobileCommentEditor: 'app/mobileCommentEditor',
        mobileCommentChildList: 'app/mobileCommentChildList',
        commentCreating: 'comment/creating',
        commentListFetching: 'comment/listFetching',
        commentList: 'comment/list',
        commentPagination: 'comment/pagination',
        commentReplyTarget: 'comment/replyTarget',
        articleDetail: 'article/detail'
      }),
      currentParentComment () {
        return this.commentList.find(item => item._id === this.currentParentCommentId) || null
      },
      showOverlay () {
        return this.mobileCommentEditor
      }
    },
    watch: {
      mobileCommentChildList (val) {
         document.body.style.overflow = val ? 'hidden' : 'auto'
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
      handleSort (sort, params = {}) {
        this.sort = sort
        const s = {}
        s.order = -1
        s.sort_by = this.sort ? 'ups' : 'createdAt'
        return this.fetchCommentList({
          article: this.articleDetail._id,
          ...params,
          ...s
        })
      },
      handlePageChange (page) {
        this.handleSort(this.sort, {
          page
        })
      },
      async handleCreateComment ({ content = '', done }) {
        if (this.currentParentCommentId) {
          // 回复评论
          if (this.replying) {
            return
          }
          this.replying = true
          const { success } = await Service.comment.create({
            data: {
              content,
              author: this.authInfo._id,
              type: 0,
              article: this.articleDetail._id,
              parent: this.currentParentCommentId,
              forward: this.commentReplyTarget ? this.commentReplyTarget._id : this.currentParentCommentId
            }
          }).catch(() => ({}))
          this.replying = false
          if (success) {
            done && done()
            this.$store.commit('comment/REPLY_SUCCESS', this.currentParentCommentId)
            this.$refs.childList.handleSort(0)
          }
        } else {
          // 文章评论
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
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .mobile-comments {
    .title {
      position relative
      margin 1rem 0
      text-align center
      color $text-color-secondary
      font-size 1.25rem
      font-weight 500
    }

    .box {
      margin-bottom 2rem  
    }

    .overlay {
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      width 100%
      height 100%
      background alpha($black, .5)
      z-index 9999
    }
  }
</style>
