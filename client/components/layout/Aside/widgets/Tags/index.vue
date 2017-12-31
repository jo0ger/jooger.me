<style lang="stylus">
	@import 'index'
</style>

<template>
  <Card class="widget-tags">
    <div class="title" slot="header">
      <i class="icon icon-tag"></i>
      标签
    </div>
    <div class="tag-list">
      <nuxt-link v-for="item in tagList"
        class="tag-item"
        :to="`/tag/${item.name}`"
        :key="item.name">
        <i class="icon" :class="[getTagIconClass(item)]" v-if="getTagIconClass(item)"></i>
        <span class="name">{{ item.name }}</span>
        <span class="count">[{{item.count || 0}}]</span>
      </nuxt-link>
    </div>
  </Card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card } from '@/components/common'

  export default {
    name: 'Tags',
    components: {
      Card
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        tagList: 'tag/list',
        fetching: 'tag/fetching'
      })
    },
    methods: {
      getTagIconClass (item) {
        const icon = this.getExtendItemByKey('icon', item.extends)
        return icon ? `icon-${icon}` : null
      }
    }
  }
</script>

