<template>
    <section class="search-page">
        <Card>
            <div slot="header" class="info-header">
            <i class="icon icon-search"></i>
            <div class="search">与
            <span class="keyword">{{ $route.params.keyword }}</span>
            有关的文章
            </div>
            <div class="count" v-if="!articleListFetching">
            共搜索到
            <em class="num">{{ pageInfo.total || 0 }}</em>
            篇文章
            </div>
        </div>
        <div class="list-content">
            <ArticleList
              mini
              :list="articleList"
              :page-info="pageInfo"
              :loading="articleListFetching"
              @on-loadmore="loadmore">
            </ArticleList>
        </div>
        </Card>
    </section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"
import { Card, ArticleList } from '@/components/common'
import { namespace } from 'vuex-class'

const aMod = namespace('article')

@Component({
  name: 'Search',
  components: {
    Card,
    ArticleList
  },
  layout ({ store }) {
    return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
  },
  validate ({ params }) {
    return !!params.keyword
  },
  head () {
    return {
      title: `${this.$route.params.keyword} | Search`
    }
  },
  async fetch ({ store, params }) {
    store.commit('article/CLEAR_LIST')
    await store.dispatch('article/fetchList', {
      keyword: params.keyword,
      page: 1
    })
  }
})
export default class extends Base {
  @aMod.Getter('list') articleList!: WebApi.ArticleModule.Article[]
  @aMod.Getter('listFetching') articleListFetching!: boolean
  @aMod.Getter pageInfo!: WebApi.PageInfo
  @aMod.Action('fetchList') getArticleList!: (params: any) => void

  private loadmore () {
    this.getArticleList({
      keyword: this.$route.params.keyword
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.search-page {}
</style>

