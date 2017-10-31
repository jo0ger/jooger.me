<template>
  <div class="blog-article-page">
    <div class="article-pane">
      <article class="detail" v-if="articleDetail" ref="article">
        <header class="header">
          <h1 class="title">{{ articleDetail.title }}</h1>
          <div class="meta">
            <time class="time" :datatitme="articleDetail.publishedAt">{{ articleDetail.publishedAt | fmtDate('yyyy-MM-dd') }}</time>
          </div>
        </header>
        <div class="content md-body" v-html="articleDetail.renderedContent"></div>
        <div class="extra">
          <div class="category">
            <template v-if="articleDetail.category">
              <span class="label">分类于</span>
              <nuxt-link class="category-item"
                :to="`/blog/category/${articleDetail.category.name}`">
                <span>{{ articleDetail.category.name }}</span>
              </nuxt-link>
            </template>
          </div>
          <div class="meta">
            <span class="label">阅读量</span>
            <span class="value">{{ articleDetail.meta.pvs }}</span>
            <span class="label">评论</span>
            <span class="value">{{ articleDetail.meta.comments }}</span>
          </div>
        </div>
        <div class="tags" v-if="articleDetail.tag && articleDetail.tag.length">
          <nuxt-link class="tag-item"
            v-for="item in articleDetail.tag"
            :key="item._id"
            :to="`/blog/tag/${item.name}`">
            <span>{{ item.name }}</span>
          </nuxt-link>
        </div>
        <div class="actions">
          <a class="action-item like" :class="{ 'is-liked': isLiked, 'is-liking': articleDetailLiking }" @click="handleLike">
            <i class="iconfont icon-like"></i>
            <span class="text">{{ isLiked ? '已喜欢' : '喜欢' }}</span>
            <span class="count">({{ articleDetail.meta.ups }})</span>
          </a>
          <!-- <a class="action-item reward">
            <i class="iconfont icon-reward"></i>
            <span class="text">打赏</span>
          </a> -->
          <a class="action-item share" :class="{ active: showShareBox }" @click="showShareBox = !showShareBox">
            <i class="iconfont icon-share"></i>
            <span class="text">分享</span>
          </a>
        </div>
        <transition name="fade">
          <CommonShareBox class="share" v-show="showShareBox"></CommonShareBox>
        </transition>
        <div class="navigation" v-if="articleDetail.adjacent.next || articleDetail.adjacent.prev">
          <router-link v-if="articleDetail.adjacent.prev"
            class="nav-item prev"
            :to="`/blog/article/${articleDetail.adjacent.prev._id}`"
            :title="articleDetail.adjacent.prev.title"
            :style="getThumbStyle(articleDetail.adjacent.prev)">
            <div class="wrapper">
              <h3 class="label">prev</h3>
              <p class="title">{{ articleDetail.adjacent.prev.title }}</p>
              <div class="meta">
                <time class="time" :datatitme="articleDetail.adjacent.prev.publishedAt">{{ articleDetail.adjacent.prev.publishedAt | fmtDate('yyyy-MM-dd') }}</time>
                <template v-if="articleDetail.adjacent.prev.category">
                  <span> - </span>
                  <span class="category">{{ articleDetail.adjacent.prev.category.name }}</span>
                </template>
              </div>
            </div>
          </router-link>
          <router-link v-if="articleDetail.adjacent.next"
            class="nav-item next"
            :to="`/blog/article/${articleDetail.adjacent.next._id}`"
            :title="articleDetail.adjacent.next.title"
            :style="getThumbStyle(articleDetail.adjacent.next)">
            <div class="wrapper">
              <h3 class="label">next</h3>
              <p class="title">{{ articleDetail.adjacent.next.title }}</p>
              <div class="meta">
                <time class="time" :datatitme="articleDetail.adjacent.next.publishedAt">{{ articleDetail.adjacent.next.publishedAt | fmtDate('yyyy-MM-dd') }}</time>
                <template v-if="articleDetail.adjacent.next.category">
                  <span> - </span>
                  <span class="category">{{ articleDetail.adjacent.next.category.name }}</span>
                </template>
              </div>
            </div>
          </router-link>
        </div>
      </article>
      <p class="no-data" v-else>文章未找到</p>
    </div>
    <div class="back">
      <a class="back-btn" @click.prevent.stop="handleBack">
        <i class="iconfont icon-close"></i>
      </a>
    </div>
    <!-- <div class="comments-pane" v-if="articleDetail">
      <CommonComment></CommonComment>
    </div> -->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonShareBox, CommonComment } from '~/components/Common'
  import { debounce } from '~/utils'

  export default {
    name: 'Blog-Article',
    components: {
      CommonShareBox,
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
        showShareBox: false
      }
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        articleDetailFetching: 'article/detailFetching',
        articleDetailLiking: 'article/detailLiking',
        historyLikes: 'app/history'
      }),
      isLiked () {
        return !!this.historyLikes.articles.find(item => item === this.articleDetail._id)
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
        if (this.$refs.article) {
          this.$refs.article.addEventListener('click', e => {
            if (e.target.className.includes('image-view')) {
              this.$imgPop.open(e.target.src)
            }
          }, false)
        }
      },
      getThumbStyle (obj = {}) {
        return obj.thumb ? {
          backgroundImage: `url(${obj.thumb})`
        } : null
      },
      async handleLike () {
        if (!this.isLiked && !this.articleDetailLiking) {
          await this.$store.dispatch('article/like', this.articleDetail._id)
        }
      },
      handleSwitchArticle (id) {
        if (id) {
          this.$router.push(`/blog/article/${id}`)
        }
      },
      handleBack () {
        this.$router.back()
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
        user-select text
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
        }

        .extra {
          flexLayout(, space-between)
          padding-bottom 10px
          color $text-color-secondary
          border-bottom 1px solid $grey

          .category {
            &-item {
              margin-left 5px
              padding 3px 8px
              background $grey
              border-radius 2px

              &:hover {
                background alpha($base-color, .05)
                color $base-color
              }
            }
          }

          .meta {
            .label {
              margin-right 5px
            }
            .value {
              margin-right 10px
            }
          }
        }

        .tags {
          margin-top 10px

          .tag-item {
            display inline-block
            margin 5px 10px 0 0
            padding 5px 10px
            border 1px solid $text-color-secondary
            font-size .8rem
            border-radius 2px
            color $text-color
            transition all .3s $ease

            &:hover {
              border-color $base-color
              background alpha($base-color, .05)
              color $base-color
            }
          }
        }

        .actions {
          margin 30px 0 0
          text-align center

          .action-item {
            display inline-block
            height 30px
            line-height @height
            margin 5px
            border-radius 2px
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

              &.is-liking {
                opacity .6
                cursor not-allowed
              }
            }

            &.reward {
              border-color $green
              color @border-color
            }

            &.share {
              border-color $blue
              color @border-color

              &.active {
                background-color $blue
                color $white
              }
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

        .share {
          margin-top 15px
        }

        .navigation {
          flexLayout(, space-between)
          position relative
          margin-top 30px
          overflow hidden
          border-radius 2px

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
              padding 40px 20px
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
                opacity .8
              }

              .meta {
                opacity .6
                font-size 12px
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

    .back {
      position fixed
      bottom 30px
      left 50%
      transform translateX(-50%)

      +xxs() {
        bottom 10px
      }

      +xs() {
        bottom 20px
      }

      &-btn {
        flexLayout()
        padding 10px
        background alpha($black, .6)
        color alpha($white, .6)
        border-radius 50%
        line-height 1
        box-shadow 0 0 40px 5px alpha($black, .2)

        .iconfont {
          font-weight bold
          font-size 18px
        }

        &:hover
        &:active {
          color $white
          transform scale(.9) rotate(180deg)
          box-shadow 0 0 30px 5px alpha($black, .1)
        }
      }
    }

    .comments-pane {
      padding-top 15px
    }

  }
</style>
