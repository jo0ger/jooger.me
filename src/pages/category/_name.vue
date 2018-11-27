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
        <ArticleList :params="params"></ArticleList>
      </Card>
    </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Card, ArticleList } from '@/components/common'
import { namespace } from 'vuex-class'

const aMod = namespace('article')

@Component({
  name: 'Category',
  components: {
    Card,
    ArticleList
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
  @aMod.Getter private listFetching!: boolean
  @aMod.Getter private pageInfo!: WebApi.PageInfo

  private get category () {
    return this.categoryList.find(item => item.name === this.$route.params.name) || {
      name: this.$route.params.name
    }
  }

  private get params () {
    return {
      source: this.category.name
    }
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
    background-color var(--card-color)
    overflow hidden
    text-align center

    .background {
      width 100%
      height auto
      transition()
      filter blur(5px)
    }

    .mask {
      full()
      background-color var(--overlay-color)
      transition()
    }

    .content {
      position absolute
      top 50%
      left 50%
      color var(--light-color)
      transform translate(-50%, -50%)

      .icon {
        font-size 42px
        font-weight 400
        color var(--light-color)
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
        background-color var(--overlay-color-dark)
      }
    }
  }

  .mobile-layout & {
    .info {
      margin-bottom 0
    }
  }
}
</style>

