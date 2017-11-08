<template>
  <transition name="slide-up">
    <div class="comment-child-list" v-if="mobileCommentChildList">
      <CommentList
        class="list"
        is-child
        :sort="sort"
        :list="list"
        :total="pagination.total"
        :pagination="pagination"
        :loading="fetching"
        :more-loading="moreLoading"
        @sort="handleSort"
        @loadmore="handleLoadmore">
      </CommentList>
      <div class="action">
        <a class="cancel-btn btn" @click="handleBack">返回</a>
        <a class="publish-btn btn" v-if="isLogin" @click="handleOpenEditor">写回复</a>
        <a class="login-btn btn" v-else @click="handleLogin">
          <span>使用Github登录</span>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CommentList from '../List'
  import Service from '~/service'

  export default {
    name: 'Mobile-Comment-ChildList',
    components: {
      CommentList
    },
    props: {
      parent: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        sort: 1, // 0 最新 | 1 最热
        fetching: false,
        moreLoading: false, // loadmore fetching
        list: [],
        pagination: {}
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin',
        authInfo: 'auth/info',
        mobileCommentChildList: 'app/mobileCommentChildList',
        articleDetail: 'article/detail'
      })
    },
    watch: {
      mobileCommentChildList (val) {
        if (val && this.parent && this.parent._id) {
          this.handleSort(1)
        } else {
          this.$store.commit('comment/SET_REPLY_TARGET', null)
          this.$parent.currentParentCommentId = ''
          this.pagination = {}
          this.list = []
          this.fetching = false
          this.sort = 1
        }
      }
    },
    methods: {
      handleLogin () {
        openWindow('/auth/login?state=github', 'Login')
      },
      async fetchSubList (params = {}, loadmore = false) {
        this[loadmore ? 'moreLoading' : 'fetching'] = true
        const { success, data } = await Service.comment.fetchList({
          params: Object.assign({}, {
            article: this.parent.article,
            per_page: this.pagination.per_page || 20,
            page: (this.pagination.current_page || 0) + 1,
            parent: this.parent._id
          }, params)
        }).catch(() => ({}))
        if (success) {
          if (loadmore) {
            this.list.push(...data.list)
          } else {
            this.list = data.list
          }
          this.pagination = data.pagination
        }
        this.$nextTick(() => {
          this[loadmore ? 'moreLoading' : 'fetching'] = false
        })
      },
      handleBack () {
        this.$store.commit('app/SET_MOBILE_COMMENT_CHILD_LIST', false)
      },
      handleOpenEditor () {
        this.$store.commit('app/SET_MOBILE_COMMENT_EDITOR', true)
      },
      handleSort (sort, params = {}) {
        this.sort = sort
        const s = {}
        s.order = -1
        s.sort_by = sort ? 'ups' : 'createdAt'
        this.fetchSubList({
          page: 1,
          ...params,
          ...s
        })
      },
      handleLoadmore (page) {
        console.log(page)
        // loadmore
        this.fetchSubList(null, true)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .comment-child-list {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    overflow-x hidden
    overflow-y auto
    z-index 9998
    background $white
    overflow hidden
    transform translate3d(0, 0, 0)

    .list {
      width 100%
      height 100%
    }

    .action {
      flexLayout()
      position absolute
      right 0
      bottom 0
      left 0
      width 100%
      border-top 1px solid $border-color-4
      
      .btn {
        flex 1 0 50%
        height 3rem
        border-radius 0
      }

      .cancel-btn {
        background $white
        color $dark

        &:hover {
          background alpha($dark, .1)
        }
      }
    }
  }
</style>
