<template>
    <section class="search-page">
        <Card>
          <div slot="header" class="info-header">
            <i class="icon icon-search"></i>
            <div class="search">与
              <span class="keyword">{{ $route.params.keyword }}</span>
              关键词有关的文章
            </div>
            <div class="count" v-if="!listFetching">
              共搜索到
              <em class="num">{{ pageInfo.total || 0 }}</em>
              篇文章
            </div>
          </div>
        <div class="list-content">
          <ArticleList :mini="true"></ArticleList>
        </div>
      </Card>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Card, ArticleList } from '@/components/common'
import { namespace } from 'vuex-class'

const { Getter } = namespace('article')

@Component({
  name: 'Search',
  components: {
    Card,
    ArticleList
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
  @Getter private pageInfo!: WebApi.PageInfo
  @Getter private listFetching!: boolean
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.search-page {
  width 100%
}
</style>

