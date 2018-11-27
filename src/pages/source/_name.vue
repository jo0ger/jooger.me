<template>
    <section class="source-page" :class="[source.code && `source-page-${source.code}`]">
      <div class="info">
        <div class="content">
          <i class="icon" :class="[`icon-${source.code || 'source'}`]"></i>
          <h3 class="name">{{ source.label }}</h3>
          <div class="count" v-if="!listFetching">
            共
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
import { constant } from '@/utils'

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
      title: `${this.$route.params.name} | Source`
    }
  },
  async fetch ({ store, params }) {
    const source = constant.ARTICLE_SOURCE.find(item => item.label === params.name)
    store.commit('article/CLEAR_LIST')
    if (source) {
      await store.dispatch('article/fetchList', {
        source: source.value,
        page: 1
      })
    }
  }
})
export default class extends Base {
  @aMod.Getter private listFetching!: boolean
  @aMod.Getter private pageInfo!: WebApi.PageInfo

  private get source () {
    const sourceName = this.$route.params.name
    return constant.ARTICLE_SOURCE.find(item => item.label === sourceName) || {
      label: sourceName,
      value: ''
    }
  }

  private get params () {
    return {
      source: this.source.value
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.source-page {
  .info {
    height 150px
    position relative
    margin-bottom $padding-sm
    background-color var(--card-color)
    overflow hidden
    text-align center

    .content {
      position absolute
      top 50%
      left 50%
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
        background-color var(--overlay-color-dark)
      }
    }
  }

  &-original {
    .info {
      color var(--primary-color)
      background-color var(--primary-color-light)

      .icon {
        color var(--primary-color)
      }
    }
  }

  &-reprint {
    .info {
      color $orange-6
      background-color rgba($orange-6, .2)

      .icon {
        color $orange-6
      }
    }
  }

  &-hybrid {
    .info {
      color $blue-6
      background-color rgba($blue-6, .2)

      .icon {
        color $blue-6
      }
    }
  }

  &-translate {
    .info {
      color $cyan-6
      background-color rgba($cyan-6, .2)

      .icon {
        color $cyan-6
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

