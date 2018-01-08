<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="widget-tags">
    <div class="title" slot="header">
      <i class="icon icon-tag"></i>
      标签
    </div>
    <div class="tag-list" v-if="tagList.length">
      <Tag v-for="item in tagList"
        :key="item.name"
        :name="item.name"
        :icon="getExtendsItemByKey('icon', item.extends)"
        :count="item.count"
        link></Tag>
    </div>
    <p class="no-data" v-else>暂无标签</p>
  </Card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card, Tag } from '@/components/common'

  export default {
    name: 'Tags',
    components: {
      Card,
      Tag
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        tagList: 'tag/list',
        fetching: 'tag/fetching'
      })
    }
  }
</script>

