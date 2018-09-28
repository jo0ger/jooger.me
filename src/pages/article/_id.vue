<template>
    <section class="article-page">
      <Card class="article-widget">
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
          <div class="like">
            <Like :liked="liked" @on-click="likeClick"></Like>
          </div>
        </article>
      </Card>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component, Prop } from '@/utils/decorators'
import { namespace } from 'vuex-class'
import { Card, Tag, Like } from '@/components/common'

const appMod = namespace('app')
const articleMod = namespace('article')

@Component({
  name: 'ArticleDetail',
  components: {
    Card,
    Tag,
    Like
  },
  layout ({ store }) {
    return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
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
  @appMod.Getter private articleFontSize
  @appMod.Mutation('SET_ARTICLE_FONTSIZE') private setFontSize
  @articleMod.Getter('detail') private article!: WebApi.ArticleModule.Article

  private liked = false

  private mounted () {
    this.$bus.$on('on-article-fontsize-change', (val) => {
      this.setFontSize(val)
    })
  }

  private likeClick () {
    this.liked = !this.liked
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.article-page {
  .article-widget {
    padding 20px 30px
    overflow hidden
  }

  .article {
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
      margin-top 10px
      padding-top 10px
      border-top 1px dashed $border-color-3
      text-align center
    }

    .like {
      flexLayout()
    }
  }
}
</style>

