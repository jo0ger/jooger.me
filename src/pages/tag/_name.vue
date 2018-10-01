<template>
    <section class="tag-page">
      <Card>
        <div slot="header" class="info-header">
          <i class="icon" :class="[`icon-${findExtendsItem(tag.extends, 'icon') || 'tag'}`]"></i>
          <div class="search">与
            <span class="keyword">{{ $route.params.name }}</span>
            标签有关的文章
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
  name: 'Tag',
  components: {
    Card,
    ArticleList
  },
  validate ({ params }) {
    return !!params.name
  },
  head () {
    return {
      title: `${this.$route.params.name} | Tag`
    }
  },
  async fetch ({ store, params }) {
    store.commit('article/CLEAR_LIST')
    await store.dispatch('article/fetchList', {
      tag: params.name,
      page: 1
    })
  }
})
export default class extends Base {
  @Getter private pageInfo!: WebApi.PageInfo
  @Getter private listFetching!: boolean

  private get tag () {
    return this.tagList.find(item => item.name === this.$route.params.name) || {}
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.tag-page {
  width 100%
}
</style>

