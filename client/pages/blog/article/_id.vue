<template>
  <div class="blog-article-page" :style="style">
    <div class="article-pane">
      <article class="detail" v-if="articleDetail" ref="article">
        <header class="header">
          <h1 class="title">{{ articleDetail.title }}</h1>
          <div class="meta">
            <time class="time" :datatitme="articleDetail.createdAt">{{ articleDetail.createdAt | fmtDate('yyyy-MM-dd') }}</time>
          </div>
        </header>
        <div class="content md-body" v-html="articleDetail.renderedContent"></div>
        <div class="tags" v-if="articleDetail.tag && articleDetail.tag.length">
          <nuxt-link class="tag-item"
            v-for="item in articleDetail.tag"
            :key="item._id"
            :to="`/blog/tag/${item.name}`">
            <span class="text">{{ item.name }}</span>
          </nuxt-link>
        </div>
        <div class="actions">
          <a class="action-item like" :class="{ 'is-liked': liked }" @click="handleLike">
            <i class="iconfont icon-like-fill"></i>
            <span class="text">喜欢</span>
            <span class="count">({{ articleDetail.meta.ups }})</span>
          </a>
          <!-- <a class="action-item reward">
            <i class="iconfont icon-reward"></i>
            <span class="text">打赏</span>
          </a> -->
          <!-- <a class="action-item share">
            <i class="iconfont icon-share"></i>
            <span class="text">分享</span>
          </a> -->
        </div>
        <div class="navigation" v-if="articleDetail.adjacent.next || articleDetail.adjacent.prev">
          <a class="nav-item prev" @click="handleSwitchArticle(articleDetail.adjacent.prev._id)" v-if="articleDetail.adjacent.prev"
            :style="getAdjacentThumbStyle(articleDetail.adjacent.prev)">
            <div class="wrapper">
              <h3 class="label">prev</h3>
              <p class="title">{{ articleDetail.adjacent.prev.title }}</p>
              <time class="time" :datatitme="articleDetail.adjacent.prev.createdAt">{{ articleDetail.adjacent.prev.createdAt | fmtDate('yyyy-MM-dd') }}</time>
            </div>
          </a>
          <a class="nav-item next" @click="handleSwitchArticle(articleDetail.adjacent.next._id)" v-if="articleDetail.adjacent.next"
            :style="getAdjacentThumbStyle(articleDetail.adjacent.next)">
            <div class="wrapper">
              <h3 class="label">next</h3>
              <p class="title">{{ articleDetail.adjacent.next.title }}</p>
              <time class="time" :datatitme="articleDetail.adjacent.next.createdAt">{{ articleDetail.adjacent.next.createdAt | fmtDate('yyyy-MM-dd') }}</time>
            </div>
          </a>
        </div>
      </article>
      <p class="no-data" v-else>文章未找到</p>
    </div>
    <!-- <div class="comments-pane" v-if="articleDetail">
      <CommonComment></CommonComment>
    </div> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonComment } from '~/components/Common'
  import { debounce } from '~/utils'

  export default {
    name: 'Blog-Article',
    components: {
      CommonComment
    },
    validate ({ params }) {
      return !!params.id
    },
    async fetch ({ params, store }) {
      await store.dispatch('article/fetchDetail', params.id)
    },
    head () {
      const data = this.articleDetail || {}
      return {
        title: data.title || 'Article Not Found',
        meta: [
          { hid: 'keywords', name: 'keywords', content: data.keywords ? data.keywords.join(',') : data.title },
          { hid: 'description', name: 'description', content: data.description || data.title }
        ]
      }
    },
    data () {
      return {
        headerHeight: 0
      }
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        articleDetailFetching: 'article/detailFetching',
        liked: 'article/detailLiked'
      }),
      style () {
        return {
          marginTop: this.headerHeight + 'px'
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      setTimeout(() => {
        this.$store.commit('article/CLEAR_DETAIL')
      }, 500)
      next()
    },
    beforeDestroy () {
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler)
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        const pageHeader = document.querySelector('.app-main > header.header')
        if (pageHeader) {
          if (!this._resizeHandler) {
            this._resizeHandler = debounce(e => {
              this.headerHeight = parseInt(window.getComputedStyle(pageHeader).marginBottom) || 0
            }, 200, false)
          }
          window.addEventListener('resize', this._resizeHandler, false)
          this._resizeHandler()
        }
        if (this.$refs.article) {
          this.$refs.article.addEventListener('click', e => {
            if (e.target.className.includes('image-view')) {
              this.$imgPop.open(e.target)
            }
          }, false)
        }
      },
      getAdjacentThumbStyle (obj = {}) {
        return obj.thumb ? {
          backgroundImage: `url(${obj.thumb}?x-oss-process=style/article-thumb)`
        } : null
      },
      handleLike () {
        if (!this.liked) {
          this.$store.dispatch('article/like', this.articleDetail._id)
        }
      },
      handleSwitchArticle (id) {
        if (id) {
          this.$router.push(`/blog/article/${id}`)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .blog-article-page {
    margin 0
    transition all .8s $ease

    .article-pane {
      margin-bottom 30px
      
      .detail {

        .header {
          margin-bottom 45px
          text-align center

          .thumb {
            width 100%
            margin-bottom 30px
          }

          .meta {
            margin-top 15px
            color $text-color-secondary
          }

          .title {
            font-size 1.8rem
          }
        }

        .content {
          padding-bottom 30px
          border-bottom 1px solid $grey
        }

        .tags {
          margin-top 10px

          .tag-item {
            display inline-block
            margin 5px 10px 0 0
            padding 5px 10px
            background $grey
            border-radius 4px
            font-size .8rem
            color $text-color
            transition all .3s $ease

            &:hover {
              background alpha($base-color, .8)
              color $text-color-dark
            }
          }
        }

        .actions {
          margin 60px 0 0
          text-align center

          .action-item {
            display inline-block
            height 30px
            line-height @height
            margin 5px
            padding 0 15px
            font-size .8rem
            border 1px solid

            .iconfont {
              margin-right 5px
              font-size .8rem
            }

            &.like {
              border-color $red
              color @border-color

              &.is-liked {
                background-color $red
                color $white
                cursor default
              }
            }

            &.reward {
              border-color $green
              color @border-color
            }

            &.share {
              border-color $blue
              color @border-color
            }

            &:hover
            &:active {
              &.like {
                background-color $red
                color $white
              }

              &.reward {
                background-color $green
                color $white
              }

              &.share {
                background-color $blue
                color $white
              }
            }
            
          }
        }

        .navigation {
          flexLayout(, space-between)
          position relative
          margin-top 30px
          overflow hidden

          @media (max-width: 768px) {
            flex-direction column

            .nav-item {
              width 100%
            }
          }

          .nav-item {
            flex 1 0
            background-position center center
            background-color $white
            background-size cover

            .wrapper {
              width 100%
              height @width
              padding 50px 20px
              background-color alpha($black, .8)
              color $white
              text-align center
              transition all .3s $ease

              .label {
                font-family $font-family-headings-2
                text-transform uppercase
                font-weight bold
              }

              .title {
                font-size 16px
              }

              .time {
                font-size 12px
                opacity .6
              }
            }

            &:hover {
              .wrapper {
                background-color alpha($black, .6)
              }
            }
            
          }
        }
      }

      .no-data {
        text-align center
      }
    }

    .comments-pane {
      padding-top 15px
    }

  }
</style>
