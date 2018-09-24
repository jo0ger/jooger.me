<template>
    <section class="category-page">
      <div class="info">
        <img class="background" v-if="findExtendsItem(category.extends, 'image')"
          :src="findExtendsItem(category.extends, 'image')" alt="">
        <div class="mask"></div>
        <div class="content">
          <i class="icon" :class="[`icon-${findExtendsItem(category.extends, 'icon') || 'category'}`]"></i>
          <h3 class="name">{{ category.name }}</h3>
          <div class="count" v-if="!listFetching">
            共搜索到
            <em class="num">{{ pageInfo.total || 0 }}</em>
            篇文章
          </div>
        </div>
      </div>
      <Card>
        <ArticleList :mini="true"></ArticleList>
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
  name: 'Category',
  components: {
    Card,
    ArticleList
  },
  layout ({ store }) {
    return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
  },
  validate ({ params }) {
    return !!params.name
  },
  head () {
    return {
      title: `${this.$route.params.name} | Category`
    }
  },
  async fetch ({ store, params }) {
    store.commit('article/CLEAR_LIST')
    await store.dispatch('article/fetchList', {
      category: params.name,
      page: 1
    })
  }
})
export default class extends Base {
  @aMod.Getter listFetching!: boolean
  @aMod.Getter pageInfo!: WebApi.PageInfo

  private get category () {
    return this.categoryList.find(item => item.name === this.$route.params.name)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.category-page {
  .info {
    height 150px
    position relative
    margin-bottom $padding-sm
    background alpha($white, .7)
    overflow hidden
    text-align center

    .background {
      width 100%
      height auto
      transition all .3s $ease
      filter blur(5px)
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
      color $white
      transform translate(-50%, -50%)

      .icon {
        font-size 42px
        font-weight 400
      }

      .name {
        margin 8px 0 0
      }
    }

    &:hover {
      .background {
        transform scale(1.1)
      }

      .mask {
        background-color rgba($black, .8)
      }
    }
  }
}
</style>

