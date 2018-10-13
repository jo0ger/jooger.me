<template>
    <section class="article-page">
      <div class="action-widget" v-if="!mobileLayout">
        <Affix offset-top="76">
          <ReadTool
            :article="article"
            :liked="liked"
            :liking="articleLiking"
            @on-like="like"></ReadTool>
        </Affix>
      </div>
      <div class="article-widget">
        <Card class="article-detail">
          <article class="article" v-if="article">
            <span v-if="!mobileLayout" class="source" :class="[getConstantItem('ARTICLE_SOURCE', article.source, 'code')]">{{ article.source | constantFilter('ARTICLE_SOURCE') }}</span>
            <h2 class="title">{{ article.title }}</h2>
            <div class="meta">
              <nuxt-link :to="`/category/${article.category.name}`" class="meta-item category">
                <i class="icon" v-if="article.category" :class="[`icon-${findExtendsItem(article.category.extends, 'icon') || 'tag'}`]"></i>
                {{ article.category ? article.category.name : '暂未分类' }}
              </nuxt-link>
              <div class="meta-item comments">
                {{ article.meta.comments }} 条评论
              </div>
              <div class="meta-item ups">
                {{ article.meta.ups }} 人喜欢
              </div>
              <div class="meta-item pvs">
                {{ article.meta.pvs }} 次阅读
              </div>
            </div>
            <div class="thumb" v-if="article.thumb && !mobileLayout">
              <img v-lazy="thumb" alt="">
            </div>
            <div class="content markdown-body"
              v-copyright
              v-viewer.static="{
                movable: false,
                toolbar: {
                    zoomIn: true,
                    zoomOut: true,
                    rotateLeft: false,
                    rotateRight: false,
                    flipHorizontal: false,
                    flipVertical: false,
                    prev: true,
                    play: true,
                    next: true,
                    oneToOne: true,
                    reset: true,
                }
              }"
              :style="{
                fontSize: articleFontSize + 'px'
              }"
              v-html="article.renderedContent"></div>
            <div class="article-info">
              <div class="from" v-if="article.from">
                原文链接：
                <a :href="article.from" target="_blank">{{ article.from }}</a>
              </div>
              <div class="translator" v-if="article.source === 3">
                翻译人员：
                <a :href="setting.personal.github.html_url" target="_blank">{{ setting.personal.user.name }}</a>
              </div>
              <div class="created-at">
                发布时间：{{ article.createdAt | dateFormat('YYYY-MM-DD HH:mm') }}
              </div>
              <div class="updated-at" v-if="article.createdAt !== article.updatedAt">
                更新时间：{{ article.updatedAt | dateFormat('YYYY-MM-DD HH:mm') }}
              </div>
              <div class="copyright">
                版权声明：自由转载-署名-非商业性使用<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh" target="_blank"
                  rel="external nofollow noopenter">CC BY-NC 3.0 CN</a>
              </div>
            </div>
            <div class="tags">
              <Tag v-for="tag in article.tag"
                :key="tag._id"
                :name="tag.name"
                :icon="findExtendsItem(tag.extends, 'icon') || 'tag'"
                :link="true">
              </Tag>
            </div>
            <div class="action" v-if="mobileLayout">
              <ReadTool
                :article="article"
                :liked="liked"
                :liking="articleLiking"
                @on-like="like"></ReadTool>
            </div>
          </article>
        </Card>
        <Card class="article-related" :header="!mobileLayout && '相关文章'" v-if="article.related.length">
          <div class="related-list swiper" v-swiper:relatedSwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="related-item swiper-slide"
                v-for="item in article.related"
                :key="item._id">
                <nuxt-link :to="`/article/${item._id}`" :title="item.title" class="item-box">
                  <!-- <img :src="item.thumb" :alt="item.title" class="thumb"> -->
                  <div class="thumb"
                    :style="{
                      backgroundImage: `url('${item.thumb}')`
                    }"></div>
                  <div class="mask"></div>
                  <h4 class="title">{{ item.title }}</h4>
                  <time>{{ article.createdAt | dateFormat('YYYY-MM-DD') }}</time>
                </nuxt-link>
              </div>
            </div>
          </div>
        </Card>
        <Comment class="article-comments" :article="article"></Comment>
      </div>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import { Affix, Card, Tag, ReadTool, Comment } from '@/components/common'
import { getScroll } from '@/utils'

const appMod = namespace('app')
const articleMod = namespace('article')

@Component({
  name: 'ArticleDetail',
  components: {
    Affix,
    Card,
    Tag,
    ReadTool,
    Comment
  },
  validate ({ params }) {
    return !!params.id
  },
  fetch ({ params, store }) {
    store.commit('comment/RESET_SORT')
    const article = params.id
    return Promise.all([
      store.dispatch('article/fetchDetail', article),
      store.dispatch('comment/fetchList', {
        article,
        type: 0
      })
    ])
  },
  head () {
    const data = this.article || {}
    return {
      title: data.title || 'Article Not Found',
      meta: [
        { hid: 'keywords', name: 'keywords', content: data.keywords ? data.keywords.join(',') : data.title },
        { hid: 'description', name: 'description', content: data.description || data.title }
      ]
    }
  }
})
export default class extends Base {
  @appMod.Getter private articleFontSize!: number
  @appMod.Getter private showArticleTitle!: boolean
  @appMod.Action('updateFontSize') private updateFontSize
  @appMod.Mutation('SET_ARTICLE_TITLE_VISIBLE') private setArticleTitleVisible
  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article
  @articleMod.Getter('detailFetching') private articleFetching!: boolean
  @articleMod.Getter('detailLiking') private articleLiking!: boolean
  @articleMod.Action('like') private likeArticle

