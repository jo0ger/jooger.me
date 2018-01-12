<style lang="stylus" scoped>
	@import 'index'
</style>

<template>
  <nuxt-link
    class="tag"
    :to="`/tag/${name}`"
    v-if="link">
    <i class="icon" :class="[`icon-${icon}`]"></i>
    <span class="name">{{ name }}</span>
    <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
  </nuxt-link>
  <span
    class="tag"
    v-else>
    <i class="icon" :class="[`icon-${icon}`]"></i>
    <span class="name">{{ name }}</span>
    <span class="count" v-if="count >= 0">[{{ count || 0 }}]</span>
  </span>
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
        default: ''
      },
      count: {
        type: Number,
        default: -1
      },
      link: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

