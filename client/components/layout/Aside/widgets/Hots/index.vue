<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="widget-hots">
    <div class="title" slot="header">
      <i class="icon icon-article"></i>
      热门文章
    </div>
    <ul class="hot-list" v-if="hotList.length">
      <li class="hot-item"
        v-for="item in hotList"
        :key="item._id"
        :title="item.title">
        <nuxt-link
          class="title"
          :to="`/article/${item._id}`"
          :title="item.title">{{ item.title }}</nuxt-link>
        <!-- <div class="meta">
          <div class="meta-item comments">
            {{ item.meta.comments }} 条评论
          </div>
          <div class="meta-item ups">
            {{ item.meta.ups }} 人喜欢
          </div>
        </div> -->
      </li>
    </ul>
    <p class="no-data" v-else>暂无热门文章</p>
  </Card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card } from '@/components/common'

  export default {
    name: 'Hots',
    components: {
      Card
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        hotList: 'article/hot'
      })
    }
  }
</script>

