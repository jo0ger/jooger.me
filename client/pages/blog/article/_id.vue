<template>
  <div class="blog-article-page">
    <div class="article-pane">
      <article class="detail" v-if="articleDetail" ref="article">
        <header class="header">
          <h1 class="title">{{ articleDetail.title }}</h1>
          <div class="meta">
            <time class="time" :datatitme="articleDetail.createdAt">{{ articleDetail.createdAt | fmtDate('yyyy-MM-dd') }}</time>
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
          <a class="action-item share" @click="handleToggleShare">
            <i class="iconfont icon-share"></i>
            <span class="text">分享</span>
          </a>
        </div>
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
                <time class="time" :datatitme="articleDetail.adjacent.prev.createdAt">{{ articleDetail.adjacent.prev.createdAt | fmtDate('yyyy-MM-dd') }}</time>
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
                <time class="time" :datatitme="articleDetail.adjacent.next.createdAt">{{ articleDetail.adjacent.next.createdAt | fmtDate('yyyy-MM-dd') }}</time>
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
    <div class="comments-pane" v-if="articleDetail">
      <MobileComment v-if="mobileLayout"
        :total="articleDetail.meta.comments">
      </MobileComment>
      <CommonArticleComment v-else
        :total="articleDetail.meta.comments">
      </CommonArticleComment>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { CommonArticleComment } from '~/components/Common'
  import { MobileComment } from '~/components/Mobile'

  export default {
    name: 'Blog-Article',
    components: {
      CommonArticleComment,
      MobileComment
    },
    validate ({ params }) {
      return !!params.id
    },
    fetch ({ params, store }) {
      return Promise.all([
        store.dispatch('article/fetchDetail', params.id),
        store.dispatch('comment/fetchList', {
          article: params.id,
          sort_by: 'ups',
          order: -1
        })
      ])
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
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        articleDetailFetching: 'article/detailFetching',
        articleDetailLiking: 'article/detailLiking',
        historyLikes: 'app/history',
        mobileLayout: 'app/mobileLayout'
      }),
      isLiked () {
        return !!this.historyLikes.articles.find(item => item === this.articleDetail._id)
      }
    },
    beforeRouteLeave (to, from, next) {
      setTimeout(() => {
        this.$store.commit('article/CLEAR_DETAIL')
        this.$store.commit('comment/CLEAR_LIST')
      }, 500)
      next()
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
      handleToggleShare () {
        this.$store.commit('app/SET_SHARE_BOX', true)
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
      margin-bottom 2rem
      
      .detail {
        .header {
          margin-bottom 3rem
          text-align center

          .thumb {
            width 100%
            margin-bottom 2rem
          }

          .meta {
            margin-top 1rem
            color $text-color-secondary
          }

          .title {
            font-size 1.8rem
          }
        }

        .content {
          padding-bottom 2rem
        }

        .extra {
          flexLayout(, space-between)
          padding-bottom .75rem
          color $text-color-secondary
          border-bottom 1px solid $grey

          .category {
            &-item {
              margin-left .25rem
              padding .25rem .5rem
              background $grey
              border-radius 4px

              &:hover {
                background alpha($base-color, .05)
                color $base-color
              }
            }
          }

          .meta {
            .label {
              margin-right .25rem
            }
            .value {
              margin-right .75rem
            }
          }
        }

        .tags {
          margin-top .75rem

          .tag-item {
            display inline-block
            margin .25rem .75rem 0 0
            padding .25rem .75rem
            border 1px solid $text-color-secondary
            font-size .8rem
            border-radius 4px
            color $text-color
            transition all .3s $ease

            &:hover {
              background $dark
              color $white
            }
          }
        }

        .actions {
          margin 2rem 0 0
          text-align center

          .action-item {
            display inline-block
            height 2rem
            line-height @height
            margin .25rem
            border-radius 4px
            padding 0 1rem
            font-size .8rem
            border 1px solid

            .iconfont {
              margin-right .25rem
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
              border-color $dark
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
                background-color $dark
                color $white
              }
            }
            
          }
        }

        .share {
          margin-top 1rem
        }

        .navigation {
          flexLayout(, space-between)
          position relative
          margin-top 2rem
          overflow hidden
          border-radius 4px

          +respond-below($screen-xs-max) {
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
              padding 2rem 1.25rem
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
                font-size 1rem
                opacity .8
              }

              .meta {
                opacity .6
                font-size .75rem
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
      padding-top 1rem
    }

  }
</style>
