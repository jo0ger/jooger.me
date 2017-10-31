<template>
  <section class="comments">
    <div class="title">评论（共 {{ pagination.total }} 条）</div>
    <section class="box">
      <InputBox></InputBox>
    </section>
    <section class="list">
      <ul class="comment-list">
        <li class="comment-item" v-for="comment in list"
          :key="comment._id">
          <img :src="comment.author.avatar" alt="" class="avatar">
          <div class="content-box">
            <div class="header">
              <div class="user-info">
                <a :href="comment.author.github.blog || 'javascript:;'">{{ comment.author.name }}</a>
              </div>
              <div class="location"></div>
            </div>
            <div class="content md-body md-mini" v-html="comment.renderedContent"></div>
            <div class="footer">
              <a class="like-btn">
                <i class="iconfont icon-up"></i>
                <span>{{ comment.ups }}</span>
              </a>
              <time class="time" :datatitme="comment.createdAt">{{ comment.createdAt | getDateFromNow }}</time>
              <a class="sub-comment-btn">
                <i class="iconfont icon-comment"></i>
                <span>{{ comment.subCount }}条评论</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from '~/config'
  import InputBox from './InputBox'
  import Item from './Item'

  export default {
    name: 'ArticleComment',
    components: {
      InputBox,
      Item
    },
    props: {
      type: {
        type: Number,
        default: 0
      },
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
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'auth/isLogin',
        authInfo: 'autho/info'
      })
    },
    data () {
      return {}
    },
    methods: {
      handleLogin () {
        let url = `${config.service.baseURL}/auth/github/login?redirectUrl=${window.encodeURIComponent(window.location.href)}`
        window.location.href = url
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

    .list {
      .comment-item {
        flexLayout(, flex-start, flex-start)
        position relative
        margin-bottom 1rem
        padding-bottom 1rem

        &::after {
          content ''
          position absolute
          right 0
          bottom 0
          left 3.125rem
          border-bottom 1px solid $grey
        }

        .avatar {
          flex 0 0
          flex-basis 2.5rem
          width @flex-basis
          height @width
          border-radius 2px
        }

        .content-box {
          flex 1 0
          margin-left .625rem

          .user-info {
            & > a {
              color #333
              font-weight 600
              font-size 1rem
            }
          }

          .content {
            margin .5rem 0 .8rem
          }

          .footer {
            color #909090
            font-size .875rem

            .like-btn {
              margin-right 1rem
              padding 2px 5px
              background $grey

              .iconfont {
                margin-right 5px
                font-size .75rem
              }

              &:hover {
                color $text-color
              }

              &.is-liked {
                color $base-color
                background alpha($base-color, .05)
              }
            }

            .time {
              margin-right 1rem
            }

            .sub-comment-btn {
              .iconfont {
                margin-right 5px
                font-size .75rem
              }
            }
          }
        }
      }
    }
  }
</style>