  private swiperOption = {
    setWrapperSize: true,
    mousewheel: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    observeParents: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 16
  }
  private scrollTop = 0

  private get liked () {
    if (!this.article) return false
    return !!this.history.articles.find(item => item === this.article._id)
  }

  private get thumb () {
    return this.article.thumb + '?x-oss-process=image/resize,m_fill,w_600,h_360,limit_0/auto-orient,1/quality,q_100'
  }

  @Watch('fullColumn')
  private watchFullColumn (val) {
    setTimeout(() => {
      const swiper = (this as any).relatedSwiper
      if (swiper) swiper.update()
    }, 300)
  }

  private mounted () {
    this.$bus.$on('on-article-fontsize-change', (val) => {
      this.updateFontSize(this.articleFontSize + val)
    })
    window.addEventListener('scroll', this.handleScroll)
  }

  private beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  private handleScroll (e) {
    const scrollTop = getScroll(document.body, true)
    if (scrollTop < 80) {
      this.scrollTop = scrollTop
      if (this.showArticleTitle) {
        this.setArticleTitleVisible(false)
      }
      return
    }
    if (scrollTop > this.scrollTop && !this.showArticleTitle) {
      this.setArticleTitleVisible(true)
    } else if (this.scrollTop > scrollTop  && this.showArticleTitle) {
      this.setArticleTitleVisible(false)
    }
    this.scrollTop = scrollTop
  }

  private like () {
    this.likeArticle({
      id: this.article._id,
      like: !this.liked
    })
    window.gtagEvent('article_like', {
      event_category: 'article_like',
      event_label: '文章点赞',
      value: 1
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

$action-widget-width = 36px

.article-page {
  position relative
  width 100%

  .action-widget {
    position absolute
    top 0
    left -($action-widget-width + $padding-md)
    width $action-widget-width
    margin-right $padding-md
    z-index 999
  }

  .article-widget {
    width 100%
  }

  .article-detail {
    padding $padding-md
    overflow hidden
    user-select text

    .source {
      position absolute
      top -8px
      left -28px
      display block
      width 80px
      height 42px
      line-height 58px
      transform rotateZ(-45deg)
      text-align center
      font-size $font-size-sm
    }

    .title {
      margin $padding-md 0
      font-size $font-size-lger + 2px
      text-align center
    }

    .meta {
      flexLayout(, center)
      margin $padding-sm 0 $padding-md
      color var(--text-color-secondary)
      font-size $font-size-sm

      .category {
        .icon {
          margin-right $padding-xs
        }
      }

      &-item {
        flexLayout(, flex-start)
        position relative
        margin-right $padding-sm

        &::before {
          content ''
          width 2px
          height @width
          margin-right 4px
          border 1px solid var(--text-color-secondary)
          border-radius 1px
        }
      }
    }

    .thumb {
      img {
        width 100%
        margin-bottom $padding-md
        border 6px solid var(--border-color)
      }
    }

    .tags {
      margin-top $padding-md
      padding-top $padding-md
      border-top 1px dashed var(--border-color)
      text-align center
    }

    .like {
      flexLayout()
    }

    .article-info {
      margin-top $padding-xs
      padding $padding-xs
      line-height 2
      background-color var(--body-color)
      border-left 4px solid var(--primary-color-light)
      font-weight 300

      a {
        text-decoration underline
      }
    }
  }

  .article-related {
    overflow: hidden;

    .related-list.swiper {
      overflow hidden

      .swiper-wrapper {
        height 120px
        overflow hidden

        .swiper-slide.related-item {
          display inline-block
          width 250px
          height 100%
          border 8px solid var(--border-color)
          text-align center

          .item-box {
            position relative
            display block
            width auto
            height 100%
            overflow hidden
          }

          .thumb {
            width 100%
            height 100%
            background-size cover
            background-position center
            transition()
          }

          .mask {
            full()
            background-color var(--overlay-color)
            transition()
          }

          .title
          time {
            position absolute
            left 50%
            width 100%
            padding 0 $padding-xs
            transform translateX(-50%)
            font-weight 400
            color var(--light-color)
          }

          .title {
            top $padding-sm
          }

          time {
            bottom $padding-sm
            font-size $font-size-sm
          }

          &:hover {
            .thumb {
              transform scale(1.2)
            }

            .mask {
              background-color var(--overlay-color-dark)
            }
          }
        }
      }
    }
  }

  .app.mobile-layout & {

    .article-related {
      .swiper-wrapper {
        height 100px

        .swiper-slide.related-item {
          width 180px !important
        }
      }
    }
  }
}
</style>

