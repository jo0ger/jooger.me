<style lang="stylus">
	@import 'index'
</style>

<template>
  <nuxt-link
    class="tag"
    :to="`/tag/${name}`">
    <i class="icon" :class="[`icon-${icon}`]"></i>
    <span class="name">{{ name }}</span>
    <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'Tag',
    props: {
      name: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'tag'
      },
      count: {
        type: Number,
        default: -1
      }
    }
  }
</script>

