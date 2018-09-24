<template>
  <section class="home-page">
    <div class="category-panel">
      <div class="category"
        v-for="item in categoryList"
        :key="item._id">
        <router-link :to="`/category/${item._id}`">
          <img class="background" v-if="findExtendsItem(item.extends, 'image')"
            :src="findExtendsItem(item.extends, 'image')" alt="">
          <div class="mask"></div>
          <div class="content">
            <i class="icon" :class="[`icon-${findExtendsItem(item.extends, 'icon') || 'category'}`]"></i>
            <h3 class="name">{{ item.name }}</h3>
          </div>
        </router-link>
      </div>
    </div>
    <Card class="article-panel">
      <ArticleList
        :list="articleList"
        :loading="articleListFetching"
        :page-info="pageInfo"
        :on-loadmore="loadmore"></ArticleList>
    </Card>
  </section>
</template>

<script lang="ts">
import Base from "@/base"
import { namespace } from 'vuex-class'
import { Component } from "@/utils/decorators"
import { Card, ArticleList, ArticleItem, Loading } from '@/components/common'

const aMod = namespace('article')

@Component({
  name: 'Index',
  components: {
    Card,
    ArticleList,
    ArticleItem,
    Loading
  },
  head: {
    title: '首页'
  },
  async fetch ({ store }) {
    store.commit('article/CLEAR_LIST')
    await store.dispatch('article/fetchList', { page: 1 })
  }
})
export default class extends Base {
  @aMod.Getter('list') articleList!: WebApi.ArticleModule.Article[]
  @aMod.Getter('listFetching') articleListFetching!: boolean
  @aMod.Getter pageInfo!: WebApi.PageInfo
  @aMod.Action('fetchList') getArticleList!: () => void

  private loadmore () {
    this.getArticleList()
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/init'

.home-page {
  .category-panel {
    display flex
    margin 0 -8px 16px

    .category {
      position relative
      flex 1 0
      margin 0 8px
      text-align center
      overflow hidden
      border-radius 4px

      a {
        width 100%
        text-decoration none
        color $white
      }

      .background {
        width 100%
        height 100%
        transition all .3s $ease
      }

      .mask {
        full()
        background-color rgba($black, .6)
        transition all .3s $ease
      }

      .content {
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)

        .icon {
          font-size 20px
        }

        .name {
          margin 8px 0 0
        }
      }

      &:hover {
        .background {
          transform scale(1.2)
        }

        .mask {
          background-color rgba($black, .8)
        }
      }
    }
  }

  .article-panel {
    
  }
}
</style>
