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
            <span class="source" :class="[article.source ? 'reprint' : 'original']">{{ article.source | constantFilter('ARTICLE_SOURCE') }}</span>
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
            <div class="content markdown-body"
              v-copyright
              :style="{
                fontSize: articleFontSize + 'px'
              }"
              v-html="article.renderedContent"></div>
            <div class="tags">
              <Tag v-for="tag in article.tag"
                :key="tag._id"
                :name="tag.name"
                :icon="findExtendsItem(tag.extends, 'icon') || 'tag'"
                :link="true">
              </Tag>
            </div>
          </article>
          <div class="article-info">
            <div class="from" v-if="article.from">
              转载来源：
              <a :href="article.from" target="_blank">{{ article.from }}</a>
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
        </Card>
        <Card class="article-related" header="相关文章" v-if="article.related.length">
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
      </div>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component, Prop, Watch } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import { Affix, Card, Tag, Like, ReadTool } from '@/components/common'

const appMod = namespace('app')
const articleMod = namespace('article')

@Component({
  name: 'ArticleDetail',
  components: {
    Affix,
    Card,
    Tag,
    Like,
    ReadTool
  },
  validate ({ params }) {
    return !!params.id
  },
  fetch ({ params, store }) {
    return Promise.all([
      store.dispatch('article/fetchDetail', params.id),
      // store.dispatch('comment/fetchList', {
      //   article: params.id,
      //   type: 0,
      //   page: 1
      // })
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
  @appMod.Mutation('SET_ARTICLE_FONTSIZE') private setFontSize
  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article
  @articleMod.Getter('detailFetching') private articleFetching!: boolean
  @articleMod.Getter('detailLiking') private articleLiking!: boolean
  @articleMod.Action('like') private likeArticle

  private swiperOption = {
    setWrapperSize: true,
    mousewheel: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    observeParents: true,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 16
  }

  private get liked () {
    if (!this.article) return false
    return !!this.history.articles.find(item => item === this.article._id)
  }

  @Watch('fullColumn')
  private watchFullColumn (val) {
    setTimeout(() => {
      (this as any).relatedSwiper.update()
    }, 300)
  }

  private mounted () {
    this.$bus.$on('on-article-fontsize-change', (val) => {
      console.log(val)
      this.setFontSize(val)
    })
  }

  private like () {
    this.likeArticle({
      id: this.article._id,
      like: !this.liked
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

$action-widget-width = 36px

.article-page {
  flexLayout(, flex-start, flex-start)
  width 100%

  .action-widget {
    flex 0 0 $action-widget-width
    width $action-widget-width
    margin-right $padding-md
  }

  .article-widget {
    flex 1 0
    width 100%
    overflow hidden
  }

  .article-detail {
    padding $padding-md $padding-lg

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

      &.original {
        background-color rgba($blue, .2)
        color $blue
      }

      &.reprint {
        background-color rgba($orange, .2)
        color $orange
      }
    }

    .title {
      margin $padding-md 0
      font-size $font-size-lger + 2px
      text-align center
    }

    .meta {
      flexLayout(, center)
      margin 10px 0 20px
      color $text-color-secondary
      font-size $font-size-sm

      .category {
        .icon {
          margin-right 6px
        }
      }
      &-item {
        flexLayout(, flex-start)
        position relative
        margin-right 12px

        &::before {
          content ''
          width 2px
          height @width
          margin-right 4px
          border 1px solid $text-color-secondary
          border-radius 1px
        }
      }
    }

    .tags {
      margin-top $padding-md
      padding-top $padding-md
      border-top 1px dashed $border-color-3
      text-align center
    }

    .like {
      flexLayout()
    }

    .article-info {
      margin-top $padding-xs
      padding $padding-xs
      line-height 2
      background-color $grey
      border-left 4px solid rgba($base-color, .2)
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
          border 8px solid $grey3
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
            transition(,,$ease)
          }

          .mask {
            full()
            background-color rgba($black, .6)
            transition(,,$ease)
          }

          .title
          time {
            position absolute
            left 50%
            width 100%
            padding 0 $padding-md
            transform translateX(-50%)
            font-weight 400
            color $white
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
              background-color rgba($black, .8)
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

